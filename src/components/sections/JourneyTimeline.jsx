import { motion } from "framer-motion";
import journey from "../../data/journey";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.65,
      staggerChildren: 0.28,
    },
  },
};

const itemVariantsLeft = {
  hidden: { opacity: 0, x: -80, y: 18 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariantsRight = {
  hidden: { opacity: 0, x: 80, y: 18 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const markerVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

function JourneyTimeline() {
  return (
    <div className="journey-timeline-alt-wrap">
      <motion.div
        className="journey-spine"
        initial={{ scaleY: 0, opacity: 0.35 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top center" }}
      />

      <motion.div
        className="journey-timeline-alt"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {journey.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.article
              key={`${item.year}-${item.title}`}
              className={`timeline-alt-item ${
                isLeft ? "timeline-alt-left" : "timeline-alt-right"
              }`}
              variants={isLeft ? itemVariantsLeft : itemVariantsRight}
            >
              <div className="timeline-alt-content">
                <div className="timeline-alt-card">
                  <p className="timeline-year">{item.year}</p>
                  <p className="timeline-phase">{item.phase}</p>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>

              <div className="timeline-alt-marker-wrap">
                <motion.div
                  className="timeline-alt-marker"
                  variants={markerVariants}
                />
              </div>

              <div className="timeline-alt-empty" />
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}

export default JourneyTimeline;