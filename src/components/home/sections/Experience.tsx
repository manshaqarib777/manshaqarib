import { EXPERIENCE_KICKER, EXPERIENCE_ROWS } from "@/content/home";
import {
  DEPTH_BACKDROP,
  DEPTH_SECTION,
  EXPERIENCE,
  EXPERIENCE_COMPANY,
  EXPERIENCE_DETAIL,
  EXPERIENCE_ROLE,
  EXPERIENCE_ROW,
  KICKER_PAPER,
  SECTION_PAD,
} from "../styles";

export function Experience() {
  return (
    <section className={`${EXPERIENCE} ${DEPTH_SECTION} ${SECTION_PAD}`}>
      <div
        className={`${DEPTH_BACKDROP} depth-backdrop-experience`}
        aria-hidden="true"
      />

      {/* The motion module matches `.experience > .section-kicker`, so this must
          stay a direct child and keep the class. */}
      <div className={`section-kicker ${KICKER_PAPER}`}>{EXPERIENCE_KICKER}</div>

      {EXPERIENCE_ROWS.map((row) => (
        <div className={EXPERIENCE_ROW} key={row.company}>
          <h2 className={EXPERIENCE_COMPANY}>{row.company}</h2>
          <p className={EXPERIENCE_ROLE}>{row.role}</p>
          <span className={EXPERIENCE_DETAIL}>{row.detail}</span>
        </div>
      ))}
    </section>
  );
}
