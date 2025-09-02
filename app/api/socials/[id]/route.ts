import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
// socials/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Ensure the social belongs to the user
    const existing = await db.social.findUnique({
      where: { id: params.id },
    });
  
    if (!existing || existing.userId !== sessionUser.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  const body = await req.json();
  const updated = await db.social.update({
    where: { id: params.id, userId: sessionUser.id },
    data: body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const sessionUser = await requireUser();
  if (!sessionUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await db.social.findUnique({
    where: { id: params.id },
  });

  if (!existing || existing.userId !== sessionUser.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  
  await db.social.delete({
    where: { id: params.id, userId: sessionUser.id },
  });

  return NextResponse.json({ success: true });
}
