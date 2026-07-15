"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useMirror } from "@/lib/store";
import { LocaleProvider } from "@/lib/i18n";
import { Header } from "@/components/mirror/header";
import { Footer } from "@/components/mirror/footer";
import { LandingView } from "@/components/mirror/views/landing";
import { AuthView } from "@/components/mirror/views/auth";
import { BehaviorsView } from "@/components/mirror/views/behaviors";
import { SelfView } from "@/components/mirror/views/self";
import { InviteView } from "@/components/mirror/views/invite";
import { ReportView } from "@/components/mirror/views/report";
import { FeedbackView } from "@/components/mirror/views/feedback";

function AppContent() {
  const { view, user, hydrated, restore } = useMirror();

  // Restore the session from the httpOnly cookie on first mount.
  useEffect(() => {
    restore();
  }, [restore]);

  // If there's no session but the view expects one, send to auth.
  const effectiveView =
    !user && view !== "landing" && view !== "auth" ? "auth" : view;

  // While the session is being restored, avoid flashing the wrong view.
  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-display text-2xl text-ink-faint">Mirror</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {effectiveView === "landing" && <LandingView />}
        {effectiveView === "auth" && <AuthView />}
        {effectiveView === "behaviors" && <BehaviorsView />}
        {effectiveView === "self" && <SelfView />}
        {effectiveView === "invite" && <InviteView />}
        {effectiveView === "report" && <ReportView />}
      </main>
      <Footer />
    </div>
  );
}

function RouteSwitch() {
  const searchParams = useSearchParams();
  const token = searchParams.get("feedback");

  // The confidential feedback flow is a separate context —
  // no app chrome, no header, no footer. Just the instrument.
  if (token) {
    return <FeedbackView token={token} />;
  }

  return <AppContent />;
}

export default function Home() {
  return (
    <LocaleProvider>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="font-display text-2xl text-ink-faint">Mirror</p>
          </div>
        }
      >
        <RouteSwitch />
      </Suspense>
    </LocaleProvider>
  );
}
