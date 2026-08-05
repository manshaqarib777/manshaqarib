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
    <p className="scrub-line" aria-label={text}>
      {words.map((word, index) => (
        // Words repeat within the sentence, so the index has to be part of the key.
        <span className="scrub-word" key={`${word}-${index}`}>
          {word}
        </span>
      ))}
    </p>
  );
}
