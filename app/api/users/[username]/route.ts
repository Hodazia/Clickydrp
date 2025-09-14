import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Record<string, string> }
) {
  try {
    const { username } = context.params;

    const themeSelect = {
      id: true,
      viewportType: true,
      viewportColor: true,
      viewportImage: true,
      viewportGradient: true,
      linksBackground: true,
      linksFontColor: true,
      linksBorderRadius: true,
      linksSpacing: true,
      linksHoverColor: true,
      bioFontColor: true,
      bioFontSize: true,
      bioFontFamily: true,
      socialsIconColor: true,
      socialsIconHoverColor: true,
      socialsSize: true,
      profileShape: true,
      profileBorderColor: true,
      profileBorderWidth: true,
      createdAt: true,
      updatedAt: true,
    } as const;

    const user = await db.user.findUnique({
      where: { username },
      include: {
        links: { orderBy: { createdAt: "asc" } },
        socials: true,
        themes: { select: themeSelect },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (e: unknown) {
    const msg = e instanceof Error? e?.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
