"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface HoverPreviewProps {
  projects: Project[];
  /** Slug of the row currently hovered, or null when nothing is. */
  activeSlug: string | null;
}

/**
 * Floating project preview that follows the pointer across the project list.
 *
 * Design notes:
 *  - All covers are mounted once and cross-faded. Mounting on hover would mean a
 *    decode on first reveal and a visible pop.
 *  - Position uses `gsap.quickTo` with a longer duration than the cursor, so the
 *    panel trails the pointer — that lag is what sells the weight.
 *  - Horizontal pointer velocity feeds a small rotation, so the panel banks into
 *    the direction of travel and settles back when the pointer stops.
 */
export function HoverPreview({ projects, activeSlug }: HoverPreviewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const activeSlugRef = useRef<string | null>(activeSlug);
  activeSlugRef.current = activeSlug;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.set(root, { xPercent: -50, yPercent: -50 });

    const moveX = gsap.quickTo(root, "x", { duration: 0.7, ease: "power3.out" });
    const moveY = gsap.quickTo(root, "y", { duration: 0.7, ease: "power3.out" });
    const rotate = gsap.quickTo(root, "rotate", {
      duration: 0.9,
      ease: "power3.out",
    });

    let lastX = 0;

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);

      const velocity = event.clientX - lastX;
      lastX = event.clientX;
      rotate(gsap.utils.clamp(-9, 9, velocity * 0.45));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(root);
    };
  }, []);

  // Show/hide as the active row changes.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.to(root, {
      autoAlpha: activeSlug ? 1 : 0,
      scale: activeSlug ? 1 : 0.82,
      duration: 0.6,
      ease: "expo.out",
      overwrite: true,
    });
  }, [activeSlug]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[15rem] w-[21rem] overflow-hidden rounded-xl opacity-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] will-change-transform lg:block"
    >
      {projects.map((project) => (
        <div
          key={project.slug}
          className={cn(
            "absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            activeSlug === project.slug ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="336px"
            className="object-cover"
          />
          <div
            className="absolute inset-0 mix-blend-soft-light"
            style={{
              backgroundImage: `linear-gradient(135deg, ${project.accent[0]}, ${project.accent[1]})`,
              opacity: 0.35,
            }}
          />
        </div>
      ))}
    </div>
  );
}
