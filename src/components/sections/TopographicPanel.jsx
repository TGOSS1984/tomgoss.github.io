import { Canvas } from "@react-three/fiber";
import TerrainScene from "./TerrainScene";

function TopographicPanel() {
  return (
    <div className="topo-panel topo-panel-3d">
      <div className="topo-bg-grid topo-grid-1" />
      <div className="topo-bg-grid topo-grid-2" />
      <div className="topo-ambient-glow" />

      <div className="terrain-canvas-wrap">
        <Canvas
          camera={{ position: [0, -5.8, 3.8], fov: 42 }}
          dpr={[1, 1.8]}
        >
          <color attach="background" args={["#050816"]} />
          <fog attach="fog" args={["#050816", 7, 14]} />
          <ambientLight intensity={0.7} />
          <TerrainScene />
        </Canvas>
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