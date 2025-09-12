import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

// GET current user's theme (create default if none)
export async function GET() {
  try {
    const sessionUser = await requireUser();
    if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const select = {
      id: true,
      userId: true,
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

    let theme = await db.theme.findFirst({ where: { userId: sessionUser.id }, select });
    if (!theme) {
      theme = await db.theme.create({
        data: {
          userId: sessionUser.id,
          viewportType: "color",
          viewportColor: "#ffffff",
          // No card background in new schema
          linksBackground: "#111827",
          linksFontColor: "#ffffff",
          linksBorderRadius: 12,
          linksSpacing: 12,
          socialsIconColor: "#111111",
          socialsIconHoverColor: "#000000",
          socialsSize: 18,
          bioFontColor: "#111111",
          bioFontSize: 16,
          profileShape: "circle"
        },
        select,
      });
    }

    return NextResponse.json(theme);
  } catch (e: any) {
    const msg = e?.message || "Internal Server Error";
    if (msg === "Unauthorized" || msg === "User not found") {
      return NextResponse.json({ error: msg }, { status: 401 });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST to upsert the current user's theme
export async function POST(req: Request) {
  try {
    const sessionUser = await requireUser();
    if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const allowed = {
      viewportType: body.viewportType,
      viewportColor: body.viewportColor,
      viewportImage: body.viewportImage,
      viewportGradient: body.viewportGradient,
      linksBackground: body.linksBackground,
      linksFontColor: body.linksFontColor,
      linksBorderRadius: body.linksBorderRadius,
      linksSpacing: body.linksSpacing,
      linksHoverColor: body.linksHoverColor,
      bioFontColor: body.bioFontColor,
      bioFontSize: body.bioFontSize,
      bioFontFamily: body.bioFontFamily,
      socialsIconColor: body.socialsIconColor,
      socialsIconHoverColor: body.socialsIconHoverColor,
      socialsSize: body.socialsSize,
      profileShape: body.profileShape,
      profileBorderColor: body.profileBorderColor,
      profileBorderWidth: body.profileBorderWidth,
    } as const;

    const select = {
      id: true,
      userId: true,
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

    const existing = await db.theme.findFirst({ where: { userId: sessionUser.id }, select: { id: true } });
    const theme = existing
      ? await db.theme.update({ where: { id: existing.id }, data: allowed as any, select })
      : await db.theme.create({ data: { ...allowed, userId: sessionUser.id } as any, select });

    return NextResponse.json(theme);
  } catch (e: any) {
    const msg = e?.message || "Internal Server Error";
    if (msg === "Unauthorized" || msg === "User not found") {
      return NextResponse.json({ error: msg }, { status: 401 });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

