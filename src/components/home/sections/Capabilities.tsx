import { CAPABILITIES, CAPABILITIES_HEADING } from "@/content/home";
import {
  CAPABILITIES_H2,
  CAPABILITIES_SECTION,
  CAPABILITY,
  CAPABILITY_LIST,
  CAPABILITY_TEXT,
  CAPABILITY_TITLE,
  DEPTH_BACKDROP,
  DEPTH_SECTION,
  KICKER,
  SECTION_HEADING,
} from "../styles";

export function Capabilities() {
  return (
    <section
      className={`${CAPABILITIES_SECTION} ${DEPTH_SECTION} scroll-mt-[120px]`}
      id="capabilities"
    >
      <div
        className={`${DEPTH_BACKDROP} depth-backdrop-capabilities`}
        aria-hidden="true"
      />

      <div className={`section-heading ${SECTION_HEADING}`}>
        <div className={`section-kicker ${KICKER}`}>
          {CAPABILITIES_HEADING.kicker}
        </div>
        <h2 className={CAPABILITIES_H2}>{CAPABILITIES_HEADING.title}</h2>
      </div>

      <div className={CAPABILITY_LIST}>
        {CAPABILITIES.map((capability) => (
          <div className={CAPABILITY} key={capability.title}>
            <h3 className={CAPABILITY_TITLE}>{capability.title}</h3>
            <p className={CAPABILITY_TEXT}>{capability.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
