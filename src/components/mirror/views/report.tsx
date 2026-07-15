"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useMirror } from "@/lib/store";
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

type Report = {
  subject: { name: string };
  behaviors: BehaviorRow[];
  circles: { circle: string; invited: number; completed: number }[];
  totalProviders: number;
  completedProviders: number;
  behaviorCount: number;
  hasSelfAssessment: boolean;
  hasAnyFeedback: boolean;
};

export function ReportView() {
  const { setView } = useMirror();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<Report>("/api/report");
        setReport(res);
      } catch {
        toast.error("Could not load your report.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <p className="font-display text-2xl text-ink-faint">
          Preparing your reflection…
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
  } = report;

  // Compute the largest gap for the headline stat.
  const gapsWithMag = behaviors
    .filter((b) => b.gap !== null)
    .map((b) => ({ id: b.id, mag: Math.abs(b.gap!) }));
  const largestGap = gapsWithMag.reduce(
    (max, g) => (g.mag > max ? g.mag : max),
    0
  );

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      {/* Report header */}
      <div className="mb-16 border-b border-line pb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          The Mirror Report
        </span>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-6xl sm:leading-[1.05]">
          {subject.name}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          {behaviorCount > 0 && (
            <>
              {behaviorCount} {behaviorCount === 1 ? "behavior" : "behaviors"}{" "}
              reflected
            </>
          )}
          {hasAnyFeedback && (
            <>
              {" · "}observed by {completedProviders}{" "}
              {completedProviders === 1 ? "person" : "people"} across{" "}
              {circles.length} {circles.length === 1 ? "circle" : "circles"}
            </>
          )}
          .
        </p>

        {/* Summary stats */}
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
          <Stat label="Behaviors" value={String(behaviorCount)} />
          <Stat
            label="Observers"
            value={`${completedProviders}/${totalProviders}`}
          />
          <Stat label="Circles" value={String(circles.length)} />
          <Stat
            label="Largest gap"
            value={largestGap > 0 ? largestGap.toFixed(1) : "—"}
          />
        </div>
      </div>

      {/* Empty states */}
      {!hasSelfAssessment && (
        <div className="border border-line bg-surface p-8 text-center">
          <p className="font-display text-xl text-ink">
            You haven’t rated yourself yet.
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Complete your self-assessment to begin the reflection.
          </p>
          <button
            onClick={() => setView("self")}
            className="mt-6 rounded-sm bg-ink px-6 py-3 text-paper font-display transition-colors hover:bg-ink/90"
          >
            Rate yourself
          </button>
        </div>
      )}

      {hasSelfAssessment && !hasAnyFeedback && (
        <div className="border border-line bg-surface p-8 text-center">
          <p className="font-display text-xl text-ink">
            Your circles have not yet responded.
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Your self-perception is recorded. Once your circles return their
            observations, the gaps will appear here.
          </p>
          <button
            onClick={() => setView("invite")}
            className="mt-6 rounded-sm bg-ink px-6 py-3 text-paper font-display transition-colors hover:bg-ink/90"
          >
            Manage invitations
          </button>

          {/* Show self-perception only, as a preview */}
          {behaviors.length > 0 && (
            <div className="mt-12 text-left">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                Your self-perception — awaiting external reality
              </p>
              <ul className="space-y-4">
                {behaviors.map((b) => (
                  <li
                    key={b.id}
                    className="flex items-center justify-between gap-4 border-b border-line-soft pb-3"
                  >
                    <span className="font-display text-sm text-ink-soft">
                      {b.text}
                    </span>
                    <span className="font-display text-base text-ink">
                      {b.selfRating !== null
                        ? `${b.selfRating} · ${ratingLabel(b.selfRating)}`
                        : "—"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* The report itself — gaps */}
      {hasSelfAssessment && hasAnyFeedback && (
        <div className="space-y-16">
          {/* Intro line */}
          <p className="font-display text-lg italic leading-relaxed text-ink-soft">
            Below, each behavior is shown with the distance between how you
            rated yourself and how your circles observed you. The largest
            distances come first.
          </p>

          {behaviors.map((b, idx) => (
            <BehaviorReport key={b.id} behavior={b} index={idx} />
          ))}

          {/* Circle breakdown summary */}
          <section className="border-t border-line pt-10">
            <h2 className="mb-6 font-display text-xl text-ink">
              By circle
            </h2>
            <ul className="divide-y divide-line-soft">
              {circles.map((c) => (
                <li
                  key={c.circle}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <p className="font-display text-base text-ink">{c.circle}</p>
                    <p className="text-[11px] uppercase tracking-wider text-ink-faint">
                      {c.completed} of {c.invited} responded
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Closing note */}
          <section className="border-t border-line pt-10">
            <p className="font-display text-lg italic leading-relaxed text-ink-soft">
              This is what was observed. The mirror does not say what it means,
              or what you should do. That is yours to sit with.
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
            ← Invitations
          </button>
          <button
            onClick={() => {
              setReport(null);
              setLoading(true);
              setTimeout(() => setLoading(false), 50);
            }}
            className="text-[11px] uppercase tracking-widest text-ink-soft hover:text-ink transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-paper p-4 sm:p-5">
      <p className="text-[10px] uppercase tracking-widest text-ink-faint">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl text-ink sm:text-3xl">{value}</p>
    </div>
  );
}

function BehaviorReport({
  behavior,
  index,
}: {
  behavior: BehaviorRow;
  index: number;
}) {
  const { selfRating, externalAverage, gap, circles, text, category } =
    behavior;

  const direction =
    gap === null
      ? null
      : gap > 0
      ? "Observed more than you perceive"
      : gap < 0
      ? "Observed less than you perceive"
      : "Aligned with your self-perception";

  return (
    <article className="border-b border-line-soft pb-12">
      <div className="mb-6 flex items-baseline gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[11px] uppercase tracking-widest text-ink-faint">
          {category}
        </span>
      </div>

      <h3 className="mb-8 font-display text-2xl leading-snug text-ink sm:text-3xl">
        {text}
      </h3>

      {/* The gap numbers — prominent */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-ink-faint">
            Self
          </p>
          <p className="mt-1 font-display text-3xl text-ink sm:text-4xl">
            {selfRating !== null ? selfRating.toFixed(1) : "—"}
          </p>
          {selfRating !== null && (
            <p className="mt-1 text-[11px] text-ink-soft">
              {ratingLabel(selfRating)}
            </p>
          )}
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-ink-faint">
            Observed
          </p>
          <p className="mt-1 font-display text-3xl text-ink sm:text-4xl">
            {externalAverage !== null ? externalAverage.toFixed(1) : "—"}
          </p>
          {externalAverage !== null && (
            <p className="mt-1 text-[11px] text-ink-soft">
              {ratingLabel(externalAverage)} · {behavior.externalCount}{" "}
              {behavior.externalCount === 1 ? "observer" : "observers"}
            </p>
          )}
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-ink-faint">
            Gap
          </p>
          <p
            className={cn(
              "mt-1 font-display text-3xl sm:text-4xl",
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
          {direction && (
            <p className="mt-1 text-[11px] text-ink-soft">{direction}</p>
          )}
        </div>
      </div>

      {/* The visualization */}
      <GapBar
        selfRating={selfRating}
        externalAverage={externalAverage}
        gap={gap}
      />

      {/* Per-circle breakdown */}
      {circles.length > 0 && (
        <div className="mt-8 border-t border-line-soft pt-4">
          <p className="mb-3 text-[10px] uppercase tracking-widest text-ink-faint">
            By circle
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
