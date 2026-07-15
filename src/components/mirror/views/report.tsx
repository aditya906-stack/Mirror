"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useMirror } from "@/lib/store";
import { useI18n, useT } from "@/lib/i18n";
import { getInsight, getDirection, type GapDirection } from "@/lib/insights";
import { GapBar } from "../gap-bar";
import { ratingLabel } from "../rating-scale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CircleAgg = { circle: string; average: number; count: number };

type BehaviorRow = {
  id: string;
  text: string;
  category: string;
  selfRating: number | null;
  externalAverage: number | null;
  externalCount: number;
  gap: number | null;
  circles: CircleAgg[];
};

type Summary = {
  overallSelf: number;
  overallExternal: number;
  overallGap: number;
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
};

type BookRec = { title: string; author: string; note: string };

type Report = {
  subject: { name: string };
  behaviors: BehaviorRow[];
  circles: { circle: string; invited: number; completed: number }[];
  totalProviders: number;
  completedProviders: number;
  behaviorCount: number;
  hasSelfAssessment: boolean;
  hasAnyFeedback: boolean;
  summary: Summary | null;
  books: BookRec[];
};

export function ReportView() {
  const { setView } = useMirror();
  const t = useT();
  const { locale } = useI18n();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<Report>("/api/report");
        setReport(res);
      } catch {
        toast.error(t("report.errLoad"));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <p className="font-display text-2xl text-ink-faint">
          {t("report.loading")}
        </p>
      </div>
    );
  }

  if (!report) return null;

  const {
    subject,
    behaviors,
    circles,
    totalProviders,
    completedProviders,
    behaviorCount,
    hasSelfAssessment,
    hasAnyFeedback,
    summary,
    books,
  } = report;

  const totalPaired =
    summary !== null
      ? summary.overestimateCount +
        summary.underestimateCount +
        summary.alignedCount
      : 0;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      {/* ── Report header ────────────────────────────────────── */}
      <div className="mb-16 border-b border-line pb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          {t("report.tag")}
        </span>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-6xl sm:leading-[1.05]">
          {subject.name}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          {hasAnyFeedback
            ? t("report.meta", {
                n: behaviorCount,
                p: completedProviders,
                c: circles.length,
              })
            : behaviorCount > 0
            ? `${behaviorCount} ${t(
                behaviorCount === 1 ? "report.behaviorCount" : "report.behaviorsCount",
                { n: behaviorCount }
              )} reflected.`
            : ""}
        </p>
      </div>

      {/* ── Empty states ─────────────────────────────────────── */}
      {!hasSelfAssessment && (
        <div className="border border-line bg-surface p-8 text-center">
          <p className="font-display text-xl text-ink">
            {t("report.noSelf.h")}
          </p>
          <p className="mt-2 text-sm text-ink-soft">{t("report.noSelf.d")}</p>
          <button
            onClick={() => setView("self")}
            className="mt-6 rounded-sm bg-ink px-6 py-3 text-paper font-display transition-colors hover:bg-ink/90"
          >
            {t("report.noSelf.btn")}
          </button>
        </div>
      )}

      {hasSelfAssessment && !hasAnyFeedback && (
        <div className="border border-line bg-surface p-8 text-center">
          <p className="font-display text-xl text-ink">
            {t("report.noFeedback.h")}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            {t("report.noFeedback.d")}
          </p>
          <button
            onClick={() => setView("invite")}
            className="mt-6 rounded-sm bg-ink px-6 py-3 text-paper font-display transition-colors hover:bg-ink/90"
          >
            {t("report.noFeedback.btn")}
          </button>
        </div>
      )}

      {/* ── The Path B report ────────────────────────────────── */}
      {hasSelfAssessment && hasAnyFeedback && summary && (
        <div className="space-y-20 pb-32">
          {/* 1. The reflection — a consolidated, observable summary */}
          <section>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              {t("report.reflection")}
            </span>
            <ReflectionSummary
              summary={summary}
              totalPaired={totalPaired}
            />
          </section>

          {/* 2. Worth sitting with — behavior-specific insights, never commands */}
          {summary.widestGaps.length > 0 && (
            <section>
              <h2 className="mb-6 font-display text-2xl text-ink">
                {t("report.worthSitting")}
              </h2>
              <ul className="space-y-8">
                {summary.widestGaps.slice(0, 3).map((g) => {
                  const insight = getInsight(
                    g.text,
                    g.selfRating,
                    g.externalAverage,
                    locale
                  );
                  const dir = getDirection(g.selfRating, g.externalAverage);
                  return (
                    <li
                      key={g.id}
                      className="border-l-2 border-ink-faint/40 pl-5"
                    >
                      <p className="font-display text-lg leading-snug text-ink">
                        {g.text}
                      </p>
                      <p className="mt-2 text-[11px] uppercase tracking-wider text-ink-faint">
                        {t("report.selfShort")}: {g.selfRating.toFixed(1)} ·{" "}
                        {t("report.observedShort")}: {g.externalAverage.toFixed(1)} ·{" "}
                        {dir === "higher"
                          ? t("report.direction.overestimate")
                          : dir === "lower"
                          ? t("report.direction.underestimate")
                          : t("report.direction.aligned")}
                      </p>
                      {insight && (
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                          {insight}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* 3. By category — where the distance lives */}
          {summary.categoryGaps.length > 0 && (
            <section>
              <h2 className="mb-6 font-display text-2xl text-ink">
                {t("report.whereDistance")}
              </h2>
              <ul className="space-y-3">
                {summary.categoryGaps.map((cg) => (
                  <li
                    key={cg.category}
                    className="flex items-center gap-4 border-b border-line-soft pb-3"
                  >
                    <span className="flex-1 font-display text-base text-ink">
                      {cg.category}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-ink-faint">
                      {cg.count === 1
                        ? t("report.behaviorCount", { n: cg.count })
                        : t("report.behaviorsCount", { n: cg.count })}
                    </span>
                    <span
                      className={cn(
                        "font-display text-lg tabular-nums",
                        Math.abs(cg.avgGap) < 0.5
                          ? "text-ink-soft"
                          : "text-ink"
                      )}
                    >
                      {cg.avgGap > 0 ? "+" : ""}
                      {cg.avgGap.toFixed(1)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] leading-relaxed text-ink-faint">
                {t("report.categoryNote")}
              </p>
            </section>
          )}

          {/* 4. The full reflection — expandable question-by-question detail */}
          <section className="border-t border-line pt-10">
            {!showFull ? (
              <button
                onClick={() => setShowFull(true)}
                className="group flex w-full items-center justify-between text-left"
              >
                <div>
                  <p className="font-display text-2xl text-ink">
                    {t("report.seeFull")}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {t("report.seeFullD", { n: behaviors.length })}
                  </p>
                </div>
                <span className="ml-6 font-display text-2xl text-ink-faint transition-transform group-hover:translate-y-0.5">
                  +
                </span>
              </button>
            ) : (
              <div>
                <button
                  onClick={() => setShowFull(false)}
                  className="mb-10 flex w-full items-center justify-between text-left"
                >
                  <p className="font-display text-2xl text-ink">
                    {t("report.fullReflection")}
                  </p>
                  <span className="ml-6 font-display text-2xl text-ink-faint">
                    −
                  </span>
                </button>
                <p className="mb-12 font-display text-lg italic leading-relaxed text-ink-soft">
                  {t("report.fullIntro")}
                </p>
                <div className="space-y-12">
                  {behaviors.map((b, idx) => (
                    <BehaviorReport key={b.id} behavior={b} index={idx} locale={locale} />
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 5. By circle */}
          <section className="border-t border-line pt-10">
            <h2 className="mb-6 font-display text-2xl text-ink">
              {t("report.byCircle")}
            </h2>
            <ul className="divide-y divide-line-soft">
              {circles.map((c) => (
                <li
                  key={c.circle}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <p className="font-display text-base text-ink">
                      {c.circle}
                    </p>
                    <p className="text-[11px] uppercase tracking-wider text-ink-faint">
                      {t("report.responded", {
                        completed: c.completed,
                        invited: c.invited,
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. Book recommendations — LAST, static-mapped, non-prescriptive */}
          {books.length > 0 && (
            <section className="border-t border-line pt-10">
              <h2 className="mb-4 font-display text-2xl leading-snug text-ink">
                {t("report.books.h")}
                <br className="hidden sm:block" />
                <span className="text-ink-soft">{t("report.books.h2")}</span>
              </h2>
              <ul className="mt-6 space-y-5">
                {books.map((book) => (
                  <li
                    key={book.title}
                    className="border border-line bg-surface px-5 py-5"
                  >
                    <p className="font-display text-lg text-ink">
                      {book.title}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-widest text-ink-faint">
                      {book.author}
                    </p>
                    <p className="mt-2 text-sm italic leading-relaxed text-ink-soft">
                      {book.note}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] leading-relaxed text-ink-faint">
                {t("report.booksNote")}
              </p>
            </section>
          )}

          {/* 7. Closing note */}
          <section className="border-t border-line pt-10">
            <p className="font-display text-lg italic leading-relaxed text-ink-soft">
              {t("report.closing")}
            </p>
          </section>
        </div>
      )}

      <div className="sticky bottom-0 -mx-5 mt-16 border-t border-line bg-paper/90 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <button
            onClick={() => setView("invite")}
            className="text-[11px] uppercase tracking-widest text-ink-faint hover:text-ink-soft transition-colors"
          >
            {t("report.invitations")}
          </button>
          <button
            onClick={() => {
              setReport(null);
              setLoading(true);
              setTimeout(() => setLoading(false), 50);
            }}
            className="text-[11px] uppercase tracking-widest text-ink-soft hover:text-ink transition-colors"
          >
            {t("report.refresh")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── The consolidated summary ────────────────────────────────
// Observable patterns, not labels. Reads like a paragraph a
// trusted friend might write — not a diagnosis.
function ReflectionSummary({
  summary,
  totalPaired,
}: {
  summary: Summary;
  totalPaired: number;
}) {
  const t = useT();
  const {
    overallSelf,
    overallExternal,
    overallGap,
    direction,
    overestimateCount,
    underestimateCount,
    alignedCount,
    widestGaps,
  } = summary;

  const selfLabel = ratingLabel(overallSelf);
  const extLabel = ratingLabel(overallExternal);

  return (
    <div className="mt-6">
      {/* The two numbers, side by side */}
      <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line">
        <div className="bg-paper p-5 sm:p-6">
          <p className="text-[10px] uppercase tracking-widest text-ink-faint">
            {t("report.selfAvg")}
          </p>
          <p className="mt-2 font-display text-4xl text-ink sm:text-5xl">
            {overallSelf.toFixed(1)}
          </p>
          <p className="mt-1 text-[11px] text-ink-soft">
            {selfLabel} · {t("report.onAverage")}
          </p>
        </div>
        <div className="bg-paper p-5 sm:p-6">
          <p className="text-[10px] uppercase tracking-widest text-ink-faint">
            {t("report.extAvg")}
          </p>
          <p className="mt-2 font-display text-4xl text-ink sm:text-5xl">
            {overallExternal.toFixed(1)}
          </p>
          <p className="mt-1 text-[11px] text-ink-soft">
            {extLabel} · {t("report.onAverage")}
          </p>
        </div>
      </div>

      {/* The narrative */}
      <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
        {direction === "aligned" && (
          <p>
            {t("report.dirAligned", {
              gap: Math.abs(overallGap).toFixed(1),
              aligned: alignedCount,
              total: totalPaired,
            })}
          </p>
        )}
        {direction === "higher" && (
          <p>
            {t("report.dirHigher", {
              gap: Math.abs(overallGap).toFixed(1),
              count: overestimateCount,
            })}
          </p>
        )}
        {direction === "lower" && (
          <p>
            {t("report.dirLower", {
              gap: Math.abs(overallGap).toFixed(1),
              count: underestimateCount,
            })}
          </p>
        )}

        {widestGaps.length > 0 && (
          <p>
            {t("report.widest", {
              behavior: widestGaps[0].text.toLowerCase(),
              self: widestGaps[0].selfRating.toFixed(1),
              ext: widestGaps[0].externalAverage.toFixed(1),
            })}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Per-behavior detail (shown when "full reflection" is expanded) ─
function BehaviorReport({
  behavior,
  index,
  locale,
}: {
  behavior: BehaviorRow;
  index: number;
  locale: "en" | "hinglish";
}) {
  const t = useT();
  const { selfRating, externalAverage, gap, circles, text, category } =
    behavior;

  const insight =
    selfRating !== null && externalAverage !== null
      ? getInsight(text, selfRating, externalAverage, locale)
      : null;
  const dir =
    selfRating !== null && externalAverage !== null
      ? getDirection(selfRating, externalAverage)
      : null;

  return (
    <article className="border-b border-line-soft pb-10">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[11px] uppercase tracking-widest text-ink-faint">
          {category}
        </span>
      </div>

      <h3 className="mb-6 font-display text-xl leading-snug text-ink sm:text-2xl">
        {text}
      </h3>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-ink-faint">
            {t("report.detail.self")}
          </p>
          <p className="mt-1 font-display text-2xl text-ink sm:text-3xl">
            {selfRating !== null ? selfRating.toFixed(1) : "—"}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-ink-faint">
            {t("report.detail.observed")}
          </p>
          <p className="mt-1 font-display text-2xl text-ink sm:text-3xl">
            {externalAverage !== null ? externalAverage.toFixed(1) : "—"}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-ink-faint">
            {t("report.detail.gap")}
          </p>
          <p
            className={cn(
              "mt-1 font-display text-2xl sm:text-3xl",
              gap === null
                ? "text-ink-faint"
                : Math.abs(gap) < 0.5
                ? "text-ink-soft"
                : "text-ink"
            )}
          >
            {gap !== null
              ? `${gap > 0 ? "+" : ""}${gap.toFixed(1)}`
              : "—"}
          </p>
        </div>
      </div>

      <GapBar
        selfRating={selfRating}
        externalAverage={externalAverage}
        gap={gap}
      />

      {/* Behavior-specific insight — the psychological reflection */}
      {insight && dir && (
        <div className="mt-6 border-t border-line-soft pt-4">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-ink-faint">
            {dir === "higher"
              ? t("report.direction.overestimate")
              : dir === "lower"
              ? t("report.direction.underestimate")
              : t("report.direction.aligned")}
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            {insight}
          </p>
        </div>
      )}

      {circles.length > 0 && (
        <div className="mt-6 border-t border-line-soft pt-3">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-ink-faint">
            {t("report.detail.byCircle")}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {circles.map((c) => (
              <li
                key={c.circle}
                className="flex items-baseline gap-2 text-sm"
              >
                <span className="text-ink-soft">{c.circle}</span>
                <span className="font-display text-base text-ink">
                  {c.average.toFixed(1)}
                </span>
                <span className="text-[10px] text-ink-faint">
                  ({c.count})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
