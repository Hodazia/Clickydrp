// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signinSchema } from "@/lib/schema";

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
        'signIn': '/login' // Now when u go to /api/auth/signin -> basically to login page
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
        
        async authorize(credentials, req) {
            // Your logic goes here. This function's job is to validate the credentials
            // and return a user object or null.
            
            // Validate the credentials with the Zod schema
            const validatedCredentials = signinSchema.safeParse(credentials);
            if (!validatedCredentials.success) {
                // Return null on validation failure
                return null;
            }

            const { username, password } = validatedCredentials.data;
            
            // Find the user by email using Prisma
            const user = await db.user.findUnique({
                where: {
                    username: username
                }
            });
            
            // If the user doesn't exist or the password doesn't match, return null.
            // This is the correct way to handle failures in `authorize`.
            if (!user) {
                return null; // User not found
            }
            
            // Compare the submitted password with the hashed password from the database
            const passwordMatch = await bcrypt.compare(password, user.password as string);
            
            if (!passwordMatch) {
                return null; // Password mismatch
            }

            // If we reach this point, authentication was successful.
            // Return a sanitized user object. Do NOT include the password!
            return {
                id: user.id,
                username: user.username,
                email: user.email,
            };
        }
      })
    ]
};

const handler = NextAuth(authConfig);

// This is the correct way to export the handlers for Next.js.
export { handler as GET, handler as POST };