import { Download, ExternalLink, FileText, GraduationCap, Award } from "lucide-react";
import contact from "../../data/contact";
import Reveal from "../ui/Reveal";

function getIcon(title) {
  if (title.toLowerCase().includes("curriculum vitae")) {
    return <FileText size={20} />;
  }

  if (title.toLowerCase().includes("diploma")) {
    return <GraduationCap size={20} />;
  }

  return <Award size={20} />;
}

function CredentialsPanel() {
  return (
    <section className="credentials-section">
      <div className="shell">
        <div className="credentials-header">
          <div>
            <p className="section-eyebrow">Credentials</p>
            <h2 className="section-title">CV, qualifications, and current certification goals</h2>
          </div>
        </div>

        <div className="credentials-grid">
          {contact.resources.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <article className="credential-card">
                <div className="credential-top">
                  <div className="credential-icon">
                    {getIcon(item.title)}
                  </div>
                  <span
                    className={
                      item.status === "Completed"
                        ? "credential-status credential-status-complete"
                        : item.status === "Available"
                        ? "credential-status credential-status-available"
                        : "credential-status credential-status-progress"
                    }
                  >
                    {item.status}
                  </span>
                </div>

                <h3>{item.title}</h3>
                <p>{item.text}</p>

                {(item.viewHref || item.downloadHref) ? (
                  <div className="credential-actions">
                    {item.viewHref && (
                      <a
                        className="project-link project-link-primary"
                        href={item.viewHref}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink size={16} />
                        View PDF
                      </a>
                    )}

                    {item.downloadHref && (
                      <a
                        className="project-link"
                        href={item.downloadHref}
                        download={item.downloadName}
                      >
                        <Download size={16} />
                        Download
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="credential-actions">
                    <span className="project-link">Current study focus</span>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CredentialsPanel;