import { NextRequest,NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
// socials/:id

// interface RouteContext {
//   params: { id: string };
// }


export async function PUT(
  req: NextRequest,
  context:unknown
) {
  const { id } = (context as { params: { id: string } }).params;
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Ensure the social belongs to the user
    const existing = await db.social.findUnique({
      where: { id},
    });
  
    if (!existing || existing.userId !== sessionUser.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  const body = await req.json();
  const updated = await db.social.update({
    where: { id, userId: sessionUser.id },
    data: body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  context:unknown
) {
  const { id } = (context as { params: { id: string } }).params;
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await db.social.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== sessionUser.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  
  await db.social.delete({
    where: { id, userId: sessionUser.id },
  });

  return NextResponse.json({ success: true });
}
