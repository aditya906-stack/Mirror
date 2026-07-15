"use client";

import { useT } from "@/lib/i18n";

// The footer. Sticky to the bottom. Quiet.
// A single line that restates the pact of the instrument.
export function Footer() {
  const t = useT();
  return (
    <footer className="mt-auto border-t border-line-soft bg-paper">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <p className="font-display text-sm text-ink-soft italic">
            {t("footer.quote")}
          </p>
          <p className="text-[11px] uppercase tracking-wider text-ink-faint">
            {t("footer.pact")}
          </p>
        </div>
      </div>
    </footer>
  );
}
