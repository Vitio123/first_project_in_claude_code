import useFetch from "../hooks/useFetch";
import useScrollReveal from "../hooks/useScrollReveal";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const { data: projects, loading, error } = useFetch("/api/projects");
  const gridRef = useScrollReveal();

  return (
    <div className="page-enter">
      {/* ── Header ── */}
      <section className="hero-dark" style={{ padding: "100px 22px 80px" }}>
        <p className="eyebrow" style={{ color: "#2997ff", animation: "fadeInUp 0.6s var(--smooth) 0.1s both" }}>
          Portafolio
        </p>
        <h1 className="headline-gradient" style={{ animation: "fadeInUp 0.8s var(--smooth) 0.2s both" }}>
          Lo que he construido.
        </h1>
        <p className="body-copy" style={{ marginTop: 16, animation: "blurIn 0.8s var(--smooth) 0.5s both" }}>
          Proyectos reales, código real. Cada uno aprendido desde adentro.
        </p>
      </section>

      <hr className="divider" />

      {/* ── Lista de proyectos ── */}
      <section className="section" ref={gridRef}>
        <div className="section-inner">
          {loading && <div className="spinner" />}

          {error && (
            <div className="alert-error">
              <strong>No se pudieron cargar los proyectos.</strong><br />
              Asegúrate de que el servidor esté corriendo: <code>npm start</code>
            </div>
          )}

          {projects && (
            <>
              <p className="reveal" style={{ color: "var(--apple-gray)", fontSize: "0.85rem", marginBottom: 28 }}>
                {projects.length} {projects.length === 1 ? "proyecto" : "proyectos"}
              </p>
              <div className="projects-grid stagger">
                {projects.map((p) => (
                  <div key={p.id} className="reveal-scale">
                    <ProjectCard project={p} />
                  </div>
                ))}
                {projects.length === 0 && (
                  <p style={{ color: "var(--apple-gray)" }}>Todavía no hay proyectos.</p>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <footer className="apple-footer">
        <p>Construido con React, Node.js y SQLite · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
