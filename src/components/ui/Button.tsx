"use client";

import Link from "next/link";
import { useCallback, useRef, type ReactNode } from "react";
import { FiArrowUpRight, FiLoader } from "react-icons/fi";
import { gsap } from "@/lib/gsap";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useCursorProps } from "@/providers/CursorProvider";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  /** Set for external links; adds target/rel and an outward arrow. */
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  isLoading?: boolean;
  withArrow?: boolean;
  magnetic?: boolean;
  className?: string;
  "aria-label"?: string;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-ink-950 hover:bg-white/92 shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset]",
  outline:
    "border border-white/18 text-white/90 hover:border-white/40 hover:text-white bg-white/[0.03] backdrop-blur-sm",
  ghost: "text-white/70 hover:text-white",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[0.78rem]",
  md: "h-12 px-6 text-[0.84rem]",
  lg: "h-14 px-8 text-[0.9rem]",
};

/**
 * The site's one button.
 *
 * Layered interactions, each cheap on its own:
 *  - magnetic pull on the shell, with the label pulled slightly further
 *  - a ripple spawned at the exact pointer coordinates on press
 *  - a scale-down press state and an arrow that leaves and re-enters on hover
 *
 * Every animated property is transform or opacity, so a press never triggers
 * layout.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  onClick,
  type = "button",
  disabled,
  isLoading,
  withArrow,
  magnetic = true,
  className,
  ...rest
}: ButtonProps) {
  const { shellRef, contentRef } = useMagnetic<HTMLElement>({
    strength: magnetic ? 0.22 : 0,
    contentStrength: magnetic ? 0.36 : 0,
    padding: magnetic ? 26 : 0,
  });
  const rippleHostRef = useRef<HTMLSpanElement>(null);
  const cursorProps = useCursorProps({ variant: "hover" });

  const spawnRipple = useCallback((event: React.PointerEvent) => {
    const host = rippleHostRef.current;
    if (!host) return;

    const bounds = host.getBoundingClientRect();
    const ripple = document.createElement("span");
    // Diameter large enough to always cover the button from any origin.
    const diameter = Math.hypot(bounds.width, bounds.height) * 2;

    ripple.className = "pointer-events-none absolute rounded-full";
    ripple.style.width = `${diameter}px`;
    ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - bounds.left - diameter / 2}px`;
    ripple.style.top = `${event.clientY - bounds.top - diameter / 2}px`;
    ripple.style.background = "currentColor";
    host.appendChild(ripple);

    gsap.fromTo(
      ripple,
      { scale: 0, opacity: 0.18 },
      {
        scale: 1,
        opacity: 0,
        duration: 0.85,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      },
    );
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    if (disabled || isLoading) return;
    spawnRipple(event);
    gsap.to(shellRef.current, { scale: 0.96, duration: 0.18, ease: "power3.out" });
  };

  const onPointerUp = () => {
    gsap.to(shellRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.55)",
    });
  };

  const shellClasses = cn(
    "group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full",
    "font-medium uppercase tracking-[0.14em] transition-colors duration-500",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400",
    VARIANTS[variant],
    SIZES[size],
    (disabled || isLoading) && "pointer-events-none opacity-50",
    className,
  );

  const inner = (
    <>
      {/* Ripple host: clipped to the pill, sits under the label. */}
      <span
        ref={rippleHostRef}
        aria-hidden
        className="absolute inset-0 overflow-hidden rounded-full"
      />

      {/* Border sweep — a conic highlight that travels once on hover. */}
      {variant === "outline" && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "conic-gradient(from 180deg, transparent 0deg, rgba(255,255,255,0.5) 60deg, transparent 120deg)",
            maskImage:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: 1,
          }}
        />
      )}

      <span
        ref={contentRef as React.RefObject<HTMLSpanElement>}
        className="relative z-10 inline-flex items-center gap-2.5"
      >
        {isLoading ? (
          <FiLoader className="animate-spin" aria-hidden />
        ) : null}
        <span>{children}</span>

        {withArrow && !isLoading && (
          // The arrow exits top-right and a clone enters from bottom-left,
          // which reads as continuous travel rather than a jump.
          <span className="relative block h-4 w-4 overflow-hidden">
            <FiArrowUpRight
              aria-hidden
              className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 group-hover:-translate-y-4"
            />
            <FiArrowUpRight
              aria-hidden
              className="absolute inset-0 h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
            />
          </span>
        )}
      </span>
    </>
  );

  const sharedHandlers = {
    onPointerDown,
    onPointerUp,
    onPointerLeave: onPointerUp,
    ...cursorProps,
  };

  if (href) {
    const isExternal = external ?? /^https?:\/\//.test(href);

    if (isExternal) {
      return (
        <a
          ref={shellRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={shellClasses}
          {...sharedHandlers}
          {...rest}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link
        ref={shellRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={shellClasses}
        {...sharedHandlers}
        {...rest}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={shellRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={shellClasses}
      {...sharedHandlers}
      {...rest}
    >
      {inner}
    </button>
  );
}
