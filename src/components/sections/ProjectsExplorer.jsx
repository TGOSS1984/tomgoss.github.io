import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import projects from "../../data/projects";
import ProjectPreviewCard from "../ui/ProjectPreviewCard";
import ProjectLightbox from "../ui/ProjectLightbox";
import useProjectLightbox from "../../hooks/useProjectLightbox";

const DEFAULT_VISIBLE = 6;

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
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return [...projects]
        .filter((project) => project.visible !== false)
        .sort((a, b) => a.rank - b.rank);
    }

    return projects
      .filter((project) => project.visible !== false && project.category === activeFilter)
      .sort((a, b) => a.rank - b.rank);
  }, [activeFilter]);

  // Only apply the limit on the unfiltered "All" view — someone actively
  // filtering by category almost certainly wants to see everything in it.
  const isAllView = activeFilter === "All";
  const visibleProjects = isAllView
    ? filteredProjects.slice(0, DEFAULT_VISIBLE)
    : filteredProjects;
  const extraProjects = isAllView ? filteredProjects.slice(DEFAULT_VISIBLE) : [];
  const hiddenCount = extraProjects.length;

  const handleFilterChange = (option) => {
    setActiveFilter(option);
    // Reset expanded state when switching back to All so the button reappears.
    if (option === "All") setShowAll(false);
  };

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
            onClick={() => handleFilterChange(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="featured-projects-grid">
        {visibleProjects.map((project) => (
          <ProjectPreviewCard
            key={project.id}
            project={project}
            onOpenDetails={openProject}
          />
        ))}
      </div>

      <AnimatePresence>
        {showAll && extraProjects.length > 0 && (
          <motion.div
            className="featured-projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {extraProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
              >
                <ProjectPreviewCard
                  project={project}
                  onOpenDetails={openProject}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {activeFilter === "All" && hiddenCount > 0 && (
        <div className="projects-show-more">
          <button
            type="button"
            className="projects-show-more-btn"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show less" : `Show ${hiddenCount} more project${hiddenCount !== 1 ? "s" : ""}`}
          </button>
        </div>
      )}

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