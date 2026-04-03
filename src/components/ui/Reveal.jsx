import { motion } from "framer-motion";

function Reveal({
  children,
  delay = 0,
  distance = 24,
  direction = "up",
}) {
  const variants = {
    up: { opacity: 0, y: distance },
    left: { opacity: 0, x: -distance },
    right: { opacity: 0, x: distance },
  };

  return (
    <motion.div
      initial={variants[direction] || variants.up}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;