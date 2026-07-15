"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useMirror, type AuthUser } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { toast } from "sonner";

// The gateway to Mirror.
//
// A single quiet screen that toggles between creating an account and
// returning to one. Username + password only — no email friction yet.
// The `name` collected at signup is what circles see on invitations.

export function AuthView() {
  const { authMode, setAuthMode, setUser, setView } = useMirror();
  const t = useT();
  const isSignup = authMode === "signup";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const u = username.trim();
    const p = password;

    if (!u || !p) {
      toast.error(t("auth.errRequired"));
      return;
    }
    if (isSignup && !name.trim()) {
      toast.error(t("auth.errName"));
      return;
    }

    setLoading(true);
    try {
      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/signin";
      const body = isSignup
        ? { username: u, password: p, name: name.trim() }
        : { username: u, password: p };
      const { user } = await api.post<{ user: AuthUser }>(endpoint, body);
      setUser(user);
      toast.success(
        isSignup ? t("auth.signupSuccess") : t("auth.signinSuccess", { name: user.name })
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-200px)] max-w-xl flex-col justify-center px-5 py-16 sm:px-8">
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          {isSignup ? t("auth.signup.tag") : t("auth.signin.tag")}
        </span>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {isSignup ? t("auth.signup.h") : t("auth.signin.h")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          {isSignup ? t("auth.signup.body") : t("auth.signin.body")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {isSignup && (
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-[11px] uppercase tracking-widest text-ink-soft"
            >
              {t("auth.name")}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("auth.namePlaceholder")}
              className="w-full border-b border-line bg-transparent py-3 font-display text-2xl text-ink placeholder:text-ink-faint/50 focus:border-ink focus:outline-none transition-colors"
              autoFocus
            />
          </div>
        )}

        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-[11px] uppercase tracking-widest text-ink-soft"
          >
            {t("auth.username")}
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("auth.usernamePlaceholder")}
            autoComplete="username"
            className="w-full border-b border-line bg-transparent py-3 font-display text-2xl text-ink placeholder:text-ink-faint/50 focus:border-ink focus:outline-none transition-colors"
            autoFocus={!isSignup}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-[11px] uppercase tracking-widest text-ink-soft"
          >
            {t("auth.password")}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={
              isSignup
                ? t("auth.passwordPlaceholderSignup")
                : t("auth.passwordPlaceholderSignin")
            }
            autoComplete={isSignup ? "new-password" : "current-password"}
            className="w-full border-b border-line bg-transparent py-3 font-display text-2xl text-ink placeholder:text-ink-faint/50 focus:border-ink focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setView("landing")}
            className="text-[11px] uppercase tracking-widest text-ink-faint hover:text-ink-soft transition-colors"
          >
            {t("auth.back")}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="group inline-flex items-center justify-center gap-3 rounded-sm bg-ink px-8 py-4 text-paper transition-all hover:bg-ink/90 disabled:opacity-50"
          >
            <span className="font-display text-lg">
              {loading
                ? t("auth.loading")
                : isSignup
                ? t("auth.signup.btn")
                : t("auth.signin.btn")}
            </span>
          </button>
        </div>
      </form>

      <p className="mt-10 text-sm text-ink-soft">
        {isSignup ? t("auth.signup.toggle") : t("auth.signin.toggle")}{" "}
        <button
          onClick={() => setAuthMode(isSignup ? "signin" : "signup")}
          className="font-display text-ink underline-offset-4 hover:underline transition-colors"
        >
          {isSignup ? t("auth.signup.toggleLink") : t("auth.signin.toggleLink")}
        </button>
      </p>
    </div>
  );
}
