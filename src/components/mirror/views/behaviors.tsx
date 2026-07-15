"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useMirror } from "@/lib/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Behavior = { id: string; text: string };

export function BehaviorsView() {
  const { setView } = useMirror();
  const [grouped, setGrouped] = useState<Record<string, Behavior[]>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const MIN = 5;

  useEffect(() => {
    (async () => {
      try {
        const [behaviorsRes, selectionsRes] = await Promise.all([
          api.get<{ grouped: Record<string, Behavior[]> }>("/api/behaviors"),
          api.get<{ selections: Behavior[] }>("/api/selections"),
        ]);
        setGrouped(behaviorsRes.grouped);
        setSelected(new Set(selectionsRes.selections.map((s) => s.id)));
      } catch {
        toast.error("Could not load the behavioral instrument.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function handleContinue() {
    if (selected.size < MIN) {
      toast.error(`Select at least ${MIN} behaviors.`);
      return;
    }
    setSaving(true);
    try {
      await api.post("/api/selections", { behaviorIds: Array.from(selected) });
      setView("self");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <p className="font-display text-2xl text-ink-faint">Loading the instrument…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          Step 02 — The instrument
        </span>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
          What should be observed?
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          These are observable behaviors — things others can witness and count.
          Choose the ones you want reflected back to you. You will rate yourself
          on each, and so will your circles.
        </p>
        <p className="mt-3 text-sm text-ink-faint">
          Select at least {MIN}. Most people choose 8–12.
        </p>
      </div>

      <div className="space-y-12">
        {Object.entries(grouped).map(([category, behaviors]) => (
          <section key={category}>
            <h2 className="mb-4 flex items-baseline gap-3 border-b border-line-soft pb-2">
              <span className="font-display text-lg text-ink">{category}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                {behaviors.length} behaviors
              </span>
            </h2>
            <ul className="space-y-1">
              {behaviors.map((b) => {
                const on = selected.has(b.id);
                return (
                  <li key={b.id}>
                    <button
                      onClick={() => toggle(b.id)}
                      className={cn(
                        "group flex w-full items-start gap-4 rounded-sm px-4 py-4 text-left transition-all",
                        on
                          ? "bg-ink text-paper"
                          : "hover:bg-surface text-ink"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 flex-none items-center justify-center border transition-colors",
                          on
                            ? "border-paper bg-paper text-ink"
                            : "border-ink-faint text-transparent group-hover:border-ink"
                        )}
                      >
                        <svg
                          viewBox="0 0 12 12"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M2 6l3 3 5-6" />
                        </svg>
                      </span>
                      <span className="font-display text-base leading-snug">
                        {b.text}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className="sticky bottom-0 mt-12 -mx-5 border-t border-line bg-paper/90 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-ink">{selected.size}</span>
            <span className="text-[11px] uppercase tracking-wider text-ink-soft">
              selected
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView("landing")}
              className="text-[11px] uppercase tracking-widest text-ink-faint hover:text-ink-soft transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleContinue}
              disabled={saving || selected.size < MIN}
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
