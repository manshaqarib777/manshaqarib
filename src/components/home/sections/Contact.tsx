import { CONTACT, SOCIAL_LINKS } from "@/content/home";
import { EmailAddress } from "../EmailAddress";
import { PerspectiveGrid } from "../PerspectiveGrid";
import {
  BUTTON,
  BUTTON_LINE,
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  CONTACT_ACTIONS,
  CONTACT_COPY,
  CONTACT_H2,
  CONTACT_KICKER,
  CONTACT_NOTE,
  CONTACT_SECTION,
  SECTION_PAD,
  SOCIAL_ICON,
  SOCIAL_ROW,
} from "../styles";

/**
 * The closing band: back to the dark ground, with the same tile grid as the
 * hero — flatter and quieter, per the contact variant.
 *
 * The order is what a reader needs, in that order: what this is, what I'm open
 * to, the address itself, then the two actions.
 */
export function Contact() {
  return (
    <footer
      className={`${CONTACT_SECTION} ${SECTION_PAD} scroll-mt-[120px]`}
      id="contact"
    >
      <PerspectiveGrid variant="contact" />

      <div className={CONTACT_COPY}>
        <p className={CONTACT_KICKER}>{CONTACT.kicker}</p>
        <h2 className={CONTACT_H2}>{CONTACT.title}</h2>
        <p className={CONTACT_NOTE}>{CONTACT.note}</p>
        <EmailAddress email={CONTACT.email} />
      </div>

      <div className={CONTACT_ACTIONS}>
        <a
          className={`button primary ${BUTTON} ${BUTTON_LINE} ${BUTTON_PRIMARY}`}
          href={`mailto:${CONTACT.email}`}
        >
          {CONTACT.primary}
        </a>
        <a
          className={`button secondary ${BUTTON} ${BUTTON_SECONDARY}`}
          href={CONTACT.secondary.href}
        >
          {CONTACT.secondary.label}
        </a>

        {/* A `nav` rather than a div: `aria-label` needs a role to attach to,
            and on a bare div it is dropped. */}
        <nav className={SOCIAL_ROW} aria-label="Profiles">
          {SOCIAL_LINKS.map((social) => (
            <a
              className={SOCIAL_ICON}
              href={social.href}
              key={social.label}
              aria-label={social.label}
              data-tooltip={social.label}
              {...(social.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {social.short}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
