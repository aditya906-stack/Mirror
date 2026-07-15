"use client";

import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { RatingScale, SCALE_LABELS } from "./rating-scale";

// The agreement scale. Same 1-5 axis as frequency, but the question
// asks how much the statement applies, not how often it happens.
export const AGREEMENT_LABELS = [
  "Strongly disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly agree",
] as const;

// A single behavior question, rendered in the format defined by the
// behavior itself. The stored answer is ALWAYS 1-5, regardless of format.
//
//   frequency — behavior text + Never→Almost always (1-5)
//   agreement — behavior text + Strongly disagree→Strongly agree (1-5)
//   scenario  — prompt (with {subject}) + 5 ordered options (1-5)
//
// `subject` is substituted into scenario prompts:
//   "you" for self-assessment, the person's name for feedback.
export type BehaviorQuestion = {
  id: string;
  text: string;
  format: string;
  prompt: string | null;
  options: string[] | null;
};

export function Question({
  behavior,
  value,
  onChange,
  subject,
  disabled,
}: {
  behavior: BehaviorQuestion;
  value: number | null;
  onChange: (v: number) => void;
  subject: string;
  disabled?: boolean;
}) {
  const t = useT();

  if (behavior.format === "scenario" && behavior.prompt && behavior.options) {
    return (
      <ScenarioQuestion
        behavior={behavior}
        value={value}
        onChange={onChange}
        subject={subject}
        disabled={disabled}
        scenarioLabel={t("q.scenario")}
      />
    );
  }

  if (behavior.format === "agreement") {
    return (
      <AgreementQuestion
        text={behavior.text}
        value={value}
        onChange={onChange}
        disabled={disabled}
        agreementLabel={t("q.agreement")}
      />
    );
  }

  // Default: frequency
  return (
    <FrequencyQuestion
      text={behavior.text}
      value={value}
      onChange={onChange}
      subject={subject}
      disabled={disabled}
      label={
        subject === "you"
          ? t("q.frequency.self")
          : t("q.frequency.other", { name: subject })
      }
    />
  );
}

// ── Frequency ───────────────────────────────────────────────
// "How often do you [behavior]?" — Never → Almost always (1-5)
function FrequencyQuestion({
  text,
  value,
  onChange,
  subject: _subject,
  disabled,
  label,
}: {
  text: string;
  value: number | null;
  onChange: (v: number) => void;
  subject: string;
  disabled?: boolean;
  label: string;
}) {
  return (
    <div>
      <p className="mb-1 text-[11px] uppercase tracking-widest text-ink-faint">
        {label}
      </p>
      <p className="mb-5 font-display text-lg leading-snug text-ink sm:text-xl">
        {text}
      </p>
      <RatingScale value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
}

// ── Agreement ───────────────────────────────────────────────
// "[Statement]" — Strongly disagree → Strongly agree (1-5)
function AgreementQuestion({
  text,
  value,
  onChange,
  disabled,
  agreementLabel,
}: {
  text: string;
  value: number | null;
  onChange: (v: number) => void;
  disabled?: boolean;
  agreementLabel: string;
}) {
  return (
    <div>
      <p className="mb-1 text-[11px] uppercase tracking-widest text-ink-faint">
        {agreementLabel}
      </p>
      <p className="mb-5 font-display text-lg italic leading-snug text-ink sm:text-xl">
        &ldquo;{text}.&rdquo;
      </p>
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {AGREEMENT_LABELS.map((label, i) => {
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

// ── Scenario ────────────────────────────────────────────────
// A situation with 5 ordered responses (1→5).
function ScenarioQuestion({
  behavior,
  value,
  onChange,
  subject,
  disabled,
  scenarioLabel,
}: {
  behavior: BehaviorQuestion;
  value: number | null;
  onChange: (v: number) => void;
  subject: string;
  disabled?: boolean;
  scenarioLabel: string;
}) {
  const prompt = (behavior.prompt || "").replace(/\{subject\}/g, subject);
  const options = behavior.options || [];

  return (
    <div>
      <p className="mb-1 text-[11px] uppercase tracking-widest text-ink-faint">
        {scenarioLabel}
      </p>
      <p className="mb-5 font-display text-lg leading-snug text-ink sm:text-xl">
        {prompt}
      </p>
      <div className="space-y-2">
        {options.map((opt, i) => {
          const v = i + 1;
          const selected = value === v;
          return (
            <button
              key={v}
              type="button"
              disabled={disabled}
              onClick={() => onChange(v)}
              className={cn(
                "group flex w-full items-start gap-3 rounded-sm border px-4 py-3 text-left transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/40",
                selected
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-surface hover:border-ink-soft text-ink",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 flex-none items-center justify-center border text-[10px] font-mono transition-colors",
                  selected
                    ? "border-paper bg-paper text-ink"
                    : "border-ink-faint text-transparent group-hover:border-ink"
                )}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="font-display text-sm leading-snug sm:text-base">
                {opt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Re-export for views that still import from the old location.
export { SCALE_LABELS };
