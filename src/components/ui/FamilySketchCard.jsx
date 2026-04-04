import { useEffect, useRef, useState } from "react";

const IMAGE_SRC = "/assets/images/personal/family-sketch.png";

function FamilySketchCard({
  title = "Family",
  delay = 700,
  loaderDelay = 800,
}) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isStarted) return;

    const timer = setTimeout(() => {
      setIsStarted(true);
    }, delay + loaderDelay);

    return () => clearTimeout(timer);
  }, [isVisible, isStarted, delay, loaderDelay]);

  return (
    <div
      ref={cardRef}
      className={`family-sketch-card ${isStarted ? "is-started" : ""}`}
      aria-label={title}
    >
      <div className="family-sketch-frame">
        <div className="family-sketch-stage">
          <img
            src={IMAGE_SRC}
            alt="Stylised family pencil sketch"
            className="family-sketch-img family-sketch-outline"
            loading="eager"
            decoding="async"
          />

          <img
            src={IMAGE_SRC}
            alt=""
            aria-hidden="true"
            className="family-sketch-img family-sketch-fill"
            loading="eager"
            decoding="async"
          />

          <div className="family-sketch-pencil-pass" aria-hidden="true" />
          <div className="family-sketch-grain" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default FamilySketchCard;