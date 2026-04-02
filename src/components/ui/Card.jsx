function Card({ children, hover = false }) {
  return (
    <div className={`card panel ${hover ? "card-hover" : ""}`}>
      {children}
    </div>
  );
}

export default Card;