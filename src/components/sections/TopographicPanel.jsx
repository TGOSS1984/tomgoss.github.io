function TopographicPanel() {
  return (
    <div className="topo-panel">
      <div className="topo-glow" />
      <div className="topo-grid topo-grid-1" />
      <div className="topo-grid topo-grid-2" />
      <div className="topo-contours">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
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