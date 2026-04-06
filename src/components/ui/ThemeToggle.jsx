import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {isDark ? <FiSun /> : <FiMoon />}
      </span>
      <span className="theme-toggle-text">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}

export default ThemeToggle;