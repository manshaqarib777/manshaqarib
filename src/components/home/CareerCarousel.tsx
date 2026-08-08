"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CAREER_HEADING, CAREER_SLIDES } from "@/content/career";
import {
  BUTTON,
  BUTTON_LINE,
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
} from "./styles";

/**
 * The career timeline, as a fanned deck.
 *
 * The mechanic is Supah's circular carousel, and it is worth stating exactly
 * what makes it work, because it is not what it looks like:
 *
 *  - Every card is absolutely centred and shares one `transform-origin: 0% 100%`
 *    — its own bottom-left corner. Rotating about a corner rather than a centre
 *    is what swings a card through an arc instead of spinning it in place.
 *  - Each card knows only `--active`: its signed distance from the current card,
 *    divided by the number of cards. Position, rotation and depth are all
 *    derived from that one number in CSS.
 *  - `--active` is *discrete*. It changes in steps, never continuously. The
 *    smoothness is entirely `transition: transform .8s cubic-bezier(0, .02, 0, 1)`
 *    — an ease that is essentially all deceleration, so a card leaves instantly
 *    and glides a long way into place.
 *
 * That last point is why this replaced a scroll-linked version: a card that
 * follows the pointer one-to-one can only ever feel as smooth as the input
 * device. A card that jumps to a target and glides is smooth by construction,
 * and it also makes "one gesture, one card" the natural state rather than
 * something to be enforced.
 *
 * Because the state is discrete, it is React state rather than a written style:
 * it changes once per gesture, not once per frame, and which card is active
 * decides which card's links are reachable — a render concern, not a paint one.
 *
 * Two deliberate departures from the original are documented at their sites: the
 * wheel handling, and the reachability of the links on inactive cards.
 */

/**
 * Card chrome — amber hairline over a barely-there amber wash.
 *
 * No `backdrop-blur`: the deck sits on a flat near-black ground, so the blur has
 * nothing to sample and renders identically without it. What it did cost was a
 * backdrop re-raster per card per frame, which under a continuously transitioning
 * transform is considerably worse than it was on a scroller.
 */
const CARD_SHELL = [
  "career-card absolute top-1/2 left-1/2 flex flex-col items-center justify-center",
  "gap-2 overflow-hidden rounded-2xl px-4 py-5 text-center lg:gap-3 xl:gap-4 2xl:gap-5",
  "border border-accent/30 bg-[oklch(13%_0.012_260)]",
  "[box-shadow:0_20px_60px_#03050899]",
].join(" ");

/**
 * The media plate, unchanged from the scrolling version: an amber hairline over
 * an amber wash, holding a 16:9 capture.
 */
const CARD_MEDIA =
  "w-full overflow-hidden rounded-xl border border-accent/30 bg-accent/5 p-2";

/**
 * One stack chip — dark surface, amber hairline, amber label.
 *
 * The card's own chrome one size down. Any solid light fill made the row shout;
 * ringed dark chips sit on the ground as metadata and leave the amber doing what
 * an accent does. Hover inverts to the filled state, the same move the work
 * section's tags make.
 */
const BADGE = [
  "inline-flex h-fit w-fit shrink-0 items-center justify-center",
  "rounded-[999px] border border-accent/40 bg-mcp-surface px-[11px] py-[5px]",
  "text-[11px] font-[650] tracking-[0.14em] whitespace-nowrap uppercase",
  "cursor-default text-accent",
  "[transition:color_0.18s_ease,background-color_0.18s_ease,border-color_0.18s_ease,transform_0.16s_var(--ease-silk)]",
  "fine:hover:border-accent fine:hover:bg-accent",
  "fine:hover:text-charcoal fine:hover:[transform:translateY(-1px)]",
].join(" ");

/**
 * The two slide actions, built from the shared pill the hero and contact footer
 * use, so a card's button is literally the same button as the rest of the page
 * rather than a lookalike. Uppercase and tracked to sit with the chips above.
 */
const ACTION = `${BUTTON} tracking-[0.12em] uppercase no-underline`;

const ACTION_PRIMARY = [
  ACTION,
  BUTTON_LINE,
  BUTTON_PRIMARY,
  "fine:hover:[transform:translateY(-1px)]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
].join(" ");

const ACTION_SECONDARY = [
  ACTION,
  BUTTON_SECONDARY,
  "fine:hover:border-accent/50 fine:hover:bg-accent/10",
  "fine:hover:[transform:translateY(-1px)]",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
].join(" ");

/**
 * Pixels of drag per card.
 *
 * The original expresses this as a `speedDrag` of -0.1 against a 0–100 progress
 * scale, which works out to 200px per card at ten cards. Stated directly here
 * because the arithmetic behind it depended on there being ten.
 */
const DRAG_PER_CARD = 200;

/** How long the glide lasts, in ms. Must match the CSS transition. */
const GLIDE_MS = 800;

/**
 * The deck runs newest-first, so index 0 is the most recent engagement. Opening
 * on it means the first thing seen is the latest work.
 */
const INITIAL = 0;

/**
 * Depth, exactly as the original computes it: the active card takes the highest
 * layer and every other card falls away by its distance from it. Cards on both
 * sides therefore share a layer, which is what lets the deck read as a fan
 * rather than as a stack leaning one way.
 */
const depthOf = (index: number, active: number, count: number) =>
  index === active ? count : count - Math.abs(index - active);

export function CareerCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [active, setActive] = useState(INITIAL);
  const count = CAREER_SLIDES.length;

  /* The input effect below must not re-run when the active card changes.
   *
   * It did at first, and it broke dragging: a drag that crossed a card boundary
   * changed state, which tore down the listeners and rebuilt them — and the
   * `dragging` flag they close over was rebuilt with them, as `false`. The drag
   * died the moment it did anything. Reading the current card from a ref keeps
   * that effect's dependencies stable, so the listeners are bound once and the
   * gesture survives its own consequences. */
  const activeRef = useRef(active);
  activeRef.current = active;

  const goTo = useCallback(
    (next: number) => {
      setActive(Math.max(0, Math.min(count - 1, next)));
    },
    [count],
  );

  /* The oversized word fades as the section clears the viewport, so it never
     collides with whatever scrolls in next.
   *
   * The opacity is written straight to the node rather than held in state. As
   * state it re-rendered the whole deck — six cards, six videos, thirty chips —
   * on every frame of every scroll, which is reconciliation work for a value
   * only one style property ever reads. */
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const fade = window.innerHeight * 0.5;
      heading.style.opacity = String(
        Math.min(1, Math.max(0, (rect.bottom - fade) / fade)),
      );
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* Exactly one clip decodes: the one on the card being read.
   *
   * The scroll version needed an IntersectionObserver rooted on the track to
   * work out which slide that was. A deck already knows. */
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && !reduced) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active]);

  /* Input.
   *
   * The original binds wheel, pointer and touch to `document` and spends `deltaY`
   * on the carousel. That is right for a carousel that *is* the page, and wrong
   * here: this one sits mid-document, and swallowing vertical wheel would trap a
   * visitor who was only trying to scroll past it. So only horizontal-dominant
   * wheel is taken, and it is governed — one gesture advances one card, however
   * long the event stream behind it, because a trackpad emits a burst per flick
   * and an ungoverned burst crosses the whole deck.
   *
   * Touch is not bound at all. `touch-action: pan-y` on the stage leaves vertical
   * panning to the browser, and horizontal swipes arrive as pointer events, so
   * the drag below already handles them. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let settling = false;
    let settleTimer = 0;

    const step = (direction: number) => {
      setActive((current) =>
        Math.max(0, Math.min(count - 1, current + direction)),
      );
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (settling) return;

      settling = true;
      step(Math.sign(event.deltaX));
      settleTimer = window.setTimeout(() => {
        settling = false;
      }, GLIDE_MS);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const direction =
        event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      step(direction);
    };

    /* Drag. Unlike the original this commits at the halfway point rather than at
       a full card's travel — a deck that will not move until the whole distance
       has been covered reads as stuck. */
    let dragging = false;
    let startX = 0;
    let startActive = 0;
    let moved = false;

    const onPointerDown = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest("a,button")) return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startActive = activeRef.current;
      stage.setPointerCapture(event.pointerId);
      stage.classList.add("cursor-grabbing");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const travelled = event.clientX - startX;
      if (Math.abs(travelled) > 4) moved = true;
      // Dragging left goes forward through the deck, as the deck fans right.
      goTo(startActive - Math.round(travelled / DRAG_PER_CARD));
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove("cursor-grabbing");
    };

    // A drag that ends over a link would otherwise fire a real click and
    // navigate — which is why dragging the carousel opened a case study.
    const onClick = (event: MouseEvent) => {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
      moved = false;
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("keydown", onKeyDown);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("click", onClick, true);

    return () => {
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("keydown", onKeyDown);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("click", onClick, true);
      if (settleTimer) window.clearTimeout(settleTimer);
    };
  }, [count, goTo]);

  return (
    <section
      ref={sectionRef}
      className="career-section relative isolate flex max-w-full flex-col items-center overflow-hidden bg-[radial-gradient(circle_at_50%_0%,#dab87614,#0000_38%),oklch(12%_0.011_260)] pt-10 pb-16 text-ink sm:pt-16 sm:pb-24"
      data-section="career"
      aria-labelledby="career-heading"
    >
      {/* Sticky, and *over* the deck: the word is the section's header, so the
          cards pass behind it rather than burying it.

          `pointer-events-none` is not optional once it is on top. It is a
          full-width sticky element sitting across the deck, so without it the
          band it occupies would swallow every drag that started there — the
          carousel would simply refuse to move near its own title. That also
          means it cannot be hovered, which is why the hover flourish it used to
          carry is gone rather than left in as something that can never fire. */}
      <h2
        ref={headingRef}
        id="career-heading"
        className="pointer-events-none sticky top-5 z-20 font-display text-5xl font-[760] tracking-[-0.03em] md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
      >
        {CAREER_HEADING}
      </h2>

      {/* The deck sits just under the word, which is on the layer above it, so a
          card that reaches that high passes behind the title rather than over
          it. `touch-action: pan-y` is what leaves vertical scrolling to the
          browser while horizontal swipes reach the drag handler. */}
      <div
        ref={stageRef}
        tabIndex={0}
        className="career-stage relative z-10 -mt-2 w-full cursor-grab touch-pan-y select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:-mt-5"
        role="region"
        aria-roledescription="carousel"
        aria-label="Career timeline"
        // Two numbers the stylesheet reads, both derived from the data:
        //
        //   --pos    how far through the deck we are, 0 to 1. The stage slides
        //            against it so the one-sided fan stays centred.
        //   --items  the slide count. The card transforms multiply by it to
        //            cancel the division in `--active`, so the fan keeps the
        //            same per-step geometry at any deck size. It lives here
        //            rather than in CSS because CSS cannot count the slides —
        //            hardcoding it meant adding one slide compressed the fan.
        style={
          {
            "--pos": count > 1 ? active / (count - 1) : 0.5,
            "--items": count,
          } as React.CSSProperties
        }
      >
        {CAREER_SLIDES.map((slide, index) => {
          const isActive = index === active;

          return (
            <article
              key={slide.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${slide.title}`}
              // Non-active cards are still visible, so they are not `inert` —
              // that would also swallow the click that selects them. They are
              // taken out of the reading order and their links out of the tab
              // order instead, which is the part that would otherwise announce
              // six overlapping cards and tab through thirty hidden links.
              aria-hidden={!isActive}
              data-active={isActive}
              onClick={() => goTo(index)}
              className={CARD_SHELL}
              style={
                {
                  // The one number every card is positioned from.
                  "--active": (index - active) / count,
                  "--zIndex": depthOf(index, active, count),
                  "--dist": Math.abs(index - active),
                } as React.CSSProperties
              }
            >
              <h3 className="m-0 min-h-9 font-display text-2xl font-[600] tracking-[-0.02em] lg:text-4xl xl:text-5xl 2xl:text-6xl">
                {slide.title}
              </h3>
              <p className="m-0 text-muted lg:text-xl xl:text-2xl 2xl:text-3xl">
                {slide.context}
              </p>

              <div className={CARD_MEDIA}>
                {slide.video ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    {slide.poster && (
                      <Image
                        className="size-full object-cover object-top"
                        src={slide.poster}
                        alt=""
                        fill
                        sizes="(max-width: 1280px) 75vw, 45vw"
                      />
                    )}
                    {/* No `autoPlay`: the effect above starts only the clip on
                        the card being read, so at most one ever decodes. */}
                    <video
                      ref={(node) => {
                        videoRefs.current[index] = node;
                      }}
                      className="absolute inset-0 size-full rounded-xl object-cover object-top"
                      src={slide.video}
                      preload="none"
                      loop
                      muted
                      playsInline
                      aria-label={`${slide.title} — walkthrough of the live site`}
                    />
                  </div>
                ) : slide.poster ? (
                  // No walkthrough, but a captured still: show the still. This
                  // branch is why the media test is `video ? … : poster ? …` and
                  // not just `video ? … : offline` — most engagements have a
                  // screenshot without a clip, and testing only for the clip sent
                  // every one of them to the offline mark with its own capture
                  // sitting unused in the record.
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                    <Image
                      className="size-full object-cover object-top"
                      src={slide.poster}
                      alt={`${slide.title} — the live site`}
                      fill
                      sizes="(max-width: 1280px) 75vw, 45vw"
                    />
                  </div>
                ) : (
                  // Neither: the site is unreachable, so nothing was captured.
                  // A ringed video-off mark, rather than an empty plate.
                  <div className="flex aspect-video w-full items-center justify-center rounded-xl opacity-50 transition-opacity duration-300 hover:opacity-100">
                    <div className="flex size-24 items-center justify-center rounded-full border-4 border-accent sm:size-32 sm:border-6 md:size-36">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-12 sm:size-16 md:size-18"
                        aria-hidden="true"
                      >
                        <path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196" />
                        <path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
                        <path d="m2 2 20 20" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex min-h-11 w-[95%] flex-wrap items-center justify-center gap-2 overflow-hidden">
                {slide.stack.map((tech) => (
                  <span key={tech} className={BADGE}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pb-2">
                {slide.liveUrl && (
                  <a
                    className={ACTION_PRIMARY}
                    href={slide.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    title={slide.title}
                    tabIndex={isActive ? undefined : -1}
                  >
                    Go to website
                  </a>
                )}
                {slide.caseSlug && (
                  <Link
                    className={ACTION_SECONDARY}
                    href={`/work/${slide.caseSlug}`}
                    tabIndex={isActive ? undefined : -1}
                  >
                    See more
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* The deck has no scrollbar, so this is the only thing that says how long
          the timeline is and where in it you are. It is also a real control:
          each dot selects its card. */}
      <div
        className="career-dots relative z-10 mt-6 flex items-center justify-center gap-2"
        role="group"
        aria-label="Select engagement"
      >
        {CAREER_SLIDES.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => goTo(index)}
            aria-label={slide.title}
            aria-current={index === active}
            data-active={index === active}
            className="career-dot h-[3px] cursor-pointer rounded-[999px] border-0 p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          />
        ))}
      </div>
    </section>
  );
}
