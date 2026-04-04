import { useEffect, useRef, useState } from "react";

function PaintRevealImage({
  src,
  alt,
  label,
  startDelay = 1700,
  brushRadius = 42,
  autoReveal = true,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const animationFrameRef = useRef(null);
  const prevPointRef = useRef(null);
  const hasStartedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return null;

    const rect = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "#0a0712";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.globalCompositeOperation = "destination-out";

    return { ctx, rect };
  };

  const drawCircle = (x, y, radius) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawInterpolatedStroke = (from, to, radius) => {
    const distance = Math.hypot(to.x - from.x, to.y - from.y);
    const steps = Math.max(1, Math.ceil(distance / 8));

    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const x = lerp(from.x, to.x, t);
      const y = lerp(from.y, to.y, t);

      // slight radius variation makes it feel more organic
      const wobble = Math.sin(t * Math.PI) * 6;
      drawCircle(x, y, radius + wobble);
    }
  };

  const runAutoReveal = () => {
  if (!autoReveal || hasStartedRef.current) return;
  hasStartedRef.current = true;

  const canvas = canvasRef.current;
  const wrap = wrapRef.current;
  if (!canvas || !wrap) return;

  const rect = wrap.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  const strokes = [
    [
      { x: -60, y: height * 0.24 },
      { x: width * 0.14, y: height * 0.18 },
      { x: width * 0.28, y: height * 0.34 },
      { x: width * 0.46, y: height * 0.26 },
      { x: width * 0.68, y: height * 0.32 },
      { x: width + 60, y: height * 0.22 },
    ],
    [
      { x: -70, y: height * 0.48 },
      { x: width * 0.16, y: height * 0.56 },
      { x: width * 0.32, y: height * 0.42 },
      { x: width * 0.52, y: height * 0.58 },
      { x: width * 0.72, y: height * 0.46 },
      { x: width + 70, y: height * 0.54 },
    ],
    [
      { x: -60, y: height * 0.74 },
      { x: width * 0.18, y: height * 0.66 },
      { x: width * 0.38, y: height * 0.82 },
      { x: width * 0.58, y: height * 0.68 },
      { x: width * 0.78, y: height * 0.80 },
      { x: width + 60, y: height * 0.72 },
    ],
    [
      { x: width * 0.18, y: -40 },
      { x: width * 0.24, y: height * 0.16 },
      { x: width * 0.18, y: height * 0.38 },
      { x: width * 0.24, y: height * 0.62 },
      { x: width * 0.16, y: height + 40 },
    ],
    [
      { x: width * 0.74, y: -40 },
      { x: width * 0.68, y: height * 0.18 },
      { x: width * 0.78, y: height * 0.40 },
      { x: width * 0.70, y: height * 0.66 },
      { x: width * 0.76, y: height + 40 },
    ],
  ];

  let strokeIndex = 0;
  let segmentIndex = 0;
  let segmentProgress = 0;
  let previousPoint = strokes[0][0];

  const animate = () => {
    if (strokeIndex >= strokes.length) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.globalAlpha = 0.08; // lower than before so it doesn't suddenly reveal all
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      setTimeout(() => setIsDone(true), 180);
      return;
    }

    const currentStroke = strokes[strokeIndex];

    if (segmentIndex >= currentStroke.length - 1) {
      strokeIndex += 1;
      segmentIndex = 0;
      segmentProgress = 0;

      if (strokeIndex < strokes.length) {
        previousPoint = strokes[strokeIndex][0];
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);
      return;
    }

    const from = currentStroke[segmentIndex];
    const to = currentStroke[segmentIndex + 1];

    segmentProgress += 0.05;

    const currentPoint = {
      x: lerp(from.x, to.x, segmentProgress),
      y: lerp(from.y, to.y, segmentProgress),
    };

    const radiusJitter = Math.sin(segmentProgress * Math.PI) * 5;

    drawInterpolatedStroke(previousPoint, currentPoint, brushRadius + radiusJitter);

    drawInterpolatedStroke(
      { x: previousPoint.x - 12, y: previousPoint.y + 8 },
      { x: currentPoint.x - 12, y: currentPoint.y + 8 },
      brushRadius * 0.52
    );

    drawInterpolatedStroke(
      { x: previousPoint.x + 10, y: previousPoint.y - 6 },
      { x: currentPoint.x + 10, y: currentPoint.y - 6 },
      brushRadius * 0.34
    );

    previousPoint = currentPoint;

    if (segmentProgress >= 1) {
      segmentIndex += 1;
      segmentProgress = 0;
      previousPoint = currentStroke[segmentIndex];
    }

    animationFrameRef.current = window.requestAnimationFrame(animate);
  };

  animationFrameRef.current = window.requestAnimationFrame(animate);
};

  const handleMouseMove = (e) => {
    if (!canvasRef.current || !wrapRef.current || !isReady) return;

    const rect = wrapRef.current.getBoundingClientRect();
    const point = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (prevPointRef.current) {
      drawInterpolatedStroke(prevPointRef.current, point, brushRadius * 0.72);
    } else {
      drawCircle(point.x, point.y, brushRadius * 0.72);
    }

    prevPointRef.current = point;
  };

  const handleMouseLeave = () => {
    prevPointRef.current = null;
  };

  useEffect(() => {
    const initialise = () => {
      setupCanvas();
      setIsReady(true);
    };

    initialise();
    window.addEventListener("resize", initialise);

    return () => {
      window.removeEventListener("resize", initialise);
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const timer = window.setTimeout(() => {
      runAutoReveal();
    }, startDelay);

    return () => window.clearTimeout(timer);
  }, [isReady, startDelay]);

  return (
    <div
      ref={wrapRef}
      className={`personal-image-wrap paint-canvas-wrap ${isDone ? "paint-complete" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="personal-image"
      />
      <canvas ref={canvasRef} className="paint-reveal-canvas" />
      <div className="personal-image-scrim" />
      <p className="personal-image-label">{label}</p>
    </div>
  );
}

export default PaintRevealImage;