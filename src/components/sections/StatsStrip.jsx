import Card from "../ui/Card";

const stats = [
  { value: "8", label: "Portfolio Projects" },
  { value: "15+", label: "Years Commercial Experience" },
  { value: "6+", label: "Core Technologies" },
  { value: "3", label: "Mountain Tours Suite Projects" },
];

function StatsStrip() {
  return (
    <section className="stats-strip">
      <div className="shell">
        <div className="grid-four">
          {stats.map((stat) => (
            <Card key={stat.label} hover>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsStrip;