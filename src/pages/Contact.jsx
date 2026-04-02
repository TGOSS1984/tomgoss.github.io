import contact from "../data/contact";
import PageSection from "../components/ui/PageSection";
import ContactPanel from "../components/sections/ContactPanel";

function Contact() {
  return (
    <PageSection
      eyebrow={contact.intro.eyebrow}
      title={contact.intro.title}
    >
      <p>{contact.intro.summary}</p>
      <ContactPanel />
    </PageSection>
  );
}

export default Contact;