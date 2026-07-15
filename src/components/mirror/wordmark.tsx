"use client";

import { cn } from "@/lib/utils";

// The Mirror wordmark.
// A serif "Mirror" with a faint reflection beneath — the only flourish.
// Everything else is restraint.
export function Wordmark({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "large" | "small";
}) {
  const sizes = {
    small: "text-xl",
    default: "text-2xl",
    large: "text-4xl",
  };
  return (
    <div className={cn("flex flex-col leading-none", className)}>
      <span
        className={cn("font-display tracking-tight text-ink", sizes[size])}
        style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
      >
        Mirror
      </span>
      <span
        className="font-display tracking-tight text-ink-faint -mt-0.5 opacity-40 scale-y-[-1] blur-[0.3px] select-none"
        style={{
          fontSize: size === "large" ? "1rem" : "0.6rem",
          fontVariationSettings: '"opsz" 144, "SOFT" 50',
          transformOrigin: "top",
        }}
        aria-hidden
      >
        Mirror
      </span>
    </div>
  );
}
