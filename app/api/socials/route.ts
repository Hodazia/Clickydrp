import { NextRequest,NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
/*
- All of them are protected endpoints! 

*/

// get all the socials, 
export async function GET() {
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const socials = await db.social.findMany({
    where: { userId: sessionUser.id },
  });

  return NextResponse.json(socials);
}


// add the socials, 
export async function POST(req: NextRequest) {
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { platform, url } = body;

  if (!platform || !url) {
    return NextResponse.json({ error: "Platform and URL are required" }, { status: 400 });
  }

  const social = await db.social.create({
    data: {
      userId: sessionUser.id,
      platform,
      url,
    },
  });

  return NextResponse.json(social);
}
