/**
 * Generates the placeholder artwork in /public.
 *
 * These SVGs exist so the site renders end-to-end before you have real imagery.
 * Replace them with your own photography (same filenames, or update the paths in
 * src/constants/projects.ts) and you can delete this script entirely.
 *
 * Run with: npm run placeholders
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolved from this file so the script works from any cwd.
const OUT = fileURLToPath(new URL("../public", import.meta.url));
mkdirSync(join(OUT, "work"), { recursive: true });

/** Deterministic PRNG so regenerating produces identical files. */
function makeRandom(seed) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cover({ w, h, a, b, label, sub, seed, variant, withText = false }) {
  const rnd = makeRandom(seed);
  const id = `g${seed}`;

  const rings = Array.from({ length: 7 }, (_, i) => {
    const r = (Math.min(w, h) / 2) * (0.28 + i * 0.11);
    return `<circle cx="${w * 0.5}" cy="${h * 0.5}" r="${r.toFixed(1)}" fill="none" stroke="url(#${id}s)" stroke-width="${(1.4 - i * 0.12).toFixed(2)}" opacity="${(0.5 - i * 0.055).toFixed(3)}"/>`;
  }).join("");

  const bars = Array.from({ length: 26 }, (_, i) => {
    const x = (w / 26) * i + w / 52;
    const bh = h * (0.06 + rnd() * 0.52);
    return `<rect x="${x.toFixed(1)}" y="${(h - bh).toFixed(1)}" width="2" height="${bh.toFixed(1)}" fill="url(#${id}s)" opacity="${(0.1 + rnd() * 0.3).toFixed(3)}"/>`;
  }).join("");

  const grid = Array.from({ length: 12 }, (_, i) => {
    const x = (w / 12) * i;
    return `<line x1="${x.toFixed(1)}" y1="0" x2="${x.toFixed(1)}" y2="${h}" stroke="#ffffff" stroke-width="0.5" opacity="0.045"/>`;
  }).join("");

  const shapes = variant === "rings" ? rings : variant === "bars" ? bars : rings + bars;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label} placeholder artwork">
  <defs>
    <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${a}"/>
      <stop offset="100%" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="${id}r" cx="${(0.3 + rnd() * 0.4).toFixed(2)}" cy="${(0.25 + rnd() * 0.4).toFixed(2)}" r="0.75">
      <stop offset="0%" stop-color="${a}" stop-opacity="0.42"/>
      <stop offset="55%" stop-color="${b}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#05060a" stop-opacity="0"/>
    </radialGradient>
    <filter id="${id}n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>

  <rect width="${w}" height="${h}" fill="#080a10"/>
  ${grid}
  <rect width="${w}" height="${h}" fill="url(#${id}r)"/>
  <g>${shapes}</g>
  <rect width="${w}" height="${h}" filter="url(#${id}n)" opacity="0.06"/>

${
    withText
      ? `  <g font-family="ui-monospace, monospace" fill="#ffffff">
    <text x="48" y="${h - 74}" font-size="${Math.round(w / 46)}" letter-spacing="6" opacity="0.92">${label.toUpperCase()}</text>
    <text x="48" y="${h - 40}" font-size="${Math.round(w / 78)}" letter-spacing="4" opacity="0.42">${sub.toUpperCase()}</text>
  </g>`
      : "  <!-- No baked-in label: project titles are rendered as HTML over the image. -->"
  }
</svg>
`;
}

function portrait({ w, h }) {
  const id = "pt";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Portrait placeholder">
  <defs>
    <linearGradient id="${id}a" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stop-color="#5b74ff" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#ff8a5c" stop-opacity="0.28"/>
    </linearGradient>
    <radialGradient id="${id}b" cx="0.5" cy="0.34" r="0.62">
      <stop offset="0%" stop-color="#a8b6ff" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#05060a" stop-opacity="0"/>
    </radialGradient>
    <filter id="${id}n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="#0a0c12"/>
  <rect width="${w}" height="${h}" fill="url(#${id}b)"/>
  <g fill="none" stroke="url(#${id}a)" stroke-width="1.2">
    <circle cx="${w * 0.5}" cy="${h * 0.36}" r="${w * 0.26}" opacity="0.7"/>
    <path d="M${w * 0.16} ${h} C ${w * 0.16} ${h * 0.68}, ${w * 0.34} ${h * 0.6}, ${w * 0.5} ${h * 0.6} C ${w * 0.66} ${h * 0.6}, ${w * 0.84} ${h * 0.68}, ${w * 0.84} ${h}" opacity="0.7"/>
    <circle cx="${w * 0.5}" cy="${h * 0.36}" r="${w * 0.34}" opacity="0.22"/>
  </g>
  <rect width="${w}" height="${h}" filter="url(#${id}n)" opacity="0.07"/>
  <text x="${w * 0.5}" y="${h - 34}" display="none" text-anchor="middle" font-family="ui-monospace, monospace" font-size="${Math.round(w / 30)}" letter-spacing="6" fill="#ffffff" opacity="0.4">PORTRAIT</text>
</svg>
`;
}

const projects = [
  { slug: "halcyon", label: "Halcyon", sub: "Fintech · enterprise react", a: "#6ee7ff", b: "#7c5cff" },
  { slug: "ayshei", label: "Ayshei", sub: "Marketplace · graphql", a: "#8effc1", b: "#3ba3ff" },
  { slug: "lappeland", label: "Lappeland", sub: "E-commerce · next.js app router", a: "#f7c47a", b: "#ff6b57" },
  { slug: "snapdebt", label: "SnapDebt", sub: "Fintech · workflow automation", a: "#c8b6ff", b: "#ff8fd9" },
  { slug: "neonbit", label: "Neonbit", sub: "SaaS · security & rbac", a: "#a8b6ff", b: "#6ee7ff" },
];

let count = 0;
projects.forEach((project, index) => {
  const variants = [
    { name: "cover", w: 1600, h: 1000, variant: "both" },
    { name: "01", w: 1600, h: 1000, variant: "rings" },
    { name: "02", w: 1600, h: 1000, variant: "bars" },
  ];

  variants.forEach((v, vi) => {
    const svg = cover({
      w: v.w,
      h: v.h,
      a: project.a,
      b: project.b,
      label: project.label,
      sub: v.name === "cover" ? project.sub : `${project.sub} · plate ${v.name}`,
      seed: 1000 + index * 17 + vi * 3,
      variant: v.variant,
    });
    writeFileSync(join(OUT, "work", `${project.slug}-${v.name}.svg`), svg);
    count += 1;
  });
});

writeFileSync(join(OUT, "portrait.svg"), portrait({ w: 900, h: 1200 }));
count += 1;

// OG image: 1200x630, the social card.
writeFileSync(
  join(OUT, "og.svg"),
  cover({
    w: 1200,
    h: 630,
    a: "#5b74ff",
    b: "#ff8a5c",
    label: "Mansha Qarib",
    sub: "Senior react developer",
    seed: 4242,
    variant: "both",
    // The social card is the one place the name has to be part of the image.
    withText: true,
  }),
);
count += 1;

console.log(`generated ${count} placeholder assets in ${OUT}`);
