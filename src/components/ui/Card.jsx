import Reveal from "./Reveal";

function Card({ children, hover = false, reveal = true }) {
  const content = (
    <div className={`card panel ${hover ? "card-hover" : ""}`}>
      {children}
    </div>
  );

  if (!reveal) {
    return content;
  }

  return <Reveal>{content}</Reveal>;
}

export default Card;