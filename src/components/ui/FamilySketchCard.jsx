import { useEffect, useMemo, useRef, useState } from "react";

const SVG_SRC = "/assets/images/personal/family-lineart.svg";

function FamilySketchCard({
  title = "Family",
  delay = 700,
  loaderDelay = 800,
}) {
  const cardRef = useRef(null);
  const svgWrapRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [svgMarkup, setSvgMarkup] = useState("");

  const totalDelay = useMemo(() => delay + loaderDelay, [delay, loaderDelay]);

  const handleReplay = () => {
    setIsStarted(false);

    setTimeout(() => {
      setIsStarted(true);
    }, 50);
  };

  useEffect(() => {
    fetch(SVG_SRC)
      .then((res) => res.text())
      .then((text) => {
        setSvgMarkup(text);
      })
      .catch((err) => {
        console.error("Failed to load SVG:", err);
      });
  }, []);

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
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isStarted || !svgMarkup) return;

    const timer = setTimeout(() => {
      setIsStarted(true);
    }, totalDelay);

    return () => clearTimeout(timer);
  }, [isVisible, isStarted, svgMarkup, totalDelay]);

  useEffect(() => {
    if (!svgMarkup || !svgWrapRef.current) return;

    const svg = svgWrapRef.current.querySelector("svg");
    if (!svg) return;

    const drawable = svg.querySelectorAll(
      "path, line, polyline, polygon, circle, ellipse, rect"
    );

    drawable.forEach((el) => {
      let length = 300;

      try {
        if (typeof el.getTotalLength === "function") {
          length = el.getTotalLength();
        }
      } catch {
        length = 300;
      }

      el.style.fill = "none";
      el.style.stroke = "#1c1c1c";
      el.style.strokeWidth = "1.1";
      el.style.strokeLinecap = "round";
      el.style.strokeLinejoin = "round";
      el.style.vectorEffect = "non-scaling-stroke";

      el.style.animation = "none";
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length}`;

      el.getBoundingClientRect();
    });

    if (isStarted) {
      drawable.forEach((el, index) => {
        let length = 300;

        try {
          if (typeof el.getTotalLength === "function") {
            length = el.getTotalLength();
          }
        } catch {
          length = 300;
        }

        el.style.strokeDasharray = `${length}`;
        el.style.strokeDashoffset = `${length}`;
        el.style.animation = `familyDrawLine 10s ease forwards`;
        el.style.animationDelay = `${index * 0.025}s`;
      });
    }
  }, [svgMarkup, isStarted]);

  return (
    <div
      ref={cardRef}
      className={`family-sketch-card family-svg-card ${isStarted ? "is-started" : ""}`}
      aria-label={title}
      onClick={handleReplay}
    >
      <div className="family-sketch-frame">
        <div className="family-sketch-stage family-svg-stage">
          <div
            ref={svgWrapRef}
            className="family-inline-svg-wrap"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />

          <div
            className="family-sketch-pencil-pass family-svg-pencil-pass"
            aria-hidden="true"
          />
          <div className="family-sketch-grain" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default FamilySketchCard;