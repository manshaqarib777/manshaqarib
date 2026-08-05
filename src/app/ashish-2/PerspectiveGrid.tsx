import { TILE_GRID } from "./data";

const TILES = Array.from({ length: TILE_GRID * TILE_GRID }, (_, i) => i);

/**
 * The receding tile grid behind the hero and the contact footer.
 *
 * Unlike a gradient-painted grid, every cell is a real element — each one is its
 * own hover target that flashes a colour and fades back over 1.5s. That
 * interaction is what the 1600 nodes buy; the colour cycling and the fade both
 * live in CSS, so this stays a server component with no client JS at all.
 */
export function PerspectiveGrid({ variant }: { variant: "hero" | "contact" }) {
  return (
    <div
      className={`perspective-grid ${variant}-perspective-grid`}
      aria-hidden="true"
    >
      <div className="perspective-grid-tiles">
        {TILES.map((tile) => (
          <div className="perspective-grid-tile" key={tile} />
        ))}
      </div>
      <div className="perspective-grid-overlay" />
    </div>
  );
}
