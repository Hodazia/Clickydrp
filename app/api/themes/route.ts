// import { NextResponse } from "next/server";
// import { db } from "@/lib/prisma";
// import { requireUser } from "@/lib/auth";
// import type { Prisma } from "@prisma/client";


// // GET current user's theme (create default if none)
// export async function GET() {
//   try {
//     const sessionUser = await requireUser();
//     if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const select = {
//       id: true,
//       userId: true,
//       viewportType: true,
//       viewportColor: true,
//       viewportImage: true,
//       viewportGradient: true,
//       linksBackground: true,
//       linksFontColor: true,
//       linksBorderRadius: true,
//       linksSpacing: true,
//       linksHoverColor: true,
//       bioFontColor: true,
//       bioFontSize: true,
//       bioFontFamily: true,
//       socialsIconColor: true,
//       socialsIconHoverColor: true,
//       socialsSize: true,
//       profileShape: true,
//       profileBorderColor: true,
//       profileBorderWidth: true,
//       createdAt: true,
//       updatedAt: true,
//     } as const;

//     let theme = await db.theme.findFirst({ where: { userId: sessionUser.id }, select });
//     if (!theme) {
//       theme = await db.theme.create({
//         data: {
//           userId: sessionUser.id,
//           viewportType: "color",
//           viewportColor: "#ffffff",
//           // No card background in new schema
//           linksBackground: "#111827",
//           linksFontColor: "#ffffff",
//           linksBorderRadius: 12,
//           linksSpacing: 12,
//           socialsIconColor: "#111111",
//           socialsIconHoverColor: "#000000",
//           socialsSize: 18,
//           bioFontColor: "#111111",
//           bioFontSize: 16,
//           profileShape: "circle"
//         },
//         select,
//       });
//     }

//     return NextResponse.json(theme);
//   } catch (e: unknown) {
//     const msg = e instanceof Error?  e.message : "Internal Server Error";
//     if (msg === "Unauthorized" || msg === "User not found") {
//       return NextResponse.json({ error: msg }, { status: 401 });
//     }
//     return NextResponse.json({ error: msg }, { status: 500 });
//   }
// }

// // POST to upsert the current user's theme
// export async function POST(req: Request) {
//   try {
//     const sessionUser = await requireUser();
//     if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const body = await req.json();
// // 
// // For update
// const allowedUpdate: Prisma.ThemeUncheckedUpdateInput = {
//   viewportType: body.viewportType,
//   viewportColor: body.viewportColor,
//   viewportImage: body.viewportImage,
//   viewportGradient: body.viewportGradient,
//   linksBackground: body.linksBackground,
//   linksFontColor: body.linksFontColor,
//   linksBorderRadius: body.linksBorderRadius,
//   linksSpacing: body.linksSpacing,
//   linksHoverColor: body.linksHoverColor,
//   bioFontColor: body.bioFontColor,
//   bioFontSize: body.bioFontSize,
//   bioFontFamily: body.bioFontFamily,
//   socialsIconColor: body.socialsIconColor,
//   socialsIconHoverColor: body.socialsIconHoverColor,
//   socialsSize: body.socialsSize,
//   profileShape: body.profileShape,
//   profileBorderColor: body.profileBorderColor,
//   profileBorderWidth: body.profileBorderWidth,
// };

// // For create (add userId here, must be plain values)
// // const allowedCreate: Prisma.ThemeUncheckedCreateInput = {
// //   ...allowedUpdate,
// //   userId: sessionUser.id,
// // };
// const { id, ...restUpdate } = allowedUpdate;

// const allowedCreate: Prisma.ThemeUncheckedCreateInput = {
//   ...restUpdate,
//   userId: sessionUser.id, // required
// };



//     const select = {
//       id: true,
//       userId: true,
//       viewportType: true,
//       viewportColor: true,
//       viewportImage: true,
//       viewportGradient: true,
//       linksBackground: true,
//       linksFontColor: true,
//       linksBorderRadius: true,
//       linksSpacing: true,
//       linksHoverColor: true,
//       bioFontColor: true,
//       bioFontSize: true,
//       bioFontFamily: true,
//       socialsIconColor: true,
//       socialsIconHoverColor: true,
//       socialsSize: true,
//       profileShape: true,
//       profileBorderColor: true,
//       profileBorderWidth: true,
//       createdAt: true,  
//       updatedAt: true,
//     } as const;

//     const existing = await db.theme.findFirst({ where: { userId: sessionUser.id }, select: { id: true } });
//     const theme = existing
//       ? await db.theme.update({ where: { id: existing.id }, data: allowedUpdate, select })
//       : await db.theme.create({ data: allowedCreate, select });

//     return NextResponse.json(theme);
//   } catch (e: unknown) {
//     const msg = e instanceof Error ?e.message : "Internal Server Error";
//     if (msg === "Unauthorized" || msg === "User not found") {
//       return NextResponse.json({ error: msg }, { status: 401 });
//     }
//     return NextResponse.json({ error: msg }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import type { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

// SELECT fields (shared for GET and POST)
const themeSelect = {
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

// GET current user's theme (create default if none)
export async function GET() {
  try {
    const sessionUser = await requireUser();
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let theme = await db.theme.findFirst({
      where: { userId: sessionUser.id },
      select: themeSelect,
    });

    if (!theme) {
      theme = await db.theme.create({
        data: {
          userId: sessionUser.id,
          viewportType: "color",
          viewportColor: "#ffffff",
          linksBackground: "#111827",
          linksFontColor: "#ffffff",
          linksBorderRadius: 12,
          linksSpacing: 12,
          socialsIconColor: "#111111",
          socialsIconHoverColor: "#000000",
          socialsSize: 18,
          bioFontColor: "#111111",
          bioFontSize: 16,
          profileShape: "circle",
        },
        select: themeSelect,
      });
    }

    return NextResponse.json(theme);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Internal Server Error";
    const status = msg === "Unauthorized" || msg === "User not found" ? 401 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}

// POST to upsert the current user's theme
export async function POST(req: NextRequest) {
  try {
    const sessionUser = await requireUser();
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Allowed fields for update (raw values only, no operations)
    const allowedUpdate: Prisma.ThemeUpdateInput = {
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
    };

    // Create: must be raw values
    const allowedCreate: Prisma.ThemeCreateInput = {
      user: { connect: { id: sessionUser.id } },
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
    };

    const existing = await db.theme.findFirst({
      where: { userId: sessionUser.id },
      select: { id: true },
    });

    const theme = existing
      ? await db.theme.update({
          where: { id: existing.id },
          data: allowedUpdate,
          select: themeSelect,
        })
      : await db.theme.create({
          data: allowedCreate,
          select: themeSelect,
        });

    return NextResponse.json(theme);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Internal Server Error";
    const status = msg === "Unauthorized" || msg === "User not found" ? 401 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
