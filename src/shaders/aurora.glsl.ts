import { simplexNoise3D } from "./noise.glsl";

export const auroraVertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

/**
 * Full-screen gradient field.
 *
 * The plane is drawn in clip space (see the vertex shader) so it always covers
 * the viewport with no camera maths and no resize handling.
 *
 * uPointer smoothly biases the noise domain toward the cursor, so the field
 * appears to bend around the pointer rather than simply brightening.
 * uReveal drives the preloader hand-off: 0 = flat black, 1 = fully lit.
 */
export const auroraFragmentShader = /* glsl */ `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec2  uPointer;
uniform float uAspect;
uniform float uReveal;
uniform float uScrollProgress;
uniform vec3  uColorA;
uniform vec3  uColorB;
uniform vec3  uColorC;
uniform float uGrain;

${simplexNoise3D}

void main() {
  // Work in aspect-corrected, centre-origin space so the field never stretches.
  vec2 uv = vUv - 0.5;
  uv.x *= uAspect;

  float t = uTime * 0.045;

  vec2 pointer = uPointer * 0.5;
  pointer.x *= uAspect;
  float pointerFalloff = 1.0 - smoothstep(0.0, 0.9, length(uv - pointer));

  // Two decorrelated noise samples: one for the base flow, one for the wisps.
  vec3 domain = vec3(uv * 1.35, t);
  domain.xy += pointer * 0.22 * pointerFalloff;
  domain.y -= uScrollProgress * 0.6;

  float base  = fbm(domain);
  float wisps = fbm(domain * 2.4 + vec3(0.0, 0.0, t * 1.8));

  float field = base * 0.65 + wisps * 0.35;
  field = field * 0.5 + 0.5;

  // Ramp the palette through three stops instead of two — the mid stop is what
  // stops the gradient reading as a flat duotone.
  vec3 color = mix(uColorA, uColorB, smoothstep(0.22, 0.82, field));
  // The brightest stop is deliberately hard to reach: this is a backdrop for
  // white body copy, and anything more assertive costs legibility.
  color = mix(color, uColorC, smoothstep(0.72, 1.08, field + pointerFalloff * 0.14));

  // Vignette keeps the type legible at the edges of the viewport.
  float vignette = 1.0 - smoothstep(0.32, 1.02, length(uv));
  color *= mix(0.16, 0.86, vignette);

  // Lift around the pointer: a soft, non-specular glow.
  color += uColorC * pointerFalloff * pointerFalloff * 0.09;

  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  color = mix(color, vec3(luminance), 0.12);

  color *= uReveal;

  float grain = (fract(sin(dot(vUv * uTime, vec2(12.9898, 78.233))) * 43758.5453) - 0.5);
  color += grain * uGrain;

  gl_FragColor = vec4(color, 1.0);
}
`;
