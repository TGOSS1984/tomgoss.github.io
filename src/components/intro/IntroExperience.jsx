import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { introConfig } from "../../config/introConfig";
import IntroChartScene from "./IntroChartScene";
import IntroJourneyScene from "./IntroJourneyScene";
import "./IntroExperience.css";

function IntroExperience() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [activeScene, setActiveScene] = useState("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!introConfig.enabled) return;

    if (introConfig.showOncePerSession) {
      const hasSeenIntro = window.sessionStorage.getItem(introConfig.storageKey);

      if (hasSeenIntro) {
        return;
      }
    }

    setIsVisible(true);
    document.body.classList.add("intro-active");

    return () => {
      document.body.classList.remove("intro-active");
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      document.body.classList.remove("intro-active");
      return;
    }

    document.body.classList.add("intro-active");

    return () => {
      document.body.classList.remove("intro-active");
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || activeScene !== "loading") return;

    let animationFrameId;
    let timeoutId;
    const duration = 1800;
    const startTime = performance.now();

    const animateProgress = (now) => {
      const elapsed = now - startTime;
      const nextProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrameId = window.requestAnimationFrame(animateProgress);
      } else {
        timeoutId = window.setTimeout(() => {
          setActiveScene("chart");
        }, 220);
      }
    };

    animationFrameId = window.requestAnimationFrame(animateProgress);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(timeoutId);
    };
  }, [isVisible, activeScene]);

  useEffect(() => {
    if (!isVisible || activeScene !== "chart") return;

    const timeoutId = window.setTimeout(() => {
      setActiveScene("journey");
    }, 3600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isVisible, activeScene]);

  useEffect(() => {
    if (!isVisible || activeScene !== "journey") return;

    const timeoutId = window.setTimeout(() => {
      setActiveScene("panel");
    }, 5200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isVisible, activeScene]);

  const handleEnter = () => {
    if (introConfig.showOncePerSession) {
      window.sessionStorage.setItem(introConfig.storageKey, "true");
    }

    setIsLeaving(true);

    window.setTimeout(() => {
      setIsVisible(false);
    }, 550);
  };

  if (!introConfig.enabled || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="intro-experience"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLeaving ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Intro experience"
        >
          <div className="intro-experience__backdrop" />

          <motion.div
            className="intro-experience__grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLeaving ? 0 : 1 }}
            transition={{ duration: 0.8 }}
          />

          <motion.div
            className="intro-experience__glow intro-experience__glow--one"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isLeaving ? 0 : 1, scale: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.div
            className="intro-experience__glow intro-experience__glow--two"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: isLeaving ? 0 : 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          />

          <AnimatePresence mode="wait">
            {activeScene === "loading" ? (
              <motion.div
                key="loading"
                className="intro-experience__loading"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="intro-experience__loading-label-row">
                  <p className="intro-experience__loading-label">
                    Initialising portfolio experience
                  </p>
                  <span className="intro-experience__loading-value">
                    {Math.round(progress)}%
                  </span>
                </div>

                <div className="intro-experience__loading-track" aria-hidden="true">
                  <motion.div
                    className="intro-experience__loading-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="intro-experience__loading-subtext">
                  Loading interface, motion layers, and homepage entry sequence
                </p>
              </motion.div>
            ) : null}

            {activeScene === "chart" ? <IntroChartScene key="chart" /> : null}

            {activeScene === "journey" ? (
              <IntroJourneyScene key="journey" />
            ) : null}

            {activeScene === "panel" ? (
              <motion.div
                key="panel"
                className="intro-experience__panel"
                initial={{ opacity: 0, y: 24, scale: 0.985 }}
                animate={{
                  opacity: isLeaving ? 0 : 1,
                  y: isLeaving ? 16 : 0,
                  scale: isLeaving ? 0.99 : 1,
                }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="intro-experience__eyebrow">Portfolio introduction</p>

                <h1 className="intro-experience__title">
                  The journey is now in motion.
                </h1>

                <p className="intro-experience__text">
                  The intro now moves from analytics into a mountain-style
                  technology ascent. Next we will replace this temporary panel
                  with the final full-screen introduction and entry moment.
                </p>

                <div className="intro-experience__actions">
                  <button
                    type="button"
                    className="intro-experience__button"
                    onClick={handleEnter}
                  >
                    Enter Portfolio
                  </button>

                  <span className="intro-experience__hint">
                    Commit 4 journey scene active
                  </span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default IntroExperience;