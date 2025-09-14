// app/api/links/route.ts -> GET and POST
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authConfig } from "../auth/[...nextauth]/route";

import { db } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});



// get all the links of a user with id, the id will be from the session id, which is the userId of the user table
export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const links = await db.link.findMany({
      where: { userId: session.user.id as string },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(links);
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// these api should be protected, not public,
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    console.log("Sesson id is ", session, " ID is ", session?.user)
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const linkUrl = formData.get("linkUrl") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;   // this is the link thumbnail

    if (!linkUrl) {
      return NextResponse.json({ error: "Link URL required" }, { status: 400 });
    }

    let imageUrl: string | null = null;

    if (file) {
      // Convert File to Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary
      const uploadResponse = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "linktree-thumbnails",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      imageUrl = uploadResponse.secure_url;
    }

    // Save link in DB
    const newLink = await db.link.create({
      data: {
        userId: session.user.id as string,
        linkUrl: linkUrl,
        linkThumbnail: imageUrl,
        description,
      },
    });

    return NextResponse.json(newLink, { status: 201 });
  } catch (error: any) {
    console.error("Error creating link:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
