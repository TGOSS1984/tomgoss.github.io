import { useEffect, useRef, useState } from "react";

// Must match the card's own border-radius (var(--radius-md) = 18px) so the
// traced line sits exactly on the visible edge rather than cutting corners.
const CARD_RADIUS = 18;
const STROKE_WIDTH = 1.5;
// Length of the bright traveling segment, as a fraction of the card's width
// — keeps it a short "comet" rather than lighting the whole border at once.
const DASH_RATIO = 0.12;

// Renders a thin animated outline that traces the literal rectangular path
// of its parent card (including rounded corners) at constant speed and
// length. Uses an SVG <rect> with stroke-dasharray/stroke-dashoffset rather
// than a rotated conic-gradient — gradients are angle-based and distort into
// a wedge on non-square boxes, whereas an SVG path is parameterized by
// actual distance, so the dash stays a consistent size all the way around.
function CardBorderTrace() {
  const svgRef = useRef(null);
  const rectRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [perimeter, setPerimeter] = useState(0);

  useEffect(() => {
    const card = svgRef.current?.parentElement;
    if (!card) return undefined;

    const updateSize = () => {
      setSize({ width: card.clientWidth, height: card.clientHeight });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // getTotalLength() needs the rect to already have real dimensions, so this
  // runs after `size` updates and the rect below has re-rendered with them.
  useEffect(() => {
    if (rectRef.current && size.width > 0 && size.height > 0) {
      setPerimeter(rectRef.current.getTotalLength());
    }
  }, [size]);

  const inset = STROKE_WIDTH / 2;
  const rectWidth = Math.max(size.width - STROKE_WIDTH, 0);
  const rectHeight = Math.max(size.height - STROKE_WIDTH, 0);
  const dash = size.width > 0 ? size.width * DASH_RATIO : 0;
  const gap = Math.max(perimeter - dash, 0);

  const dashStyle =
    perimeter > 0
      ? {
          strokeDasharray: `${dash} ${gap}`,
          "--trace-perimeter": -perimeter,
        }
      : undefined;

  return (
    <svg
      ref={svgRef}
      className="card-trace-svg"
      width={size.width}
      height={size.height}
      aria-hidden="true"
    >
      {/* Thicker, blurred duplicate of the same path — the actual glow halo,
          painted first so the crisp line below sits on top of it. Shares
          dash/perimeter values with the core line so the two stay locked
          together as they travel. */}
      <rect
        className="card-trace-rect card-trace-rect-glow"
        x={inset}
        y={inset}
        width={rectWidth}
        height={rectHeight}
        rx={CARD_RADIUS}
        ry={CARD_RADIUS}
        style={dashStyle}
      />
      <rect
        ref={rectRef}
        className="card-trace-rect card-trace-rect-core"
        x={inset}
        y={inset}
        width={rectWidth}
        height={rectHeight}
        rx={CARD_RADIUS}
        ry={CARD_RADIUS}
        style={dashStyle}
      />
    </svg>
  );
}

export default CardBorderTrace;