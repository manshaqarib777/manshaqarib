import { TILE_GRID } from "@/content/home";

const TILES = Array.from({ length: TILE_GRID * TILE_GRID }, (_, i) => i);

/**
 * The receding tile grid behind the hero and the contact footer.
 *
 * Unlike a gradient-painted grid, every cell is a real element — each one is its
 * own hover target that flashes a colour and fades back over 1.5s. That
 * interaction is what the 1600 nodes buy; the colour cycling and the fade both
 * live in CSS, so this stays a server component with no client JS at all.
 *
 * The three containers below carry their styling as utilities, but the tile
 * deliberately does not: at 40 x 40 across two grids that is 3200 elements, and
 * a utility list on each would add hundreds of kilobytes to the HTML for markup
 * no one reads. One class name and one CSS rule is the right trade there — and
 * the four-colour cycle needs `nth-child` regardless, which has no utility.
 */
export function PerspectiveGrid({ variant }: { variant: "hero" | "contact" }) {
  return (
    // `{variant}-perspective-grid` is a GSAP hook: HomeMotion drifts the
    // hero grid on scroll and fades the contact one in.
    <div
      className={`perspective-grid ${variant}-perspective-grid absolute inset-0 z-0 size-full origin-[50%] overflow-hidden bg-[var(--fade-stop,#030508)] [perspective:2000px]`}
      aria-hidden="true"
    >
      <div className="perspective-grid-tiles absolute top-1/2 left-1/2 grid aspect-square w-[80rem] origin-[50%] grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] [transform-style:preserve-3d] [transform:translate(-50%,-50%)_rotateX(30deg)_rotateY(-5deg)_rotate(20deg)_scale(2)]">
        {TILES.map((tile) => (
          <div className="perspective-grid-tile" key={tile} />
        ))}
      </div>
      {/* Fades the grid out behind the copy so text always sits on flat ground.
          `pointer-events-none` keeps tile hover reachable through it. */}
      <div className="perspective-grid-overlay pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle,transparent_25%,var(--fade-stop)_80%)]" />
    </div>
  );
}
