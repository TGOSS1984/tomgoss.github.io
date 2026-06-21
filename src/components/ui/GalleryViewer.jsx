import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";

// Full-screen viewer for a single project's gallery, stacked above the
// project-details lightbox (see .gallery-viewer-backdrop z-index). Opened by
// clicking a thumbnail in the gallery grid; closing it returns to the
// lightbox underneath rather than closing everything.
function GalleryViewer({ gallery, activeIndex, projectTitle, onClose, onPrev, onNext }) {
  const closeBtnRef = useRef(null);
  const isOpen = activeIndex !== null && gallery?.[activeIndex];

  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus();
  }, [isOpen]);

  if (typeof document === "undefined") return null;

  const slide = isOpen ? gallery[activeIndex] : null;

  return createPortal(
    <AnimatePresence>
      {slide && (
        <motion.div
          className="gallery-viewer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <button
            type="button"
            className="gallery-viewer-close"
            onClick={onClose}
            ref={closeBtnRef}
            aria-label="Close image viewer"
          >
            <X size={20} />
          </button>

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                className="gallery-viewer-nav gallery-viewer-nav-left"
                onClick={onPrev}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                className="gallery-viewer-nav gallery-viewer-nav-right"
                onClick={onNext}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
              <span className="gallery-viewer-counter">
                {activeIndex + 1} / {gallery.length}
              </span>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="gallery-viewer-stage"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              {slide.type === "image" && slide.src ? (
                <img
                  src={slide.src}
                  alt={slide.alt || projectTitle}
                  className="gallery-viewer-image"
                />
              ) : (
                <div className="gallery-viewer-placeholder">
                  <ImageOff size={36} aria-hidden="true" />
                  <p>Gallery image coming soon</p>
                </div>
              )}

              {slide.caption && <p className="gallery-viewer-caption">{slide.caption}</p>}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default GalleryViewer;