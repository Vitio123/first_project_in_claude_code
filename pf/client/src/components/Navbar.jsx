import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, Menu, X, Home, FolderGit2, Mail } from "lucide-react";
import useTheme from "../hooks/useTheme";

const links = [
  { to: "/", label: "Inicio", end: true, Icon: Home },
  { to: "/projects", label: "Proyectos", Icon: FolderGit2 },
  { to: "/contact", label: "Contacto", Icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "bg-midnight-950/85 border-midnight-800 backdrop-blur-md"
          : "bg-transparent border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          to="/"
          className="font-mono text-base text-cream-100 hover:text-electric-400 transition-colors"
          onClick={() => setOpen(false)}
        >
          <span className="text-electric-500">{"</"}</span>
          vitio
          <span className="text-electric-500">{">"}</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ to, label, end, Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    "label-mono inline-flex items-center gap-2 px-4 py-2 transition-colors",
                    isActive
                      ? "text-electric-400"
                      : "text-cream-300 hover:text-cream-100",
                  ].join(" ")
                }
              >
                <Icon size={14} strokeWidth={2} />
                {label}
              </NavLink>
            </li>
          ))}
          <li className="ml-2">
            <ThemeToggle theme={theme} toggle={toggle} />
          </li>
        </ul>

        {/* Mobile button */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle theme={theme} toggle={toggle} />
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center text-cream-100 transition-colors hover:text-electric-400"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-midnight-800 bg-midnight-950/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {links.map(({ to, label, end, Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      "label-mono inline-flex w-full items-center gap-3 py-3 transition-colors",
                      isActive
                        ? "text-electric-400"
                        : "text-cream-300 hover:text-cream-100",
                    ].join(" ")
                  }
                >
                  <Icon size={16} strokeWidth={2} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

function ThemeToggle({ theme, toggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="group flex h-10 w-10 items-center justify-center border border-midnight-800 bg-midnight-900 text-cream-200 transition-colors hover:border-electric-500 hover:text-electric-400"
    >
      <span className="relative h-4 w-4">
        <Sun
          size={16}
          strokeWidth={2}
          className={[
            "absolute inset-0 transition-all duration-300",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0",
          ].join(" ")}
        />
        <Moon
          size={16}
          strokeWidth={2}
          className={[
            "absolute inset-0 transition-all duration-300",
            isDark
              ? "-rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100",
          ].join(" ")}
        />
      </span>
    </button>
  );
}
