"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Spotlight radius in px. */
  radius?: number;
}

/**
 * Card with a pointer-tracking spotlight on its border and surface.
 *
 * The pointer position is written straight to CSS custom properties on the
 * element — no React state, no re-render, and the gradient is composited by the
 * browser. This is the cheapest way to do a per-card hover light: a state update
 * per mousemove across a grid of cards would be an easy way to lose 60fps.
 */
export function SpotlightCard({
  children,
  className,
  radius = 320,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback((event: React.PointerEvent) => {
    const element = ref.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
    element.style.setProperty("--spot-opacity", "1");
  }, []);

  const onPointerLeave = useCallback(() => {
    ref.current?.style.setProperty("--spot-opacity", "0");
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        // Cards sit over the WebGL backdrop, so the fill is opaque enough to keep
        // small text readable no matter what the gradient is doing behind it.
        "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900/65 backdrop-blur-[3px]",
        "transition-colors duration-700 hover:border-white/15",
        className,
      )}
      style={
        {
          "--spot-opacity": 0,
          "--spot-size": `${radius}px`,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--spot-opacity)",
          background:
            "radial-gradient(var(--spot-size) circle at var(--spot-x) var(--spot-y), color-mix(in oklab, var(--color-accent-500) 16%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
