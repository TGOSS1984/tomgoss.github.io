import PageSection from "../ui/PageSection";
import Card from "../ui/Card";
import {
  FiGitBranch,
  FiLayers,
  FiCheckCircle,
  FiTrello,
  FiCode,
  FiUsers,
} from "react-icons/fi";

const practices = [
  {
    icon: FiLayers,
    kicker: "Ways of Working",
    title: "Agile Delivery",
    text: "Built projects in iterative stages, breaking larger builds into smaller deliverables with clear priorities. Examples include phased releases across booking flows, analytics dashboards, and predictive app features.",
  },
  {
    icon: FiGitBranch,
    kicker: "Development Workflow",
    title: "Version Control",
    text: "Used Git and GitHub throughout projects with structured commits, branching, and progressive feature delivery. This helped keep builds organised and made changes easier to test, track, and refine.",
  },
  {
    icon: FiCheckCircle,
    kicker: "Quality & Release",
    title: "Testing and CI/CD",
    text: "Used automated checks and deployment workflows to strengthen reliability. Examples include pytest-based test coverage and GitHub Actions pipelines to validate code before release.",
  },
  {
    icon: FiTrello,
    kicker: "Planning & Tracking",
    title: "Project Boards",
    text: "Planned work using task breakdowns, priorities, and milestone-based progress tracking. This supported clearer delivery across feature builds, fixes, and project refinement.",
  },
  {
    icon: FiCode,
    kicker: "Tooling",
    title: "Developer Environment",
    text: "Comfortable working daily with VS Code, GitHub, terminal workflows, virtual environments, debugging, package management, and deployment platforms across Python, Django, React, and Streamlit projects.",
  },
  {
    icon: FiUsers,
    kicker: "Commercial Context",
    title: "Business and CRM Awareness",
    text: "Bring strong commercial understanding from customer, sales, reporting, and operational environments. This helps shape projects around user needs, business value, and practical real-world use cases.",
  },
];

function DeliveryCollaboration() {
  return (
    <PageSection
      eyebrow="Delivery & Collaboration"
      title="How I build and deliver projects"
      intro="Alongside the technical stack, I focus on the working practices that help turn ideas into reliable, usable solutions."
    >
      <div className="delivery-grid">
        {practices.map(({ icon: Icon, kicker, title, text }) => (
          <Card hover key={title} className="delivery-card">
            <div className="delivery-card__header">
                <span className="delivery-card__badge">
                    <Icon />
                    {kicker}
                </span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </Card>
        ))}
      </div>
    </PageSection>
  );
}

export default DeliveryCollaboration;