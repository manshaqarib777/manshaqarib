import { simplexNoise3D } from "./noise.glsl";

/**
 * GPU-resident particle field.
 *
 * All motion is computed in the vertex shader from a static buffer of seed
 * positions — nothing is written back to the CPU, so the whole field costs one
 * draw call regardless of particle count.
 *
 * aSeed.xyz gives each point its own phase offset; aSeed.w carries its size and
 * depth weighting so the field reads as volumetric rather than as a flat sheet.
 */
export const particlesVertexShader = /* glsl */ `
precision highp float;

attribute vec4 aSeed;

uniform float uTime;
uniform vec3  uPointer;
uniform float uSize;
uniform float uSpread;
uniform float uReveal;
uniform float uPixelRatio;

varying float vDepth;
varying float vGlow;

${simplexNoise3D}

void main() {
  vec3 pos = position;

  // Slow curl-like drift: sample the noise field at offset domains per axis so
  // points swirl instead of translating together.
  float t = uTime * 0.08 + aSeed.x * 6.28318;
  vec3 domain = pos * 0.28 + vec3(0.0, 0.0, t);

  pos.x += snoise(domain) * uSpread;
  pos.y += snoise(domain + vec3(31.4, 0.0, 0.0)) * uSpread;
  pos.z += snoise(domain + vec3(0.0, 17.9, 0.0)) * uSpread * 0.6;

  // Pointer repulsion with an inverse-square-ish falloff, clamped so points
  // never shoot off screen when the cursor passes directly through them.
  vec3 toPointer = pos - uPointer;
  float distance = length(toPointer);
  float push = 1.0 / (1.0 + distance * distance * 2.2);
  pos += normalize(toPointer + 0.0001) * push * 0.9;
  vGlow = push;

  // Entrance: points arrive from beyond the far plane as uReveal rises.
  pos.z -= (1.0 - uReveal) * 6.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  vDepth = clamp(1.0 - (-mvPosition.z - 1.0) / 8.0, 0.0, 1.0);

  // Perspective-correct point size, scaled for HiDPI.
  gl_PointSize = uSize * aSeed.w * uPixelRatio * (1.0 / -mvPosition.z) * 14.0;
  gl_PointSize *= 1.0 + push * 1.6;
}
`;

export const particlesFragmentShader = /* glsl */ `
precision highp float;

uniform vec3  uColor;
uniform vec3  uAccent;
uniform float uReveal;

varying float vDepth;
varying float vGlow;

void main() {
  // Round, soft-edged sprite drawn analytically — no texture fetch needed.
  vec2 centered = gl_PointCoord - 0.5;
  float radius = length(centered);
  float alpha = smoothstep(0.5, 0.06, radius);
  if (alpha < 0.01) discard;

  vec3 color = mix(uColor, uAccent, clamp(vGlow * 2.4, 0.0, 1.0));

  gl_FragColor = vec4(color, alpha * vDepth * 0.85 * uReveal);
}
`;
