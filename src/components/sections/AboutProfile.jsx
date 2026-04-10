import profile from "../../data/profile";
import Card from "../ui/Card";
import LocationGlobe from "../ui/LocationGlobe";

function AboutProfile() {
  return (
    <div className="about-layout">
      <div className="about-main">
        <div className="about-copy-block">
          {profile.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <LocationGlobe
          city="Manchester"
          country="United Kingdom"
          lat={53.4808}
          lng={-2.2426}
          timeZone="Europe/London"
        />

        <div className="about-strengths">
          {profile.strengths.map((strength) => (
            <Card key={strength.title} hover>
              <p className="kicker">Strength</p>
              <h3>{strength.title}</h3>
              <p>{strength.text}</p>
            </Card>
          ))}
        </div>
      </div>

      <aside className="about-side">
        <Card>
          <p className="kicker">Primary Stack</p>
          <div className="stack-pill-group">
            {profile.primaryStack.map((item) => (
              <span key={item} className="stack-pill">
                {item}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <p className="kicker">Secondary Stack</p>
          <div className="stack-pill-group">
            {profile.secondaryStack.map((item) => (
              <span key={item} className="stack-pill">
                {item}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <p className="kicker">Interests</p>
          <ul className="about-list">
            {profile.interests.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </aside>
    </div>
  );
}

export default AboutProfile;