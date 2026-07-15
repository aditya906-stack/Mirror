import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET the behaviors a user has chosen to be assessed on.
export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ selections: [] });
  }

  const selections = await db.userBehavior.findMany({
    where: { userId },
    include: { behavior: true },
  });

  return NextResponse.json({
    selections: selections.map((s) => ({
      id: s.behavior.id,
      text: s.behavior.text,
      category: s.behavior.category,
    })),
  });
}

// POST — set the full set of selected behaviors for a user.
// Body: { behaviorIds: string[] }
// This replaces any prior selection.
export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "No session." }, { status: 401 });
  }

  const body = await req.json();
  const { behaviorIds } = body as { behaviorIds: string[] };

  if (!Array.isArray(behaviorIds) || behaviorIds.length === 0) {
    return NextResponse.json(
      { error: "Select at least one behavior." },
      { status: 400 }
    );
  }

  await db.userBehavior.deleteMany({ where: { userId } });

  await db.userBehavior.createMany({
    data: behaviorIds.map((behaviorId) => ({ userId, behaviorId })),
  });

  return NextResponse.json({ ok: true, count: behaviorIds.length });
}
