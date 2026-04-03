import personal from "../../data/personal";

function PersonalIntro() {
  return (
    <section className="personal-hero">
      <div className="shell">
        <div className="personal-hero-card">
          <p className="section-eyebrow">{personal.intro.eyebrow}</p>
          <h1 className="personal-hero-title">{personal.intro.title}</h1>
          <p className="personal-hero-text">{personal.intro.summary}</p>
        </div>
      </div>
    </section>
  );
}

export default PersonalIntro;