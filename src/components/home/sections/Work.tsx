import Image from "next/image";
import Link from "next/link";
import { WORK_HEADING } from "@/content/home";
import { PROJECTS, type Project } from "@/content/projects";
import { getCaseStudy } from "@/content/case-studies";
import { ProjectWalkthrough } from "../ProjectWalkthrough";
import {
  BUTTON,
  KICKER_WORK,
  METRIC,
  METRIC_LABEL,
  METRIC_VALUE,
  metricRowClass,
  PROJECT,
  PROJECT_AURA,
  PROJECT_VISUAL,
  SECTION_H2_CENTERED,
  SECTION_HEADING,
  TAG,
} from "../styles";

/**
 * The work section: the second light band.
 *
 * Only the featured projects render, each as a full-bleed row — alternating
 * ground tone, a cursor-tracked aura, a tilting cover. All fifteen once did,
 * which came to roughly twenty-four viewports of scroll, and the tail of it
 * restated what each project's own case study already says at greater length.
 *
 * The selection is read from the data rather than sliced by index here, so
 * promoting a project is a one-word edit in `projects.ts` and the numbering
 * follows the featured entries in array order with no gaps.
 *
 * What this costs is worth stating where someone will find it: the unfeatured
 * projects still build `/work/[slug]` pages and still appear in the sitemap, but
 * only the ones the career deck carries a `caseSlug` for — Deliveroo, Halcyon,
 * Neonbit, Salearis, SnapDebt — are reachable by clicking. Five are not linked
 * from anywhere on the site: Global Shopaholic, Morta, LiftFoils, Bang & Olufsen
 * and Moonrock. Promote one here, or give it a career slide, and that changes
 * with no other edit.
 *
 * Emakity is a separate case and not one of the five — its entry in
 * `case-studies.ts` is commented out, so it has no page to be orphaned from.
 *
 * `scroll-mt-*` on the section: the fixed header would otherwise cover the top
 * of the target when someone follows "Work" from the nav.
 */
export function Work() {
  const featured = PROJECTS.filter((project) => project.featured);

  return (
    <section
      className="work scroll-mt-[120px] bg-work text-work-ink"
      id="work"
    >
      <div className={`section-heading ${SECTION_HEADING} text-center`}>
        <div className={`section-kicker ${KICKER_WORK}`}>
          {WORK_HEADING.kicker}
        </div>
        <h2 className={SECTION_H2_CENTERED}>{WORK_HEADING.title}</h2>
      </div>

      {featured.map((project, index) => (
        <ProjectRow key={project.slug} project={project} index={index} />
      ))}
    </section>
  );
}


function ProjectRow({ project, index }: { project: Project; index: number }) {
  // `/work/[slug]` sets `dynamicParams = false`, so a project without a written
  // case study has no page at all — linking one would be a hard 404. Both the
  // cover and the trailing button are gated on the same fact.
  const hasCaseStudy = Boolean(getCaseStudy(project.slug));

  return (
    <article className={`project-${index + 1} ${PROJECT}`}>
      <div className={PROJECT_AURA} aria-hidden="true" />

      <div className="project-heading grid justify-items-center">
        <p className={`project-index m-0 ${KICKER_WORK}`}>
          {String(index + 1).padStart(2, "0")} / {project.discipline}
        </p>
        <h3 className="mx-0 mt-[18px] mb-0 max-w-[960px] font-display text-[clamp(58px,7vw,112px)] leading-[0.95] font-[520] tracking-[0px] text-balance">
          {project.title}
        </h3>
        <p className="project-challenge mx-0 mt-[22px] mb-0 max-w-[640px] text-[clamp(17px,1.6vw,21px)] leading-[1.45] text-balance text-[oklch(45%_0.022_260)]">
          {project.challenge}
        </p>
        <div className="tag-row mt-[28px] flex flex-wrap justify-center gap-[8px]">
          {project.tags.map((tag) => (
            <span className={TAG} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {hasCaseStudy ? (
        <Link
          className={PROJECT_VISUAL}
          href={`/work/${project.slug}`}
          aria-label={`See case study: ${project.title}`}
          data-cursor="See Case Study"
        >
          <ProjectMedia project={project} linked />
        </Link>
      ) : (
        <div className={PROJECT_VISUAL}>
          <ProjectMedia project={project} linked={false} />
        </div>
      )}

      {/* Only real figures ship, so a project with none renders no row rather
          than three padded cells. */}
      {project.metrics.length > 0 && (
        <div className={metricRowClass(project.metrics.length)}>
          {project.metrics.map((metric) => (
            <div className={METRIC} key={metric.label}>
              <strong className={METRIC_VALUE}>{metric.value}</strong>
              <span className={METRIC_LABEL}>{metric.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Same rule as the metric row: a project without a written brief renders
          none rather than an empty pair of columns. */}
      {project.brief && (
        <div className="project-brief mx-auto mt-[-10px] grid w-[min(880px,100%)] grid-cols-[repeat(2,minmax(0,1fr))] gap-[clamp(36px,7vw,96px)] text-left">
          <Brief heading="The challenge" body={project.brief.challenge} />
          <Brief heading="The solution" body={project.brief.solution} />
        </div>
      )}

      {/* `case-link` stays as a class: its trailing chevron is a Material
          Symbols ligature drawn by a CSS `::after`, so the link's text content
          remains exactly the label. */}
      {hasCaseStudy && (
        <Link
          className={`case-link ${BUTTON} mx-auto mt-[-18px] w-fit border-[#15140f2e] bg-[oklch(13%_0.012_260)] text-ink hover:text-ink`}
          href={`/work/${project.slug}`}
        >
          See Case Study
        </Link>
      )}
    </article>
  );
}

/**
 * The media inside a project's cover frame.
 *
 * A walkthrough of the live site fills the frame where one was captured.
 * Neonbit is offline, so it keeps generated artwork — which is drawn to fit,
 * hence `object-contain`.
 *
 * A project with neither renders the empty frame. That is deliberate rather
 * than a fallback: the moment a screenshot is added to `projects.ts` it fills,
 * with no other change anywhere.
 */
function ProjectMedia({
  project,
  linked,
}: {
  project: Project;
  linked: boolean;
}) {
  if (project.video) {
    return (
      <ProjectWalkthrough
        video={project.video}
        poster={project.cover}
        title={project.title}
      />
    );
  }

  if (!project.cover) return null;

  return (
    <Image
      className="size-full object-contain object-center [transition:transform_0.26s_var(--ease-silk),filter_0.22s_ease] will-change-transform"
      src={project.cover}
      alt={`${project.title} ${linked ? "case study preview" : "preview"}`}
      fill
      sizes="(max-width: 980px) 100vw, 52vw"
    />
  );
}

function Brief({ heading, body }: { heading: string; body: string }) {
  return (
    <div>
      <h4 className="m-0 font-display text-[clamp(22px,2.2vw,30px)] leading-[1.1] font-[560] text-[oklch(13%_0.012_260)]">
        {heading}
      </h4>
      <p className="mx-0 mt-[18px] mb-0 text-[16px] leading-[1.5] text-[oklch(42%_0.018_260)]">
        {body}
      </p>
    </div>
  );
}
