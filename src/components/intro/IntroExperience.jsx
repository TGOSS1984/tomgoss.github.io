import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { introConfig } from "../../config/introConfig";
import "./IntroExperience.css";

function IntroExperience() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

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

          <motion.div
            className="intro-experience__panel"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{
              opacity: isLeaving ? 0 : 1,
              y: isLeaving ? 16 : 0,
              scale: isLeaving ? 0.99 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="intro-experience__eyebrow">Portfolio introduction</p>

            <h1 className="intro-experience__title">
              A cinematic entry experience is being built here.
            </h1>

            <p className="intro-experience__text">
              This intro overlay will become the opening sequence for your
              homepage without affecting the main portfolio underneath.
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
                Commit 1 shell active
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default IntroExperience;