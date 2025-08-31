// lib/auth.ts
import { getServerSession } from "next-auth";

import { db } from "@/lib/prisma";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";


export async function requireUser() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user; // always return the full user object
}
