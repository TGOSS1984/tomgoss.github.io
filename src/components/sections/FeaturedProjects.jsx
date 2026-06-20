import { useNavigate } from "react-router-dom";
import projects from "../../data/projects";
import ProjectPreviewCard from "../ui/ProjectPreviewCard";
import ProjectLightbox from "../ui/ProjectLightbox";
import PageSection from "../ui/PageSection";
import Button from "../ui/Button";
import useProjectLightbox from "../../hooks/useProjectLightbox";

function FeaturedProjects() {
  const navigate = useNavigate();
  const featuredProjects = projects.filter((project) => project.featured);
  const { activeProject, openProject, closeProject } = useProjectLightbox();

  return (
    <PageSection
      eyebrow="Selected Work"
      title="Featured projects from software, analytics, and BI"
    >
      <div className="featured-projects-grid">
        {featuredProjects.map((project) => (
          <ProjectPreviewCard
            key={project.id}
            project={project}
            onOpenDetails={openProject}
          />
        ))}
      </div>

      <div className="button-row" style={{ marginTop: "1.75rem" }}>
        <Button onClick={() => navigate("/projects")}>View All Projects</Button>
      </div>

      <ProjectLightbox project={activeProject} onClose={closeProject} />
    </PageSection>
  );
}

export default FeaturedProjects;