import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "../ui/ThemeToggle";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (event, path) => {
    event.preventDefault();

    if (location.pathname === path) {
      setIsMenuOpen(false);
      return;
    }

    setIsMenuOpen(false);

    if (onNavigateStart) {
      onNavigateStart(path);
      return;
    }

    navigate(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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

        <div className="nav-actions">
          <ThemeToggle />

          <button
            type="button"
            className="nav-menu-toggle"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <nav
            id="mobile-navigation"
            className={`nav nav-mobile ${isMenuOpen ? "nav-mobile-open" : ""}`}
          >
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

          <nav className="nav nav-desktop">
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
      </div>

      {isMenuOpen && <button className="nav-mobile-backdrop" onClick={closeMenu} aria-label="Close menu" />}
    </header>
  );
}

export default Navbar;