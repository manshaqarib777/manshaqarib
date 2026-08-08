import { PERSPECTIVE } from "@/content/home";
import {
  DEPTH_BACKDROP,
  DEPTH_SECTION,
  KICKER_PAPER,
  PERSPECTIVE_COPY,
  PERSPECTIVE_H2,
  PERSPECTIVE_SECTION,
  PERSPECTIVE_TEXT,
  SECTION_PAD,
} from "../styles";

export function Perspective() {
  return (
    <section className={`${PERSPECTIVE_SECTION} ${DEPTH_SECTION} ${SECTION_PAD}`}>
      <div
        className={`${DEPTH_BACKDROP} depth-backdrop-perspective`}
        aria-hidden="true"
      />

      <div className={PERSPECTIVE_COPY}>
        <div className={`section-kicker ${KICKER_PAPER}`}>
          {PERSPECTIVE.kicker}
        </div>
        <h2 className={PERSPECTIVE_H2}>{PERSPECTIVE.title}</h2>
        <p className={PERSPECTIVE_TEXT}>{PERSPECTIVE.text}</p>
      </div>
    </section>
  );
}
