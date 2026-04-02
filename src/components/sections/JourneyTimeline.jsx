import journey from "../../data/journey";
import Reveal from "../ui/Reveal";

function JourneyTimeline() {
  return (
    <div className="journey-timeline">
      {journey.map((item, index) => (
        <Reveal key={`${item.year}-${item.title}`} delay={index * 0.08}>
          <article className="timeline-item">
            <div className="timeline-rail">
              <div className="timeline-dot" />
              {index !== journey.length - 1 && <div className="timeline-line" />}
            </div>

            <div className="timeline-card card">
              <p className="timeline-year">{item.year}</p>
              <p className="timeline-phase">{item.phase}</p>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-description">{item.description}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export default JourneyTimeline;