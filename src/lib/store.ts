"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setUserId } from "./api";

// The views of Mirror. All rendered on the single / route.
// State-driven, because the journey is linear and private.
export type View =
  | "landing"
  | "setup"
  | "behaviors"
  | "self"
  | "invite"
  | "report";

type SessionState = {
  userId: string | null;
  userName: string | null;
  view: View;
  setSession: (userId: string, userName: string) => void;
  clearSession: () => void;
  setView: (view: View) => void;
};

export const useMirror = create<SessionState>()(
  persist(
    (set) => ({
      userId: null,
      userName: null,
      view: "landing",
      setSession: (userId, userName) => {
        setUserId(userId);
        set({ userId, userName, view: "behaviors" });
      },
      clearSession: () => {
        setUserId(null);
        set({ userId: null, userName: null, view: "landing" });
      },
      setView: (view) => set({ view }),
    }),
    {
      name: "mirror:session",
      partialize: (s) => ({
        userId: s.userId,
        userName: s.userName,
        view: s.view,
      }),
    }
  )
);
