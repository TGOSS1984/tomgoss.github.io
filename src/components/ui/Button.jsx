function Button({ children, href, variant = "primary", type = "button" }) {
  const className = `btn ${variant === "secondary" ? "btn-secondary" : "btn-primary"}`;

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}

export default Button;