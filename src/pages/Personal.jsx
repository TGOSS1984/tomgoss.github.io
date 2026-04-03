import PersonalIntro from "../components/sections/PersonalIntro";
import PersonalGrid from "../components/sections/PersonalGrid";
import MediaShowcase from "../components/sections/MediaShowcase";
import PersonalOutro from "../components/sections/PersonalOutro";

function Personal() {
  return (
    <>
      <PersonalIntro />
      <PersonalGrid />
      <MediaShowcase />
      <PersonalOutro />
    </>
  );
}

export default Personal;