import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

function getDevelopingDuration(startYear = 2025, startMonth = 0, startDay = 1) {
  const startDate = new Date(startYear, startMonth, startDay);
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  const days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const yearLabel =
    years === 1 ? `${years} year` : years > 1 ? `${years} years` : "";
  const monthLabel =
    months === 1 ? `${months} month` : months > 1 ? `${months} months` : "";

  if (yearLabel && monthLabel) {
    return `${yearLabel} ${monthLabel}`;
  }

  if (yearLabel) {
    return yearLabel;
  }

  if (monthLabel) {
    return monthLabel;
  }

  return "Less than 1 month";
}

function Hero() {
  const navigate = useNavigate();
  const developingDuration = getDevelopingDuration(2025, 0, 1);

  return (
    <section className="hero-section">
      <div className="shell hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="kicker">Tom Goss // Developer & Data Portfolio</p>

          <h1 className="hero-title">
            Building practical digital products with a
            <span className="hero-title-accent"> commercial and analytical edge.</span>
          </h1>

          <p className="hero-text">
            I am building toward dev/data hybrid roles through a portfolio of
            full stack applications, analytics projects, machine learning work,
            dashboards, and interactive web experiences.
          </p>

          <div className="button-row hero-actions">
            <Button onClick={() => navigate("/projects")}>
              View Projects
              <ArrowRight size={18} />
            </Button>

            <Button onClick={() => navigate("/about")} variant="secondary">
              About Me
            </Button>
          </div>

          <div className="hero-tags">
            <span className="hero-tag">
              <Code2 size={16} />
              Full Stack
            </span>
            <span className="hero-tag">
              <BarChart3 size={16} />
              Analytics & BI
            </span>
            <span className="hero-tag">
              <BriefcaseBusiness size={16} />
              Commercial Context
            </span>
          </div>
        </motion.div>

        <motion.div
          className="hero-panel card"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        >
          <div className="hero-panel-inner">
            <div className="hero-terminal">
              <div className="hero-terminal-top">
                <span />
                <span />
                <span />
              </div>

              <div className="hero-terminal-body">
                <p>
                  <span className="mono muted">$</span> portfolio.status
                </p>
                <p>
                  <span className="mono muted">&gt;</span> transition:
                  <span className="hero-highlight"> active</span>
                </p>
                <p>
                  <span className="mono muted">&gt;</span> focus:
                  <span className="hero-highlight"> dev/data hybrid</span>
                </p>
                <p>
                  <span className="mono muted">&gt;</span> stack:
                  <span className="hero-highlight">
                    {" "}
                    Python, Django, Flask, JavaScript, SQL, React, Power BI
                  </span>
                </p>
                <p>
                  <span className="mono muted">&gt;</span> flagship_suite:
                  <span className="hero-highlight"> mountain_tours</span>
                </p>
              </div>
            </div>

            <div className="hero-mini-grid">
              <div className="hero-mini-card">
                <p className="hero-mini-label">Current Direction</p>
                <p className="hero-mini-value">Portfolio Build</p>
              </div>

              <div className="hero-mini-card">
                <p className="hero-mini-label">Primary Focus</p>
                <p className="hero-mini-value">React + UI</p>
              </div>

              <div className="hero-mini-card">
                <p className="hero-mini-label">Theme</p>
                <p className="hero-mini-value">Data-led Design</p>
              </div>

              <div className="hero-mini-card">
                <p className="hero-mini-label">Status</p>
                <p className="hero-mini-value">In Progress</p>
              </div>
            </div>

            <div className="hero-development-strip">
              <div className="hero-development-icon">
                <CalendarDays size={16} />
              </div>

              <div className="hero-development-copy">
                <p className="hero-development-label">
                  Years developing • Jan 2025 - Present
                </p>
                <p className="hero-development-value">{developingDuration}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;