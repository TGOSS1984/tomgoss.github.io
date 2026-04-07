import { motion } from "framer-motion";
import {
  FaFileExcel,
  FaFilePowerpoint,
  FaFileWord,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaPython,
} from "react-icons/fa";
import {
  SiDjango,
  SiFlask,
  SiStreamlit,
  SiJupyter,
} from "react-icons/si";
import { TbSql, TbChartBarPopular } from "react-icons/tb";
import { IoLogoJavascript } from "react-icons/io5";

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

const leftMilestones = [
  {
    id: "office",
    label: "Microsoft 365",
    sublabel: "Word, PowerPoint, Excel",
    delay: 0.9,
    className: "intro-journey__milestone intro-journey__milestone--left-base",
    icons: [FaFileWord, FaFilePowerpoint, FaFileExcel],
  },
  {
    id: "bi",
    label: "Commercial & BI",
    sublabel: "Reporting, dashboards, Power BI",
    delay: 1.25,
    className: "intro-journey__milestone intro-journey__milestone--left-mid",
    icons: [TbChartBarPopular],
  },
];

const rightMilestones = [
  {
    id: "backend",
    label: "Python & Data",
    sublabel: "Python, SQL, Jupyter, Streamlit",
    delay: 1.1,
    className:
      "intro-journey__milestone intro-journey__milestone--right-mid",
    icons: [FaPython, TbSql, SiJupyter, SiStreamlit],
  },
  {
    id: "web",
    label: "Web Development",
    sublabel: "Flask, Django, HTML, CSS, JavaScript, React",
    delay: 1.45,
    className:
      "intro-journey__milestone intro-journey__milestone--right-base",
    icons: [SiFlask, SiDjango, FaHtml5, FaCss3Alt, IoLogoJavascript, FaReact],
  },
];

function MilestoneCard({ item, reducedMotion = false }) {
  return (
    <motion.div
      className={item.className}
      initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.965 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reducedMotion ? 0.2 : 0.42,
        delay: reducedMotion ? 0 : item.delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="intro-journey__milestone-icons" aria-hidden="true">
        {item.icons.map((Icon, index) => (
          <span
            key={`${item.id}-${index}`}
            className="intro-journey__milestone-icon"
          >
            <Icon />
          </span>
        ))}
      </div>

      <span className="intro-journey__milestone-label">{item.label}</span>
      <strong className="intro-journey__milestone-title">{item.sublabel}</strong>
    </motion.div>
  );
}

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
                <stop offset="0%" stopColor="rgba(79, 209, 255, 0.18)" />
                <stop offset="58%" stopColor="rgba(79, 209, 255, 0.82)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.8)" />
              </linearGradient>

              <linearGradient
                id="introJourneyRouteGradientRight"
                x1="100%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.18)" />
                <stop offset="48%" stopColor="rgba(79, 209, 255, 0.78)" />
                <stop offset="100%" stopColor="rgba(79, 209, 255, 0.72)" />
              </linearGradient>

              <filter id="introJourneyRouteGlow">
                <feGaussianBlur stdDeviation="3.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="introJourneyPulseGlow">
                <feGaussianBlur stdDeviation="5" result="pulseBlur" />
                <feMerge>
                  <feMergeNode in="pulseBlur" />
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
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={reducedMotion ? undefined : "url(#introJourneyRouteGlow)"}
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0.42 }}
              animate={{ pathLength: 1, opacity: 0.92 }}
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
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={reducedMotion ? undefined : "url(#introJourneyRouteGlow)"}
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0.42 }}
              animate={{ pathLength: 1, opacity: 0.92 }}
              transition={{
                duration: reducedMotion ? 0.2 : 2.1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.35,
              }}
            />

            {!reducedMotion ? (
              <>
                <g className="intro-journey__traveller-group">
                  <circle
                    r="9"
                    className="intro-journey__traveller intro-journey__traveller--halo"
                    filter="url(#introJourneyPulseGlow)"
                  >
                    <animateMotion
                      dur="6.5s"
                      begin="2.2s"
                      repeatCount="indefinite"
                      rotate="auto"
                      path={leftRoutePath}
                    />
                  </circle>
                  <circle
                    r="3.8"
                    className="intro-journey__traveller intro-journey__traveller--core"
                  >
                    <animateMotion
                      dur="6.5s"
                      begin="2.2s"
                      repeatCount="indefinite"
                      rotate="auto"
                      path={leftRoutePath}
                    />
                  </circle>
                </g>

                <g className="intro-journey__traveller-group">
                  <circle
                    r="9"
                    className="intro-journey__traveller intro-journey__traveller--halo intro-journey__traveller--halo-alt"
                    filter="url(#introJourneyPulseGlow)"
                  >
                    <animateMotion
                      dur="6.8s"
                      begin="2.55s"
                      repeatCount="indefinite"
                      rotate="auto"
                      path={rightRoutePath}
                    />
                  </circle>
                  <circle
                    r="3.8"
                    className="intro-journey__traveller intro-journey__traveller--core intro-journey__traveller--core-alt"
                  >
                    <animateMotion
                      dur="6.8s"
                      begin="2.55s"
                      repeatCount="indefinite"
                      rotate="auto"
                      path={rightRoutePath}
                    />
                  </circle>
                </g>
              </>
            ) : null}

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
                  r="7"
                  className="intro-journey__node intro-journey__node--outer"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="3.2"
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
                r="11"
                className="intro-journey__summit-node intro-journey__summit-node--outer"
              />
              <circle
                cx="536"
                cy="72"
                r="4.6"
                className="intro-journey__summit-node intro-journey__summit-node--inner"
              />
            </motion.g>

            {!reducedMotion ? (
              <>
                <circle
                  cx="536"
                  cy="72"
                  r="18"
                  className="intro-journey__summit-pulse intro-journey__summit-pulse--one"
                />
                <circle
                  cx="536"
                  cy="72"
                  r="18"
                  className="intro-journey__summit-pulse intro-journey__summit-pulse--two"
                />
              </>
            ) : null}
          </svg>

          <div className="intro-journey__milestone-layer">
            {leftMilestones.map((item) => (
              <MilestoneCard
                key={item.id}
                item={item}
                reducedMotion={reducedMotion}
              />
            ))}

            {rightMilestones.map((item) => (
              <MilestoneCard
                key={item.id}
                item={item}
                reducedMotion={reducedMotion}
              />
            ))}

            <motion.div
              className="intro-journey__summit-card"
              initial={reducedMotion ? false : { opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: reducedMotion ? 0.2 : 0.46,
                delay: reducedMotion ? 0 : 2.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="intro-journey__milestone-label">Summit</span>
              <strong className="intro-journey__milestone-title">
                Data-driven product building
              </strong>
              <p className="intro-journey__summit-text">
                Bringing commercial thinking, analytics, and modern development
                together in one direction.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default IntroJourneyScene;