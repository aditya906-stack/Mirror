"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "./api";

// The views of Mirror. All rendered on the single / route.
// State-driven, because the journey is linear and private.
export type View =
  | "landing"
  | "auth" // signup or signin
  | "behaviors"
  | "self"
  | "invite"
  | "report";

export type AuthUser = {
  id: string;
  username: string;
  name: string;
};

type SessionState = {
  user: AuthUser | null;
  view: View;
  authMode: "signup" | "signin";
  hydrated: boolean;
  // Set the authenticated user (after signup/signin) and advance.
  setUser: (user: AuthUser) => void;
  // Clear local user state (after signout / on auth failure).
  clearUser: () => void;
  setView: (view: View) => void;
  setAuthMode: (mode: "signup" | "signin") => void;
  setHydrated: (h: boolean) => void;
  // Restore session from the httpOnly cookie via /api/auth/me.
  restore: () => Promise<void>;
  // Sign out: call API + clear local state.
  signOut: () => Promise<void>;
};

export const useMirror = create<SessionState>()(
  persist(
    (set, get) => ({
      user: null,
      view: "landing",
      authMode: "signup",
      hydrated: false,
      setUser: (user) => set({ user, view: "behaviors" }),
      clearUser: () => set({ user: null, view: "landing" }),
      setView: (view) => set({ view }),
      setAuthMode: (authMode) => set({ authMode }),
      setHydrated: (hydrated) => set({ hydrated }),
      restore: async () => {
        try {
          const { user } = await api.get<{ user: AuthUser | null }>(
            "/api/auth/me"
          );
          if (user) {
            set({ user, view: get().view === "auth" ? "behaviors" : get().view });
          } else {
            // No valid session cookie — clear any stale local user.
            set({ user: null, view: "landing" });
          }
        } catch {
          set({ user: null });
        } finally {
          set({ hydrated: true });
        }
      },
      signOut: async () => {
        try {
          await api.post("/api/auth/signout");
        } catch {
          // ignore — clearing local state is what matters
        }
        set({ user: null, view: "landing" });
      },
    }),
    {
      name: "mirror:session",
      partialize: (s) => ({
        user: s.user,
        view: s.view,
        authMode: s.authMode,
      }),
    }
  )
);
