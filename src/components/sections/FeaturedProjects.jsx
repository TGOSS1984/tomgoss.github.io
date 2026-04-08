import { useNavigate } from "react-router-dom";
import projects from "../../data/projects";
import ProjectPreviewCard from "../ui/ProjectPreviewCard";
import PageSection from "../ui/PageSection";
import Button from "../ui/Button";

function FeaturedProjects() {
  const navigate = useNavigate();
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <PageSection
      eyebrow="Selected Work"
      title="Featured projects from software, analytics, and BI"
    >
      <div className="featured-projects-grid">
        {featuredProjects.map((project) => (
          <ProjectPreviewCard key={project.id} project={project} />
        ))}
      </div>

      <div className="button-row" style={{ marginTop: "1.75rem" }}>
        <Button onClick={() => navigate("/projects")}>View All Projects</Button>
      </div>
    </PageSection>
  );
}

export default FeaturedProjects;