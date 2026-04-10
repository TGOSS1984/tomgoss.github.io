import profile from "../data/profile";
import PageSection from "../components/ui/PageSection";
import AboutProfile from "../components/sections/AboutProfile";

function About() {
  return (
    <PageSection
      eyebrow={profile.intro.eyebrow}
      title={profile.intro.title}
    >
      <AboutProfile introSummary={profile.intro.summary} />
    </PageSection>
  );
}

export default About;