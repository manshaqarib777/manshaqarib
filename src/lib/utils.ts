/** Tiny class-name joiner. Avoids pulling in clsx for a five-line function. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

/**
 * Frame-rate independent lerp, for anything eased inside a render loop.
 *
 * `smoothing` is the fraction of the remaining distance covered per 60fps frame
 * and `dt` is the real elapsed time in seconds. A plain `lerp(a, b, 0.06)` per
 * frame would converge twice as fast on a 120Hz display as on a 60Hz one, so the
 * same code would feel different on different hardware.
 */
export const damp = (from: number, to: number, smoothing: number, dt: number) =>
  lerp(from, to, 1 - Math.pow(1 - smoothing, dt * 60));

/** 01, 02, 03 … for editorial numbering. */
export const padIndex = (index: number) => String(index + 1).padStart(2, "0");
