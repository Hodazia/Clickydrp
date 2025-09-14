// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signinSchema } from "@/lib/schema";
import { User } from "next-auth";

import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
// This is the core configuration for NextAuth
export const authConfig: AuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        'signIn': '/signin' // Now when u go to /api/auth/signin -> basically to login page
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email || "";
                token.name = user.name || "";
                
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session.user).id = token.id;
                (session.user).email = token.email;
                (session.user).name = token.name;
                
            }
            return session;
        },
    },
    providers: [  
        GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string
      }),
      GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
      }),
      CredentialsProvider({
        name: 'Credentials',
        // NextAuth expects these credentials to be defined here
        credentials: {
          email: { label: "Email", type: "email", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        
        async authorize(credentials) {
            // Your logic goes here. This function's job is to validate the credentials
            // and return a user object or null.
            
            console.log("Attempting to authorize credentials...");
            const validatedCredentials = signinSchema.safeParse(credentials);
            
            if (!validatedCredentials.success) {
                console.error("Credentials validation failed:", validatedCredentials.error);
                return null;
            }
            console.log("Credentials validation succeeded.");

            const { email, password } = validatedCredentials.data;

            // Find the user by email using Prisma
            const user = await db.user.findUnique({
                where: {
                    email: email
                }
            });
            
            // If the user doesn't exist or the password doesn't match, return null.
            // This is the correct way to handle failures in `authorize`.
            if (!user) {
                console.log("Authorization failed: User not found for email:", email);
                return null; // User not found
            }
            
            // Compare the submitted password with the hashed password from the database
            // Ensure user.password exists before attempting comparison
            if (!user.password) {
              console.log("Authorization failed: User found but no password set.");
              return null;
            }
            console.log("User found, attempting to compare passwords...");
            const passwordMatch = await bcrypt.compare(password, user.password);
            
            if (!passwordMatch) {
                console.log("Authorization failed: Password mismatch for user:", email);
                return null; // Password mismatch
            }
            console.log("Password matched. Authorization successful.");

            // If we reach this point, authentication was successful.
            // Explicitly cast the returned object to the User type to satisfy the type checker.
            return {
                id: user.id,
                email: user.email,
                name: user.username,
            } as User;
            // Validate the credentials with the Zod schema
            // const validatedCredentials = signinSchema.safeParse(credentials);
            // if (!validatedCredentials.success) {
            //     // Return null on validation failure
            //     return null;
            // }

        }
      })
    ]
};

const handler = NextAuth(authConfig);

// This is the correct way to export the handlers for Next.js.
export { handler as GET, handler as POST };