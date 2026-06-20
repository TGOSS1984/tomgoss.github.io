import { useCallback, useState } from "react";

function useProjectLightbox() {
  const [activeProject, setActiveProject] = useState(null);

  const openProject = useCallback((project) => {
    setActiveProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
  }, []);

  return { activeProject, openProject, closeProject };
}

export default useProjectLightbox;