import Link from "next/link";
import type { Project } from "@/content/projects";
import * as S from "../styles";

/**
 * What comes after a case study.
 *
 * The page used to end on the reflection band, which meant a visitor who read a
 * study to the end had nowhere to go: the header wordmark returns to the top of
 * the home page rather than to the work section they came from, and nothing
 * pointed at the next study at all. For a portfolio, finishing a case study is
 * the moment a reader is most likely to want another one.
 *
 * `next` is chosen by the caller from the ordered list of studies and wraps at
 * the end, so the last study leads back to the first rather than rendering half
 * a band.
 */
export function CaseNext({ next }: { next: Project }) {
  return (
    <nav className={S.NEXT_BAND} aria-label="More work">
      <div className={S.NEXT_ROW}>
        <div className="min-w-0">
          <p className={S.NEXT_LABEL}>Next case study</p>
          <Link className={S.NEXT_LINK} href={`/work/${next.slug}`}>
            {next.title}
            <span className={S.NEXT_ARROW} aria-hidden="true">
              &rarr;
            </span>
          </Link>
          <p className={S.NEXT_DISCIPLINE}>{next.discipline}</p>
        </div>

        {/* Straight to the work section rather than to `/`, so the return lands
            where the visitor left. */}
        <Link className={S.NEXT_BACK} href="/#work">
          <span aria-hidden="true">&larr;</span>
          All work
        </Link>
      </div>
    </nav>
  );
}
