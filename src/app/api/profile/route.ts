import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Create a Mirror profile, or return an existing one by email.
// This is the person who will be reflected.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email } = body as { name?: string; email?: string };

  if (!name || !email) {
    return NextResponse.json(
      { error: "A name and email are required." },
      { status: 400 }
    );
  }

  const existing = await db.user.findUnique({ where: { email } });

  if (existing) {
    const updated = await db.user.update({
      where: { email },
      data: { name },
    });
    return NextResponse.json({ user: updated });
  }

  const user = await db.user.create({
    data: { name, email },
  });

  return NextResponse.json({ user });
}

// Fetch a profile by id (used to restore a session).
export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ user: null });
  }
  const user = await db.user.findUnique({ where: { id: userId } });
  return NextResponse.json({ user });
}
