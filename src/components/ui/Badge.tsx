import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "accent";
}

/** Small pill used for technology tags and status labels. */
export function Badge({ children, className, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-colors duration-500",
        tone === "neutral"
          ? "border-white/12 bg-white/[0.03] text-ink-200"
          : "border-accent-400/30 bg-accent-500/10 text-accent-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
