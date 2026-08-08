/**
 * The closing sentence, split into words so each can be scrubbed in on scroll.
 *
 * Splitting happens on the server, not in a client-side text splitter: the
 * words ship in the HTML, and `aria-label` carries the sentence as one string
 * so assistive tech reads it normally rather than word by word.
 */
export function ScrubLine({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    // `scrub-line` and `scrub-word` are retained as GSAP hooks: the sentence is
    // scrubbed in word by word against the scroll position.
    <p
      className="scrub-line m-0 mt-[clamp(88px,12vw,150px)] max-w-[1120px] font-display text-[clamp(42px,6.5vw,96px)] font-[760] leading-[0.98] text-ink"
      aria-label={text}
    >
      {words.map((word, index) => (
        // Words repeat within the sentence, so the index has to be part of the key.
        <span
          className="scrub-word mr-[0.26em] inline-block text-current"
          key={`${word}-${index}`}
        >
          {word}
        </span>
      ))}
    </p>
  );
}
