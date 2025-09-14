
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// import { authConfig } from "../auth/[...nextauth]/route";
import { authConfig } from "@/lib/authnext";
import { db } from "@/lib/prisma"; // prisma client
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 
/*
api/profile POST, 
Add the emal, username , description, profileimg, profileUrl
- 

*/
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    // if the user is not valid, then the api won't work since it is  a protected one!
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const file = formData.get("profileImage") as File;
    const description = formData.get("description") as string;

    if (!username || !email) {
      return NextResponse.json({ error: "Username and Email required" }, { status: 400 });
    }

    let imageUrl: string | null = null;

    if (file) {
      // Convert File to Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary
      const uploadResponse:UploadApiResponse = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "user-profiles",
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

    // Update user in DB
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        username,
        email,
        profileimg: imageUrl,
        description:description
         // necessary to update it 
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating profile:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

/*
Get username profileimg, description, email from the DB
*/
export async function GET() {
    // 
    try {
        const session = await getServerSession(authConfig);
    
        // if the user is not valid, then the api won't work since it is  a protected one!
        if (!session || !session.user?.id) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        //
        const user = await db.user.findUnique({
            where: {id: session.user.id},
            select: {
                username: true,
                email: true,
                profileimg: true,
                description: true,
              },
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
          }
      
          return NextResponse.json(user, { status: 200 });
    }
    catch(error:unknown)
    {
        console.error("GET /api/profile error:", error);
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
      
        return NextResponse.json({ error: "Unknown error" }, { status: 500 });
        // return NextResponse.json(
        // { error: "Internal Server Error" },
        // { status: 500 }
        // );
    }
}