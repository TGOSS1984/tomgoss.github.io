import { motion } from "framer-motion";

function PersonalOutro() {
  return (
    <section className="personal-outro">
      <div className="shell">
        <motion.div
          className="personal-outro-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="personal-outro-line">Thanks for visiting this part of my profile.</p>
          <h2>Thank you.</h2>
        </motion.div>
      </div>
    </section>
  );
}

export default PersonalOutro;