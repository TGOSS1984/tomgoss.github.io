import { motion } from "framer-motion";

function IntroJourneyScene({ reducedMotion = false }) {
  return (
    <motion.div
      className="intro-journey"
      initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.992 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={
        reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.996 }
      }
      transition={{
        duration: reducedMotion ? 0.25 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="intro-journey__header">
        <p className="intro-journey__eyebrow">Chapter 02</p>
        <h2 className="intro-journey__title">
          From commercial tools to modern development.
        </h2>
        <p className="intro-journey__text">
          A climb from reporting and analytics through Python frameworks,
          notebooks, app builds, and modern front-end development.
        </p>
      </div>

      <div className="intro-journey__frame">
        {/* Cinematic Scene */}
        <div className="intro-journey__scene">
          <div className="intro-journey__sky" />

          <img
            src={`${import.meta.env.BASE_URL}assets/images/intro/mountain.avif`}
            alt="Mountain landscape representing journey"
            className="intro-journey__mountain-image"
          />

          <div className="intro-journey__overlay" />
        </div>

        {/* Content Layer (empty for now) */}
        <div className="intro-journey__content">
          <div className="intro-journey__placeholder">
            <span>Journey loading…</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default IntroJourneyScene;