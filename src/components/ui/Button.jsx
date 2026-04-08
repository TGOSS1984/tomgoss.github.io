function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  const buttonClassName = `btn ${
    variant === "secondary" ? "btn-secondary" : "btn-primary"
  } ${className}`.trim();

  if (href) {
    return (
      <a className={buttonClassName} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={buttonClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;