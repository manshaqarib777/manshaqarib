"use client";

import { useEffect, useRef } from "react";

export interface Pointer {
  /** Raw viewport coordinates. */
  x: number;
  y: number;
  /** Normalised to −1 → 1 with the origin at the viewport centre. */
  nx: number;
  ny: number;
}

/**
 * Pointer position in a ref rather than state — deliberately.
 *
 * Storing it in state would re-render every consumer on every mousemove. Every
 * reader here is an animation loop (GSAP ticker or R3F frame), so a mutable ref
 * is both correct and dramatically cheaper.
 */
export function useMousePosition() {
  const pointer = useRef<Pointer>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      pointer.current.nx = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.ny = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pointer;
}
