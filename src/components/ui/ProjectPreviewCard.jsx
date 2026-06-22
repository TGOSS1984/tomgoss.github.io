import { useState } from "react";
import { ExternalLink, Code2, Maximize2, PauseCircle } from "lucide-react";
import Reveal from "./Reveal";
import { getProjectStatus } from "../../utils/projectStatus";
import CardBorderTrace from "./CardBorderTrace";
import useIsMobile from "../../hooks/useIsMobile";

function ProjectPreviewCard({ project, onOpenDetails }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = project.image && !imageFailed;
  const status = getProjectStatus(project);
  const isMobile = useIsMobile();

  const openDetails = () => onOpenDetails?.(project);

  const handleCardKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetails();
    }
  };

  // On desktop, the whole card is a click target — hovering already hints
  // it's interactive before you commit to a click. On mobile there's no
  // hover state, so tapping anywhere and unexpectedly landing in a
  // full-screen lightbox can feel jarring. Below the nav's mobile
  // breakpoint, the card body itself isn't a click target at all; only the
  // explicit "View details" button (rendered further down) is.
  const cardInteractionProps = isMobile
    ? {}
    : {
        onClick: openDetails,
        onKeyDown: handleCardKeyDown,
        role: "button",
        tabIndex: 0,
        "aria-label": `View details for ${project.title}`,
      };

  return (
    <Reveal>
      <article
        className="project-preview-card card card-hover"
        {...cardInteractionProps}
      >
        <CardBorderTrace />
        {showImage ? (
          <div className="project-visual project-visual-image">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="project-image"
              onError={() => setImageFailed(true)}
            />
            <div className="project-image-scrim" />
            {!isMobile && (
              <div className="project-visual-hint">
                <Maximize2 size={15} />
                View details
              </div>
            )}
            <p className="project-visual-label">
              {project.imageLabel || "Project"}
            </p>
          </div>
        ) : (
          <div className="project-visual">
            <div className="project-visual-overlay" />
            {!isMobile && (
              <div className="project-visual-hint">
                <Maximize2 size={15} />
                View details
              </div>
            )}
            <p className="project-visual-label">
              {project.imageLabel || "Project"}
            </p>
          </div>
        )}

        <div className="project-preview-top">
          {project.suite && <p className="project-suite">{project.suite}</p>}
          <p className="project-category">{project.category}</p>
        </div>

        <h3 className="project-title">{project.title}</h3>

        <p className="project-summary">{project.summary}</p>

        {project.badges?.length > 0 && (
          <div className="project-badges">
            {project.badges.map((badge) => {
              const Icon = badge.Icon;

              return (
                <span
                  key={badge.label}
                  className="project-badge"
                  aria-label={badge.label}
                  title={badge.label}
                >
                  <span className="project-badge-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="project-badge-text">{badge.label}</span>
                </span>
              );
            })}
          </div>
        )}

        {isMobile && (
          <button
            type="button"
            className="project-mobile-details-btn"
            onClick={openDetails}
          >
            <Maximize2 size={15} />
            View details
          </button>
        )}

        <div className="project-card-footer">
          <div className="project-links">
            {project.githubUrl && (
              <a
                className="project-link"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <Code2 size={16} />
                Code
              </a>
            )}

            {status === "offline" ? (
              <span className="project-link project-link-disabled">
                <PauseCircle size={16} />
                Currently offline
              </span>
            ) : project.liveUrl ? (
              <a
                className="project-link project-link-primary"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            ) : (
              <span className="project-link project-link-disabled">
                Code only
              </span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default ProjectPreviewCard;