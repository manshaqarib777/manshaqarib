"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  particlesFragmentShader,
  particlesVertexShader,
} from "@/shaders/particles.glsl";
import { damp } from "@/lib/utils";
import type { Pointer } from "@/hooks/useMousePosition";

interface ParticleFieldProps {
  count: number;
  pointer: React.RefObject<Pointer>;
  revealRef: React.RefObject<number>;
}

/**
 * Mouse-reactive particle field. One BufferGeometry, one draw call, all motion
 * in the vertex shader — the CPU only updates three uniforms per frame.
 */
export function ParticleField({
  count,
  pointer,
  revealRef,
}: ParticleFieldProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, gl } = useThree();

  // Deterministic scatter: seeded so the layout is identical between renders
  // and never re-randomises on a hot reload or resize.
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 4);

    let seed = 1337;
    const random = () => {
      // Mulberry32 — tiny, fast, good enough for point scatter.
      seed = (seed + 0x6d2b79f5) | 0;
      let t = seed;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    for (let i = 0; i < count; i += 1) {
      // Cube-ish volume, slightly wider than tall to match a landscape viewport.
      positions[i * 3] = (random() - 0.5) * 11;
      positions[i * 3 + 1] = (random() - 0.5) * 7;
      positions[i * 3 + 2] = (random() - 0.5) * 5;

      seeds[i * 4] = random();
      seeds[i * 4 + 1] = random();
      seeds[i * 4 + 2] = random();
      // Size weighting: mostly small points with a few larger ones for depth.
      seeds[i * 4 + 3] = 0.4 + Math.pow(random(), 3) * 2.4;
    }

    return { positions, seeds };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector3() },
      uSize: { value: 1.6 },
      uSpread: { value: 0.9 },
      uReveal: { value: 0 },
      uPixelRatio: { value: 1 },
      uColor: { value: new THREE.Color("#8f9dc9") },
      uAccent: { value: new THREE.Color("#a8b6ff") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const u = material.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uPixelRatio.value = Math.min(gl.getPixelRatio(), 2);

    // Project the normalised pointer into the field's world space so repulsion
    // lines up with the visible cursor at any viewport size.
    const target = pointer.current ?? { nx: 0, ny: 0 };
    const targetX = target.nx * viewport.width * 0.5;
    const targetY = target.ny * viewport.height * 0.5;

    u.uPointer.value.x = damp(u.uPointer.value.x, targetX, 0.08, delta);
    u.uPointer.value.y = damp(u.uPointer.value.y, targetY, 0.08, delta);

    u.uReveal.value = damp(u.uReveal.value, revealRef.current ?? 0, 0.03, delta);
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSeed"
          args={[seeds, 4]}
          count={count}
          itemSize={4}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particlesVertexShader}
        fragmentShader={particlesFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
