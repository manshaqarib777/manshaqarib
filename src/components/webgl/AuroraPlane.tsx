"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { auroraFragmentShader, auroraVertexShader } from "@/shaders/aurora.glsl";
import { damp } from "@/lib/utils";
import type { Pointer } from "@/hooks/useMousePosition";

interface AuroraPlaneProps {
  pointer: React.RefObject<Pointer>;
  /** 0 → 1 reveal driven by the preloader hand-off. */
  revealRef: React.RefObject<number>;
  scrollRef: React.RefObject<number>;
  grain?: number;
  /**
   * Skip the damped reveal and apply it in one frame. Required when the render
   * loop is on demand (reduced motion), where a damped value would never
   * converge because only a single frame is ever drawn.
   */
  instantReveal?: boolean;
}

/**
 * A single clip-space quad carrying the gradient field. Because the vertex
 * shader bypasses the camera entirely, this needs no resize logic beyond the
 * aspect uniform.
 */
export function AuroraPlane({
  pointer,
  revealRef,
  scrollRef,
  grain = 0.022,
  instantReveal = false,
}: AuroraPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uAspect: { value: 1 },
      uReveal: { value: 0 },
      uScrollProgress: { value: 0 },
      uColorA: { value: new THREE.Color("#05060a") },
      uColorB: { value: new THREE.Color("#0d1122") },
      uColorC: { value: new THREE.Color("#3b4dad") },
      uGrain: { value: grain },
    }),
    [grain],
  );

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const u = material.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uAspect.value = size.width / size.height;

    // Pointer is damped here rather than in the shader so the easing is
    // frame-rate independent and shared with the particle field.
    const target = pointer.current ?? { nx: 0, ny: 0 };
    u.uPointer.value.x = damp(u.uPointer.value.x, target.nx, 0.06, delta);
    u.uPointer.value.y = damp(u.uPointer.value.y, target.ny, 0.06, delta);

    const reveal = revealRef.current ?? 0;
    u.uReveal.value = instantReveal
      ? reveal
      : damp(u.uReveal.value, reveal, 0.04, delta);
    u.uScrollProgress.value = scrollRef.current ?? 0;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={auroraVertexShader}
        fragmentShader={auroraFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
