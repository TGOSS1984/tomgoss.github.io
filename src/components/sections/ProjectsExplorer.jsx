import { useMemo, useState } from "react";
import projects from "../../data/projects";
import ProjectPreviewCard from "../ui/ProjectPreviewCard";

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
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

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
          <ProjectPreviewCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsExplorer;