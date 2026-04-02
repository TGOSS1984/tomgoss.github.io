import profile from "../data/profile";
import PageSection from "../components/ui/PageSection";
import AboutProfile from "../components/sections/AboutProfile";

function About() {
  return (
    <PageSection
      eyebrow={profile.intro.eyebrow}
      title={profile.intro.title}
    >
      <p>{profile.intro.summary}</p>
      <AboutProfile />
    </PageSection>
  );
}

export default About;