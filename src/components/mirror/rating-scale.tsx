"use client";

import { cn } from "@/lib/utils";

// The frequency scale. The only axis Mirror uses.
// Never → Almost always. Five points.
// We do not label any of these as good or bad.
export const SCALE_LABELS = [
  "Never",
  "Rarely",
  "Sometimes",
  "Often",
  "Almost always",
] as const;

export const SCALE_SHORT = ["N", "R", "S", "O", "AA"] as const;

export function ratingLabel(v: number): string {
  const i = Math.round(v) - 1;
  if (i < 0 || i >= SCALE_LABELS.length) return "—";
  return SCALE_LABELS[i];
}

// The interactive rating selector. Used in both self-assessment
// and the confidential feedback form.
export function RatingScale({
  value,
  onChange,
  disabled,
}: {
  value: number | null;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {SCALE_LABELS.map((label, i) => {
          const v = i + 1;
          const selected = value === v;
          return (
            <button
              key={v}
              type="button"
              disabled={disabled}
              onClick={() => onChange(v)}
              className={cn(
                "group relative flex flex-col items-center gap-2 rounded-sm border py-3 px-1 transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/40",
                selected
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-surface hover:border-ink-soft text-ink-soft hover:text-ink",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span
                className={cn(
                  "font-display text-lg leading-none transition-colors",
                  selected ? "text-paper" : "text-ink-soft group-hover:text-ink"
                )}
                style={{ fontVariationSettings: '"opsz" 144' }}
              >
                {v}
              </span>
              <span
                className={cn(
                  "text-[9px] sm:text-[10px] uppercase tracking-wider leading-tight text-center transition-colors",
                  selected ? "text-paper/80" : "text-ink-faint"
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
