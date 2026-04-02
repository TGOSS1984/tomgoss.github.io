function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-shell">
        <div>
          <p className="footer-title">Tom Goss Portfolio</p>
          <p className="footer-copy">
            Full stack development, data analytics, and interactive digital
            projects.
          </p>
        </div>

        <div className="footer-meta">
          <p>Manchester, UK</p>
          <p>© {currentYear} Tom Goss</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;