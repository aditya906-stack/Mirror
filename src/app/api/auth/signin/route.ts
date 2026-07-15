import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, setSessionCookie } from "@/lib/auth";

// Sign in to an existing Mirror account.
// Body: { username, password }
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body as {
    username?: string;
    password?: string;
  };

  const u = (username ?? "").trim();
  const p = password ?? "";

  if (!u || !p) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 }
    );
  }

  const user = await db.user.findUnique({ where: { username: u } });

  // Always run a verify to reduce timing-attack signal, even if user is null.
  if (!user || !verifyPassword(p, user.passwordHash)) {
    return NextResponse.json(
      { error: "Incorrect username or password." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({
    user: { id: user.id, username: user.username, name: user.name },
  });
  setSessionCookie(res, user.id);
  return res;
}
