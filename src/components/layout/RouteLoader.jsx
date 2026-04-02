import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function RouteLoader({ isLoading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    let animationFrameId;
    const duration = 950;
    const startTime = performance.now();

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      const nextValue = Math.round(eased * 100);

      setProgress(nextValue);

      if (ratio < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isLoading]);

  const { arcPath, glowPath } = useMemo(() => {
    const startX = 30;
    const startY = 170;
    const endX = 290;
    const endY = 170;

    const backgroundArc = `M ${startX} ${startY} A 130 130 0 0 1 ${endX} ${endY}`;

    const angle = Math.PI * (1 - progress / 100);
    const x = 160 + 130 * Math.cos(angle);
    const y = 170 - 130 * Math.sin(angle);

    const progressArc = `M ${startX} ${startY} A 130 130 0 0 1 ${x} ${y}`;

    return {
      arcPath: progressArc,
      glowPath: backgroundArc,
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="route-loader-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <motion.div
            className="route-loader-panel"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <p className="route-loader-kicker">Refreshing portfolio view</p>

            <div className="route-loader-gauge-wrap">
              <svg
                className="route-loader-gauge"
                viewBox="0 0 320 200"
                role="img"
                aria-label="Route loading progress"
              >
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4fd1ff" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>

                  <filter id="gaugeGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  d="M 30 170 A 130 130 0 0 1 290 170"
                  className="route-loader-arc-bg"
                />

                <path
                  d={glowPath}
                  className="route-loader-arc-glow"
                />

                <path
                  d={arcPath}
                  className="route-loader-arc-progress"
                  filter="url(#gaugeGlow)"
                />

                <line x1="30" y1="170" x2="20" y2="170" className="route-loader-tick" />
                <line x1="290" y1="170" x2="300" y2="170" className="route-loader-tick" />
              </svg>

              <div className="route-loader-center">
                <p className="route-loader-value">{progress}%</p>
                <p className="route-loader-label">loading route</p>
              </div>
            </div>

            <div className="route-loader-meta">
              <span>0%</span>
              <span>100%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RouteLoader;