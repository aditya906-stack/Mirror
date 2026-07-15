"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useMirror } from "@/lib/store";
import { Header } from "@/components/mirror/header";
import { Footer } from "@/components/mirror/footer";
import { LandingView } from "@/components/mirror/views/landing";
import { SetupView } from "@/components/mirror/views/setup";
import { BehaviorsView } from "@/components/mirror/views/behaviors";
import { SelfView } from "@/components/mirror/views/self";
import { InviteView } from "@/components/mirror/views/invite";
import { ReportView } from "@/components/mirror/views/report";
import { FeedbackView } from "@/components/mirror/views/feedback";

function AppContent() {
  const { view, userId } = useMirror();

  // If there's no session but the view expects one, send to landing.
  const effectiveView =
    !userId && view !== "landing" && view !== "setup" ? "landing" : view;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {effectiveView === "landing" && <LandingView />}
        {effectiveView === "setup" && <SetupView />}
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
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="font-display text-2xl text-ink-faint">Mirror</p>
        </div>
      }
    >
      <RouteSwitch />
    </Suspense>
  );
}
