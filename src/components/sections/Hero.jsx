import { ArrowRight, BarChart3, BriefcaseBusiness, Code2 } from "lucide-react";
import Button from "../ui/Button";

function Hero() {
  return (
    <section className="hero-section">
      <div className="shell hero-grid">
        <div className="hero-copy">
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
            <Button href="/projects">
              View Projects
              <ArrowRight size={18} />
            </Button>

            <Button href="/about" variant="secondary">
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
        </div>

        <div className="hero-panel card">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;