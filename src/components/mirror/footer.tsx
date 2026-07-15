"use client";

// The footer. Sticky to the bottom. Quiet.
// A single line that restates the pact of the instrument.
export function Footer() {
  return (
    <footer className="mt-auto border-t border-line-soft bg-paper">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <p className="font-display text-sm text-ink-soft italic">
            “The mirror does not judge. It reflects.”
          </p>
          <p className="text-[11px] uppercase tracking-wider text-ink-faint">
            Confidential · Observable · Without judgment
          </p>
        </div>
      </div>
    </footer>
  );
}
