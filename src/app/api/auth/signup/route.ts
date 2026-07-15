import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, setSessionCookie } from "@/lib/auth";

// Create a new Mirror account.
// Body: { username, password, name }
// The username is for login. The name is what circles see on invitations.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password, name } = body as {
    username?: string;
    password?: string;
    name?: string;
  };

  const u = (username ?? "").trim();
  const p = password ?? "";
  const n = (name ?? "").trim();

  if (!u || !p || !n) {
    return NextResponse.json(
      { error: "A username, password, and name are required." },
      { status: 400 }
    );
  }
  if (u.length < 3) {
    return NextResponse.json(
      { error: "Username must be at least 3 characters." },
      { status: 400 }
    );
  }
  if (p.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters." },
      { status: 400 }
    );
  }

  const taken = await db.user.findUnique({ where: { username: u } });
  if (taken) {
    return NextResponse.json(
      { error: "That username is already taken." },
      { status: 409 }
    );
  }

  const user = await db.user.create({
    data: { username: u, passwordHash: hashPassword(p), name: n },
    select: { id: true, username: true, name: true },
  });

  const res = NextResponse.json({ user });
  setSessionCookie(res, user.id);
  return res;
}
