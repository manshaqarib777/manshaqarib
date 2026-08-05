"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Preload } from "@react-three/drei";
import { AuroraPlane } from "./AuroraPlane";
import { ParticleField } from "./ParticleField";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIsMobile, useReducedMotion } from "@/hooks/useMediaQuery";
import { useLoading, useSmoothScroll } from "@/providers";

/**
 * The site's single WebGL surface: a fixed, non-interactive backdrop shared by
 * every section.
 *
 * Cost controls, in order of impact:
 *  - One canvas for the whole app rather than one per section.
 *  - Particle count and DPR scale down on mobile; `AdaptiveDpr` drops
 *    resolution further if the frame budget slips.
 *  - The render loop stops entirely when the tab is hidden, and never starts
 *    under `prefers-reduced-motion` (a single frame is drawn instead).
 */
export default function Scene() {
  const pointer = useMousePosition();
  const revealRef = useRef(0);
  const scrollRef = useRef(0);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const { isRevealing } = useLoading();
  const { progress } = useSmoothScroll();
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Refs, not state: these are read inside the render loop every frame and must
  // not trigger React re-renders.
  revealRef.current = isRevealing || prefersReducedMotion ? 1 : 0;
  scrollRef.current = progress;

  useEffect(() => {
    const onVisibilityChange = () =>
      setIsTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const particleCount = isMobile ? 900 : 2600;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
      data-webgl-root
    >
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          // Depth/stencil buffers are unused: nothing here writes depth.
          depth: false,
          stencil: false,
        }}
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 40 }}
        frameloop={
          prefersReducedMotion ? "demand" : isTabVisible ? "always" : "never"
        }
        performance={{ min: 0.4 }}
      >
        <AuroraPlane
          pointer={pointer}
          revealRef={revealRef}
          scrollRef={scrollRef}
          grain={isMobile ? 0.014 : 0.022}
          instantReveal={prefersReducedMotion}
        />
        {!prefersReducedMotion && (
          <ParticleField
            count={particleCount}
            pointer={pointer}
            revealRef={revealRef}
          />
        )}
        <AdaptiveDpr pixelated={false} />
        <Preload all />
      </Canvas>
    </div>
  );
}
