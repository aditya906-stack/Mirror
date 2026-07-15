"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useMirror } from "@/lib/store";
import { toast } from "sonner";

export function SetupView() {
  const { setSession, setView } = useMirror();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Both your name and email are needed.");
      return;
    }
    setLoading(true);
    try {
      const { user } = await api.post<{ user: { id: string; name: string } }>(
        "/api/profile",
        { name: name.trim(), email: email.trim() }
      );
      setSession(user.id, user.name);
      toast.success("Profile created.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          Step 01 — The subject
        </span>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
          Who will be reflected?
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          You are the subject of this reflection. Your name will appear on the
          invitations you send, so your circles know who they are observing.
          Your email restores your session if you return.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-[11px] uppercase tracking-widest text-ink-soft"
          >
            Your name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="As others know you"
            className="w-full border-b border-line bg-transparent py-3 font-display text-2xl text-ink placeholder:text-ink-faint/50 focus:border-ink focus:outline-none transition-colors"
            autoFocus
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-[11px] uppercase tracking-widest text-ink-soft"
          >
            Your email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border-b border-line bg-transparent py-3 font-display text-2xl text-ink placeholder:text-ink-faint/50 focus:border-ink focus:outline-none transition-colors"
          />
          <p className="mt-2 text-[11px] text-ink-faint">
            Used only to restore your session. No verification emails are sent.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setView("landing")}
            className="text-[11px] uppercase tracking-widest text-ink-faint hover:text-ink-soft transition-colors"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="group inline-flex items-center justify-center gap-3 rounded-sm bg-ink px-8 py-4 text-paper transition-all hover:bg-ink/90 disabled:opacity-50"
          >
            <span className="font-display text-lg">
              {loading ? "Creating…" : "Continue"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
