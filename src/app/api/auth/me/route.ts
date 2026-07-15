import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

// Return the currently-authenticated user, or null.
// The client calls this on mount to restore the session from the httpOnly cookie.
export async function GET(req: NextRequest) {
  const user = await getSessionUser(req);
  return NextResponse.json({ user });
}
