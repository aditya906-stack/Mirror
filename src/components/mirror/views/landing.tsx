"use client";

import { useMirror } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Wordmark } from "../wordmark";

export function LandingView() {
  const { setView } = useMirror();
  const t = useT();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="flex flex-col items-center text-center">
        <Wordmark size="large" className="mb-12" />

        <p className="font-display text-3xl leading-tight text-ink sm:text-5xl sm:leading-[1.1]">
          {t("landing.tagline1")}
          <br />
          <span className="text-ink-soft">{t("landing.tagline2")}</span>
        </p>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          {t("landing.body")}
        </p>
      </div>

      <div className="mt-20 grid gap-px overflow-hidden rounded-sm border border-line bg-line">
        {[
          {
            n: "01",
            t: t("landing.step1.t"),
            d: t("landing.step1.d"),
          },
          {
            n: "02",
            t: t("landing.step2.t"),
            d: t("landing.step2.d"),
          },
          {
            n: "03",
            t: t("landing.step3.t"),
            d: t("landing.step3.d"),
          },
        ].map((s) => (
          <div key={s.n} className="bg-paper p-6 sm:p-8">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-ink-faint">{s.n}</span>
              <div>
                <h3 className="font-display text-xl text-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {s.d}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-line-soft pt-10">
        <p className="font-display text-lg italic text-ink-soft">
          {t("landing.not")}
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink-soft">
          <li className="flex gap-3">
            <span className="text-ink-faint">—</span>
            <span>{t("landing.not1")}</span>
          </li>
          <li className="flex gap-3">
            <span className="text-ink-faint">—</span>
            <span>{t("landing.not2")}</span>
          </li>
          <li className="flex gap-3">
            <span className="text-ink-faint">—</span>
            <span>{t("landing.not3")}</span>
          </li>
        </ul>
      </div>

      <div className="mt-16 flex flex-col items-center gap-4">
        <button
          onClick={() => setView("auth")}
          className="group relative w-full max-w-sm overflow-hidden rounded-sm bg-ink px-8 py-4 text-paper transition-all hover:bg-ink/90 sm:w-auto"
        >
          <span className="font-display text-lg">{t("landing.begin")}</span>
          <span className="ml-3 text-xs uppercase tracking-widest text-paper/60">
            {t("landing.beginSub")}
          </span>
        </button>
        <p className="text-[11px] uppercase tracking-wider text-ink-faint">
          {t("landing.time")}
        </p>
      </div>
    </div>
  );
}
