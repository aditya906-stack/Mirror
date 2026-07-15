import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mirror — evidence-based behavioral reflection",
  description:
    "Mirror reflects the gap between how you see yourself and how your circles experience you. Confidential. Observable. Without judgment.",
  keywords: ["Mirror", "behavioral reflection", "self-awareness", "feedback", "360"],
  authors: [{ name: "Mirror" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} antialiased bg-paper text-ink font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
