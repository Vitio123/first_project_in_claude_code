import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

const skills = [
  { icon: "🧱", name: "HTML & CSS", desc: "Estructura semántica, Grid, Flexbox. El fundamento de todo lo visual." },
  { icon: "⚡", name: "JavaScript", desc: "ES6+, estructuras de datos, asincronía con Promises y async/await." },
  { icon: "⚛️", name: "React", desc: "Componentes, hooks, React Router. Interfaces reactivas y escalables." },
  { icon: "🟢", name: "Node.js & Express", desc: "Servidor, API REST, middlewares, manejo de errores." },
  { icon: "🗄️", name: "SQL & SQLite", desc: "Base de datos relacional, consultas, relaciones entre tablas." },
  { icon: "🔒", name: "Seguridad & APIs", desc: "CORS, validación de inputs, JWT, conexión segura a servicios externos." },
];

export default function Home() {
  const skillsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="page-enter">
      {/* ── Hero ── */}
      <section className="hero-dark">
        <p className="eyebrow" style={{ color: "#2997ff", animation: "fadeInUp 0.6s var(--smooth) 0.1s both" }}>
          Full Stack Developer
        </p>
        <h1 className="headline-gradient" style={{ animation: "fadeInUp 0.8s var(--smooth) 0.2s both" }}>
          Código que<br />habla por sí solo.
        </h1>
        <p className="body-copy" style={{ marginTop: 20, animation: "blurIn 0.8s var(--smooth) 0.5s both" }}>
          Aprendo construyendo. Cada proyecto es un paso más hacia dominar
          React, Node.js y el stack completo — de cero a producción.
        </p>
        <div style={{ marginTop: 36, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeInUp 0.6s var(--smooth) 0.8s both" }}>
          <Link to="/projects" className="btn-apple btn-apple-primary">Ver proyectos</Link>
          <Link to="/contact" className="btn-apple btn-apple-ghost" style={{ color: "#2997ff" }}>
            Contactarme →
          </Link>
        </div>
      </section>

      <hr className="divider" />

      {/* ── Stack ── */}
      <section className="section" ref={skillsRef}>
        <div className="section-inner">
          <p className="eyebrow section-center reveal">Tecnologías</p>
          <h2 className="subheadline section-center reveal" style={{ marginBottom: 8 }}>
            El stack de principio a fin.
          </h2>
          <p className="body-copy section-center reveal" style={{ marginBottom: 48 }}>
            No copio y pego — entiendo qué hace cada línea y por qué está ahí.
          </p>

          <div className="skills-grid stagger">
            {skills.map((s) => (
              <div className="apple-card reveal-scale" key={s.name}>
                <div className="skill-icon">{s.icon}</div>
                <h3 style={{ fontWeight: 600, fontSize: "1.05rem", marginBottom: 6 }}>{s.name}</h3>
                <p style={{ color: "var(--apple-gray)", fontSize: "0.9rem", lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── CTA ── */}
      <section className="section section-center" ref={ctaRef}>
        <div className="section-inner">
          <p className="eyebrow reveal">¿Hablamos?</p>
          <h2 className="subheadline reveal" style={{ marginBottom: 16 }}>
            Abierto a colaborar y aprender.
          </h2>
          <p className="body-copy reveal" style={{ marginBottom: 32 }}>
            Si tienes un proyecto, una idea o simplemente quieres conectar — escríbeme.
          </p>
          <div className="reveal">
            <Link to="/contact" className="btn-apple btn-apple-dark">Enviar mensaje</Link>
          </div>
        </div>
      </section>

      <footer className="apple-footer">
        <p>Construido con React, Node.js y SQLite · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
