import { useMemo, useState } from "react";
import projects from "../../data/projects";
import ProjectPreviewCard from "../ui/ProjectPreviewCard";
import ProjectLightbox from "../ui/ProjectLightbox";
import useProjectLightbox from "../../hooks/useProjectLightbox";

const filterOptions = [
  "All",
  "Full Stack",
  "Machine Learning",
  "BI / Dashboarding",
  "Analytics",
  "Interactive",
  "JavaScript",
  "Experimental",
  "Python / CLI",
];

function ProjectsExplorer() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return [...projects].sort((a, b) => a.rank - b.rank);
    }

    return projects
      .filter((project) => project.category === activeFilter)
      .sort((a, b) => a.rank - b.rank);
  }, [activeFilter]);

  const { activeProject, openProject, closeProject, goToNext, goToPrev, canNavigate } =
    useProjectLightbox(filteredProjects);

  return (
    <div className="projects-explorer">
      <div className="filter-row">
        {filterOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={
              activeFilter === option
                ? "filter-chip filter-chip-active"
                : "filter-chip"
            }
            onClick={() => setActiveFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="featured-projects-grid">
        {filteredProjects.map((project) => (
          <ProjectPreviewCard
            key={project.id}
            project={project}
            onOpenDetails={openProject}
          />
        ))}
      </div>

      <ProjectLightbox
        project={activeProject}
        onClose={closeProject}
        onNext={goToNext}
        onPrev={goToPrev}
        canNavigate={canNavigate}
      />
    </div>
  );
}

export default ProjectsExplorer;