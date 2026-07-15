import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

// Fetch the current profile (used to restore a session on reload).
// Account creation now lives in /api/auth/signup.
export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  if (!user) {
    return NextResponse.json({ user: null });
  }
  const full = await db.user.findUnique({
    where: { id: user.id },
    select: { id: true, username: true, name: true },
  });
  return NextResponse.json({ user: full });
}
