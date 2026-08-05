import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Enables the stroke-draw animation used by the preloader. */
  animated?: boolean;
}

/**
 * Geometric monogram. Built from two arcs and the initials so it can be drawn
 * on with `stroke-dasharray` — the paths carry `pathLength="1"`, which lets the
 * dash animation be expressed in 0→1 terms regardless of their real length.
 */
export function Logo({ className, animated = false }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={`${SITE.name} monogram`}
      className={cn("h-full w-full", className)}
      fill="none"
    >
      <g
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        className={animated ? "logo-draw" : undefined}
      >
        <circle cx="32" cy="32" r="26" pathLength={1} opacity={0.35} />
        <path d="M32 6a26 26 0 0 1 0 52" pathLength={1} />
        <path d="M18 42V22l14 13 14-13v20" pathLength={1} strokeWidth={2} />
      </g>
    </svg>
  );
}
