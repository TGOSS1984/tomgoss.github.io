import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  ImageOff,
  Maximize2,
  PauseCircle,
  X,
} from "lucide-react";
import { getProjectStatus } from "../../utils/projectStatus";
import GalleryViewer from "./GalleryViewer";

// The open animation has three beats: a quick "pop" (opacity + scale settle
// almost immediately), a brief pause where the panel sits as a thin
// collapsed sliver, then the clip-path "letterbox" expand reveals the rest —
// each beat is a separate per-property transition rather than one blended
// animation, so the sequence actually reads as three distinct steps.
const LETTERBOX_POP_TRANSITION = { duration: 0.2, ease: "easeOut" };
const LETTERBOX_EXPAND_TRANSITION = {
  duration: 0.5,
  delay: 0.32,
  ease: [0.16, 1, 0.3, 1],
};
const LETTERBOX_EXIT_TRANSITION = { duration: 0.25, ease: "easeIn" };

function getInitials(title = "") {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

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

function GalleryThumb({ slide, index, onOpen }) {
  return (
    <button
      type="button"
      className="lightbox-gallery-thumb"
      onClick={() => onOpen(index)}
      aria-label={slide.caption ? `View image: ${slide.caption}` : `View image ${index + 1}`}
    >
      {slide.type === "image" && slide.src ? (
        <img src={slide.src} alt={slide.alt || slide.caption || ""} />
      ) : (
        <div className="lightbox-gallery-thumb-placeholder">
          <ImageOff size={20} aria-hidden="true" />
          <span>Coming soon</span>
        </div>
      )}
      <span className="lightbox-gallery-thumb-hint">
        <Maximize2 size={14} />
      </span>
      {slide.caption && <span className="lightbox-gallery-thumb-caption">{slide.caption}</span>}
    </button>
  );
}

function ProjectLightbox({ project, onClose, onNext, onPrev, canNavigate = false }) {
  const [lastProjectId, setLastProjectId] = useState(project?.id ?? null);
  const [viewerIndex, setViewerIndex] = useState(null);
  const closeBtnRef = useRef(null);

  const gallery =
    project?.gallery?.length > 0
      ? project.gallery
      : project
        ? [{ type: "placeholder", caption: project.imageLabel || "Preview" }]
        : [];

  // Reset whenever a different project is opened (either by clicking a new
  // card, or via the header prev/next). Adjusting state during render
  // (rather than in an effect) avoids an extra render pass — see
  // https://react.dev/learn/you-might-not-need-an-effect
  if ((project?.id ?? null) !== lastProjectId) {
    setLastProjectId(project?.id ?? null);
    setViewerIndex(null);
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

  useEffect(() => {
    if (!project) return undefined;

    function handleKeyDown(event) {
      // The full-screen image viewer, when open, owns Escape/arrow keys —
      // closing/navigating it rather than the project lightbox underneath.
      if (viewerIndex !== null) {
        if (event.key === "Escape") setViewerIndex(null);
        if (event.key === "ArrowLeft") {
          setViewerIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
        }
        if (event.key === "ArrowRight") {
          setViewerIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));
        }
        return;
      }

      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && canNavigate) onPrev?.();
      if (event.key === "ArrowRight" && canNavigate) onNext?.();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose, onNext, onPrev, canNavigate, viewerIndex, gallery.length]);

  if (typeof document === "undefined") return null;

  const status = project ? getProjectStatus(project) : null;

  return createPortal(
    <>
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
              initial={{ clipPath: "inset(50% 0% 50% 0%)", opacity: 0, scale: 0.88 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }}
              exit={{
                clipPath: "inset(50% 0% 50% 0%)",
                opacity: 0,
                scale: 0.94,
                transition: LETTERBOX_EXIT_TRANSITION,
              }}
              transition={{
                opacity: LETTERBOX_POP_TRANSITION,
                scale: LETTERBOX_POP_TRANSITION,
                clipPath: LETTERBOX_EXPAND_TRANSITION,
              }}
            >
              <header className="lightbox-header">
                <span className="lightbox-header-label">Project details</span>

                <div className="lightbox-header-actions">
                  {canNavigate && (
                    <>
                      <button
                        type="button"
                        className="lightbox-icon-btn"
                        onClick={onPrev}
                        aria-label="Previous project"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        className="lightbox-icon-btn"
                        onClick={onNext}
                        aria-label="Next project"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    className="lightbox-icon-btn"
                    onClick={onClose}
                    ref={closeBtnRef}
                    aria-label="Close project details"
                  >
                    <X size={18} />
                  </button>
                </div>
              </header>

              <div className="lightbox-scroll">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={project?.id}
                    className="lightbox-scroll-inner"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <div className="lightbox-identity">
                      <span className="lightbox-monogram" aria-hidden="true">
                        {getInitials(project.title)}
                      </span>

                      <div className="lightbox-identity-text">
                        <h2 id="lightbox-title" className="lightbox-title">
                          {project.title}
                        </h2>
                        <div className="lightbox-meta-row">
                          {project.suite && (
                            <span className="lightbox-meta-pill">{project.suite}</span>
                          )}
                          <span className="lightbox-meta-pill">{project.category}</span>
                          <StatusPill project={project} />
                        </div>
                      </div>
                    </div>

                    <div className="lightbox-gallery-grid">
                      {gallery.map((slide, index) => (
                        <GalleryThumb
                          key={index}
                          slide={slide}
                          index={index}
                          onOpen={setViewerIndex}
                        />
                      ))}
                    </div>

                    <h3 className="lightbox-overview-heading">Project overview</h3>

                    <div className="lightbox-overview-box">
                      <p className="lightbox-description">
                        {project.longDescription || project.summary}
                      </p>

                      {project.highlights?.length > 0 && (
                        <>
                          <p className="lightbox-overview-subheading">Highlights</p>
                          <ul className="lightbox-highlights">
                            {project.highlights.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

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

                    {status === "offline" && (
                      <p className="lightbox-offline-note">
                        This build is currently scaled down to manage hosting costs.
                        Take a look through the gallery and code above, or get in
                        touch for a live walkthrough.
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <footer className="lightbox-footer">
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
                    <span className="project-link project-link-primary project-link-disabled">
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
                      Visit Project
                    </a>
                  ) : (
                    <span className="project-link project-link-primary project-link-disabled">
                      Not deployed live
                    </span>
                  )}
                </div>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <GalleryViewer
        gallery={gallery}
        activeIndex={viewerIndex}
        projectTitle={project?.title}
        onClose={() => setViewerIndex(null)}
        onPrev={() =>
          setViewerIndex((index) => (index === 0 ? gallery.length - 1 : index - 1))
        }
        onNext={() =>
          setViewerIndex((index) => (index === gallery.length - 1 ? 0 : index + 1))
        }
      />
    </>,
    document.body,
  );
}

export default ProjectLightbox;