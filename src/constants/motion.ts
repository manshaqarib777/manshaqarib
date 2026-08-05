/**
 * Shared motion language. Every animation in the app pulls its easing and
 * duration from here so the whole site moves with one personality.
 */
export const EASE = {
  /** Default: fast out, long soft settle. Used for most reveals. */
  out: "expo.out",
  /** Symmetric, for state changes that travel both directions. */
  inOut: "power3.inOut",
  /** Very soft — large elements, clip paths, image masks. */
  silk: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Slight overshoot for micro-interactions. */
  spring: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
} as const;

export const DURATION = {
  micro: 0.28,
  fast: 0.5,
  base: 0.9,
  slow: 1.4,
  cinematic: 2,
} as const;

export const STAGGER = {
  chars: 0.018,
  words: 0.05,
  lines: 0.09,
  cards: 0.11,
} as const;

/** Framer Motion transition presets. */
export const TRANSITION = {
  silk: { duration: DURATION.base, ease: EASE.silk },
  micro: { duration: DURATION.micro, ease: EASE.silk },
  spring: { type: "spring" as const, stiffness: 260, damping: 26, mass: 0.6 },
} as const;
