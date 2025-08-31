// api/users/me -> Get the user's details all of it,
// i want the metadata of the user
/*
the socials and the users, get the metadata of it!

*/
import { requireUser } from "@/lib/auth";
import { NextRequest,NextResponse } from "next/server";
import { db } from "@/lib/prisma";


export async function GET() {
    const sessionUser = await requireUser();
    if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
    const usermetadata = await db.user.findMany({
      where: { id: sessionUser.id },
      select: {
        links: {
            select: {
                id: true,
                linkThumbnail: true,
                linkUrl: true,
                description: true
            }
        },
        socials: {
            select: {
                id: true,
                platform: true,
                url: true
            }
        }
      },
      orderBy: { createdAt: "asc" },
    });
  
    db.user.findMany()
    return NextResponse.json(usermetadata);
  }
  