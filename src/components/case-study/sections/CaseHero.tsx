import Image from "next/image";
import Link from "next/link";
import type { CaseStudyContent } from "@/content/case-studies";
import type { Project } from "@/content/projects";
import * as S from "../styles";

/**
 * The hero and the cover band beneath it: breadcrumbs, title, the three ruled
 * facts, then the full-width cover.
 */
export function CaseHero({
  project,
  study,
}: {
  project: Project;
  study: CaseStudyContent;
}) {
  return (
    <>
      <section className={`${S.HERO} scroll-mt-[120px]`} id="overview">
        {/* Two crumbs: home, then the current page. The trail ends on a span
            rather than a link, because the current page is not one. */}
        <nav className={S.BREADCRUMBS} aria-label="Breadcrumbs">
          <Link className={S.BREADCRUMB_LINK} href="/">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className={S.BREADCRUMB_CURRENT}>{project.title}</span>
        </nav>

        <div className={S.HERO_COPY}>
          <p className={S.HERO_KICKER}>{project.discipline}</p>
          <h1 className={S.HERO_TITLE}>{project.title}</h1>
          <p className={S.HERO_DECK}>{project.challenge}</p>
        </div>

        <dl className={S.SUMMARY}>
          {study.summary.map((fact) => (
            <div className={S.SUMMARY_CELL} key={fact.term}>
              <dt className={S.SUMMARY_TERM}>{fact.term}</dt>
              <dd className={S.SUMMARY_DETAIL}>{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Every project with a written case study has a cover today; the guard is
          here because `cover` is optional on the record and TypeScript is right
          to insist. */}
      {project.cover && (
        <section className={S.COVER_BAND}>
          <div className={S.COVER_FRAME}>
            <Image
              className="object-contain"
              src={project.cover}
              alt={`${project.title} case study cover`}
              fill
              priority
              sizes="100vw"
            />
          </div>
        </section>
      )}
    </>
  );
}
