"use client";

import { FiCheck, FiCopy } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { LiveClock } from "@/components/ui/LiveClock";
import { SITE } from "@/constants/site";
import { SOCIALS } from "@/constants/socials";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useCursorProps } from "@/providers";
import { cn } from "@/lib/utils";

/**
 * Contact.
 *
 * Two routes out of the page, side by side: the form for people with a brief, and
 * a one-tap email copy for people who'd rather use their own client. Offering both
 * costs nothing and removes the most common reason a contact section fails.
 */
export function Contact() {
  const { copied, copy } = useCopyToClipboard();
  const copyCursor = useCursorProps({
    variant: "text",
    label: copied ? "Copied" : "Copy",
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-28 sm:py-36 lg:py-44"
    >
      <div className="container-wide">
        <SectionHeading
          index="06"
          eyebrow="Contact"
          titleId="contact-heading"
          title="Got a frontend that needs to hold up?"
          description="Tell me what you're building and where it's stuck. I'll tell you honestly whether I'm the right person for it — and if I'm not, who to look for instead."
        />

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Direct details */}
          <div className="flex flex-col gap-10 lg:col-span-5">
            <Reveal variant="fade-up" className="flex flex-col gap-4">
              <span className="label-meta">Email</span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="link-underline text-[clamp(1.2rem,3.4vw,1.9rem)] tracking-[-0.02em] text-white"
                >
                  {SITE.email}
                </a>
                <button
                  type="button"
                  onClick={() => copy(SITE.email)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-500",
                    copied
                      ? "border-accent-400/50 bg-accent-500/12 text-accent-300"
                      : "border-white/12 text-ink-200 hover:border-white/35 hover:text-white",
                  )}
                  {...copyCursor}
                >
                  {copied ? <FiCheck aria-hidden /> : <FiCopy aria-hidden />}
                  {copied ? "Copied" : "Copy"}
                  {/* Announce the result rather than relying on the colour change. */}
                  <span className="sr-only" role="status" aria-live="polite">
                    {copied ? "Email address copied to clipboard" : ""}
                  </span>
                </button>
              </div>
            </Reveal>

            <Reveal variant="fade-up" delay={0.08} className="flex flex-col gap-4">
              <span className="label-meta">Where / when</span>
              <p className="text-[1rem] leading-relaxed text-ink-200">
                {SITE.location} — currently{" "}
                <LiveClock className="text-white" /> {SITE.timezone}. Transferable
                Iqama, available immediately. I work with teams across Europe, the
                US and the Gulf, and keep overlapping hours either side.
              </p>
            </Reveal>

            <Reveal
              variant="fade-up"
              delay={0.14}
              stagger={{ selector: "[data-social]", amount: 0.07 }}
              className="flex flex-col gap-4"
            >
              <span className="label-meta">Elsewhere</span>
              <ul className="flex flex-col divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {SOCIALS.map((social) => (
                  <li key={social.label} data-social>
                    <a
                      href={social.href}
                      target={social.external ? "_blank" : undefined}
                      rel={social.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
                    >
                      <span className="flex items-center gap-4">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-200 transition-all duration-500 group-hover:border-accent-400/50 group-hover:bg-accent-500/10 group-hover:text-accent-300">
                          <social.icon aria-hidden />
                        </span>
                        <span className="text-[0.98rem] text-white">
                          {social.label}
                        </span>
                      </span>
                      <span className="text-[0.82rem] text-ink-400 transition-colors group-hover:text-ink-200">
                        {social.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal variant="fade-up" delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
