import { INTRO } from "@/content/home";
import {
  DEPTH_BACKDROP,
  DEPTH_SECTION,
  KICKER_PAPER,
  LIGHT_BODY,
  SECTION_H2,
  SECTION_PAD,
} from "../styles";

/**
 * The throughline — the first light section: cream paper with dark ink,
 * inverting the page. The fixed header survives the switch because it blends in
 * `difference`.
 */
export function Intro() {
  return (
    <section
      className={`intro-section ${DEPTH_SECTION} ${SECTION_PAD} bg-paper text-paper-ink`}
    >
      <div
        className={`${DEPTH_BACKDROP} depth-backdrop-intro`}
        aria-hidden="true"
      />
      <div className={`section-kicker ${KICKER_PAPER}`}>{INTRO.kicker}</div>
      <h2 className={SECTION_H2}>{INTRO.title}</h2>
      <p className={LIGHT_BODY}>{INTRO.text}</p>
    </section>
  );
}
