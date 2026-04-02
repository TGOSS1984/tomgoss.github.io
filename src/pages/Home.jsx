import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageSection from "../components/ui/PageSection";

function Home() {
  return (
    <>
      <PageSection eyebrow="Portfolio" title="Developer with an analyst's mindset.">
        <p>
          I build practical digital products and analytics-focused projects across
          full stack development, business intelligence, machine learning, and
          interactive web experiences.
        </p>

        <div className="button-row" style={{ marginTop: "1.5rem" }}>
          <Button href="/projects">View Projects</Button>
          <Button href="/contact" variant="secondary">
            Get In Touch
          </Button>
        </div>
      </PageSection>

      <PageSection eyebrow="Snapshot" title="Portfolio Focus">
        <div className="grid-three">
          <Card hover>
            <p className="kicker">Primary Direction</p>
            <h3>Dev / Data Hybrid</h3>
            <p>
              Combining full stack project work with analytics, dashboards, and
              business-focused problem solving.
            </p>
          </Card>

          <Card hover>
            <p className="kicker">Flagship Theme</p>
            <h3>Mountain Tours Suite</h3>
            <p>
              A connected portfolio of Django, Streamlit, and Power BI projects
              built around one branded domain.
            </p>
          </Card>

          <Card hover>
            <p className="kicker">Current Build</p>
            <h3>Interactive Portfolio</h3>
            <p>
              A React-based portfolio site with KPI cards, transitions,
              timelines, and data-inspired interface design.
            </p>
          </Card>
        </div>
      </PageSection>
    </>
  );
}

export default Home;