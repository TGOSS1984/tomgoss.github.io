function PageSection({ title, eyebrow, children }) {
  return (
    <section className="page-section">
      <div className="shell">
        {(eyebrow || title) && (
          <div className="section-heading">
            {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
            {title && <h2 className="section-title">{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export default PageSection;