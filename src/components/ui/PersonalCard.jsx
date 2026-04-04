import Reveal from "./Reveal";
import TopographicPanel from "../sections/TopographicPanel";
import MediaFanStack from "./MediaFanStack";
import PaintRevealImage from "./PaintRevealImage";
import FamilySketchCard from "./FamilySketchCard";

function PersonalCard({ item, reverse = false }) {
  return (
    <Reveal direction={reverse ? "right" : "left"} distance={42}>
      <article className={`personal-card ${reverse ? "personal-card-reverse" : ""}`}>
        <div className="personal-card-media">
          {item.type === "topo" ? (
            <TopographicPanel />
          ) : item.type === "media-fan" ? (
            <MediaFanStack images={item.mediaStack} />
          ) : item.type === "family-sketch" ? (
            <FamilySketchCard
              title={item.title}
              delay={700}
              loaderDelay={800}
            />
          ) : item.paintReveal ? (
            <PaintRevealImage
              src={item.image}
              alt={item.title}
              label={item.imageLabel}
              startDelay={1700}
              brushRadius={44}
            />
          ) : (
            <div className="personal-image-wrap">
              <img
                src={item.image}
                alt={item.title}
                className="personal-image"
              />
              <div className="personal-image-scrim" />
              <p className="personal-image-label">{item.imageLabel}</p>
            </div>
          )}
        </div>

        <div className="personal-card-copy">
          <p className="kicker">Personal Interest</p>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      </article>
    </Reveal>
  );
}

export default PersonalCard;