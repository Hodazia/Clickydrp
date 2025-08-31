import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const socials = await db.social.findMany({
    where: { userId: sessionUser.id },
  });

  return NextResponse.json(socials);
}

export async function POST(req: Request) {
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { platform, url } = body;

  const social = await db.social.create({
    data: {
      userId: sessionUser.id,
      platform,
      url,
    },
  });

  return NextResponse.json(social);
}
