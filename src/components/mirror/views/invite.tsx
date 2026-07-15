"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useMirror } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Invitation = {
  id: string;
  token: string;
  providerName: string;
  circle: string;
  status: string;
  createdAt: string;
  completedAt: string | null;
  feedbackCount: number;
};

const CIRCLES = [
  {
    name: "Work",
    desc: "Colleagues, managers, reports. People who see you under professional pressure.",
  },
  {
    name: "Family",
    desc: "Partner, parents, siblings. People who have known you longest.",
  },
  {
    name: "Friends",
    desc: "Close friends. People who see you when you are most yourself.",
  },
];

export function InviteView() {
  const { setView } = useMirror();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newCircle, setNewCircle] = useState("Work");
  const [adding, setAdding] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<{ invitations: Invitation[] }>(
          "/api/invitations"
        );
        setInvitations(res.invitations);
      } catch {
        toast.error("Could not load invitations.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function addInvitation(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error("Enter a name for this person.");
      return;
    }
    setAdding(true);
    try {
      const { invitation } = await api.post<{ invitation: Invitation }>(
        "/api/invitations",
        { providerName: newName.trim(), circle: newCircle }
      );
      setInvitations((prev) => [invitation, ...prev]);
      setNewName("");
      toast.success(`Invitation prepared for ${invitation.providerName}.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add.");
    } finally {
      setAdding(false);
    }
  }

  async function copyLink(token: string) {
    const url = `${window.location.origin}/?feedback=${token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedToken(token);
      toast.success("Link copied to clipboard.");
      setTimeout(() => setCopiedToken(null), 2500);
    } catch {
      toast.error("Could not copy. Here is the link: " + url);
    }
  }

  async function removeInvitation(id: string) {
    if (!confirm("Withdraw this invitation? Any submitted feedback will be removed."))
      return;
    try {
      await api.del(`/api/invitations?id=${id}`);
      setInvitations((prev) => prev.filter((i) => i.id !== id));
      toast.success("Invitation withdrawn.");
    } catch {
      toast.error("Could not withdraw.");
    }
  }

  const completedCount = invitations.filter(
    (i) => i.status === "completed"
  ).length;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          Step 04 — External reality
        </span>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
          Invite your circles.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          Send a confidential link to people in your life. They will answer the
          same questions about you — but they will never see your
          self-assessment, and you will never see who said what.
        </p>

        <div className="mt-6 border border-line bg-surface px-5 py-4">
          <p className="text-sm leading-relaxed text-ink-soft">
            <span className="font-display text-ink">Confidential, not anonymous.</span>{" "}
            Mirror records which circle each response came from — that context
            gives the data meaning. But the identity of each individual is
            hidden from you in the final report.
          </p>
        </div>
      </div>

      {/* Add new invitation */}
      <form
        onSubmit={addInvitation}
        className="mb-12 border border-line bg-surface p-5 sm:p-6"
      >
        <h2 className="mb-4 font-display text-lg text-ink">
          Prepare an invitation
        </h2>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-widest text-ink-soft">
              Their name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Maya, my manager"
              className="w-full border-b border-line bg-transparent py-2 font-display text-lg text-ink placeholder:text-ink-faint/50 focus:border-ink focus:outline-none transition-colors"
            />
            <p className="mt-1.5 text-[11px] text-ink-faint">
              A label only you see. Helps you track who you invited.
            </p>
          </div>
          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-widest text-ink-soft">
              Circle
            </label>
            <select
              value={newCircle}
              onChange={(e) => setNewCircle(e.target.value)}
              className="border-b border-line bg-transparent py-2 pr-6 font-display text-lg text-ink focus:border-ink focus:outline-none transition-colors"
            >
              {CIRCLES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            disabled={adding}
            className="inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-2.5 text-paper transition-all hover:bg-ink/90 disabled:opacity-50"
          >
            <span className="font-display text-sm">Prepare invitation</span>
          </button>
        </div>
      </form>

      {/* Circle legend */}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {CIRCLES.map((c) => {
          const count = invitations.filter((i) => i.circle === c.name).length;
          const done = invitations.filter(
            (i) => i.circle === c.name && i.status === "completed"
          ).length;
          return (
            <div key={c.name} className="border border-line-soft p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-base text-ink">{c.name}</span>
                <span className="font-mono text-[10px] text-ink-faint">
                  {done}/{count}
                </span>
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-ink-faint">
                {c.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Existing invitations */}
      <div>
        <h2 className="mb-4 flex items-baseline gap-3 border-b border-line-soft pb-2">
          <span className="font-display text-lg text-ink">Invitations</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            {completedCount} of {invitations.length} returned
          </span>
        </h2>

        {loading ? (
          <p className="py-8 text-center font-display text-ink-faint">
            Loading…
          </p>
        ) : invitations.length === 0 ? (
          <p className="py-12 text-center text-sm text-ink-faint italic">
            No invitations yet. Prepare one above.
          </p>
        ) : (
          <ul className="divide-y divide-line-soft">
            {invitations.map((inv) => (
              <li
                key={inv.id}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        inv.status === "completed" ? "bg-ink" : "bg-ink-faint/30"
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-display text-base text-ink">
                      {inv.providerName}
                    </p>
                    <p className="text-[11px] uppercase tracking-wider text-ink-faint">
                      {inv.circle}
                      {inv.status === "completed"
                        ? ` · ${inv.feedbackCount} responses`
                        : " · pending"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => copyLink(inv.token)}
                    className={cn(
                      "rounded-sm border px-3 py-2 text-[11px] uppercase tracking-wider transition-colors",
                      copiedToken === inv.token
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-ink-soft hover:border-ink hover:text-ink"
                    )}
                  >
                    {copiedToken === inv.token ? "Copied" : "Copy link"}
                  </button>
                  <button
                    onClick={() => removeInvitation(inv.id)}
                    className="rounded-sm border border-line px-3 py-2 text-[11px] uppercase tracking-wider text-ink-faint transition-colors hover:border-ink hover:text-ink"
                    aria-label="Withdraw"
                  >
                    Withdraw
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="sticky bottom-0 -mx-5 mt-12 border-t border-line bg-paper/90 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-ink">
              {completedCount}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-ink-soft">
              responses received
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView("self")}
              className="text-[11px] uppercase tracking-widest text-ink-faint hover:text-ink-soft transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => setView("report")}
              className="inline-flex items-center gap-3 rounded-sm bg-ink px-6 py-3 text-paper transition-all hover:bg-ink/90"
            >
              <span className="font-display text-base">
                {completedCount > 0 ? "View report" : "Continue"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
