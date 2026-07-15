import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

// THE REPORT.
//
// This is the soul of Mirror. It computes the gap between
// self-perception and external reality — per behavior, per circle.
//
// We never reveal which individual said what. We only show
// aggregate circle data. Confidential, not anonymous.
//
// We never judge the gap. A gap of 2.4 is not "bad."
// A gap of 0.2 is not "good." They are distances. The mirror
// reflects; the human interprets.

export async function GET(req: NextRequest) {
  const sessionUser = await getSessionUser(req);
  if (!sessionUser) {
    return NextResponse.json({ error: "No session." }, { status: 401 });
  }
  const userId = sessionUser.id;

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const [selected, selfAssessments, invitations] = await Promise.all([
    db.userBehavior.findMany({
      where: { userId },
      include: { behavior: true },
      orderBy: { behavior: { category: "asc" } },
    }),
    db.selfAssessment.findMany({ where: { userId } }),
    db.invitation.findMany({
      where: { userId },
      include: { feedback: true },
    }),
  ]);

  // Build a lookup of self-ratings.
  const selfMap = new Map<string, number>();
  for (const s of selfAssessments) {
    selfMap.set(s.behaviorId, s.rating);
  }

  // Build per-circle, per-beavior aggregates from all feedback.
  // circle -> behaviorId -> [ratings]
  const circleBehaviorRatings = new Map<
    string,
    Map<string, number[]>
  >();

  for (const inv of invitations) {
    if (inv.status !== "completed") continue;
    if (!circleBehaviorRatings.has(inv.circle)) {
      circleBehaviorRatings.set(inv.circle, new Map());
    }
    const circleMap = circleBehaviorRatings.get(inv.circle)!;
    for (const f of inv.feedback) {
      if (!circleMap.has(f.behaviorId)) {
        circleMap.set(f.behaviorId, []);
      }
      circleMap.get(f.behaviorId)!.push(f.rating);
    }
  }

  // Circle-level provider counts.
  const circlesMeta: {
    circle: string;
    invited: number;
    completed: number;
  }[] = [];
  const circleNames = new Set(invitations.map((i) => i.circle));
  for (const c of circleNames) {
    const invited = invitations.filter((i) => i.circle === c).length;
    const completed = invitations.filter(
      (i) => i.circle === c && i.status === "completed"
    ).length;
    circlesMeta.push({ circle: c, invited, completed });
  }

  // Per-behavior report rows.
  const behaviors = selected.map((s) => {
    const selfRating = selfMap.get(s.behavior.id) ?? null;

    // Collect per-circle aggregates for this behavior.
    const perCircle: {
      circle: string;
      average: number;
      count: number;
    }[] = [];
    const allRatings: number[] = [];

    for (const [circle, cmap] of circleBehaviorRatings) {
      const ratings = cmap.get(s.behavior.id);
      if (ratings && ratings.length > 0) {
        const sum = ratings.reduce((a, b) => a + b, 0);
        perCircle.push({
          circle,
          average: Math.round((sum / ratings.length) * 10) / 10,
          count: ratings.length,
        });
        allRatings.push(...ratings);
      }
    }

    perCircle.sort((a, b) => a.circle.localeCompare(b.circle));

    const externalCount = allRatings.length;
    const externalAverage =
      externalCount > 0
        ? Math.round(
            (allRatings.reduce((a, b) => a + b, 0) / externalCount) * 10
          ) / 10
        : null;

    const gap =
      selfRating !== null && externalAverage !== null
        ? Math.round((externalAverage - selfRating) * 10) / 10
        : null;

    return {
      id: s.behavior.id,
      text: s.behavior.text,
      category: s.behavior.category,
      selfRating,
      externalAverage,
      externalCount,
      gap,
      circles: perCircle,
    };
  });

  // Sort behaviors: those with the largest absolute gap first.
  // This is not a judgment — it simply surfaces where self-perception
  // and external reality diverge most. The mirror shows the biggest
  // distances first.
  behaviors.sort((a, b) => {
    const aMag = a.gap === null ? -1 : Math.abs(a.gap);
    const bMag = b.gap === null ? -1 : Math.abs(b.gap);
    return bMag - aMag;
  });

  const totalProviders = invitations.length;
  const completedProviders = invitations.filter(
    (i) => i.status === "completed"
  ).length;

  return NextResponse.json({
    subject: { name: user.name },
    behaviors,
    circles: circlesMeta,
    totalProviders,
    completedProviders,
    behaviorCount: selected.length,
    hasSelfAssessment: selfAssessments.length > 0,
    hasAnyFeedback: completedProviders > 0,
  });
}
