import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import {
  scoreArchetype,
  getArchetype,
  type ArchetypeKey,
} from "@/lib/character";

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
//
// The response carries:
//   - behaviors:  per-behavior rows (self, observed, gap, circles)
//   - summary:    consolidated aggregates for the Path B report
//   - books:      static-mapped recommendations from gap patterns
//   - circles:    per-circle provider counts

type BookRec = {
  title: string;
  author: string;
  note: string;
};

const BOOKS: Record<string, BookRec> = {
  Communication: {
    title: "Crucial Conversations",
    author: "Patterson, Grenny, McMillan, Switzler",
    note: "on speaking honestly when the stakes are high",
  },
  "Emotional Presence": {
    title: "Atlas of the Heart",
    author: "Brené Brown",
    note: "on naming what you feel and letting others see it",
  },
  Leadership: {
    title: "Dare to Lead",
    author: "Brené Brown",
    note: "on being seen while you lead",
  },
  Relational: {
    title: "Hold Me Tight",
    author: "Sue Johnson",
    note: "on the patterns that live between people",
  },
  Reliability: {
    title: "Atomic Habits",
    author: "James Clear",
    note: "on doing what you said you would, reliably",
  },
  overestimate: {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    note: "on the quiet blind spots in self-assessment",
  },
  underestimate: {
    title: "The Gifts of Imperfection",
    author: "Brené Brown",
    note: "on letting yourself be seen, as you are",
  },
  aligned: {
    title: "Quiet",
    author: "Susan Cain",
    note: "on the dignity of being accurately known",
  },
  // ── Psychology classics (always relevant to self-reflection) ──
  kahneman: {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    note: "on the two systems that drive how you think — and where they quietly mislead you",
  },
  cialdini: {
    title: "Influence",
    author: "Robert Cialdini",
    note: "on the invisible levers that move people — including you",
  },
  haidt: {
    title: "The Righteous Mind",
    author: "Jonathan Haidt",
    note: "on why good people disagree, and the intuition that runs ahead of reason",
  },
  tavris: {
    title: "Mistakes Were Made (But Not by Me)",
    author: "Carol Tavris & Elliot Aronson",
    note: "on self-justification — the quiet machinery that protects the self from its own gaps",
  },
  yalom: {
    title: "The Gift of Therapy",
    author: "Irvin Yalom",
    note: "on what it means to sit with another person, honestly",
  },
  greene: {
    title: "The Laws of Human Nature",
    author: "Robert Greene",
    note: "on the patterns beneath what people do — read critically, verify with research",
  },
};

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
      include: { feedback: true, characterFeedback: true },
    }),
  ]);

  // Build a lookup of self-ratings.
  const selfMap = new Map<string, number>();
  for (const s of selfAssessments) {
    selfMap.set(s.behaviorId, s.rating);
  }

  // Build per-circle, per-behavior aggregates from all feedback.
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
  behaviors.sort((a, b) => {
    const aMag = a.gap === null ? -1 : Math.abs(a.gap);
    const bMag = b.gap === null ? -1 : Math.abs(b.gap);
    return bMag - aMag;
  });

  const totalProviders = invitations.length;
  const completedProviders = invitations.filter(
    (i) => i.status === "completed"
  ).length;

  // ── Summary aggregates for the Path B report ───────────────
  // Only behaviors where BOTH self and external exist contribute.
  const paired = behaviors.filter(
    (b) => b.selfRating !== null && b.externalAverage !== null && b.gap !== null
  ) as (typeof behaviors[number] & {
    selfRating: number;
    externalAverage: number;
    gap: number;
  })[];

  let summary: {
    overallSelf: number | null;
    overallExternal: number | null;
    overallGap: number | null;
    direction: "higher" | "lower" | "aligned";
    overestimateCount: number;
    underestimateCount: number;
    alignedCount: number;
    categoryGaps: { category: string; avgGap: number; count: number }[];
    widestGaps: {
      id: string;
      text: string;
      category: string;
      selfRating: number;
      externalAverage: number;
      gap: number;
    }[];
  } | null = null;

  let books: BookRec[] = [];

  if (paired.length > 0) {
    const overallSelf =
      Math.round(
        (paired.reduce((a, b) => a + b.selfRating, 0) / paired.length) * 10
      ) / 10;
    const overallExternal =
      Math.round(
        (paired.reduce((a, b) => a + b.externalAverage, 0) / paired.length) *
          10
      ) / 10;
    const overallGap = Math.round((overallExternal - overallSelf) * 10) / 10;

    const overestimateCount = paired.filter((b) => b.gap < -0.5).length;
    const underestimateCount = paired.filter((b) => b.gap > 0.5).length;
    const alignedCount = paired.filter((b) => Math.abs(b.gap) < 0.5).length;

    const direction: "higher" | "lower" | "aligned" =
      overallGap > 0.5
        ? "lower" // external sees higher → you underestimate yourself
        : overallGap < -0.5
        ? "higher" // external sees lower → you overestimate yourself
        : "aligned";

    // Per-category average gap (sorted by magnitude, widest first).
    const catMap = new Map<string, number[]>();
    for (const b of paired) {
      if (!catMap.has(b.category)) catMap.set(b.category, []);
      catMap.get(b.category)!.push(b.gap);
    }
    const categoryGaps = Array.from(catMap.entries())
      .map(([category, gaps]) => ({
        category,
        avgGap:
          Math.round(
            (gaps.reduce((a, c) => a + c, 0) / gaps.length) * 10
          ) / 10,
        count: gaps.length,
      }))
      .sort((a, b) => Math.abs(b.avgGap) - Math.abs(a.avgGap));

    // Widest gaps (top 3 by magnitude).
    const widestGaps = [...paired]
      .sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap))
      .slice(0, 3)
      .map((b) => ({
        id: b.id,
        text: b.text,
        category: b.category,
        selfRating: b.selfRating,
        externalAverage: b.externalAverage,
        gap: b.gap,
      }));

    summary = {
      overallSelf,
      overallExternal,
      overallGap,
      direction,
      overestimateCount,
      underestimateCount,
      alignedCount,
      categoryGaps: categoryGaps,
      widestGaps,
    };

    // ── Book recommendations (static-mapped from gap patterns) ─
    // Non-prescriptive: framed as "readers whose reflections showed a
    // similar pattern often sat with…" — never "you should read this."
    const picked: BookRec[] = [];
    const seen = new Set<string>();

    // 1. The category with the widest average gap.
    if (categoryGaps.length > 0 && Math.abs(categoryGaps[0].avgGap) >= 0.8) {
      const cat = categoryGaps[0].category;
      if (BOOKS[cat] && !seen.has(cat)) {
        picked.push(BOOKS[cat]);
        seen.add(cat);
      }
    }

    // 2. Overall direction.
    if (direction === "higher" && !seen.has("overestimate")) {
      picked.push(BOOKS.overestimate);
      seen.add("overestimate");
    } else if (direction === "lower" && !seen.has("underestimate")) {
      picked.push(BOOKS.underestimate);
      seen.add("underestimate");
    } else if (direction === "aligned" && !seen.has("aligned")) {
      picked.push(BOOKS.aligned);
      seen.add("aligned");
    }

    // 3. A second category if there's another wide one.
    for (const cg of categoryGaps) {
      if (picked.length >= 3) break;
      if (Math.abs(cg.avgGap) < 0.8) continue;
      if (seen.has(cg.category)) continue;
      if (!BOOKS[cg.category]) continue;
      picked.push(BOOKS[cg.category]);
      seen.add(cg.category);
    }

    // Fallback: if nothing was picked (all aligned), give the aligned book.
    if (picked.length === 0) {
      picked.push(BOOKS.aligned);
    }

    books = picked;
  }

  // ── Psychology classics — always offered as deeper reading ──
  // These six books are the research backbone beneath Mirror. They are
  // not tied to a specific gap; they are for anyone who wants to
  // understand the patterns more deeply. Appended after the gap-based
  // recommendations so the report closes with the wider lens.
  const psychologyClassics: BookRec[] = [
    BOOKS.kahneman,
    BOOKS.cialdini,
    BOOKS.haidt,
    BOOKS.tavris,
    BOOKS.yalom,
    BOOKS.greene,
  ];
  books = [...books, ...psychologyClassics];

  // ── Character analysis (the friend-only instrument) ────────
  // Aggregate all friends' character responses across all completed
  // invitations, then derive the dominant archetype.
  let archetype: {
    key: ArchetypeKey;
    philosopher: string;
    label: string;
    description: string;
    quotes: string[];
    solution: string;
    responderCount: number;
    questionCount: number;
  } | null = null;

  const charResponses: Record<string, number[]> = {};
  let charResponderCount = 0;
  for (const inv of invitations) {
    if (inv.status !== "completed") continue;
    if (inv.characterFeedback.length === 0) continue;
    charResponderCount++;
    for (const cf of inv.characterFeedback) {
      if (!charResponses[cf.questionId]) charResponses[cf.questionId] = [];
      charResponses[cf.questionId].push(cf.rating);
    }
  }

  if (charResponderCount > 0) {
    const result = scoreArchetype(charResponses);
    const a = getArchetype(result.key);
    archetype = {
      key: a.key,
      philosopher: a.philosopher.en,
      label: a.label.en,
      description: a.description.en,
      quotes: a.quotes,
      solution: a.solution.en,
      responderCount: result.responderCount,
      questionCount: result.questionCount,
    };
  }

  return NextResponse.json({
    subject: { name: user.name },
    behaviors,
    circles: circlesMeta,
    totalProviders,
    completedProviders,
    behaviorCount: selected.length,
    hasSelfAssessment: selfAssessments.length > 0,
    hasAnyFeedback: completedProviders > 0,
    hasCharacterData: charResponderCount > 0,
    summary,
    archetype,
    books,
  });
}
