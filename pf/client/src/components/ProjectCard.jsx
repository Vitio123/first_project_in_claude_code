import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const techs = project.tech.split(",").map((t) => t.trim());
  const topics = project.topics ? project.topics.split(",").map((t) => t.trim()) : [];

  return (
    <Link to={`/projects/${project.id}`} className="apple-card project-card-link">
      <h3 style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8 }}>{project.title}</h3>
      <p style={{ color: "var(--apple-gray)", fontSize: "0.9rem", lineHeight: 1.55, marginBottom: 16 }}>
        {project.description}
      </p>

      {/* Tech badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {techs.map((t) => (
          <span key={t} className="tech-badge">{t}</span>
        ))}
      </div>

      {/* Topics preview */}
      {topics.length > 0 && (
        <div style={{ fontSize: "0.8rem", color: "var(--apple-gray)" }}>
          <span style={{ fontWeight: 500 }}>Temas:</span> {topics.join(" · ")}
        </div>
      )}

      <div style={{ marginTop: "auto", paddingTop: 16 }}>
        <span className="btn-apple btn-apple-ghost" style={{ padding: "8px 0", fontSize: "0.85rem" }}>
          Ver contenido →
        </span>
      </div>
    </Link>
  );
}
