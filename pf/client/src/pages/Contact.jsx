import { useState } from "react";
import { api } from "../services/api";
import useScrollReveal from "../hooks/useScrollReveal";
import DotField from "../components/DotField";

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

  const inputClass =
    "w-full border border-midnight-700 bg-midnight-900 px-4 py-3 text-cream-100 placeholder:text-cream-400 transition-colors focus:border-electric-400 focus:outline-none";

  return (
    <div className="page-enter">
      {/* ── Header ── */}
      <section className="relative overflow-hidden border-b border-midnight-800">
        <DotField />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-36 md:px-10 md:pt-44 md:pb-28">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-electric-500" />
            <span className="label-mono text-electric-400">Contacto</span>
          </div>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-cream-100 md:text-7xl">
            <span className="text-electric-400">Hablemos.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-300">
            Tienes una idea, un proyecto o solo quieres conectar. Te respondo.
          </p>
        </div>
      </section>

      {/* ── Form ── */}
      <section ref={formRef} className="mx-auto max-w-2xl px-6 py-20 md:px-10 md:py-28">
        {status === "success" && (
          <div className="reveal mb-8 border border-electric-500 bg-midnight-900 p-4 text-cream-100">
            <span className="label-mono text-electric-400">✓ Enviado</span>
            <p className="mt-1 text-sm">Mensaje enviado. ¡Gracias! Te respondo pronto.</p>
          </div>
        )}
        {status === "error" && (
          <div className="reveal mb-8 border border-electric-600 bg-midnight-900 p-4 text-cream-100">
            <span className="label-mono text-electric-300">Error</span>
            <p className="mt-1 text-sm">Algo salió mal. Revisa los datos y vuelve a intentarlo.</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="stagger flex flex-col gap-6"
        >
          <div className="reveal">
            <label className="label-mono mb-2 block text-cream-300" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className={inputClass}
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="reveal">
            <label className="label-mono mb-2 block text-cream-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className={inputClass}
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="reveal">
            <label className="label-mono mb-2 block text-cream-300" htmlFor="message">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              className={`${inputClass} resize-y`}
              rows={6}
              value={form.message}
              onChange={handleChange}
              placeholder="¿De qué quieres hablar?"
              required
            />
          </div>

          <div className="reveal">
            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex w-full items-center justify-center gap-3 border border-electric-500 bg-electric-500 px-7 py-3.5 font-medium text-midnight-950 transition-colors hover:bg-electric-400 hover:border-electric-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Enviando…" : "Enviar mensaje"}
              {status !== "loading" && (
                <span className="transition-transform group-hover:translate-x-1">→</span>
              )}
            </button>
          </div>
        </form>
      </section>

      <footer className="border-t border-midnight-800">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-cream-400 md:px-10">
          <p>Construido con React, Node y SQLite · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
