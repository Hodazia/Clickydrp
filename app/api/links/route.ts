// api/links

import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const links = await db.link.findMany({
    where: { userId: sessionUser.id },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(links);
}

export async function POST(req: Request) {
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { link_url, description } = body;

  const link = await db.link.create({
    data: {
      userId: sessionUser.id,
      linkUrl:link_url,
      description,
    },
  });

  return NextResponse.json(link);
}
