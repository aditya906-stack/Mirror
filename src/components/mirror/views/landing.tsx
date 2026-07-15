"use client";

import { useMirror } from "@/lib/store";
import { Wordmark } from "../wordmark";

export function LandingView() {
  const { setView } = useMirror();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="flex flex-col items-center text-center">
        <Wordmark size="large" className="mb-12" />

        <p className="font-display text-3xl leading-tight text-ink sm:text-5xl sm:leading-[1.1]">
          The mirror does not judge.
          <br />
          <span className="text-ink-soft">It reflects.</span>
        </p>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Mirror is an instrument that measures the distance between how you see
          yourself and how the people around you experience you. It does not
          label you. It does not advise you. It shows you the gap — and lets you
          sit with it.
        </p>
      </div>

      <div className="mt-20 grid gap-px overflow-hidden rounded-sm border border-line bg-line">
        {[
          {
            n: "01",
            t: "You rate yourself",
            d: "On observable behaviors. How often do you interrupt? How often do you follow through? Frequency, not identity.",
          },
          {
            n: "02",
            t: "Your circles observe you",
            d: "People from your Work, Family, and Friends circles answer the same questions — confidentially. We know the circle. We never reveal the individual.",
          },
          {
            n: "03",
            t: "Mirror shows the gap",
            d: "The mathematical distance between self-perception and external reality. No red. No green. No verdict. Only what was observed.",
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
          What this is not.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink-soft">
          <li className="flex gap-3">
            <span className="text-ink-faint">—</span>
            <span>Not a personality test. No labels, no types, no diagnoses.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-ink-faint">—</span>
            <span>Not therapy. No advice, no healing, no “you should work on this.”</span>
          </li>
          <li className="flex gap-3">
            <span className="text-ink-faint">—</span>
            <span>
              Not anonymous. It is <em>confidential</em>. We know which circle
              the feedback came from. We hide who said it.
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-16 flex flex-col items-center gap-4">
        <button
          onClick={() => setView("auth")}
          className="group relative w-full max-w-sm overflow-hidden rounded-sm bg-ink px-8 py-4 text-paper transition-all hover:bg-ink/90 sm:w-auto"
        >
          <span className="font-display text-lg">Begin</span>
          <span className="ml-3 text-xs uppercase tracking-widest text-paper/60">
            Look into the mirror
          </span>
        </button>
        <p className="text-[11px] uppercase tracking-wider text-ink-faint">
          Takes about four minutes of your time
        </p>
      </div>
    </div>
  );
}
