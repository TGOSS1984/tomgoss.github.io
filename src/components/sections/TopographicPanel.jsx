import { useState } from "react";
import TerrainScene from "./TerrainScene";

function TopographicPanel() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="topo-panel topo-panel-3d"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="topo-bg-grid topo-grid-1" />
      <div className="topo-bg-grid topo-grid-2" />
      <div className="topo-ambient-glow" />

      <div className="terrain-canvas-wrap">
        <TerrainScene snow={isHovered} />
      </div>

      <div className="topo-copy">
        <p className="kicker">Mountain environments</p>
        <h3>Contours, elevation, and movement</h3>
        <p>
          Inspired by topographic maps and mountain terrain — a visual nod to
          the outdoors, route finding, and the environments that genuinely
          motivate me.
        </p>
      </div>
    </div>
  );
}

export default TopographicPanel;