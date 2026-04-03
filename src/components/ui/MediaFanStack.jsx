function MediaFanStack({ images = [] }) {
  return (
    <div className="media-fan-wrap">
      <div className="media-fan-stage">
        {images.slice(0, 6).map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={`media-fan-card media-fan-card-${index + 1}`}
          >
            <img src={image} alt={`Media favourite ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaFanStack;