"use client";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

/**
 * The email address, shown rather than hidden behind a `mailto:` button.
 *
 * The contact section used to offer only "Email Mansha", which meant a reader
 * who wanted to paste the address into their own client — or into a message to
 * a colleague — had no way to read it at all. It is a link first, so it still
 * works with the script blocked, and the copy affordance is layered on top.
 *
 * The label swap is announced through a polite live region, because a reader
 * using a screen reader gets no visual confirmation from the button's text.
 */
export function EmailAddress({ email }: { email: string }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <span className="contact-email inline-flex flex-wrap items-baseline justify-center gap-x-[14px] gap-y-[6px]">
      <a
        className="text-[clamp(19px,2.2vw,28px)] font-[560] text-ink no-underline [transition:color_0.16s_ease] fine:hover:text-accent"
        href={`mailto:${email}`}
      >
        {email}
      </a>
      <button
        className="cursor-pointer rounded-[999px] border border-line bg-transparent px-[11px] py-[5px] text-[11px] font-[700] tracking-[0.14em] text-muted uppercase [font-family:inherit] [transition:color_0.16s_ease,border-color_0.16s_ease,background-color_0.16s_ease] fine:hover:border-[#dab8769e] fine:hover:bg-[#dab87614] fine:hover:text-ink active:[transform:scale(0.97)]"
        type="button"
        onClick={() => void copy(email)}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </span>
  );
}
