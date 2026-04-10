import { useCallback, useEffect, useRef, useState } from "react";
import IntroExperience from "../components/intro/IntroExperience";
import Hero from "../components/sections/Hero";
import StatsStrip from "../components/sections/StatsStrip";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import DeliveryCollaboration from "../components/sections/DeliveryCollaboration";
import Card from "../components/ui/Card";
import PageSection from "../components/ui/PageSection";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [startStatsAnimation, setStartStatsAnimation] = useState(false);
  const statsDelayRef = useRef(null);

  const PAGE_TRANSITION_DELAY = 900;

  const handleIntroReady = useCallback((introPlayed) => {
    if (statsDelayRef.current) {
      window.clearTimeout(statsDelayRef.current);
    }

    if (introPlayed) {
      setStartStatsAnimation(true);
      return;
    }

    statsDelayRef.current = window.setTimeout(() => {
      setStartStatsAnimation(true);
    }, PAGE_TRANSITION_DELAY);
  }, []);

  useEffect(() => {
    return () => {
      if (statsDelayRef.current) {
        window.clearTimeout(statsDelayRef.current);
      }
    };
  }, []);

  return (
    <>
      <IntroExperience onReady={handleIntroReady} />

      <Hero />
      <StatsStrip startAnimation={startStatsAnimation} />
      <FeaturedProjects />
      <DeliveryCollaboration />

      <PageSection
        eyebrow="Featured Direction"
        title="A portfolio built around real-world themes"
      >
        <div className="grid-three">
          <Card hover>
            <p className="kicker">Flagship Collection</p>
            <h3>Mountain Tours Suite</h3>
            <p>
              A connected group of Django, Streamlit, and Power BI projects
              built around bookings, forecasting, and analytics.
            </p>
          </Card>

          <Card hover>
            <p className="kicker">Supporting Builds</p>
            <h3>Full Stack + Interactive Projects</h3>
            <p>
              Additional work includes Ashen Emporium, a Souls-inspired Flask
              text adventure, and JavaScript-based games.
            </p>
          </Card>

          <Card hover>
            <p className="kicker">Professional Story</p>
            <h3>Commercial to Technical</h3>
            <p>
              The portfolio reflects a transition from commercial leadership
              into development and analytics with practical project delivery.
            </p>
          </Card>
        </div>

        <div className="button-row" style={{ marginTop: "1.5rem" }}>
          <Button onClick={() => navigate("/journey")} variant="secondary">
            View Journey
          </Button>
        </div>
      </PageSection>
    </>
  );
}

export default Home;