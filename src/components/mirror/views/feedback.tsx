"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Question, type BehaviorQuestion } from "../question";
import { Wordmark } from "../wordmark";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

type FeedbackData = {
  invitation: {
    token: string;
    circle: string;
    status: string;
    subjectName: string;
  };
  behaviors: (BehaviorQuestion & { category: string })[];
  priorRatings: Record<string, number>;
};

export function FeedbackView({ token }: { token: string }) {
  const t = useT();
  const [data, setData] = useState<FeedbackData | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<FeedbackData>(
          `/api/feedback?token=${token}`
        );
        setData(res);
        setRatings(res.priorRatings);
        if (res.invitation.status === "completed") {
          setDone(true);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : t("feedback.err")
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // Group behaviors by category
  const grouped: Record<string, FeedbackData["behaviors"]> = {};
  if (data) {
    for (const b of data.behaviors) {
      if (!grouped[b.category]) grouped[b.category] = [];
      grouped[b.category].push(b);
    }
  }

  const total = data?.behaviors.length ?? 0;
  const answered = Object.keys(ratings).filter(
    (k) => data?.behaviors.some((b) => b.id === k)
  ).length;
  const complete = total > 0 && answered >= total;

  async function handleSubmit() {
    if (!complete) {
      toast.error(t("feedback.errComplete"));
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/api/feedback", { token, ratings });
      setDone(true);
      toast.success(t("feedback.success"));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("feedback.errSubmit"));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <Shell>
        <p className="font-display text-2xl text-ink-faint">
          {t("feedback.loading")}
        </p>
      </Shell>
    );
  }

  if (error) {
    return (
      <Shell>
        <div className="text-center">
          <Wordmark className="mx-auto mb-8" />
          <h1 className="font-display text-3xl text-ink">{t("feedback.errH")}</h1>
          <p className="mt-4 text-ink-soft">{error}</p>
        </div>
      </Shell>
    );
  }

  if (!data) return null;

  if (done) {
    return (
      <Shell>
        <div className="mx-auto max-w-lg text-center">
          <Wordmark className="mx-auto mb-10" />
          <div className="mb-8 flex justify-center">
            <div className="h-px w-16 bg-ink" />
          </div>
          <h1 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            {t("feedback.done.h")}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            {t("feedback.done.body", { name: data.invitation.subjectName, circle: data.invitation.circle })}
          </p>
          <p className="mt-8 font-display text-lg italic text-ink-soft">
            {t("feedback.done.closing")}
          </p>
        </div>
      </Shell>
    );
  }

  const subject = data.invitation.subjectName;

  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Header */}
        <div className="mb-12 border-b border-line pb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
            {t("feedback.tag")}
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {t("feedback.h", { name: subject })}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
            {t("feedback.body", { name: subject, circle: data.invitation.circle })}
          </p>

          <div className="mt-6 border border-line bg-surface px-5 py-4">
            <p className="text-sm leading-relaxed text-ink-soft">
              <span className="font-display text-ink">
                {t("feedback.confNote", { name: subject, circle: data.invitation.circle })}
              </span>
            </p>
          </div>
        </div>

        {/* The questions */}
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
                      <div className="flex-1">
                        <Question
                          behavior={b}
                          value={ratings[b.id] ?? null}
                          onChange={(v) =>
                            setRatings((prev) => ({ ...prev, [b.id]: v }))
                          }
                          subject={subject}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Submit */}
        <div className="sticky bottom-0 -mx-5 mt-12 border-t border-line bg-paper/90 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-ink">{answered}</span>
              <span className="text-[11px] uppercase tracking-wider text-ink-soft">
                {t("feedback.ofTotal", { total })}
              </span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting || !complete}
              className="inline-flex items-center gap-3 rounded-sm bg-ink px-8 py-3.5 text-paper transition-all hover:bg-ink/90 disabled:opacity-40"
            >
              <span className="font-display text-base">
                {submitting ? t("feedback.submitting") : t("feedback.submit")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-5 py-16 sm:px-8">
      {children}
    </div>
  );
}
