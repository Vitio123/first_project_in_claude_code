import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Inicio", end: true },
  { to: "/projects", label: "Proyectos" },
  { to: "/contact", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  [
                    "label-mono px-4 py-2 transition-colors",
                    isActive
                      ? "text-electric-400"
                      : "text-cream-300 hover:text-cream-100",
                  ].join(" ")
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile button */}
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className={[
                "absolute left-0 top-0 block h-px w-6 bg-cream-100 transition-transform",
                open && "translate-y-1.5 rotate-45",
              ].filter(Boolean).join(" ")}
            />
            <span
              className={[
                "absolute left-0 bottom-0 block h-px w-6 bg-cream-100 transition-transform",
                open && "-translate-y-1.5 -rotate-45",
              ].filter(Boolean).join(" ")}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-midnight-800 bg-midnight-950/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      "label-mono block py-3 transition-colors",
                      isActive
                        ? "text-electric-400"
                        : "text-cream-300 hover:text-cream-100",
                    ].join(" ")
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
