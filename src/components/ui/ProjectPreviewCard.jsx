import Reveal from "./Reveal";

function ProjectPreviewCard({ project }) {
  return (
    <Reveal>
      <article className="project-preview-card card card-hover">
        <div className="project-preview-top">
          {project.suite && <p className="project-suite">{project.suite}</p>}
          <p className="project-category">{project.category}</p>
        </div>

        <h3 className="project-title">{project.title}</h3>

        <p className="project-summary">{project.summary}</p>

        <div className="project-stack">
          {project.stack.map((item) => (
            <span key={item} className="stack-pill">
              {item}
            </span>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

export default ProjectPreviewCard;