import personal from "../../data/personal";
import PersonalCard from "../ui/PersonalCard";

function PersonalGrid() {
  return (
    <section className="personal-grid-section">
      <div className="shell">
        <div className="personal-grid">
          {personal.interests.map((item, index) => (
            <PersonalCard
              key={item.id}
              item={item}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PersonalGrid;