import KpiCard from "../ui/KpiCard";

const stats = [
  { value: 41, label: "Age", duration: 2200 },  
  { value: 9, label: "Portfolio Projects", duration: 2200 },
  { value: 15, suffix: "+", label: "Years Commercial Experience", duration: 2600 },
  { value: 6, suffix: "+", label: "Core Technologies", duration: 2000 },
  { value: 3, label: "Mountain Tours Suite Projects", duration: 1800 },
];

function StatsStrip() {
  return (
    <section className="stats-strip">
      <div className="shell">
        <div className="grid-four">
          {stats.map((stat) => (
            <KpiCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              duration={stat.duration}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsStrip;