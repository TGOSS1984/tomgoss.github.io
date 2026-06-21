import { useCallback, useState } from "react";

// Manages which project (if any) is open in the lightbox, as an index into
// the `projects` list that's currently on screen — so prev/next can move
// between projects without the caller needing to track anything itself.
function useProjectLightbox(projects) {
  const [activeIndex, setActiveIndex] = useState(null);

  const openProject = useCallback(
    (project) => {
      const index = projects.findIndex((item) => item.id === project.id);
      setActiveIndex(index === -1 ? null : index);
    },
    [projects],
  );

  const closeProject = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || projects.length === 0) return current;
      return (current + 1) % projects.length;
    });
  }, [projects.length]);

  const goToPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || projects.length === 0) return current;
      return (current - 1 + projects.length) % projects.length;
    });
  }, [projects.length]);

  const activeProject = activeIndex === null ? null : projects[activeIndex] ?? null;

  return {
    activeProject,
    openProject,
    closeProject,
    goToNext,
    goToPrev,
    canNavigate: projects.length > 1,
  };
}

export default useProjectLightbox;