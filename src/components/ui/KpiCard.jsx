import { useEffect, useState } from "react";
import Card from "./Card";

function KpiCard({
  value,
  suffix = "",
  prefix = "",
  label,
  duration = 2000,
  startAnimation = false,
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!startAnimation) {
      setDisplayValue(0);
      return undefined;
    }

    let animationFrameId;
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextValue = Math.round(progress * value);

      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };

    animationFrameId = requestAnimationFrame(updateNumber);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration, startAnimation]);

  return (
    <Card hover>
      <div className="kpi-top-line" />
      <p className="stat-value">
        {prefix}
        {displayValue}
        {suffix}
      </p>
      <p className="stat-label">{label}</p>
    </Card>
  );
}

export default KpiCard;