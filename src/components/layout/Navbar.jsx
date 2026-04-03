import { NavLink, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Journey", path: "/journey" },
  { label: "Personal", path: "/personal" },
  { label: "Contact", path: "/contact" },
];

function Navbar({ onNavigateStart }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (event, path) => {
    event.preventDefault();

    if (location.pathname === path) {
      return;
    }

    if (onNavigateStart) {
      onNavigateStart(path);
      return;
    }

    navigate(path);
  };

  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <NavLink
          to="/"
          className="brand"
          onClick={(event) => handleNavigate(event, "/")}
        >
          <span className="brand-mark">TG</span>
          <span className="brand-text">tomgoss.github.io / portfolio</span>
        </NavLink>

        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={(event) => handleNavigate(event, item.path)}
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