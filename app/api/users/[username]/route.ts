import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params;

  const user = await db.user.findUnique({
    where: { username },
    include: {
      links: { orderBy: { createdAt: "asc" } },
      socials: true,
      themes: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
