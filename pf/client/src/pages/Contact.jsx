import { useState } from "react";
import { api } from "../services/api";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const formRef = useScrollReveal();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await api.sendMessage(form);
      if (res.error) throw new Error(res.error);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="page-enter">
      {/* ── Header ── */}
      <section className="hero-dark" style={{ padding: "100px 22px 80px" }}>
        <p className="eyebrow" style={{ color: "#2997ff", animation: "fadeInUp 0.6s var(--smooth) 0.1s both" }}>
          Contacto
        </p>
        <h1 className="headline-gradient" style={{ animation: "fadeInUp 0.8s var(--smooth) 0.2s both" }}>
          Hablemos.
        </h1>
        <p className="body-copy" style={{ marginTop: 16, animation: "blurIn 0.8s var(--smooth) 0.5s both" }}>
          Tienes una idea, un proyecto o solo quieres conectar. Te respondo.
        </p>
      </section>

      <hr className="divider" />

      {/* ── Formulario ── */}
      <section className="section" ref={formRef}>
        <div className="section-inner" style={{ maxWidth: 560, margin: "0 auto" }}>

          {status === "success" && <div className="alert-success">✓ Mensaje enviado. ¡Gracias! Te respondo pronto.</div>}
          {status === "error" && <div className="alert-error">Algo salió mal. Revisa los datos y vuelve a intentarlo.</div>}

          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="reveal" style={{ transitionDelay: "0s" }}>
              <label className="apple-label">Nombre</label>
              <input
                type="text"
                name="name"
                className="apple-input"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="reveal" style={{ transitionDelay: "0.1s" }}>
              <label className="apple-label">Email</label>
              <input
                type="email"
                name="email"
                className="apple-input"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="reveal" style={{ transitionDelay: "0.2s" }}>
              <label className="apple-label">Mensaje</label>
              <textarea
                name="message"
                className="apple-input"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="¿De qué quieres hablar?"
                required
                style={{ resize: "vertical" }}
              />
            </div>

            <div className="reveal" style={{ transitionDelay: "0.3s" }}>
              <button
                type="submit"
                className="btn-apple btn-apple-primary"
                style={{ width: "100%", justifyContent: "center" }}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Enviando…" : "Enviar mensaje"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="apple-footer">
        <p>Construido con React, Node.js y SQLite · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
