/**
 * Generates the placeholder artwork for the /ashish route.
 *
 * Two sets, both stand-ins:
 *   public/ai-tools/*.svg   — neutral geometric marks. These are NOT the real
 *                             Claude/ChatGPT/Cursor logos; drop the official
 *                             brand SVGs in at the same filenames when you have
 *                             permission to use them.
 *   public/projects/*.svg   — case-study covers. Replace with real screens.
 *
 * Run with: node scripts/generate-ashish-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../public", import.meta.url));
mkdirSync(join(OUT, "ai-tools"), { recursive: true });
mkdirSync(join(OUT, "projects"), { recursive: true });

/** Deterministic PRNG so regenerating produces byte-identical files. */
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

/* --------------------------------------------------------------- agent marks */

/**
 * A distinct abstract glyph per agent, drawn from the same 24×24 grid so the
 * tab row reads as one set.
 */
const MARKS = {
  // Radiating spokes.
  claude: Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 4) * i;
    const x1 = 12 + Math.cos(a) * 3.5;
    const y1 = 12 + Math.sin(a) * 3.5;
    const x2 = 12 + Math.cos(a) * 9;
    const y2 = 12 + Math.sin(a) * 9;
    return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`;
  }).join(""),
  // Interlocking knot.
  chatgpt: `<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 3.5v17M3.5 12h17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity="0.45"/>`,
  // Cursor caret.
  cursor: `<path d="M5 3.5 19 12 5 20.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`,
  // Claw / bracket pair.
  openclaw: `<path d="M9.5 4.5C6 7 6 17 9.5 19.5M14.5 4.5C18 7 18 17 14.5 19.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>`,
  // Winged bar.
  hermes: `<path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`,
};

for (const [name, body] of Object.entries(MARKS)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" role="img"><title>${name} (placeholder mark)</title>${body}</svg>`;
  writeFileSync(join(OUT, "ai-tools", `${name}.svg`), svg);
}

/* ------------------------------------------------------------ case covers */

function cover({ label, sub, seed, a, b }) {
  const w = 1600;
  const h = 1000;
  const rnd = makeRandom(seed);
  const id = `c${seed}`;

  // A faint receding grid, echoing the hero.
  const grid = [
    ...Array.from({ length: 17 }, (_, i) => {
      const x = (w / 16) * i;
      return `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#fff" stroke-width="1" opacity="0.035"/>`;
    }),
    ...Array.from({ length: 11 }, (_, i) => {
      const y = (h / 10) * i;
      return `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#fff" stroke-width="1" opacity="0.035"/>`;
    }),
  ].join("");

  // Stacked "cards", suggesting a UI without pretending to be one.
  const cards = Array.from({ length: 3 }, (_, i) => {
    const cw = 320 + rnd() * 90;
    const ch = 190 + rnd() * 260;
    const x = 190 + i * 400;
    const y = h / 2 - ch / 2 + (rnd() - 0.5) * 90;
    return `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${cw.toFixed(0)}" height="${ch.toFixed(0)}" rx="26" fill="url(#${id}c)" stroke="#fff" stroke-opacity="0.12"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
<title>${label} — placeholder cover</title>
<defs>
<linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
<linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.10"/><stop offset="1" stop-color="#fff" stop-opacity="0.02"/></linearGradient>
<radialGradient id="${id}g" cx="0.5" cy="0.15" r="0.8"><stop offset="0" stop-color="#8296ff" stop-opacity="0.28"/><stop offset="1" stop-color="#8296ff" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#${id}b)"/>
${grid}
<rect width="${w}" height="${h}" fill="url(#${id}g)"/>
${cards}
<text x="96" y="${h - 128}" fill="#ffffff" fill-opacity="0.92" font-family="Inter, system-ui, sans-serif" font-size="58" font-weight="600" letter-spacing="-1.6">${label}</text>
<text x="96" y="${h - 74}" fill="#ffffff" fill-opacity="0.5" font-family="Inter, system-ui, sans-serif" font-size="28" letter-spacing="0.5">${sub}</text>
</svg>`;
}

const COVERS = [
  {
    file: "ai-trial-room-cover.svg",
    label: "AI Trial Room",
    sub: "Consumer AI / Commerce",
    seed: 11,
    a: "#0a0f1c",
    b: "#141a2e",
  },
  {
    file: "equal-onboarding-cover.svg",
    label: "Equal AI Onboarding",
    sub: "Activation / Trust / Mobile UX",
    seed: 22,
    a: "#0b1016",
    b: "#182234",
  },
  {
    file: "equal-call-preference-cover.svg",
    label: "AI Muting Promotional Calls",
    sub: "AI controls / Preference systems",
    seed: 33,
    a: "#0a0d14",
    b: "#1b1c30",
  },
  {
    file: "meesho-mall-cover.svg",
    label: "Meesho Mall",
    sub: "Commerce / Trust / Brand experience",
    seed: 44,
    a: "#120d16",
    b: "#241a2c",
  },
  {
    file: "hvai-cover.svg",
    label: "The paywall that waits",
    sub: "Product strategy / Monetisation",
    seed: 55,
    a: "#0a1014",
    b: "#152628",
  },
];

for (const spec of COVERS) {
  writeFileSync(join(OUT, "projects", spec.file), cover(spec));
}

console.log(
  `Wrote ${Object.keys(MARKS).length} agent marks and ${COVERS.length} covers.`,
);
