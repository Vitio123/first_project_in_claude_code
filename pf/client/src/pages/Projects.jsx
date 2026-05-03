import useFetch from "../hooks/useFetch";
import useScrollReveal from "../hooks/useScrollReveal";
import ProjectCard from "../components/ProjectCard";
import DotField from "../components/DotField";

export default function Projects() {
  const { data: projects, loading, error } = useFetch("/api/projects");
  const gridRef = useScrollReveal(0.15, [projects]);

  return (
    <div className="page-enter">
      {/* ── Header ── */}
      <section className="relative overflow-hidden border-b border-midnight-800">
        <DotField />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-36 md:px-10 md:pt-44 md:pb-28">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-electric-500" />
            <span className="label-mono text-electric-400">Portafolio</span>
          </div>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-cream-100 md:text-7xl">
            Lo que he
            <br />
            <span className="text-electric-400">construido.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-300">
            Proyectos reales, código real. Cada uno aprendido desde adentro.
          </p>
        </div>
      </section>

      {/* ── Lista ── */}
      <section ref={gridRef} className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        {loading && <div className="spinner" />}

        {error && (
          <div className="border border-electric-600 bg-midnight-900 p-6 text-cream-200">
            <p className="font-semibold text-electric-300">No se pudieron cargar los proyectos.</p>
            <p className="mt-1 text-sm text-cream-300">
              Asegúrate de que el servidor esté corriendo:{" "}
              <code className="border border-midnight-700 bg-midnight-850 px-1.5 py-0.5 font-mono text-xs text-electric-300">
                npm start
              </code>
            </p>
          </div>
        )}

        {projects && (
          <>
            <div className="reveal mb-10 flex items-baseline justify-between border-b border-midnight-800 pb-5">
              <span className="label-mono text-cream-400">
                {String(projects.length).padStart(2, "0")} proyecto
                {projects.length === 1 ? "" : "s"}
              </span>
              <span className="label-mono text-electric-400">archivo / 2026</span>
            </div>

            {projects.length === 0 ? (
              <p className="py-16 text-center text-cream-300">
                Todavía no hay proyectos.
              </p>
            ) : (
              <div className="stagger grid grid-cols-1 gap-px bg-midnight-800 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p, i) => (
                  <div key={p.id} className="reveal-scale">
                    <ProjectCard project={p} index={i} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <footer className="border-t border-midnight-800">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-cream-400 md:px-10">
          <p>Construido con React, Node y SQLite · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
