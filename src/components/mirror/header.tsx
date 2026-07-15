"use client";

import { Wordmark } from "./wordmark";
import { useMirror, type View } from "@/lib/store";
import { cn } from "@/lib/utils";

// The journey through Mirror. Shown as a quiet progress,
// not a gamified stepper. The user always knows where they are.
const STEPS: { view: View; label: string }[] = [
  { view: "behaviors", label: "Select" },
  { view: "self", label: "Self" },
  { view: "invite", label: "Invite" },
  { view: "report", label: "Report" },
];

export function Header() {
  const { view, setView, user, signOut } = useMirror();

  const activeIndex = STEPS.findIndex((s) => s.view === view);
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

        <div className="flex items-center gap-6">
          {showSteps && (
            <nav className="hidden items-center gap-1 sm:flex" aria-label="Progress">
              {STEPS.map((s, i) => {
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
                      {s.label}
                    </button>
                    {i < STEPS.length - 1 && (
                      <span className="text-ink-faint/40">·</span>
                    )}
                  </div>
                );
              })}
            </nav>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <span className="hidden text-[11px] text-ink-soft sm:inline">
                {user.name}
              </span>
              <button
                onClick={async () => {
                  if (
                    confirm(
                      "Sign out? Your data remains. You can sign back in anytime."
                    )
                  )
                    await signOut();
                }}
                className="text-[11px] uppercase tracking-wider text-ink-faint hover:text-ink transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
