"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useMirror } from "@/lib/store";
import { RatingScale, SCALE_LABELS } from "../rating-scale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Behavior = { id: string; text: string; category: string };

export function SelfView() {
  const { setView } = useMirror();
  const [grouped, setGrouped] = useState<Record<string, Behavior[]>>({});
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [selRes, selfRes] = await Promise.all([
          api.get<{ selections: Behavior[] }>("/api/selections"),
          api.get<{ assessments: Record<string, number> }>("/api/self-assessment"),
        ]);

        const g: Record<string, Behavior[]> = {};
        for (const s of selRes.selections) {
          if (!g[s.category]) g[s.category] = [];
          g[s.category].push(s);
        }
        // sort categories
        const sorted = Object.keys(g).sort();
        const ordered: Record<string, Behavior[]> = {};
        for (const k of sorted) ordered[k] = g[k];
        setGrouped(ordered);
        setRatings(selfRes.assessments);
      } catch {
        toast.error("Could not load your assessment.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const total = Object.values(grouped).reduce((n, arr) => n + arr.length, 0);
  const answered = Object.keys(ratings).length;
  const complete = total > 0 && answered >= total;

  async function handleContinue() {
    if (!complete) {
      toast.error("Rate every behavior to continue.");
      return;
    }
    setSaving(true);
    try {
      await api.post("/api/self-assessment", { ratings });
      toast.success("Self-assessment recorded.");
      setView("invite");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <p className="font-display text-2xl text-ink-faint">Loading…</p>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <p className="font-display text-2xl text-ink-soft">
          You haven’t selected any behaviors yet.
        </p>
        <button
          onClick={() => setView("behaviors")}
          className="mt-6 text-[11px] uppercase tracking-widest text-ink underline underline-offset-4"
        >
          Choose behaviors →
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          Step 03 — Self-perception
        </span>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
          How do you see yourself?
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          Rate yourself honestly on each behavior. This is your baseline — the
          self-perception that Mirror will hold up against external reality.
          There are no right answers. There is only what you believe to be true.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-line-soft py-4">
          <span className="text-[11px] uppercase tracking-widest text-ink-faint">
            The scale
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink-soft">
            {SCALE_LABELS.map((l, i) => (
              <span key={l} className="flex items-center gap-1.5">
                <span className="font-mono text-ink">{i + 1}</span>
                <span className="uppercase tracking-wider">{l}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-14">
        {Object.entries(grouped).map(([category, behaviors]) => (
          <section key={category}>
            <h2 className="mb-6 font-display text-xl text-ink-soft">
              {category}
            </h2>
            <ul className="space-y-10">
              {behaviors.map((b) => (
                <li key={b.id} className="border-b border-line-soft pb-8">
                  <div className="mb-5 flex items-start gap-4">
                    <span
                      className={cn(
                        "mt-1.5 h-1.5 w-1.5 flex-none rounded-full transition-colors",
                        ratings[b.id] ? "bg-ink" : "bg-ink-faint/30"
                      )}
                    />
                    <p className="font-display text-lg leading-snug text-ink sm:text-xl">
                      {b.text}
                    </p>
                  </div>
                  <div className="pl-6">
                    <RatingScale
                      value={ratings[b.id] ?? null}
                      onChange={(v) =>
                        setRatings((prev) => ({ ...prev, [b.id]: v }))
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="sticky bottom-0 -mx-5 mt-12 border-t border-line bg-paper/90 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-ink">{answered}</span>
            <span className="text-[11px] uppercase tracking-wider text-ink-soft">
              of {total} answered
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView("behaviors")}
              className="text-[11px] uppercase tracking-widest text-ink-faint hover:text-ink-soft transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleContinue}
              disabled={saving || !complete}
              className="inline-flex items-center gap-3 rounded-sm bg-ink px-6 py-3 text-paper transition-all hover:bg-ink/90 disabled:opacity-40"
            >
              <span className="font-display text-base">
                {saving ? "Saving…" : "Continue"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
