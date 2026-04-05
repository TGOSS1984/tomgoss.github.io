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

const milestones = [
  {
    id: "excel",
    label: "Excel",
    x: 118,
    y: 342,
    badgeX: 74,
    badgeY: 306,
    delay: 0.1,
    variant: "office",
    Icon: FaFileExcel,
  },
  {
    id: "powerpoint",
    label: "PowerPoint",
    x: 188,
    y: 314,
    badgeX: 144,
    badgeY: 276,
    delay: 0.24,
    variant: "office",
    Icon: FaFilePowerpoint,
  },
  {
    id: "word",
    label: "Word",
    x: 260,
    y: 292,
    badgeX: 224,
    badgeY: 252,
    delay: 0.38,
    variant: "office",
    Icon: FaFileWord,
  },
  {
    id: "powerbi",
    label: "Power BI",
    x: 332,
    y: 266,
    badgeX: 292,
    badgeY: 226,
    delay: 0.54,
    variant: "data",
    Icon: TbChartBarPopular,
  },
  {
    id: "sql",
    label: "SQL",
    x: 402,
    y: 242,
    badgeX: 368,
    badgeY: 200,
    delay: 0.7,
    variant: "data",
    Icon: TbSql,
  },
  {
    id: "python",
    label: "Python",
    x: 478,
    y: 208,
    badgeX: 440,
    badgeY: 166,
    delay: 0.86,
    variant: "dev",
    Icon: FaPython,
  },
  {
    id: "django",
    label: "Django",
    x: 554,
    y: 176,
    badgeX: 516,
    badgeY: 134,
    delay: 1.04,
    variant: "dev",
    Icon: SiDjango,
  },
  {
    id: "flask",
    label: "Flask",
    x: 628,
    y: 152,
    badgeX: 592,
    badgeY: 110,
    delay: 1.2,
    variant: "dev",
    Icon: SiFlask,
  },
  {
    id: "jupyter",
    label: "Jupyter",
    x: 704,
    y: 126,
    badgeX: 664,
    badgeY: 84,
    delay: 1.36,
    variant: "data",
    Icon: SiJupyter,
  },
  {
    id: "streamlit",
    label: "Streamlit",
    x: 774,
    y: 102,
    badgeX: 726,
    badgeY: 60,
    delay: 1.52,
    variant: "dev",
    Icon: SiStreamlit,
  },
  {
    id: "html",
    label: "HTML",
    x: 836,
    y: 82,
    badgeX: 794,
    badgeY: 40,
    delay: 1.68,
    variant: "frontend",
    Icon: FaHtml5,
  },
  {
    id: "css",
    label: "CSS",
    x: 888,
    y: 64,
    badgeX: 852,
    badgeY: 18,
    delay: 1.84,
    variant: "frontend",
    Icon: FaCss3Alt,
  },
  {
    id: "javascript",
    label: "JavaScript",
    x: 926,
    y: 50,
    badgeX: 840,
    badgeY: 96,
    delay: 2.0,
    variant: "frontend",
    Icon: IoLogoJavascript,
  },
  {
    id: "react",
    label: "React",
    x: 950,
    y: 38,
    badgeX: 874,
    badgeY: 124,
    delay: 2.16,
    variant: "frontend",
    Icon: FaReact,
  },
];

const routePath =
  "M 118 342 L 150 330 L 188 314 L 224 302 L 260 292 L 292 280 L 332 266 L 366 254 L 402 242 L 438 226 L 478 208 L 518 190 L 554 176 L 592 164 L 628 152 L 666 138 L 704 126 L 740 114 L 774 102 L 808 92 L 836 82 L 864 72 L 888 64 L 908 56 L 926 50 L 950 38";

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
          A climb from reporting and analytics through Python frameworks,
          notebooks, app builds, and modern front-end development.
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
          viewBox="0 0 980 420"
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
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
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
            d="M 40 388 L 130 330 L 210 344 L 300 266 L 390 286 L 488 204 L 566 222 L 648 146 L 724 162 L 810 88 L 858 108 L 920 44 L 964 20 L 964 402 L 40 402 Z"
            fill="url(#journeyMountainGradient)"
          />

          <g className="intro-journey__contours">
            <path d="M 92 370 C 170 336, 236 334, 302 282 S 448 222, 544 190 S 730 128, 920 36" />
            <path d="M 126 390 C 222 350, 290 338, 372 286 S 512 226, 620 176 S 786 116, 944 28" />
            <path d="M 178 400 C 286 360, 360 338, 450 286 S 604 214, 712 158 S 842 96, 958 22" />
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
            transition={{ duration: reducedMotion ? 0.2 : 2.5, ease: "easeInOut" }}
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

        <div className="intro-journey__badge-layer">
          {milestones.map((item) => {
            const Icon = item.Icon;

            return (
              <motion.div
                key={item.id}
                className={`${getBadgeClass(item.variant)} intro-journey__badge--floating`}
                style={{
                  left: `${(item.badgeX / 980) * 100}%`,
                  top: `${(item.badgeY / 420) * 100}%`,
                }}
                initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: reducedMotion ? 0.2 : 0.42,
                  delay: reducedMotion ? 0 : item.delay + 0.06,
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
            delay: reducedMotion ? 0 : 2.55,
          }}
        >
          <div className="intro-journey__summary-item">
            <span className="intro-journey__summary-label">Start</span>
            <strong>Commercial + BI foundations</strong>
          </div>

          <div className="intro-journey__summary-item">
            <span className="intro-journey__summary-label">Climb</span>
            <strong>Python, notebooks, apps, and web builds</strong>
          </div>

          <div className="intro-journey__summary-item">
            <span className="intro-journey__summary-label">Current</span>
            <strong>Frontend engineering + portfolio craft</strong>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default IntroJourneyScene;