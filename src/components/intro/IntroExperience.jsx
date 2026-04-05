import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { introConfig } from "../../config/introConfig";
import IntroChartScene from "./IntroChartScene";
import IntroJourneyScene from "./IntroJourneyScene";
import IntroFinalScene from "./IntroFinalScene";
import "./IntroExperience.css";

function hasSeenIntro() {
  if (typeof window === "undefined") return false;

  if (introConfig.displayMode === "session") {
    return window.sessionStorage.getItem(introConfig.storageKey) === "true";
  }

  if (introConfig.displayMode === "first-visit") {
    return window.localStorage.getItem(introConfig.storageKey) === "true";
  }

  return false;
}

function markIntroSeen() {
  if (typeof window === "undefined") return;

  if (introConfig.displayMode === "session") {
    window.sessionStorage.setItem(introConfig.storageKey, "true");
  }

  if (introConfig.displayMode === "first-visit") {
    window.localStorage.setItem(introConfig.storageKey, "true");
  }
}

function IntroExperience({ onReady }) {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [activeScene, setActiveScene] = useState("loading");
  const [progress, setProgress] = useState(0);
  const hasCalledReadyRef = useRef(false);

  const timings = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        loadingDuration: 220,
        loadingExitDelay: 80,
        chartDuration: 900,
        journeyDuration: 1100,
      };
    }

    return introConfig.timings;
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!introConfig.enabled) {
      if (!hasCalledReadyRef.current) {
        hasCalledReadyRef.current = true;
        onReady?.(false);
      }
      return;
    }

    if (introConfig.displayMode !== "every-visit" && hasSeenIntro()) {
      if (!hasCalledReadyRef.current) {
        hasCalledReadyRef.current = true;
        onReady?.(false);
      }
      return;
    }

    setIsVisible(true);
    document.body.classList.add("intro-active");

    return () => {
      document.body.classList.remove("intro-active");
    };
  }, [onReady]);

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
    const duration = timings.loadingDuration;
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
        }, timings.loadingExitDelay);
      }
    };

    animationFrameId = window.requestAnimationFrame(animateProgress);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(timeoutId);
    };
  }, [isVisible, activeScene, timings]);

  useEffect(() => {
    if (!isVisible || activeScene !== "chart") return;

    const timeoutId = window.setTimeout(() => {
      setActiveScene("journey");
    }, timings.chartDuration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isVisible, activeScene, timings]);

  useEffect(() => {
    if (!isVisible || activeScene !== "journey") return;

    const timeoutId = window.setTimeout(() => {
      setActiveScene("final");
    }, timings.journeyDuration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isVisible, activeScene, timings]);

  const handleEnter = () => {
    if (introConfig.displayMode !== "every-visit") {
      markIntroSeen();
    }

    setIsLeaving(true);

    window.setTimeout(() => {
      setIsVisible(false);

      if (!hasCalledReadyRef.current) {
        hasCalledReadyRef.current = true;
        onReady?.(true);
      }
    }, prefersReducedMotion ? 160 : 550);
  };

  const handleSkip = () => {
    handleEnter();
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
          transition={{
            duration: prefersReducedMotion ? 0.2 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-label="Intro experience"
        >
          <div className="intro-experience__backdrop" />

          <motion.div
            className="intro-experience__grid"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: isLeaving ? 0 : 1 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.8 }}
          />

          {!prefersReducedMotion ? (
            <>
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
            </>
          ) : null}

          {introConfig.showSkipButton ? (
            <button
              type="button"
              className="intro-experience__skip"
              onClick={handleSkip}
            >
              Skip intro
            </button>
          ) : null}

          <AnimatePresence mode="wait">
            {activeScene === "loading" ? (
              <motion.div
                key="loading"
                className="intro-experience__loading"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] }}
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

            {activeScene === "chart" ? (
              <IntroChartScene key="chart" />
            ) : null}

            {activeScene === "journey" ? (
              <IntroJourneyScene
                key="journey"
                reducedMotion={Boolean(prefersReducedMotion)}
              />
            ) : null}

            {activeScene === "final" ? (
              <IntroFinalScene
                key="final"
                onEnter={handleEnter}
                reducedMotion={Boolean(prefersReducedMotion)}
              />
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default IntroExperience;