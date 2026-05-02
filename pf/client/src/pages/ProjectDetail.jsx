import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function ProjectDetail() {
  const { id } = useParams();
  const { data: project, loading, error } = useFetch(`/api/projects/${id}`);

  if (loading) return <div className="spinner" style={{ marginTop: 120 }} />;

  if (error || !project) {
    return (
      <div className="page-enter" style={{ textAlign: "center", padding: "120px 22px" }}>
        <p className="eyebrow">Error</p>
        <h1 className="subheadline" style={{ marginBottom: 16 }}>Proyecto no encontrado</h1>
        <Link to="/projects" className="btn-apple btn-apple-dark">Ver todos los proyectos</Link>
      </div>
    );
  }

  const topics = project.topics ? project.topics.split(",").map((t) => t.trim()) : [];

  return (
    <div className="page-enter">
      {/* Header */}
      <section className="hero-dark" style={{ padding: "100px 22px 80px" }}>
        <p className="eyebrow" style={{ color: "#2997ff", animation: "fadeInUp 0.6s var(--smooth) 0.1s both" }}>
          Proyecto
        </p>
        <h1 className="headline-gradient" style={{ animation: "fadeInUp 0.8s var(--smooth) 0.2s both" }}>
          {project.title}
        </h1>
        <p className="body-copy" style={{ marginTop: 16, animation: "blurIn 0.8s var(--smooth) 0.5s both" }}>
          {project.description}
        </p>

        <div style={{
          marginTop: 24,
          display: "flex",
          gap: 8,
          justifyContent: "center",
          flexWrap: "wrap",
          animation: "fadeInUp 0.6s var(--smooth) 0.7s both"
        }}>
          {project.tech.split(",").map((t) => (
            <span key={t} className="tech-badge" style={{ background: "rgba(41,151,255,0.15)", color: "#2997ff" }}>
              {t.trim()}
            </span>
          ))}
        </div>
      </section>

      <hr className="divider" />

      {/* Content */}
      <section className="section">
        <div className="section-inner">
          <div className="detail-layout">
            {topics.length > 0 && (
              <aside className="detail-sidebar">
                <p className="eyebrow" style={{ marginBottom: 16 }}>Temas</p>
                <ul className="topics-list stagger">
                  {topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </aside>
            )}

            <div className="detail-content">
              <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(project.content) }} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm section-center" style={{ animation: "fadeInUp 0.6s var(--smooth) 0.4s both" }}>
        <Link to="/projects" className="btn-apple btn-apple-ghost">← Todos los proyectos</Link>
      </section>

      <footer className="apple-footer">
        <p>Construido con React, Node.js y SQLite · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

function renderMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<pre><code class="lang-${lang}">${escaped}</code></pre>`;
    })
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>");
}
