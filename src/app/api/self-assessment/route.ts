import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET — the user's self-assessments.
export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ assessments: {} });
  }

  const rows = await db.selfAssessment.findMany({
    where: { userId },
  });

  const assessments: Record<string, number> = {};
  for (const r of rows) {
    assessments[r.behaviorId] = r.rating;
  }

  return NextResponse.json({ assessments });
}

// POST — save the full self-assessment.
// Body: { ratings: { behaviorId: rating } }
export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "No session." }, { status: 401 });
  }

  const body = await req.json();
  const { ratings } = body as { ratings: Record<string, number> };

  if (!ratings) {
    return NextResponse.json({ error: "No ratings provided." }, { status: 400 });
  }

  // Wipe prior self-assessments and write fresh.
  await db.selfAssessment.deleteMany({ where: { userId } });

  const entries = Object.entries(ratings).filter(
    ([, v]) => typeof v === "number" && v >= 1 && v <= 5
  );

  if (entries.length === 0) {
    return NextResponse.json({ error: "No valid ratings." }, { status: 400 });
  }

  await db.selfAssessment.createMany({
    data: entries.map(([behaviorId, rating]) => ({
      userId,
      behaviorId,
      rating,
    })),
  });

  return NextResponse.json({ ok: true, count: entries.length });
}
