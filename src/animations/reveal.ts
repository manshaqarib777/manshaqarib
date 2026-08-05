import { gsap } from "@/lib/gsap";
import { DURATION, EASE } from "@/constants/motion";

/**
 * Imperative animations that are too stateful to express declaratively.
 *
 * Simple entrance reveals live in the `<Reveal>` and `<TextReveal>` components
 * instead — they cover fade/scale/rotate/clip and split-text on their own. What
 * remains here are the two effects that need to coordinate a pair of elements
 * (a frame and the image inside it) or a scroll-linked range.
 */
export interface RevealOptions {
  /** Element that drives the ScrollTrigger. Defaults to the animated target. */
  trigger?: Element | null;
  start?: string;
  end?: string;
  delay?: number;
  duration?: number;
}

/**
 * Image mask reveal: the frame wipes open while the image inside scales down from
 * an over-scaled state. That counter-motion is what makes it read as filmic
 * rather than as a plain wipe — the two tweens share one duration so they resolve
 * on the same frame.
 *
 * The frame must already carry a `clipPath` with a `round` value; animating to a
 * different clip-path shape (rather than different inset values) would not
 * interpolate.
 */
export function imageMask(
  frame: HTMLElement,
  image: HTMLElement | null,
  options: RevealOptions = {},
) {
  const { duration = DURATION.cinematic, delay = 0, start = "top 88%" } = options;

  const timeline = gsap.timeline({
    defaults: { ease: EASE.out },
    delay,
    scrollTrigger: {
      trigger: options.trigger ?? frame,
      start,
      end: options.end,
      once: true,
    },
  });

  timeline.fromTo(
    frame,
    { clipPath: "inset(12% 12% 12% 12% round 1rem)" },
    { clipPath: "inset(0% 0% 0% 0% round 1rem)", duration },
    0,
  );

  if (image) {
    timeline.fromTo(image, { scale: 1.28 }, { scale: 1, duration }, 0);
  }

  return timeline;
}

/**
 * Scroll-linked parallax. `amount` is the total travel in px across the trigger's
 * scroll range, centred on zero so the element sits in its designed position when
 * the trigger is mid-viewport.
 */
export function parallax(
  targets: gsap.TweenTarget,
  options: RevealOptions & { amount?: number } = {},
) {
  const {
    amount = 120,
    trigger,
    start = "top bottom",
    end = "bottom top",
  } = options;

  return gsap.fromTo(
    targets,
    { y: -amount / 2 },
    {
      y: amount / 2,
      ease: "none",
      scrollTrigger: {
        trigger: trigger ?? (targets as Element),
        start,
        end,
        scrub: true,
      },
    },
  );
}
