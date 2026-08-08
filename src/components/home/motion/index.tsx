"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Scroll motion for the home page.
 *
 * One component owns every tween rather than scattering them through the
 * sections, because they share a single `gsap.context()` — that context reverts
 * as a unit, so nothing is left mid-tween when the route unmounts.
 *
 * Selectors are read from the live DOM instead of refs, matching how the
 * the page is built: the sections stay server components with no client
 * boundary of their own, and only this one sibling ships JS.
 */
export function HomeMotion() {
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      // Scroll motion is skipped entirely under reduced motion —
      // the CSS safety net keeps every element visible in its final state.
      if (prefersReducedMotion) return;

      // Travel is scaled down on small screens, where the same pixel offsets
      // read as far more movement relative to the viewport.
      const travel = window.matchMedia("(max-width: 768px)").matches ? 0.58 : 1;

      // Pointer listeners are not GSAP animations, so the context cannot revert
      // them for us. They are collected here and torn down together below.
      const cleanups: (() => void)[] = [];

      /* ------------------------------------------------------------- Hero */

      gsap.from(".hero-copy > *", {
        opacity: 0,
        transform: "translate3d(0, 18px, 0)",
        filter: "blur(8px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
      });

      gsap.to(".hero-copy", {
        yPercent: -18 * travel,
        opacity: 0.32,
        scale: 0.96,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.75,
        },
      });

      // The grid drifts faster than the copy, which is what separates the two
      // planes in depth.
      //
      // Scale is pinned at the larger of the two former endpoints rather than
      // animated. An animated scale re-rasterises the layer every scrubbed
      // frame; a constant one lets the compositor reuse the raster and only move
      // it. Pinning at the top of the old range keeps coverage at least as wide
      // as before, so no edge can creep into view mid-drift.
      gsap.fromTo(
        ".hero-perspective-grid",
        { yPercent: 0, scale: 1.16 },
        {
          yPercent: 22 * travel,
          scale: 1.16,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.9,
          },
        },
      );

      /* -------------------------------------------------------- Design MCP */

      gsap.from(".design-mcp-copy > *", {
        opacity: 0,
        transform: "translate3d(0, 18px, 0)",
        duration: 0.64,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ".design-mcp-copy", start: "top 82%" },
      });

      gsap.from(".design-mcp-panel", {
        opacity: 0,
        transform: "translate3d(0, 24px, 0)",
        duration: 0.68,
        ease: "power3.out",
        scrollTrigger: { trigger: ".design-mcp-panel", start: "top 88%" },
      });

      gsap.from(".design-mcp-step", {
        opacity: 0,
        transform: "translate3d(0, 16px, 0)",
        duration: 0.56,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".design-mcp-steps", start: "top 86%" },
      });

      /* -------------------------------------------------- The throughline */

      gsap.from(".intro-section > :not(.depth-backdrop)", {
        y: 18,
        duration: 0.62,
        ease: "power3.out",
        stagger: 0.055,
        scrollTrigger: { trigger: ".intro-section", start: "top 82%" },
      });

      gsap.to(".intro-section > :not(.depth-backdrop)", {
        y: -48 * travel,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.85,
        },
      });

      /* --------------------------------------------------------------- Story */

      gsap.from(".story-card", {
        transform: "translate3d(0, 22px, 0)",
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".story-bento", start: "top 78%" },
      });

      // The marquee drifts fastest, the bento slowest — three separate speeds
      // through the same section is what reads as depth.
      gsap.to(".signal-marquee", {
        yPercent: -28 * travel,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".story-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.to(".story-bento", {
        yPercent: -9 * travel,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".story-section",
          start: "top 92%",
          end: "bottom 12%",
          scrub: 0.85,
        },
      });

      // Words resolve from 18% to full as the sentence crosses the viewport, so
      // reading speed is tied to scroll position.
      gsap.fromTo(
        ".scrub-word",
        { opacity: 0.18, transform: "translate3d(0, 10px, 0)" },
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0)",
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: ".scrub-line",
            start: "top 82%",
            end: "bottom 48%",
            scrub: true,
          },
        },
      );

      /* ---------------------------------------------------------------- Work */

      gsap.to(".work .section-heading", {
        yPercent: -14 * travel,
        ease: "none",
        force3D: true,
        stagger: 0.02,
        scrollTrigger: {
          trigger: ".work",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      // Pointer effects are gated on a real pointer: on touch they would either
      // never fire or stick on first tap.
      const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;

      gsap.utils.toArray<HTMLElement>(".project").forEach((project) => {
        const visual = project.querySelector<HTMLElement>(
          ".project-visual-link",
        );
        const heading = project.querySelector<HTMLElement>(".project-heading");
        const caseLink = project.querySelector<HTMLElement>(".case-link");
        const rows = project.querySelectorAll(".metric-row, .project-brief");

        if (visual) {
          // The cover resolves as it enters, then keeps drifting for the rest of
          // the section — two triggers on one element with different ranges.
          gsap.fromTo(
            visual,
            { scale: 0.94, opacity: 0.62 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: project,
                start: "top 82%",
                end: "center 42%",
                scrub: true,
              },
            },
          );

          gsap.to(visual, {
            y: -96 * travel,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: project,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
            },
          });
        }

        if (heading) {
          gsap.to(heading, {
            yPercent: -12 * travel,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: project,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.85,
            },
          });

          gsap.from(heading, {
            transform: "translate3d(0, 22px, 0)",
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: project, start: "top 76%" },
          });
        }

        if (caseLink) {
          gsap.from(caseLink, {
            transform: "translate3d(0, 12px, 0)",
            duration: 0.45,
            ease: "power3.out",
            scrollTrigger: { trigger: project, start: "top 68%" },
          });
        }

        // A project with no hard figures renders no `.metric-row`, so the
        // trigger falls back to the brief and then to the project itself —
        // ScrollTrigger given a null trigger would silently never fire.
        const revealed = project.querySelectorAll(
          ".metric, .project-brief > div",
        );
        if (revealed.length) {
          gsap.from(revealed, {
            transform: "translate3d(0, 14px, 0)",
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.055,
            scrollTrigger: {
              trigger:
                project.querySelector(".metric-row") ??
                project.querySelector(".project-brief") ??
                project,
              start: "top 84%",
            },
          });
        }

        gsap.to(rows, {
          y: -36 * travel,
          ease: "none",
          force3D: true,
          stagger: 0.025,
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });

        // Tilt: the handler only writes CSS variables, and the stylesheet decides
        // what to do with them.
        if (visual && canHover) {
          const onMove = (event: PointerEvent) => {
            const box = visual.getBoundingClientRect();
            const x = (event.clientX - box.left) / box.width - 0.5;
            const y = (event.clientY - box.top) / box.height - 0.5;

            visual.style.setProperty("--tilt-x", `${-y * 2.2}deg`);
            visual.style.setProperty("--tilt-y", `${x * 4.4}deg`);
            visual.style.setProperty("--image-x", `${x * 16}px`);
            visual.style.setProperty("--image-y", `${y * 12}px`);
            visual.style.setProperty("--cover-x", `${event.clientX - box.left}px`);
            visual.style.setProperty("--cover-y", `${event.clientY - box.top}px`);
          };

          const onLeave = () => {
            visual.style.setProperty("--tilt-x", "0deg");
            visual.style.setProperty("--tilt-y", "0deg");
            visual.style.setProperty("--image-x", "0px");
            visual.style.setProperty("--image-y", "0px");
          };

          visual.addEventListener("pointermove", onMove, { passive: true });
          visual.addEventListener("pointerleave", onLeave);

          cleanups.push(() => {
            visual.removeEventListener("pointermove", onMove);
            visual.removeEventListener("pointerleave", onLeave);
          });
        }
      });

      // The aura follows the cursor across the whole project row. `quickTo`
      // reuses one tween per axis instead of allocating on every pointer event.
      if (canHover) {
        gsap.utils.toArray<HTMLElement>(".project").forEach((project) => {
          const aura = project.querySelector<HTMLElement>(".project-aura");
          if (!aura) return;

          const moveX = gsap.quickTo(aura, "x", {
            duration: 0.5,
            ease: "power3.out",
          });
          const moveY = gsap.quickTo(aura, "y", {
            duration: 0.5,
            ease: "power3.out",
          });

          const onMove = (event: PointerEvent) => {
            const box = project.getBoundingClientRect();
            moveX(event.clientX - box.left - box.width / 2);
            moveY(event.clientY - box.top - box.height / 2);
          };
          const onEnter = () =>
            gsap.to(aura, { opacity: 1, duration: 0.2, ease: "power2.out" });
          const onLeave = () =>
            gsap.to(aura, { opacity: 0, duration: 0.16, ease: "power2.out" });

          project.addEventListener("pointermove", onMove, { passive: true });
          project.addEventListener("pointerenter", onEnter);
          project.addEventListener("pointerleave", onLeave);

          cleanups.push(() => {
            project.removeEventListener("pointermove", onMove);
            project.removeEventListener("pointerenter", onEnter);
            project.removeEventListener("pointerleave", onLeave);
          });
        });
      }

      /* -------------------------------------- Capabilities and experience */

      // Same entrance for each: kicker/heading and cards rise together.
      (
        [
          {
            targets: ".capabilities .section-heading > *, .capability",
            trigger: ".capabilities",
          },
          {
            targets: ".experience > .section-kicker, .experience-row",
            trigger: ".experience",
          },
          { targets: ".perspective-copy > *", trigger: ".perspective" },
          {
            targets: ".contact-copy, .contact-actions",
            trigger: ".contact",
          },
        ] as const
      ).forEach(({ targets, trigger }) => {
        gsap.from(targets, {
          y: 16,
          duration: 0.58,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger, start: "top 80%" },
        });
      });

      (
        [
          {
            target: ".capabilities .section-heading",
            trigger: ".capabilities",
            amount: -12,
          },
          {
            target: ".experience > .section-kicker",
            trigger: ".experience",
            amount: -10,
          },
          {
            target: ".perspective-copy",
            trigger: ".perspective",
            amount: -12,
          },
        ] as const
      ).forEach(({ target, trigger, amount }) => {
        gsap.to(target, {
          yPercent: amount * travel,
          ease: "none",
          force3D: true,
          stagger: 0.02,
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      });

      /* ------------------------------------------------------------- Contact */

      // The contact grid runs the hero's move in reverse — settling instead of
      // pulling away, so the page closes rather than continuing. Scale constant,
      // for the same rasterisation reason as the hero grid.
      gsap.fromTo(
        ".contact-perspective-grid",
        { yPercent: -18 * travel, scale: 1.16 },
        {
          yPercent: 4 * travel,
          scale: 1.16,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: ".contact",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.9,
          },
        },
      );

      gsap.to(".contact-copy, .contact-actions", {
        yPercent: -18 * travel,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: ".contact",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.85,
        },
      });

      /* --------------------------------------------------- Depth backdrops */

      // Alternating horizontal drift, so consecutive sections do not all slide
      // the same way as the page scrolls.
      gsap.utils.toArray<HTMLElement>(".depth-backdrop").forEach((backdrop, index) => {
        const section = backdrop.closest(".depth-section");
        if (!section) return;

        const direction = index % 2 === 0 ? 1 : -1;

        // Scale constant at the top of its old range, as on the two grids: these
        // are the widest layers on the page and there is one per depth section,
        // so an animated scale here was the largest single source of scrubbed
        // re-rasterisation.
        gsap.fromTo(
          backdrop,
          {
            yPercent: -12 * travel,
            xPercent: -3 * direction * travel,
            scale: 1.14,
          },
          {
            yPercent: 12 * travel,
            xPercent: 3 * direction * travel,
            scale: 1.14,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          },
        );
      });

      // A function returned from a gsap context runs when that context reverts,
      // which is exactly when these listeners should go.
      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true },
  );

  return null;
}
