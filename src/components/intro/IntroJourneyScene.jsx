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
import { SiDjango, SiFlask } from "react-icons/si";
import { TbSql, TbChartBarPopular } from "react-icons/tb";
import { IoLogoJavascript } from "react-icons/io5";

const milestones = [
  {
    id: "excel",
    label: "Excel",
    x: 86,
    y: 352,
    delay: 0.12,
    variant: "office",
    Icon: FaFileExcel,
  },
  {
    id: "powerpoint",
    label: "PowerPoint",
    x: 154,
    y: 326,
    delay: 0.28,
    variant: "office",
    Icon: FaFilePowerpoint,
  },
  {
    id: "word",
    label: "Word",
    x: 228,
    y: 298,
    delay: 0.44,
    variant: "office",
    Icon: FaFileWord,
  },
  {
    id: "powerbi",
    label: "Power BI",
    x: 300,
    y: 266,
    delay: 0.62,
    variant: "data",
    Icon: TbChartBarPopular,
  },
  {
    id: "sql",
    label: "SQL",
    x: 374,
    y: 232,
    delay: 0.82,
    variant: "data",
    Icon: TbSql,
  },
  {
    id: "python",
    label: "Python",
    x: 452,
    y: 196,
    delay: 1.02,
    variant: "dev",
    Icon: FaPython,
  },
  {
    id: "django",
    label: "Django",
    x: 532,
    y: 154,
    delay: 1.22,
    variant: "dev",
    Icon: SiDjango,
  },
  {
    id: "flask",
    label: "Flask",
    x: 606,
    y: 118,
    delay: 1.42,
    variant: "dev",
    Icon: SiFlask,
  },
  {
    id: "html",
    label: "HTML",
    x: 680,
    y: 96,
    delay: 1.6,
    variant: "frontend",
    Icon: FaHtml5,
  },
  {
    id: "css",
    label: "CSS",
    x: 748,
    y: 78,
    delay: 1.78,
    variant: "frontend",
    Icon: FaCss3Alt,
  },
  {
    id: "javascript",
    label: "JavaScript",
    x: 818,
    y: 64,
    delay: 1.98,
    variant: "frontend",
    Icon: IoLogoJavascript,
  },
  {
    id: "react",
    label: "React",
    x: 892,
    y: 48,
    delay: 2.18,
    variant: "frontend",
    Icon: FaReact,
  },
];

const routePath =
  "M 78 352 C 118 340, 132 336, 154 326 S 212 308, 228 298 S 278 276, 300 266 S 352 242, 374 232 S 426 206, 452 196 S 510 166, 532 154 S 584 126, 606 118 S 660 102, 680 96 S 726 84, 748 78 S 796 68, 818 64 S 872 52, 892 48";

function getBadgeClass(variant) {
  switch (variant) {
    case "office":
      return "intro-journey__badge intro-journey__badge--office";
    case "data":
      return "intro-journey__badge intro-journey__badge--data";
    case "frontend":
      return "intro-journey__badge intro-journey__badge--frontend";
    default:
      return "intro-journey__badge intro-journey__badge--dev";
  }
}

function IntroJourneyScene({ reducedMotion = false }) {
  return (
    <motion.div
      className="intro-journey"
      initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.992 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.996 }}
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
          The route climbs from reporting foundations into engineering, UI,
          Python frameworks, and interactive front-end work.
        </p>
      </div>

      <div className="intro-journey__frame">
        {!reducedMotion ? (
          <>
            <div className="intro-journey__ambient intro-journey__ambient--one" />
            <div className="intro-journey__ambient intro-journey__ambient--two" />
          </>
        ) : null}

        <svg
          className="intro-journey__svg"
          viewBox="0 0 960 420"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Technology journey climbing a mountain route"
        >
          <defs>
            <linearGradient id="journeyRouteGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(79, 209, 255, 0.62)" />
              <stop offset="58%" stopColor="rgba(79, 209, 255, 0.95)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.92)" />
            </linearGradient>

            <linearGradient id="journeyMountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(79, 209, 255, 0.04)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.08)" />
            </linearGradient>

            <filter id="journeyRouteGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            className="intro-journey__mountain"
            d="M 40 378 L 180 286 L 286 310 L 404 214 L 520 242 L 642 124 L 746 150 L 920 38 L 920 398 L 40 398 Z"
            fill="url(#journeyMountainGradient)"
          />

          <g className="intro-journey__contours">
            <path d="M 88 360 C 176 306, 262 318, 332 266 S 494 216, 598 148 S 782 116, 890 54" />
            <path d="M 122 388 C 222 334, 310 334, 394 284 S 556 230, 662 168 S 826 120, 910 84" />
          </g>

          <motion.path
            d={routePath}
            className="intro-journey__route"
            fill="none"
            stroke="url(#journeyRouteGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={reducedMotion ? undefined : "url(#journeyRouteGlow)"}
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0.55 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.2 : 2.4, ease: "easeInOut" }}
          />

          {milestones.map((point) => (
            <motion.g
              key={point.id}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reducedMotion ? 0.2 : 0.34,
                delay: reducedMotion ? 0 : point.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r="9"
                className="intro-journey__node intro-journey__node--outer"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="4.5"
                className="intro-journey__node intro-journey__node--inner"
              />
            </motion.g>
          ))}
        </svg>

        <div className="intro-journey__badges">
          {milestones.map((item) => {
            const Icon = item.Icon;

            return (
              <motion.div
                key={item.id}
                className={getBadgeClass(item.variant)}
                initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: reducedMotion ? 0.2 : 0.45,
                  delay: reducedMotion ? 0 : item.delay + 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="intro-journey__badge-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span>{item.label}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="intro-journey__summary"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0.2 : 0.5,
            delay: reducedMotion ? 0 : 2.45,
          }}
        >
          <div className="intro-journey__summary-item">
            <span className="intro-journey__summary-label">Start</span>
            <strong>Commercial + BI foundations</strong>
          </div>

          <div className="intro-journey__summary-item">
            <span className="intro-journey__summary-label">Climb</span>
            <strong>Python, web, and application builds</strong>
          </div>

          <div className="intro-journey__summary-item">
            <span className="intro-journey__summary-label">Current</span>
            <strong>React + portfolio engineering</strong>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default IntroJourneyScene;