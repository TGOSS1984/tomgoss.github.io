import PageSection from "../components/ui/PageSection";
import ProjectsExplorer from "../components/sections/ProjectsExplorer";

function Projects() {
  return (
    <PageSection
      eyebrow="Portfolio"
      title="Projects across full stack, analytics, BI, and interactive build work"
    >
      <p>
        This portfolio brings together practical software projects, business
        intelligence dashboards, analytics workflows, and interactive builds.
        The strongest connected theme is the Mountain Tours suite, which links
        web development, machine learning, and reporting into one portfolio
        ecosystem.
      </p>

      <ProjectsExplorer />
    </PageSection>
  );
}

export default Projects;