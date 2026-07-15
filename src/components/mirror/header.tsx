"use client";

import { Wordmark } from "./wordmark";
import { useMirror, type View } from "@/lib/store";
import { useI18n, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

// The journey through Mirror. Shown as a quiet progress,
// not a gamified stepper. The user always knows where they are.
const STEP_KEYS: { view: View; label: string }[] = [
  { view: "behaviors", label: "nav.select" },
  { view: "self", label: "nav.self" },
  { view: "invite", label: "nav.invite" },
  { view: "report", label: "nav.report" },
];

function LangToggle() {
  const { locale, setLocale } = useI18n();
  const next: Locale = locale === "en" ? "hinglish" : "en";
  return (
    <button
      onClick={() => setLocale(next)}
      className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-ink-faint transition-colors hover:text-ink"
      aria-label="Switch language"
      title={locale === "en" ? "Hinglish mein dekho" : "View in English"}
    >
      <Languages className="h-3.5 w-3.5" />
      <span>{locale === "en" ? "EN" : "Hinglish"}</span>
    </button>
  );
}

export function Header() {
  const { view, setView, user, signOut } = useMirror();
  const { t } = useI18n();

  const activeIndex = STEP_KEYS.findIndex((s) => s.view === view);
  const showSteps =
    view === "behaviors" ||
    view === "self" ||
    view === "invite" ||
    view === "report";

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          onClick={() => setView("landing")}
          className="group flex items-center gap-3"
          aria-label="Mirror home"
        >
          <Wordmark size="small" />
        </button>

        <div className="flex items-center gap-4 sm:gap-6">
          {showSteps && (
            <nav className="hidden items-center gap-1 sm:flex" aria-label="Progress">
              {STEP_KEYS.map((s, i) => {
                const done = i < activeIndex;
                const active = i === activeIndex;
                return (
                  <div key={s.view} className="flex items-center">
                    <button
                      onClick={() => setView(s.view)}
                      className={cn(
                        "px-2 py-1 text-[11px] uppercase tracking-wider transition-colors",
                        active
                          ? "text-ink"
                          : done
                          ? "text-ink-soft hover:text-ink"
                          : "text-ink-faint hover:text-ink-soft"
                      )}
                    >
                      <span className="font-mono mr-1.5 opacity-50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {t(s.label)}
                    </button>
                    {i < STEP_KEYS.length - 1 && (
                      <span className="text-ink-faint/40">·</span>
                    )}
                  </div>
                );
              })}
            </nav>
          )}

          <LangToggle />

          {user && (
            <div className="flex items-center gap-3">
              <span className="hidden text-[11px] text-ink-soft sm:inline">
                {user.name}
              </span>
              <button
                onClick={async () => {
                  if (confirm(t("nav.signoutConfirm")))
                    await signOut();
                }}
                className="text-[11px] uppercase tracking-wider text-ink-faint hover:text-ink transition-colors"
              >
                {t("nav.signout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
