import PageSection from "../components/ui/PageSection";
import JourneyTimeline from "../components/sections/JourneyTimeline";

function Journey() {
  return (
    <PageSection
      eyebrow="Professional Journey"
      title="A progression from commercial leadership into technical build work"
    >
      <p>
        My career path combines commercial experience, analytical thinking, and
        practical software development. This journey reflects how reporting,
        planning, forecasting, and problem solving gradually evolved into a
        deeper focus on building digital products, dashboards, and data-driven
        solutions directly.
      </p>

      <JourneyTimeline />
    </PageSection>
  );
}

export default Journey;