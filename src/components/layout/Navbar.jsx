import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Journey", path: "/journey" },
  { label: "Contact", path: "/contact" },
];

function Navbar() {
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <NavLink to="/" className="brand">
          <span className="brand-mark">TG</span>
          <span className="brand-text">tomgoss.github.io</span>
        </NavLink>

        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;