import contact from "../../data/contact";
import Card from "../ui/Card";
import Button from "../ui/Button";

function ContactPanel() {
  return (
    <div className="contact-layout">
      <div className="contact-main">
        <Card>
          <p className="kicker">Send a Message</p>
          <form className="contact-form">
            <div className="form-grid">
              <label className="form-field">
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" />
              </label>

              <label className="form-field">
                <span>Email</span>
                <input type="email" name="email" placeholder="your@email.com" />
              </label>
            </div>

            <label className="form-field">
              <span>Subject</span>
              <input type="text" name="subject" placeholder="How can I help?" />
            </label>

            <label className="form-field">
              <span>Message</span>
              <textarea
                name="message"
                rows="6"
                placeholder="Write your message here..."
              />
            </label>

            <div className="button-row">
              <Button type="submit">Send Message</Button>
            </div>
          </form>
        </Card>
      </div>

      <aside className="contact-side">
        <Card>
          <p className="kicker">Direct Contact</p>
          <div className="contact-methods">
            {contact.methods.map((item) => (
              <div key={item.label} className="contact-method">
                <p className="contact-method-label">{item.label}</p>
                {item.href ? (
                  <a
                    className="contact-method-link"
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="contact-method-value">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </Card>

      </aside>
    </div>
  );
}

export default ContactPanel;