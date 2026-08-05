import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import "./ashish.css";
import { DesignMcpPanel } from "./DesignMcpPanel";
import { PerspectiveGrid } from "./PerspectiveGrid";
import { ScrubLine } from "./ScrubLine";
import {
  CAPABILITIES,
  CONTACT,
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
} from "./data";

export const metadata: Metadata = {
  title: "Ashish Ranjan — Product Design Lead",
  description: HERO.text,
  alternates: { canonical: "/ashish" },
};

/**
 * Ashish Ranjan portfolio.
 *
 * A server component: every word of copy ships in the initial HTML. The only
 * client boundaries are the pieces that genuinely need one — the Design MCP
 * panel's tabs, the scrubbed sentence, and the scroll reveals.
 */
export default function AshishPage() {
  return (
    // `id="main"` is the target of the shared skip link in AppShell.
    <main className="site-shell" id="main">
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
            <a className="button primary" href="#work">
              View selected work
            </a>
            <a className="button secondary" href="/resume">
              View resume
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Design MCP */}
      <section className="design-mcp-section" aria-labelledby="design-mcp-title">
        <Reveal className="design-mcp-copy" variant="fade-up">
          <h2 id="design-mcp-title">Stoner&rsquo;s Design MCP for any AI.</h2>
          <p>
            Connect 51 product, visual, frontend, and motion skills to the agent
            where you already work.
          </p>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1}>
          <DesignMcpPanel />
        </Reveal>
      </section>

      {/* --------------------------------------------------------- The throughline */}
      <section className="section intro-section depth-section">
        <div
          className="depth-backdrop depth-backdrop-intro"
          aria-hidden="true"
        />
        <Reveal variant="fade-up" stagger={{ selector: ":scope > *" }}>
          <div className="section-kicker">{INTRO.kicker}</div>
          <h2>{INTRO.title}</h2>
          <p>{INTRO.text}</p>
        </Reveal>
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

        <Reveal
          className="story-bento"
          variant="fade-up"
          stagger={{ selector: ".story-card", amount: 0.08 }}
        >
          {STORY_CARDS.map((card) => (
            <article className={`story-card ${card.size}`} key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </Reveal>

        <ScrubLine text={SCRUB_LINE} />
      </section>

      {/* ---------------------------------------------------------------- Work */}
      <section className="work" id="work">
        <Reveal
          className="section-heading"
          variant="fade-up"
          stagger={{ selector: ":scope > *" }}
        >
          <div className="section-kicker">Five chapters</div>
          <h2>Confidence. Activation. Control.</h2>
        </Reveal>

        {PROJECTS.map((project, index) => (
          <article
            className={`project project-${index + 1}`}
            key={project.slug}
          >
            <div className="project-aura" aria-hidden="true" />

            <Reveal
              className="project-heading"
              variant="fade-up"
              stagger={{ selector: ":scope > *", amount: 0.06 }}
            >
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
            </Reveal>

            <Reveal variant="fade-up" distance={24}>
              <a
                className="project-visual project-visual-link"
                href={`/case-studies/${project.slug}`}
                aria-label={`See case study: ${project.title}`}
                data-cursor="See Case Study"
              >
                <Image
                  src={project.cover}
                  alt={`${project.title} case study preview`}
                  fill
                  sizes="(max-width: 980px) 100vw, 52vw"
                  style={{ objectFit: "cover" }}
                />
              </a>
            </Reveal>

            <Reveal
              className="metric-row"
              variant="fade-up"
              stagger={{ selector: ".metric", amount: 0.08 }}
            >
              {project.metrics.map((metric) => (
                <div className="metric" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </Reveal>

            <Reveal
              className="project-brief"
              variant="fade-up"
              stagger={{ selector: ":scope > div", amount: 0.1 }}
            >
              <div>
                <h4>The challenge</h4>
                <p>{project.brief.challenge}</p>
              </div>
              <div>
                <h4>The solution</h4>
                <p>{project.brief.solution}</p>
              </div>
            </Reveal>

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
        <Reveal
          className="section-heading"
          variant="fade-up"
          stagger={{ selector: ":scope > *" }}
        >
          <div className="section-kicker">How I work</div>
          <h2>Strategy first. Interface second. Evidence always.</h2>
        </Reveal>

        <Reveal
          className="capability-list"
          variant="fade-up"
          stagger={{ selector: ".capability", amount: 0.08 }}
        >
          {CAPABILITIES.map((capability) => (
            <div className="capability" key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.text}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- Experience */}
      <section className="experience depth-section">
        <div
          className="depth-backdrop depth-backdrop-experience"
          aria-hidden="true"
        />
        <div className="section-kicker">Experience</div>

        <Reveal
          variant="fade-up"
          stagger={{ selector: ".experience-row", amount: 0.1 }}
        >
          {EXPERIENCE_ROWS.map((row) => (
            <div className="experience-row" key={row.company}>
              <h2>{row.company}</h2>
              <p>{row.role}</p>
              <span>{row.detail}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* --------------------------------------------------------- Perspective */}
      <section className="perspective depth-section">
        <div
          className="depth-backdrop depth-backdrop-perspective"
          aria-hidden="true"
        />
        <Reveal
          className="perspective-copy"
          variant="fade-up"
          stagger={{ selector: ":scope > *" }}
        >
          <div className="section-kicker">{PERSPECTIVE.kicker}</div>
          <h2>{PERSPECTIVE.title}</h2>
          <p>{PERSPECTIVE.text}</p>
        </Reveal>
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
            Email Ashish
          </a>
          <a className="button secondary" href="/resume">
            View resume
          </a>

          <div className="social-links" aria-label="Social links">
            {SOCIAL_LINKS.map((social) => (
              <a
                className="social-icon"
                href={social.href}
                key={social.label}
                aria-label={social.label}
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
    </main>
  );
}
