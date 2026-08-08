import type { CaseStudyContent } from "@/content/case-studies";
import type { Project } from "@/content/projects";
import * as S from "../styles";

/**
 * The first light section: the framing tension, the two-column pair, the dark
 * proof band, and the figures.
 */
export function CaseStoryIntro({
  project,
  study,
}: {
  project: Project;
  study: CaseStudyContent;
}) {
  return (
    <section className={S.STORY_INTRO}>
      <div className={S.STORY_HOOK}>
        <p className={S.KICKER_PAPER}>{study.hook.kicker}</p>
        <h2 className={S.STORY_HOOK_TITLE}>{study.hook.statement}</h2>
      </div>

      <div className={S.STORY_PAIR}>
        {study.pair.map((item) => (
          <article className={S.STORY_PAIR_ITEM} key={item.label}>
            <span className={S.STORY_PAIR_LABEL}>{item.label}</span>
            <p className={S.STORY_PAIR_BODY}>{item.body}</p>
          </article>
        ))}
      </div>

      <div className={S.PROOF_LINE}>
        {study.proof.map((item) => (
          <div className={S.PROOF_ITEM} key={item.label}>
            <span className={S.PROOF_LABEL}>{item.label}</span>
            <p className={S.PROOF_BODY}>{item.body}</p>
          </div>
        ))}
      </div>

      {/* Only real figures ship, so the row sizes itself to the count and a
          project with none renders no row at all. */}
      {project.metrics.length > 0 && (
        <div className={S.metricRowClass(project.metrics.length)}>
          {project.metrics.map((metric) => (
            <div className={S.METRIC} key={metric.label}>
              <strong className={S.METRIC_VALUE}>{metric.value}</strong>
              <span className={S.METRIC_LABEL}>{metric.label}</span>
              {study.metricNotes?.[metric.label] && (
                <p className={S.METRIC_NOTE}>
                  {study.metricNotes[metric.label]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
