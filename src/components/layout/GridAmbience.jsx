import { useEffect, useRef, useState } from "react";

// Must match the 32px grid tile size used by .grid-ambience-pulse and the
// page's own background grid (both pinned to background-position: 0 0, so
// this column/row math lines up exactly with the visible grid lines).
const GRID_SIZE = 32;

// How long a single cell stays mounted — must match the CSS animation
// duration on .grid-ambience-cell (gridCellGlow), since that's what handles
// the actual fade in/out. This also naturally limits how many cells can be
// on screen at once for normal pointer speeds (roughly 4-6), without
// needing to forcibly cut any of them off mid-fade.
const CELL_LIFETIME_MS = 750;

let cellIdCounter = 0;

// Drives the page-wide grid pulse + per-cell hover highlight. Cells are only
// created on the (infrequent, ~32px-granularity) event where the pointer
// enters a new grid square — there's no per-frame animation loop here at
// all. Each cell's entire fade in/hold/fade-out lifecycle is a single CSS
// animation; this component just mounts one div when a new cell is entered
// and unmounts it once that animation has finished.
function GridAmbience() {
  const [cells, setCells] = useState([]);
  const lastCellKeyRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Respect reduced-motion preferences: skip the cell highlight entirely.
    // The pulse animation is already gated off via its own CSS media query,
    // so the grid just stays static for these users.
    if (prefersReducedMotion) return undefined;

    function handlePointerMove(event) {
      const col = Math.floor(event.clientX / GRID_SIZE);
      const row = Math.floor(event.clientY / GRID_SIZE);
      const key = `${col}:${row}`;

      if (key === lastCellKeyRef.current) return;
      lastCellKeyRef.current = key;

      cellIdCounter += 1;
      const id = cellIdCounter;

      setCells((prev) => [
        ...prev,
        { id, x: col * GRID_SIZE, y: row * GRID_SIZE },
      ]);

      window.setTimeout(() => {
        setCells((prev) => prev.filter((cell) => cell.id !== id));
      }, CELL_LIFETIME_MS);
    }

    function handleMouseOut(event) {
      // Only reset once the pointer has actually left the document
      // (relatedTarget is null), not when moving between elements inside it,
      // so re-entering the same cell from outside the window still lights
      // it up again rather than being treated as "already there".
      if (event.relatedTarget) return;
      lastCellKeyRef.current = null;
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div className="grid-ambience-pulse" aria-hidden="true" />
      {cells.map((cell) => (
        <div
          key={cell.id}
          className="grid-ambience-cell"
          style={{ "--cell-x": `${cell.x}px`, "--cell-y": `${cell.y}px` }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

export default GridAmbience;