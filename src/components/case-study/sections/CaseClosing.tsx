import type { CaseStudyContent } from "@/content/case-studies";
import * as S from "../styles";

/**
 * The closing section: failure states, the decisions, and the dark reflection
 * band. Every part is optional — a study without one renders no such block
 * rather than an empty heading over nothing — and the section itself does not
 * render if none of the three has content.
 */
export function CaseClosing({ study }: { study: CaseStudyContent }) {
  const { failureStates, decisions, reflection } = study;
  if (!failureStates?.length && !decisions?.length && !reflection) return null;

  return (
    <section className={S.CONTENT_SECTION}>
      {failureStates?.length ? (
        <section
          className={S.FAILURE_SECTION}
          aria-labelledby="failure-states-heading"
        >
          <div className={S.SECTION_HEADING_COMPACT}>
            <p className={S.KICKER_PAPER}>The trust test</p>
            <h2
              className={S.SECTION_HEADING_COMPACT_TITLE}
              id="failure-states-heading"
            >
              The happy path is only half the product.
            </h2>
          </div>

          <div className={S.FAILURE_GRID}>
            {failureStates.map((state) => (
              <article className={S.FAILURE_CARD} key={state.heading}>
                <h3 className={S.FAILURE_TITLE}>{state.heading}</h3>
                <p className={S.FAILURE_BODY}>{state.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {decisions?.length ? (
        <section
          className="scroll-mt-[120px]"
          id="decisions"
          aria-labelledby="decisions-heading"
        >
          <div className={S.SECTION_HEADING_COMPACT}>
            <p className={S.KICKER_PAPER}>The decisions</p>
            <h2
              className={S.SECTION_HEADING_COMPACT_TITLE}
              id="decisions-heading"
            >
              {decisions.length === 3
                ? "Three moves carried the story."
                : "The moves that carried the story."}
            </h2>
          </div>

          <div className={S.DECISION_LIST}>
            {decisions.map((decision, index) => (
              <article className={S.DECISION_ROW} key={decision.heading}>
                <span className={S.DECISION_NUMBER} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={S.DECISION_BODY}>
                  <h3 className={S.DECISION_TITLE}>{decision.heading}</h3>
                  <p className={S.DECISION_TEXT}>{decision.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {reflection && (
        <div className={S.REFLECTION}>
          <p className={S.KICKER_DARK}>{reflection.kicker}</p>
          <h2 className={S.REFLECTION_TITLE}>{reflection.statement}</h2>
        </div>
      )}
    </section>
  );
}
