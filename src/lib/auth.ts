// Mirror — authentication primitives.
//
// Password hashing: Node built-in scrypt (no external deps, production-safe).
// Session: an httpOnly cookie carrying an HMAC-signed userId token.
//
// The cookie is the single source of truth for API auth. The client also
// keeps a lightweight localStorage copy of {id, username, name} for display
// and view-routing — but that is never trusted by the server.

import { scryptSync, randomBytes, timingSafeEqual, createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "./db";

const COOKIE_NAME = "mirror:session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// The signing secret. In production this MUST be set via env var.
const SECRET =
  process.env.SESSION_SECRET ||
  // A stable dev-only fallback so local work doesn't break without env.
  "mirror-dev-secret-please-set-SESSION_SECRET-in-production";

// ── Password hashing ────────────────────────────────────────

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuf = Buffer.from(hash, "hex");
  const testBuf = scryptSync(password, salt, 64);
  return (
    hashBuf.length === testBuf.length && timingSafeEqual(hashBuf, testBuf)
  );
}

// ── Session token (signed userId) ───────────────────────────

function sign(userId: string): string {
  const sig = createHmac("sha256", SECRET).update(userId).digest("hex");
  return `${userId}.${sig}`;
}

function verify(token: string | null | undefined): string | null {
  if (!token) return null;
  const sep = token.lastIndexOf(".");
  if (sep === -1) return null;
  const userId = token.slice(0, sep);
  const sig = token.slice(sep + 1);
  if (!userId || !sig) return null;
  const expected = createHmac("sha256", SECRET).update(userId).digest("hex");
  try {
    if (
      sig.length === expected.length &&
      timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
    ) {
      return userId;
    }
  } catch {
    // malformed — treat as invalid
  }
  return null;
}

// ── Cookie helpers ──────────────────────────────────────────

export function setSessionCookie(res: NextResponse, userId: string) {
  res.cookies.set({
    name: COOKIE_NAME,
    value: sign(userId),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

// ── Server-side session reader ──────────────────────────────
//
// Used by every protected API route in place of the old x-user-id header.
// Returns the user record, or null if there is no valid session.

export type SessionUser = {
  id: string;
  username: string;
  name: string;
};

export async function getSessionUser(
  req: NextRequest
): Promise<SessionUser | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const userId = verify(token);
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, name: true },
  });
  return user;
}

// Require a session. Returns the user, or a 401 NextResponse.
// Usage:  const [user, res] = await requireSession(req); if (res) return res;
export async function requireSession(
  req: NextRequest
): Promise<[SessionUser, null] | [null, NextResponse]> {
  const user = await getSessionUser(req);
  if (!user) {
    return [null, NextResponse.json({ error: "No session." }, { status: 401 })];
  }
  return [user, null];
}
