import Hero from "../components/sections/Hero";
import StatsStrip from "../components/sections/StatsStrip";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import Card from "../components/ui/Card";
import PageSection from "../components/ui/PageSection";
import Button from "../components/ui/Button";

function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedProjects />

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
          <Button href="/journey" variant="secondary">
            View Journey
          </Button>
        </div>
      </PageSection>
    </>
  );
}

export default Home;