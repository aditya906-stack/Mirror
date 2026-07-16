import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// The feedback provider flow.
//
// A provider arrives via a confidential link: /?feedback=TOKEN
// They never see who else was invited. They never see the user's
// self-assessment. They see TWO sets of questions:
//   1. The behavioral questions (same ones the user self-assessed on)
//   2. A CHARACTER instrument — 12 friend-only questions designed to
//      reveal the subject's character pattern. The subject never sees
//      these and never answers them. Only friends do.
//
// Confidential, not anonymous: the circle is recorded with each response,
// but the individual provider's identity is hidden from the subject
// in the final report (only aggregate circle data is shown).

// GET — resolve the invitation and return the questions to answer.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing token." }, { status: 400 });
  }

  const invitation = await db.invitation.findUnique({
    where: { token },
    include: {
      user: true,
    },
  });

  if (!invitation) {
    return NextResponse.json(
      { error: "This invitation is no longer valid." },
      { status: 404 }
    );
  }

  // The behaviors this person will be assessed on.
  const selected = await db.userBehavior.findMany({
    where: { userId: invitation.userId },
    include: { behavior: true },
    orderBy: { behavior: { category: "asc" } },
  });

  // If already completed, return the prior state so the provider
  // sees a respectful "thank you" rather than the form again.
  const priorFeedback = await db.feedback.findMany({
    where: { invitationId: invitation.id },
  });

  const priorRatings: Record<string, number> = {};
  for (const f of priorFeedback) {
    priorRatings[f.behaviorId] = f.rating;
  }

  // Prior character responses (if the provider is revisiting).
  const priorCharacter = await db.characterFeedback.findMany({
    where: { invitationId: invitation.id },
  });

  const priorCharacterRatings: Record<string, number> = {};
  for (const c of priorCharacter) {
    priorCharacterRatings[c.questionId] = c.rating;
  }

  return NextResponse.json({
    invitation: {
      token: invitation.token,
      circle: invitation.circle,
      status: invitation.status,
      subjectName: invitation.user.name,
    },
    behaviors: selected.map((s) => ({
      id: s.behavior.id,
      text: s.behavior.text,
      category: s.behavior.category,
      format: s.behavior.format,
      prompt: s.behavior.prompt,
      options: s.behavior.options
        ? (JSON.parse(s.behavior.options) as string[])
        : null,
    })),
    priorRatings,
    priorCharacterRatings,
  });
}

// POST — submit the confidential feedback.
// Body: {
//   token: string,
//   ratings: { behaviorId: rating },          // behavioral questions
//   characterRatings?: { questionId: rating } // character questions (optional but encouraged)
// }
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token, ratings, characterRatings } = body as {
    token?: string;
    ratings?: Record<string, number>;
    characterRatings?: Record<string, number>;
  };

  if (!token || !ratings) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const invitation = await db.invitation.findUnique({
    where: { token },
  });

  if (!invitation) {
    return NextResponse.json(
      { error: "This invitation is no longer valid." },
      { status: 404 }
    );
  }

  // Validate that every rating corresponds to a behavior the subject selected.
  const validBehaviorIds = new Set(
    (
      await db.userBehavior.findMany({
        where: { userId: invitation.userId },
        select: { behaviorId: true },
      })
    ).map((r) => r.behaviorId)
  );

  const entries = Object.entries(ratings).filter(
    ([behaviorId, v]) =>
      validBehaviorIds.has(behaviorId) &&
      typeof v === "number" &&
      v >= 1 &&
      v <= 5
  );

  if (entries.length === 0) {
    return NextResponse.json(
      { error: "No valid ratings were submitted." },
      { status: 400 }
    );
  }

  // Replace any prior feedback from this invitation (allows re-submission).
  await db.feedback.deleteMany({ where: { invitationId: invitation.id } });

  await db.feedback.createMany({
    data: entries.map(([behaviorId, rating]) => ({
      invitationId: invitation.id,
      behaviorId,
      rating,
    })),
  });

  // ── Character responses (the friend-only instrument) ──────
  // These are optional in the payload but strongly encouraged — the
  // report's Behaviour Analysis section depends on them. We store
  // whatever valid responses arrive; missing ones simply don't count.
  if (characterRatings && typeof characterRatings === "object") {
    const validQuestionIds = new Set(
      // Import-safe: the question ids are static strings defined in character.ts.
      // We validate against the known set to prevent junk data.
      [
        "char-accountability",
        "char-humility",
        "char-empathy",
        "char-regulation",
        "char-honesty",
        "char-feedback",
        "char-integrity",
        "char-respect",
        "char-dominance",
        "char-assertiveness",
        "char-intellectual-honesty",
        "char-trustworthiness",
      ]
    );

    const charEntries = Object.entries(characterRatings).filter(
      ([questionId, v]) =>
        validQuestionIds.has(questionId) &&
        typeof v === "number" &&
        v >= 1 &&
        v <= 5
    );

    if (charEntries.length > 0) {
      await db.characterFeedback.deleteMany({
        where: { invitationId: invitation.id },
      });

      await db.characterFeedback.createMany({
        data: charEntries.map(([questionId, rating]) => ({
          invitationId: invitation.id,
          questionId,
          rating,
        })),
      });
    }
  }

  await db.invitation.update({
    where: { id: invitation.id },
    data: { status: "completed", completedAt: new Date() },
  });

  return NextResponse.json({ ok: true, count: entries.length });
}
