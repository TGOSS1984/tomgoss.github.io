import contact from "../data/contact";
import PageSection from "../components/ui/PageSection";
import ContactPanel from "../components/sections/ContactPanel";
import CredentialsPanel from "../components/sections/CredentialsPanel";

function Contact() {
  return (
    <>
      <PageSection
        eyebrow={contact.intro.eyebrow}
        title={contact.intro.title}
      >
        <p>{contact.intro.summary}</p>
        <ContactPanel />
      </PageSection>

      <CredentialsPanel />
    </>
  );
}

export default Contact;