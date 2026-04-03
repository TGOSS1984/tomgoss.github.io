import journey from "../../data/journey";
import Reveal from "../ui/Reveal";

function JourneyTimeline() {
  return (
    <div className="journey-timeline-alt">
      <div className="journey-spine" />

      {journey.map((item, index) => {
        const isLeft = index % 2 === 0;

        return (
          <Reveal
            key={`${item.year}-${item.title}`}
            delay={index * 0.12}
            distance={42}
            direction={isLeft ? "left" : "right"}
          >
            <article
              className={`timeline-alt-item ${
                isLeft ? "timeline-alt-left" : "timeline-alt-right"
              }`}
            >
              <div className="timeline-alt-content">
                <div className="timeline-alt-card">
                  <p className="timeline-year">{item.year}</p>
                  <p className="timeline-phase">{item.phase}</p>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>

              <div className="timeline-alt-marker-wrap">
                <div className="timeline-alt-marker" />
              </div>

              <div className="timeline-alt-empty" />
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export default JourneyTimeline;