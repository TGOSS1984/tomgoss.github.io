import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  ImageOff,
  PauseCircle,
  X,
} from "lucide-react";
import { getProjectStatus } from "../../utils/projectStatus";

function StatusPill({ project }) {
  const status = getProjectStatus(project);

  if (status === "live") {
    return (
      <span className="status-pill status-pill-live">
        <span className="status-dot" aria-hidden="true" />
        Live
      </span>
    );
  }

  if (status === "offline") {
    return (
      <span className="status-pill status-pill-offline">
        <PauseCircle size={14} />
        Currently offline
      </span>
    );
  }

  return (
    <span className="status-pill status-pill-private">
      <Code2 size={14} />
      Code only
    </span>
  );
}

function GallerySlide({ slide, project }) {
  if (slide?.type === "image" && slide.src) {
    return (
      <div className="lightbox-slide lightbox-slide-image">
        <img src={slide.src} alt={slide.alt || project.title} />
        <div className="lightbox-slide-scrim" aria-hidden="true" />
        {slide.caption && <p className="lightbox-slide-caption">{slide.caption}</p>}
      </div>
    );
  }

  return (
    <div className="lightbox-slide lightbox-slide-placeholder">
      <div className="lightbox-placeholder-pattern" aria-hidden="true" />
      <ImageOff size={28} className="lightbox-placeholder-icon" aria-hidden="true" />
      <p className="lightbox-placeholder-text">Gallery image coming soon</p>
      {slide?.caption && <p className="lightbox-slide-caption">{slide.caption}</p>}
    </div>
  );
}

function ProjectLightbox({ project, onClose }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [lastProjectId, setLastProjectId] = useState(project?.id ?? null);
  const closeBtnRef = useRef(null);

  const gallery =
    project?.gallery?.length > 0
      ? project.gallery
      : project
        ? [{ type: "placeholder", caption: project.imageLabel || "Preview" }]
        : [];

  // Reset to the first slide whenever a different project is opened.
  // Adjusting state during render (rather than in an effect) avoids an
  // extra render pass — see https://react.dev/learn/you-might-not-need-an-effect
  if ((project?.id ?? null) !== lastProjectId) {
    setLastProjectId(project?.id ?? null);
    setActiveSlide(0);
  }

  useEffect(() => {
    if (!project) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  const goPrev = useCallback(() => {
    setActiveSlide((index) => (index === 0 ? gallery.length - 1 : index - 1));
  }, [gallery.length]);

  const goNext = useCallback(() => {
    setActiveSlide((index) => (index === gallery.length - 1 ? 0 : index + 1));
  }, [gallery.length]);

  useEffect(() => {
    if (!project) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose, goPrev, goNext]);

  if (typeof document === "undefined") return null;

  const status = project ? getProjectStatus(project) : null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="lightbox-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={onClose}
              ref={closeBtnRef}
              aria-label="Close project details"
            >
              <X size={20} />
            </button>

            <div className="lightbox-gallery">
              <div className="lightbox-stage">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    className="lightbox-stage-track"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <GallerySlide slide={gallery[activeSlide]} project={project} />
                  </motion.div>
                </AnimatePresence>

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="lightbox-nav lightbox-nav-left"
                      onClick={goPrev}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      className="lightbox-nav lightbox-nav-right"
                      onClick={goNext}
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <span className="lightbox-counter">
                      {activeSlide + 1} / {gallery.length}
                    </span>
                  </>
                )}
              </div>

              {gallery.length > 1 && (
                <div className="lightbox-dots">
                  {gallery.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={
                        index === activeSlide
                          ? "lightbox-dot lightbox-dot-active"
                          : "lightbox-dot"
                      }
                      onClick={() => setActiveSlide(index)}
                      aria-label={`View image ${index + 1} of ${gallery.length}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="lightbox-info">
              <div className="lightbox-info-top">
                {project.suite && <p className="project-suite">{project.suite}</p>}
                <p className="project-category">{project.category}</p>
              </div>

              <h2 id="lightbox-title" className="lightbox-title">
                {project.title}
              </h2>

              <StatusPill project={project} />

              <p className="lightbox-description">
                {project.longDescription || project.summary}
              </p>

              {project.highlights?.length > 0 && (
                <ul className="lightbox-highlights">
                  {project.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}

              {project.badges?.length > 0 && (
                <div className="project-badges lightbox-badges">
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

              <div className="lightbox-footer">
                {status === "offline" && (
                  <p className="lightbox-offline-note">
                    This build is currently scaled down to manage hosting costs.
                    Take a look through the gallery and code above, or get in
                    touch for a live walkthrough.
                  </p>
                )}

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
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  ) : (
                    <span className="project-link project-link-disabled">
                      Not deployed live
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default ProjectLightbox;