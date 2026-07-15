"use client";

import { cn } from "@/lib/utils";
import { ratingLabel } from "./rating-scale";

// THE GAP.
//
// The single most important visual in Mirror.
// A horizontal axis from 1 to 5. Two marks:
//   — Self: a thin vertical stroke (how you see yourself)
//   — External: a filled disc (how your circles experience you)
// The distance between them is the gap. We do not color it.
// We do not judge it. We show the distance and let it sit.
//
// On a short page, this should feel like looking at an actual
// measurement on a ruler. Quiet. Precise. Undeniable.

function pct(v: number) {
  // map 1..5 → 6%..94% (keep marks inside the track with padding)
  return `${6 + ((v - 1) / 4) * 88}%`;
}

export function GapBar({
  selfRating,
  externalAverage,
  gap,
  showAxis = true,
  className,
}: {
  selfRating: number | null;
  externalAverage: number | null;
  gap: number | null;
  showAxis?: boolean;
  className?: string;
}) {
  const hasBoth = selfRating !== null && externalAverage !== null;
  const selfPct = selfRating !== null ? pct(selfRating) : "0%";
  const extPct = externalAverage !== null ? pct(externalAverage) : "0%";

  const left = hasBoth ? Math.min(selfPct, extPct) : "0%";
  const right = hasBoth ? Math.max(selfPct, extPct) : "0%";
  const gapWidth = hasBoth
    ? `calc(${right} - ${left})`
    : "0px";

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-16">
        {/* The axis line */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-line" />

        {/* The gap segment — a heavier stroke between the two marks */}
        {hasBoth && gap !== null && Math.abs(gap) > 0.05 && (
          <div
            className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-ink/70"
            style={{ left, width: gapWidth }}
          />
        )}

        {/* Axis ticks at 1..5 */}
        {showAxis &&
          [1, 2, 3, 4, 5].map((t) => (
            <div
              key={t}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
              style={{ left: pct(t) }}
            >
              <div className="h-1 w-px bg-ink-faint/50" />
              <div className="mt-1 text-[9px] text-ink-faint font-mono -translate-x-1/2">
                {t}
              </div>
            </div>
          ))}

        {/* Self marker — a thin vertical stroke, hollow */}
        {selfRating !== null && (
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{ left: selfPct }}
          >
            <div className="flex flex-col items-center">
              <div className="h-8 w-px bg-ink" />
            </div>
          </div>
        )}

        {/* External marker — a filled disc */}
        {externalAverage !== null && (
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{ left: extPct }}
          >
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-ink ring-4 ring-paper" />
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] text-ink-soft">
        {selfRating !== null && (
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-px bg-ink" />
            <span className="uppercase tracking-wider">
              Self · {ratingLabel(selfRating)} ({selfRating})
            </span>
          </span>
        )}
        {externalAverage !== null && (
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-ink" />
            <span className="uppercase tracking-wider">
              Observed · {ratingLabel(externalAverage)} ({externalAverage})
            </span>
          </span>
        )}
        {!hasBoth && (
          <span className="text-ink-faint italic">
            {externalAverage === null
              ? "Awaiting observations from your circles."
              : "Complete your self-assessment to see the gap."}
          </span>
        )}
      </div>
    </div>
  );
}
