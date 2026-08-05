import SplitType from "split-type";

export type SplitGranularity = "chars" | "words" | "lines";

export interface SplitResult {
  instance: SplitType;
  /** The elements to animate, matching the requested granularity. */
  targets: HTMLElement[];
  revert: () => void;
}

/** Turns a split line into an `overflow: hidden` mask. */
function maskLine(line: HTMLElement) {
  line.style.display = "block";
  line.style.overflow = "hidden";
  // Descenders (g, y, p) sit below the baseline and would be clipped by the
  // mask; the padding/negative-margin pair reclaims that space without
  // changing layout.
  line.style.paddingBottom = "0.14em";
  line.style.marginBottom = "-0.14em";
}

/**
 * Splits an element for animation and returns the pieces to animate.
 *
 * With `mask` enabled, lines become clipping containers so their contents can
 * slide up from below and be cut off cleanly — a far more expensive-looking
 * reveal than a plain opacity fade.
 *
 * For line-level animation the line itself must stay put (it is the mask), so an
 * inner wrapper is inserted and that becomes the animated target.
 */
export function splitText(
  element: HTMLElement,
  granularity: SplitGranularity = "lines",
  mask = true,
): SplitResult {
  const types = granularity === "lines" ? "lines" : `lines,${granularity}`;

  const instance = new SplitType(element, {
    types: types as "lines,words,chars",
    tagName: "span",
    lineClass: "split-line",
  });

  let targets: HTMLElement[];

  if (granularity === "lines") {
    targets = (instance.lines ?? []).map((line) => {
      if (!mask) return line;
      maskLine(line);
      const inner = document.createElement("span");
      inner.style.display = "block";
      inner.style.willChange = "transform";
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
      return inner;
    });
  } else {
    if (mask) instance.lines?.forEach(maskLine);
    const pieces =
      granularity === "chars" ? instance.chars : instance.words;
    targets = (pieces ?? []) as HTMLElement[];
    targets.forEach((piece) => {
      piece.style.display = "inline-block";
      piece.style.willChange = "transform, opacity";
    });
  }

  return {
    instance,
    targets,
    revert: () => instance.revert(),
  };
}
