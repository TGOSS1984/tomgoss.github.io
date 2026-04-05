import { motion } from "framer-motion";

const bars = [
  { id: 1, x: 84, width: 52, height: 84, delay: 0.08 },
  { id: 2, x: 168, width: 52, height: 138, delay: 0.16 },
  { id: 3, x: 252, width: 52, height: 112, delay: 0.24 },
  { id: 4, x: 336, width: 52, height: 190, delay: 0.32 },
  { id: 5, x: 420, width: 52, height: 164, delay: 0.4 },
  { id: 6, x: 504, width: 52, height: 228, delay: 0.48 },
];

const linePath = "M 110 268 C 170 240, 205 222, 194 214 S 292 182, 362 168 S 446 134, 530 92";

function IntroChartScene() {
  return (
    <motion.div
      className="intro-chart"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="intro-chart__header">
        <p className="intro-chart__eyebrow">Chapter 01</p>
        <h2 className="intro-chart__title">Data, reporting, and analytical thinking.</h2>
        <p className="intro-chart__text">
          The journey starts with dashboards, performance signals, and practical
          insight translated into movement.
        </p>
      </div>

      <div className="intro-chart__frame">
        <svg
          className="intro-chart__svg"
          viewBox="0 0 640 360"
          role="img"
          aria-label="Animated analytics chart"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="introBarGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(79, 209, 255, 0.16)" />
              <stop offset="100%" stopColor="rgba(79, 209, 255, 0.82)" />
            </linearGradient>

            <linearGradient id="introLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(79, 209, 255, 0.95)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.95)" />
            </linearGradient>

            <filter id="introLineGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g className="intro-chart__grid-lines">
            {[60, 120, 180, 240, 300].map((y) => (
              <line key={y} x1="54" y1={y} x2="590" y2={y} />
            ))}

            {[84, 168, 252, 336, 420, 504, 588].map((x) => (
              <line key={x} x1={x} y1="32" x2={x} y2="300" className="intro-chart__grid-line--vertical" />
            ))}
          </g>

          <g className="intro-chart__axes">
            <line x1="54" y1="300" x2="590" y2="300" />
            <line x1="54" y1="32" x2="54" y2="300" />
          </g>

          <g className="intro-chart__bars">
            {bars.map((bar) => (
              <motion.rect
                key={bar.id}
                x={bar.x}
                y={300 - bar.height}
                width={bar.width}
                height={bar.height}
                rx="10"
                fill="url(#introBarGradient)"
                initial={{ scaleY: 0, opacity: 0.35 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  duration: 0.75,
                  delay: bar.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ originY: 1 }}
              />
            ))}
          </g>

          <motion.path
            d={linePath}
            fill="none"
            stroke="url(#introLineGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#introLineGlow)"
            initial={{ pathLength: 0, opacity: 0.6 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.35, delay: 0.42, ease: "easeInOut" }}
          />

          {[
            { cx: 110, cy: 268, delay: 0.62 },
            { cx: 194, cy: 214, delay: 0.78 },
            { cx: 278, cy: 186, delay: 0.94 },
            { cx: 362, cy: 168, delay: 1.08 },
            { cx: 446, cy: 132, delay: 1.18 },
            { cx: 530, cy: 92, delay: 1.28 },
          ].map((point, index) => (
            <motion.circle
              key={index}
              cx={point.cx}
              cy={point.cy}
              r="6.5"
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth="3"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.35,
                delay: point.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </svg>

        <div className="intro-chart__kpis">
          <motion.div
            className="intro-chart__kpi"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.85 }}
          >
            <span className="intro-chart__kpi-label">Focus</span>
            <strong>Analytics + BI</strong>
          </motion.div>

          <motion.div
            className="intro-chart__kpi"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.05 }}
          >
            <span className="intro-chart__kpi-label">Theme</span>
            <strong>Commercial Insight</strong>
          </motion.div>

          <motion.div
            className="intro-chart__kpi"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.25 }}
          >
            <span className="intro-chart__kpi-label">Direction</span>
            <strong>Technical Progression</strong>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default IntroChartScene;