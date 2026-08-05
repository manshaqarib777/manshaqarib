/**
 * The receding grid behind the hero and the contact footer.
 *
 * Drawn with two repeating gradients on a single rotated element rather than a
 * few hundred tile divs: the same picture, but it costs one paint instead of a
 * large subtree, and it stays sharp at every viewport width.
 */
export function PerspectiveGrid({ variant }: { variant: "hero" | "contact" }) {
  return (
    <div
      className={`perspective-grid ${variant}-perspective-grid`}
      aria-hidden="true"
    >
      <div className="perspective-grid-tiles" />
      {/* Fades the grid out at the centre so copy always sits on flat ground. */}
      <div
        className="perspective-grid-overlay"
        style={{
          background:
            "radial-gradient(circle, transparent 25%, var(--ash-ground) 80%)",
        }}
      />
    </div>
  );
}
