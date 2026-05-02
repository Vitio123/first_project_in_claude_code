import { Link, NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme";

export default function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="apple-nav">
      <div className="nav-inner">
        <Link className="brand" to="/">{"</>"}</Link>

        <ul className="nav-links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Inicio</NavLink></li>
          <li><NavLink to="/projects" className={({ isActive }) => isActive ? "active" : ""}>Proyectos</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contacto</NavLink></li>
          <li>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggle}
              aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
              title={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
            >
              <span className="theme-toggle-icon">
                {theme === "dark" ? "☀️" : "🌙"}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
