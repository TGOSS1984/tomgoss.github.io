import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import mediaShowcase from "../../data/mediaShowcase";

const tabs = ["games", "films", "books"];

function MediaShowcase() {
  const [activeTab, setActiveTab] = useState("games");
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(() => mediaShowcase[activeTab] || [], [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveIndex(0);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const currentItem = items[activeIndex];
  const prevItem = items[(activeIndex - 1 + items.length) % items.length];
  const nextItem = items[(activeIndex + 1) % items.length];

  return (
    <section className="media-showcase-section">
      <div className="shell">
        <div className="media-showcase-header">
          <div>
            <p className="section-eyebrow">Curated favourites</p>
            <h2 className="section-title">Games, films, and books that inspire me</h2>
          </div>

          <div className="media-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={
                  activeTab === tab ? "media-tab media-tab-active" : "media-tab"
                }
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="media-carousel-shell">
          <button type="button" className="media-nav media-nav-left" onClick={goPrev}>
            <ChevronLeft size={22} />
          </button>

          <div className="media-carousel-stage">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${currentItem.id}`}
                className="media-carousel-track"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
              >
                <div className="media-side-card media-side-card-left">
                  <img src={prevItem.image} alt={prevItem.title} />
                </div>

                <div className="media-feature-card">
                  <img src={currentItem.image} alt={currentItem.title} />
                  <div className="media-feature-scrim" />
                  <div className="media-feature-copy">
                    <p className="media-feature-kicker">{activeTab}</p>
                    <h3>{currentItem.title}</h3>
                    <p>{currentItem.subtitle}</p>
                  </div>
                </div>

                <div className="media-side-card media-side-card-right">
                  <img src={nextItem.image} alt={nextItem.title} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button type="button" className="media-nav media-nav-right" onClick={goNext}>
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="media-dots">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === activeIndex ? "media-dot media-dot-active" : "media-dot"}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${item.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MediaShowcase;