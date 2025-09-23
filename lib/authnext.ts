// lib/auth.ts
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/prisma";
import { signinSchema } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { User as NextAuthUser } from "next-auth";

interface User extends NextAuthUser {
    id:string;
}

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  debug:true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as User).id;
        token.email = user.email || "";
        token.name = user.name || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as User).id = token.id;
        (session.user as User).email = token.email;
        (session.user as User).name = token.name;
      }
      return session;
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validated = signinSchema.safeParse(credentials);
        if (!validated.success) return null;
        const { email, password } = validated.data;

        const user = await db.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.username } as User;
      },
    }),
  ],
};
