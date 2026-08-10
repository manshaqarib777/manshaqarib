import type { CaseStudyContent } from "@/content/case-studies";
import type { Project } from "@/content/projects";
import { PaintPassMotion } from "../PaintPassMotion";
import * as S from "../styles";

/**
 * The product story: the paint pass, then the walkthrough.
 *
 * This is the one section whose presentation stays in CSS. `src/styles/
 * case-study.css` documents why in full — `grid-template-areas`,
 * `display: contents`, side alternation driven by `data-side`, a `clip-path`
 * fed by a custom property, and three pseudo-elements. Class names inside
 * `.paint-stage` are therefore load-bearing hooks, not decoration.
 */
export function CaseProduct({
  project,
  study,
}: {
  project: Project;
  study: CaseStudyContent;
}) {
  const { screens, productHeading } = study;
  if (!screens?.length) return null;

  return (
    <section className={`${S.MEDIA_SECTION} scroll-mt-[120px]`} id="product">
      {productHeading && (
        <div className={S.SECTION_HEADING}>
          <p className={S.KICKER_PAPER}>{productHeading.kicker}</p>
          <h2 className={S.SECTION_HEADING_TITLE}>
            {productHeading.statement}
          </h2>
        </div>
      )}

      {/* The stage's arrival state is unpainted, which is also what a visitor
          with the script blocked would be left looking at. This is the escape
          hatch — the same one the home route's loader carries. */}
      <noscript>
        <style>{`.portfolio.case-page .paint-veil, .portfolio.case-page .paint-head { display: none; }`}</style>
      </noscript>

      <div className="paint-stage">
        {screens.map((screen, index) => (
          <article
            className="paint-beat"
            // The first beat is the pitch and is composed as one; the rest are
            // the deeper story, and alternate side down the stage.
            data-beat={index === 0 ? "lead" : "support"}
            data-side={
              index === 0 ? undefined : index % 2 === 1 ? "left" : "right"
            }
            key={screen.heading}
          >
            {/* Positional, like the numerals in the decisions list, so it is not
                announced twice over the label beside it. */}
            <p className="paint-beat-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </p>

            <div className="paint-beat-body">
              <div className="paint-beat-copy">
                <p className="paint-beat-label">{screen.label}</p>
                <h3>{screen.heading}</h3>
                <p className="paint-beat-deck">{screen.body}</p>
              </div>

              <figure className="paint-figure" data-shot={screen.shot}>
                {/* Intrinsic size differs per shot and the CSS frames each one
                    at its own shape off `data-shot`, so this is a plain `img`
                    with `loading="lazy"` rather than a fill `Image` in a
                    fixed-ratio box. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={screen.image} alt={screen.alt} loading="lazy" />
                <figcaption>
                  <strong>{screen.caption.title}</strong>
                  <span>{screen.caption.detail}</span>
                </figcaption>
              </figure>
            </div>

            <div className="paint-veil" aria-hidden="true" />
            <div className="paint-head" aria-hidden="true">
              <span>First paint</span>
            </div>
          </article>
        ))}
      </div>

      <PaintPassMotion />

      {study.video && (project.mobileVideo || project.video) && (
        <figure className={S.VIDEO_BLOCK}>
          <div className={S.VIDEO_COPY}>
            <p className={S.KICKER_PAPER}>{study.video.kicker}</p>
            <h3 className={S.VIDEO_TITLE}>{study.video.heading}</h3>
            <p className={S.VIDEO_BODY}>{study.video.body}</p>
          </div>
          {/* The shell follows the footage, not the other way round: a phone for
              a phone-width capture, a 16:9 slab for the desktop clip. Poster is
              dropped on the phone shell — `project.cover` is a 16:10 desktop
              still, and standing it in front of portrait footage is the same
              crop this section was fixed to stop doing. */}
          <div
            className={
              project.mobileVideo ? S.VIDEO_FRAME : S.VIDEO_FRAME_DESKTOP
            }
          >
            {/* `preload="none"`: the walkthrough is well below the fold and
                nobody should pay for it on arrival. */}
            <video
              className={S.VIDEO_ELEMENT}
              controls
              playsInline
              preload="none"
              poster={project.mobileVideo ? undefined : project.cover}
              aria-label={
                project.mobileVideo
                  ? `${project.title} — walkthrough of the live site at phone width`
                  : `${project.title} — walkthrough of the live site`
              }
            >
              <source
                src={project.mobileVideo ?? project.video}
                type="video/mp4"
              />
            </video>
          </div>
        </figure>
      )}
    </section>
  );
}
