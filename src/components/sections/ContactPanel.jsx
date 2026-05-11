import { useState } from "react";
import contact from "../../data/contact";
import Card from "../ui/Card";
import Button from "../ui/Button";

const WEB3FORMS_ACCESS_KEY = "66aa0cfc-bfbb-47a8-aed7-77f233d4fad3";

const initialFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactPanel() {
  const [formData, setFormData] = useState(initialFormData);
  const [formStatus, setFormStatus] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setFormStatus("");
    setFormError("");

    if (!WEB3FORMS_ACCESS_KEY) {
      setFormError("Contact form is not configured yet.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Portfolio contact form message",
          message: formData.message,
          from_name: "Tom Goss Portfolio",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send message.");
      }

      setFormStatus("Message sent successfully. Thank you for getting in touch.");
      setFormData(initialFormData);
    } catch (error) {
      setFormError(
        error.message || "Something went wrong. Please try again shortly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="contact-layout">
      <div className="contact-main">
        <Card>
          <p className="kicker">Send a Message</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label className="form-field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <label className="form-field">
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                placeholder="How can I help?"
                value={formData.subject}
                onChange={handleChange}
              />
            </label>

            <label className="form-field">
              <span>Message</span>
              <textarea
                name="message"
                rows="6"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>

            {formStatus && <p className="form-message form-message--success">{formStatus}</p>}
            {formError && <p className="form-message form-message--error">{formError}</p>}

            <div className="button-row">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
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