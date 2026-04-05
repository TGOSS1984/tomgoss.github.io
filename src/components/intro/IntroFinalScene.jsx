import { motion } from "framer-motion";
import { introConfig } from "../../config/introConfig";

const titleWords = ["Hi,", "I’m", "Tom."];

function IntroFinalScene({ onEnter, reducedMotion = false }) {
  const handleBackgroundClick = () => {
    if (introConfig.finalSceneClickToEnter) {
      onEnter();
    }
  };

  const stopInnerClick = (event) => {
    event.stopPropagation();
  };

  return (
    <motion.div
      className="intro-final"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.995 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleBackgroundClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (
          introConfig.finalSceneClickToEnter &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          onEnter();
        }
      }}
      aria-label="Final introduction. Click to enter portfolio."
    >
      {!reducedMotion ? (
        <>
          <div className="intro-final__ambient intro-final__ambient--one" />
          <div className="intro-final__ambient intro-final__ambient--two" />

          <motion.div
            className="intro-final__ring intro-final__ring--outer"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="intro-final__ring intro-final__ring--inner"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        </>
      ) : null}

      <div
        className="intro-final__content"
        onClick={introConfig.finalSceneClickToEnter ? stopInnerClick : undefined}
        >
        <motion.p
          className="intro-final__eyebrow"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.55, delay: reducedMotion ? 0 : 0.08 }}
        >
          Portfolio introduction
        </motion.p>

        <h1 className="intro-final__title" aria-label="Hi, I’m Tom.">
          {titleWords.map((word, index) => (
            <motion.span
              key={word}
              className="intro-final__title-word"
              initial={reducedMotion ? false : { opacity: 0, y: 34, rotateX: -18 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: reducedMotion ? 0.2 : 0.75,
                delay: reducedMotion ? 0 : 0.2 + index * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="intro-final__subtitle"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.65, delay: reducedMotion ? 0 : 0.78 }}
        >
          Building practical digital products with a commercial, analytical,
          and mountain-shaped perspective.
        </motion.p>

        <motion.div
          className="intro-final__actions"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.65, delay: reducedMotion ? 0 : 1.02 }}
        >
          <button
            type="button"
            className="intro-final__button"
            onClick={onEnter}
          >
            Enter Portfolio
          </button>

          <span className="intro-final__hint">
            {introConfig.finalSceneClickToEnter
              ? "Click anywhere or use the button to continue"
              : "Click the button to continue"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default IntroFinalScene;