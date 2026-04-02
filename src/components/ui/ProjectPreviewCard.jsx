import { ExternalLink, Code2 } from "lucide-react";
import Reveal from "./Reveal";

function ProjectPreviewCard({ project }) {
  return (
    <Reveal>
      <article className="project-preview-card card card-hover">
        <div className="project-visual">
          <div className="project-visual-overlay" />
          <p className="project-visual-label">{project.imageLabel || "Project"}</p>
        </div>

        <div className="project-preview-top">
          {project.suite && <p className="project-suite">{project.suite}</p>}
          <p className="project-category">{project.category}</p>
        </div>

        <h3 className="project-title">{project.title}</h3>

        <p className="project-summary">{project.summary}</p>

        <div className="project-stack">
          {project.stack.map((item) => (
            <span key={item} className="stack-pill">
              {item}
            </span>
          ))}
        </div>

        <div className="project-card-footer">
          <div className="project-links">
            {project.githubUrl && (
              <a
                className="project-link"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Code2 size={16} />
                Code
              </a>
            )}

            {project.liveUrl ? (
              <a
                className="project-link project-link-primary"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            ) : (
              <span className="project-link">Private / local only</span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default ProjectPreviewCard;