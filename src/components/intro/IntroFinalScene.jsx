import { motion } from "framer-motion";
import { introConfig } from "../../config/introConfig";

const titleWords = ["Hi,", "I’m", "Tom."];

function IntroFinalScene({ onEnter, reducedMotion = false }) {
  const handleBackgroundClick = () => {
    if (introConfig.finalSceneClickToEnter) {
      onEnter();
    }
  };

  return (
    <motion.div
      className="intro-final"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.995 }}
      transition={{
        duration: reducedMotion ? 0.2 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
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
        </>
      ) : null}

      <div className="intro-final__content">
        <motion.p
          className="intro-final__eyebrow"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.55,
            delay: reducedMotion ? 0 : 0.08,
          }}
        >
          Portfolio introduction
        </motion.p>

        <motion.div
          className="intro-final__circle-wrap"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0.25 : 0.9,
            delay: reducedMotion ? 0 : 0.16,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="intro-final__circle">
            <motion.div
              className="intro-final__image-layer"
              aria-hidden="true"
              animate={
                reducedMotion
                  ? undefined
                  : {
                      x: [0, 6, -4, 0],
                      y: [0, -5, 3, 0],
                      scale: [1, 1.015, 1.01, 1],
                    }
              }
              transition={
                reducedMotion
                  ? undefined
                  : {
                      duration: 12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
            <div className="intro-final__image-overlay" aria-hidden="true" />

            <div className="intro-final__ring-system" aria-hidden="true">
              <svg
                className="intro-final__ring-base-svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                <circle
                  className="intro-final__ring-base"
                  cx="50"
                  cy="50"
                  r="47.4"
                />
                <circle
                  className="intro-final__ring-base intro-final__ring-base--inner"
                  cx="50"
                  cy="50"
                  r="43.7"
                />
              </svg>

              <motion.div
                className="intro-final__ring-track intro-final__ring-track--outer"
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        rotate: 360,
                        scale: [1, 1.018, 0.992, 1.024, 1],
                      }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : {
                        rotate: {
                          duration: 17,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: {
                          duration: 5.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                }
              >
                <svg
                  className="intro-final__ring-svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <circle
                    className="intro-final__ring-dashes intro-final__ring-dashes--one"
                    cx="50"
                    cy="50"
                    r="47.2"
                  />
                </svg>
              </motion.div>

              <motion.div
                className="intro-final__ring-track intro-final__ring-track--inner"
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        rotate: -360,
                        scale: [1, 0.986, 1.02, 0.994, 1],
                      }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : {
                        rotate: {
                          duration: 13.5,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: {
                          duration: 4.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                }
              >
                <svg
                  className="intro-final__ring-svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <circle
                    className="intro-final__ring-dashes intro-final__ring-dashes--two"
                    cx="50"
                    cy="50"
                    r="43.7"
                  />
                </svg>
              </motion.div>

              {!reducedMotion ? (
                <>
                  <motion.div
                    className="intro-final__ring-highlight intro-final__ring-highlight--outer"
                    animate={{
                      rotate: 360,
                      opacity: [0.45, 0.95, 0.45],
                    }}
                    transition={{
                      rotate: {
                        duration: 9.5,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      opacity: {
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />

                  <motion.div
                    className="intro-final__ring-highlight intro-final__ring-highlight--inner"
                    animate={{
                      rotate: -360,
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      rotate: {
                        duration: 7.4,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      opacity: {
                        duration: 2.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  />

                  <motion.div
                    className="intro-final__particles intro-final__particles--outer"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 22,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span className="intro-final__particle intro-final__particle--p1" />
                    <span className="intro-final__particle intro-final__particle--p2" />
                    <span className="intro-final__particle intro-final__particle--p3" />
                  </motion.div>

                  <motion.div
                    className="intro-final__particles intro-final__particles--inner"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span className="intro-final__particle intro-final__particle--p4" />
                    <span className="intro-final__particle intro-final__particle--p5" />
                  </motion.div>
                </>
              ) : null}
            </div>

            {!reducedMotion ? (
              <>
                <motion.div
                  className="intro-final__pulse intro-final__pulse--outer"
                  animate={{
                    scale: [1, 1.042, 1],
                    opacity: [0.36, 0.72, 0.36],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="intro-final__pulse intro-final__pulse--inner"
                  animate={{
                    scale: [1, 1.03, 1],
                    opacity: [0.2, 0.48, 0.2],
                  }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.24,
                  }}
                />
              </>
            ) : null}

            <div className="intro-final__text-layer">
              <h1 className="intro-final__title" aria-label="Hi, I’m Tom.">
                {titleWords.map((word, index) => (
                  <motion.span
                    key={word}
                    className="intro-final__title-word"
                    initial={
                      reducedMotion ? false : { opacity: 0, y: 26, rotateX: -18 }
                    }
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: reducedMotion ? 0.2 : 0.75,
                      delay: reducedMotion ? 0 : 0.34 + index * 0.14,
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
                transition={{
                  duration: reducedMotion ? 0.2 : 0.65,
                  delay: reducedMotion ? 0 : 0.92,
                }}
              >
                Building practical digital products with a commercial,
                analytical, and mountain-shaped perspective.
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="intro-final__actions"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.65,
            delay: reducedMotion ? 0 : 1.08,
          }}
        >
          <button
            type="button"
            className="intro-final__button"
            onClick={(event) => {
              event.stopPropagation();
              onEnter();
            }}
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