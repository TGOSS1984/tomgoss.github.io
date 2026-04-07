import { motion } from "framer-motion";

const leftRoutePath =
  "M 126 392 C 188 362, 242 334, 292 302 C 336 274, 380 242, 420 208 C 456 176, 486 142, 510 108 C 520 94, 528 82, 536 72";

const rightRoutePath =
  "M 878 392 C 814 362, 760 334, 708 300 C 660 270, 620 236, 590 196 C 568 166, 552 134, 542 104 C 540 94, 538 84, 536 72";

const leftNodes = [
  { id: "left-1", x: 188, y: 362, delay: 0.55 },
  { id: "left-2", x: 292, y: 302, delay: 0.95 },
  { id: "left-3", x: 420, y: 208, delay: 1.35 },
  { id: "left-4", x: 510, y: 108, delay: 1.75 },
];

const rightNodes = [
  { id: "right-1", x: 814, y: 362, delay: 0.7 },
  { id: "right-2", x: 708, y: 300, delay: 1.1 },
  { id: "right-3", x: 590, y: 196, delay: 1.5 },
  { id: "right-4", x: 542, y: 104, delay: 1.9 },
];

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
        <div className="intro-journey__scene">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/intro/mountain-cinematic.jpeg`}
            alt="Cinematic mountain landscape representing a journey to the summit"
            className="intro-journey__mountain-image"
          />

          <div className="intro-journey__scene-shade" />

          {!reducedMotion ? (
            <>
              <div className="intro-journey__mist intro-journey__mist--back" />
              <div className="intro-journey__mist intro-journey__mist--mid" />
              <div className="intro-journey__mist intro-journey__mist--front" />
            </>
          ) : null}

          <div className="intro-journey__summit-glow" />
          <div className="intro-journey__vignette" />
        </div>

        <div className="intro-journey__content">
          <svg
            className="intro-journey__svg"
            viewBox="0 0 1000 460"
            preserveAspectRatio="none"
            role="img"
            aria-label="Dual ascent routes converging at a mountain summit"
          >
            <defs>
              <linearGradient
                id="introJourneyRouteGradientLeft"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(79, 209, 255, 0.22)" />
                <stop offset="58%" stopColor="rgba(79, 209, 255, 0.96)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.92)" />
              </linearGradient>

              <linearGradient
                id="introJourneyRouteGradientRight"
                x1="100%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.24)" />
                <stop offset="48%" stopColor="rgba(79, 209, 255, 0.9)" />
                <stop offset="100%" stopColor="rgba(79, 209, 255, 0.82)" />
              </linearGradient>

              <filter id="introJourneyRouteGlow">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={leftRoutePath}
              className="intro-journey__route intro-journey__route--base"
              fill="none"
            />
            <path
              d={rightRoutePath}
              className="intro-journey__route intro-journey__route--base"
              fill="none"
            />

            <motion.path
              d={leftRoutePath}
              className="intro-journey__route intro-journey__route--left"
              fill="none"
              stroke="url(#introJourneyRouteGradientLeft)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={reducedMotion ? undefined : "url(#introJourneyRouteGlow)"}
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0.45 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: reducedMotion ? 0.2 : 2.1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
            />

            <motion.path
              d={rightRoutePath}
              className="intro-journey__route intro-journey__route--right"
              fill="none"
              stroke="url(#introJourneyRouteGradientRight)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={reducedMotion ? undefined : "url(#introJourneyRouteGlow)"}
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0.45 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: reducedMotion ? 0.2 : 2.1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.35,
              }}
            />

            {[...leftNodes, ...rightNodes].map((node) => (
              <motion.g
                key={node.id}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: reducedMotion ? 0.2 : 0.4,
                  delay: reducedMotion ? 0 : node.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="8"
                  className="intro-journey__node intro-journey__node--outer"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="3.8"
                  className="intro-journey__node intro-journey__node--inner"
                />
              </motion.g>
            ))}

            <motion.g
              initial={reducedMotion ? false : { opacity: 0, scale: 0.65 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reducedMotion ? 0.2 : 0.55,
                delay: reducedMotion ? 0 : 2.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <circle
                cx="536"
                cy="72"
                r="12"
                className="intro-journey__summit-node intro-journey__summit-node--outer"
              />
              <circle
                cx="536"
                cy="72"
                r="5"
                className="intro-journey__summit-node intro-journey__summit-node--inner"
              />
            </motion.g>
          </svg>

          <motion.div
            className="intro-journey__caption intro-journey__caption--left"
            initial={reducedMotion ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: reducedMotion ? 0.2 : 0.45,
              delay: reducedMotion ? 0 : 1.25,
            }}
          >
            <span className="intro-journey__caption-label">Foundations</span>
            <strong>Commercial tools, reporting, BI</strong>
          </motion.div>

          <motion.div
            className="intro-journey__caption intro-journey__caption--right"
            initial={reducedMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: reducedMotion ? 0.2 : 0.45,
              delay: reducedMotion ? 0 : 1.45,
            }}
          >
            <span className="intro-journey__caption-label">Transition</span>
            <strong>Python, apps, web, front-end craft</strong>
          </motion.div>

          <motion.div
            className="intro-journey__summit-caption"
            initial={reducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0.2 : 0.5,
              delay: reducedMotion ? 0 : 2.25,
            }}
          >
            <span className="intro-journey__caption-label">Summit</span>
            <strong>Data-driven product building</strong>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default IntroJourneyScene;