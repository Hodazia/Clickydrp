import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

// GET current user's theme (create default if none)
export async function GET() {
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let theme = await db.theme.findFirst({ where: { userId: sessionUser.id } });
  if (!theme) {
    theme = await db.theme.create({
      data: {
        userId: sessionUser.id,
        viewportType: "color",
        viewportColor: "#ffffff",
        cardType: "color",
        cardColor: "#ffffff",
        linksBackground: "#ffffff",
        linksFontColor: "#111111",
        linksBorderRadius: 12,
        linksSpacing: 12,
        socialsIconColor: "#111111",
        socialsIconHoverColor: "#000000",
        socialsSize: 18,
        bioFontColor: "#111111",
        bioFontSize: 16,
        profileShape: "circle"
      }
    });
  }

  return NextResponse.json(theme);
}

// POST to upsert the current user's theme
export async function POST(req: Request) {
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const allowed = {
    viewportType: body.viewportType,
    viewportColor: body.viewportColor,
    viewportImage: body.viewportImage,
    viewportGradient: body.viewportGradient,
    cardType: body.cardType,
    cardColor: body.cardColor,
    cardImage: body.cardImage,
    cardGradient: body.cardGradient,
    cardBlur: body.cardBlur,
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

  const existing = await db.theme.findFirst({ where: { userId: sessionUser.id } });
  const theme = existing
    ? await db.theme.update({ where: { id: existing.id }, data: allowed as any })
    : await db.theme.create({ data: { ...allowed, userId: sessionUser.id } as any });

  return NextResponse.json(theme);
}

