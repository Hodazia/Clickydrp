import { NextResponse , NextRequest} from "next/server";
import  { db } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import type { UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// interface RouteContext {
//   params: { id: string };
// }

// PUT api/links/:id , delete too , 
export async function PUT(
  req: NextRequest,
  context:unknown
) {

  try{

  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = (context as { params: { id: string } }).params;
    const existingLink = await db.link.findUnique({
      where: { id: id, userId: sessionUser.id as string },
    });

    if (!existingLink) {
      return NextResponse.json(
        { error: "Link not found or not owned by user." },
        { status: 404 }
      );
    }
    const formData = await req.formData();
    const linkUrl = formData.get("linkUrl") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;

    if (!linkUrl) {
      return NextResponse.json({ error: "Link URL required" }, { status: 400 });
    }

    let imageUrl = existingLink.linkThumbnail;

    if (file) {
      // Step 1: Delete the old image from Cloudinary if it exists.
      if (existingLink.linkThumbnail) {
        const publicId = existingLink.linkThumbnail
          .split("/")
          .pop()
          ?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(
            `linktree-thumbnails/${publicId}`
          );
        }
      }

      // Step 2: Upload the new image to Cloudinary.
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResponse:UploadApiResponse = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "linktree-thumbnails",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as UploadApiResponse);
          }
        );
        stream.end(buffer);
      });

      imageUrl = uploadResponse.secure_url;
    }

    // Step 3: Update the link in the database.
    const updatedLink = await db.link.update({
      where: { id: id },
      data: {
        linkUrl,
        description,
        linkThumbnail: imageUrl,
      },
    });

    return NextResponse.json(updatedLink);
  }
  catch(error: unknown)
  {
    console.error("Error updating link:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context:any
) {
  const { id } = (context as { params: { id: string } }).params;
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.link.delete({
    where: { id , userId: sessionUser.id },
  });

  return NextResponse.json({ success: true });
}