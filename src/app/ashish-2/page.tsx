import type { Metadata } from "next";
import Image from "next/image";
import { Courier_Prime } from "next/font/google";
import "./ashish-2.css";
import { DesignMcpPanel } from "./DesignMcpPanel";
import { PerspectiveGrid } from "./PerspectiveGrid";
import { PortfolioMotion } from "./PortfolioMotion";
import { ScrubLine } from "./ScrubLine";
import {
  CAPABILITIES,
  CAPABILITIES_HEADING,
  CONTACT,
  DESIGN_MCP,
  EXPERIENCE_KICKER,
  EXPERIENCE_ROWS,
  HERO,
  INTRO,
  NAV_LINKS,
  PERSPECTIVE,
  PROJECTS,
  SCRUB_LINE,
  SIGNALS,
  SOCIAL_LINKS,
  STORY_CARDS,
  WORK_HEADING,
} from "./data";

/**
 * The reference sets the connector URI in Courier Prime. Declared here rather
 * than in the root layout so the face is only requested on this route.
 */
const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime",
  display: "swap",
});

/**
 * Material Symbols Rounded, at the reference's axis settings and subset to only
 * the six ligatures this page actually renders. `next/font` cannot express
 * `icon_names`, so this stays a stylesheet link — the subset is worth far more
 * than self-hosting the whole icon set would be.
 */
const ICON_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,600,1,0&icon_names=check,content_copy,description,expand_circle_right,link,terminal&display=block";

export const metadata: Metadata = {
  title: "Ashish Ranjan — Product Design Lead",
  description: HERO.text,
  alternates: { canonical: "/ashish-2" },
};

/**
 * Ashish Ranjan portfolio — an exact rebuild of the reference build, matching
 * its markup, copy and type scale.
 *
 * A server component: every word ships in the initial HTML, and the hero needs
 * no client JS at all — the tile flashes and the nav indicator are pure CSS.
 */
export default function AshishTwoPage() {
  return (
    // `id="main"` is the target of the shared skip link in AppShell.
    <main className={`a2-shell ${courierPrime.variable}`} id="main">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href={ICON_FONT_HREF} />

      <header className="site-header">
        <nav className="site-nav" aria-label="Page navigation">
          <a className="brand" href="#top" aria-label="Ashish portfolio home">
            AshishRanjan.
          </a>
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* ---------------------------------------------------------------- Hero */}
      <section className="hero" id="top">
        <PerspectiveGrid variant="hero" />

        <div className="hero-copy">
          <p className="eyebrow">{HERO.eyebrow}</p>
          <h1>{HERO.title}</h1>
          <p className="hero-text">{HERO.text}</p>

          <div className="hero-actions" aria-label="Primary actions">
            <a className="button primary" href={HERO.actions.primary.href}>
              {HERO.actions.primary.label}
            </a>
            <a className="button secondary" href={HERO.actions.secondary.href}>
              {HERO.actions.secondary.label}
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Design MCP */}
      <section
        className="design-mcp-section"
        aria-labelledby="design-mcp-title"
      >
        <div className="design-mcp-copy">
          <h2 id="design-mcp-title">{DESIGN_MCP.title}</h2>
          <p>{DESIGN_MCP.text}</p>
        </div>

        <DesignMcpPanel />
      </section>

      {/* --------------------------------------------------- The throughline */}
      <section className="section intro-section depth-section">
        <div
          className="depth-backdrop depth-backdrop-intro"
          aria-hidden="true"
        />
        <div className="section-kicker">{INTRO.kicker}</div>
        <h2>{INTRO.title}</h2>
        <p>{INTRO.text}</p>
      </section>

      {/* --------------------------------------------------------------- Story */}
      <section className="story-section depth-section" aria-label="Design approach">
        <div
          className="depth-backdrop depth-backdrop-story"
          aria-hidden="true"
        />

        <div className="signal-marquee" aria-hidden="true">
          <div>
            {/* Two passes of the same words: the seam always lands on a copy. */}
            {[...SIGNALS, ...SIGNALS].map((signal, index) => (
              <span key={`${signal}-${index}`}>{signal}</span>
            ))}
          </div>
        </div>

        <div className="story-bento">
          {STORY_CARDS.map((card) => (
            <article className={`story-card ${card.size}`} key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <ScrubLine text={SCRUB_LINE} />
      </section>

      {/* ---------------------------------------------------------------- Work */}
      <section className="work" id="work">
        <div className="section-heading">
          <div className="section-kicker">{WORK_HEADING.kicker}</div>
          <h2>{WORK_HEADING.title}</h2>
        </div>

        {PROJECTS.map((project, index) => (
          <article
            className={`project project-${index + 1}`}
            key={project.slug}
          >
            <div className="project-aura" aria-hidden="true" />

            <div className="project-heading">
              <p className="project-index">
                {String(index + 1).padStart(2, "0")} / {project.discipline}
              </p>
              <h3>{project.title}</h3>
              <p className="project-challenge">{project.challenge}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <a
              className="project-visual project-visual-link"
              href={`/case-studies/${project.slug}`}
              aria-label={`See Case Study: ${project.title}`}
              data-cursor="See Case Study"
            >
              <Image
                src={project.cover}
                alt={`${project.title} case study preview`}
                fill
                sizes="(max-width: 980px) 100vw, 52vw"
                style={{ objectFit: "contain" }}
              />
            </a>

            <div className="metric-row">
              {project.metrics.map((metric) => (
                <div className="metric" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <div className="project-brief">
              <div>
                <h4>The challenge</h4>
                <p>{project.brief.challenge}</p>
              </div>
              <div>
                <h4>The solution</h4>
                <p>{project.brief.solution}</p>
              </div>
            </div>

            <a
              className="button case-link"
              href={`/case-studies/${project.slug}`}
            >
              See Case Study
            </a>
          </article>
        ))}
      </section>

      {/* -------------------------------------------------------- Capabilities */}
      <section className="capabilities depth-section" id="capabilities">
        <div
          className="depth-backdrop depth-backdrop-capabilities"
          aria-hidden="true"
        />

        <div className="section-heading">
          <div className="section-kicker">{CAPABILITIES_HEADING.kicker}</div>
          <h2>{CAPABILITIES_HEADING.title}</h2>
        </div>

        <div className="capability-list">
          {CAPABILITIES.map((capability) => (
            <div className="capability" key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- Experience */}
      <section className="experience depth-section">
        <div
          className="depth-backdrop depth-backdrop-experience"
          aria-hidden="true"
        />

        <div className="section-kicker">{EXPERIENCE_KICKER}</div>

        {EXPERIENCE_ROWS.map((row) => (
          <div className="experience-row" key={row.company}>
            <h2>{row.company}</h2>
            <p>{row.role}</p>
            <span>{row.detail}</span>
          </div>
        ))}
      </section>

      {/* --------------------------------------------------------- Perspective */}
      <section className="perspective depth-section">
        <div
          className="depth-backdrop depth-backdrop-perspective"
          aria-hidden="true"
        />

        <div className="perspective-copy">
          <div className="section-kicker">{PERSPECTIVE.kicker}</div>
          <h2>{PERSPECTIVE.title}</h2>
          <p>{PERSPECTIVE.text}</p>
        </div>
      </section>

      {/* ------------------------------------------------------------- Contact */}
      <footer className="contact" id="contact">
        <PerspectiveGrid variant="contact" />

        <div className="contact-copy">
          <p className="section-kicker">{CONTACT.kicker}</p>
          <h2>{CONTACT.title}</h2>
        </div>

        <div className="contact-actions">
          <a className="button primary" href={`mailto:${CONTACT.email}`}>
            {CONTACT.primary}
          </a>
          <a className="button secondary" href={CONTACT.secondary.href}>
            {CONTACT.secondary.label}
          </a>

          <div className="social-links" aria-label="Social links">
            {SOCIAL_LINKS.map((social) => (
              <a
                className="social-icon"
                href={social.href}
                key={social.label}
                aria-label={social.label}
                data-tooltip={social.label}
                {...(social.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {social.short}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <PortfolioMotion />
    </main>
  );
}
