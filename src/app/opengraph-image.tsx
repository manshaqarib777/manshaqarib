import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

/**
 * The social card, rendered to a real 1200×630 PNG at build time.
 *
 * This replaces a hand-drawn `/og.svg` that had been deleted from `public/`, so
 * every share of the site was resolving `og:image` to a 404. It was also an SVG,
 * which most platforms — X, LinkedIn, Slack, iMessage — refuse to render at all.
 *
 * As a file convention this needs no wiring in `layout.tsx`: Next emits the
 * `og:image` and `twitter:image` tags, with their dimensions and alt text, from
 * the exports below.
 */

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // The page's own ground and amber wash. Written as hex/rgba rather
          // than the oklch tokens because Satori resolves neither CSS custom
          // properties nor oklch() — these are the exact sRGB values those
          // tokens convert to, so the card matches the site rather than
          // approximating it.
          backgroundColor: "#030407",
          backgroundImage:
            "radial-gradient(circle at 22% 0%, rgba(218,184,118,0.16), rgba(0,0,0,0) 45%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            color: "#F5EEE1",
            letterSpacing: "-0.04em",
          }}
        >
          ManshaQarib.
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#D6B178",
            }}
          >
            {SITE.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.045em",
              color: "#F5EEE1",
            }}
          >
            Systems that do the work.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 820,
              fontSize: 28,
              lineHeight: 1.35,
              color: "#B5A998",
            }}
          >
            Full-stack applications end to end, with the AI inside them —
            retrieval assistants, document extraction and semantic search.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "1px solid rgba(245,238,225,0.16)",
            paddingTop: 24,
            fontSize: 24,
            color: "#B5A998",
          }}
        >
          {SITE.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size,
  );
}
