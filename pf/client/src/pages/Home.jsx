import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileCode2,
  Braces,
  Atom,
  Server,
  Database,
  ShieldCheck,
} from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import DotField from "../components/DotField";

const skills = [
  {
    id: "01",
    name: "HTML & CSS",
    desc: "Semántica, Grid y Flexbox. La base estructural de toda interfaz.",
    Icon: FileCode2,
  },
  {
    id: "02",
    name: "JavaScript",
    desc: "ES6+, estructuras de datos y asincronía con Promises y async/await.",
    Icon: Braces,
  },
  {
    id: "03",
    name: "React",
    desc: "Componentes, hooks y React Router. Interfaces reactivas y escalables.",
    Icon: Atom,
  },
  {
    id: "04",
    name: "Node & Express",
    desc: "Servidores HTTP, API REST, middlewares y manejo de errores.",
    Icon: Server,
  },
  {
    id: "05",
    name: "SQL & SQLite",
    desc: "Modelado relacional, consultas y relaciones entre tablas.",
    Icon: Database,
  },
  {
    id: "06",
    name: "Seguridad & APIs",
    desc: "CORS, validación de inputs, JWT y conexión a servicios externos.",
    Icon: ShieldCheck,
  },
];

export default function Home() {
  const skillsRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="page-enter">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <DotField />
        <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-40 md:px-10 md:pt-48 md:pb-40">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-electric-500" />
            <span className="label-mono text-electric-400">Full Stack Developer</span>
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-cream-100 sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Código que
            <br />
            <span className="text-electric-400">habla por sí solo.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream-300">
            Aprendo construyendo. Cada proyecto es un paso más hacia dominar
            React, Node y el stack completo — de cero a producción.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 border border-electric-500 bg-electric-500 px-7 py-3.5 font-medium text-midnight-950 transition-colors hover:bg-electric-400 hover:border-electric-400"
            >
              Ver proyectos
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-midnight-700 px-7 py-3.5 font-medium text-cream-100 transition-colors hover:border-electric-400 hover:text-electric-300"
            >
              Contactarme
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section ref={skillsRef} className="border-t border-midnight-800">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <div className="mb-16 grid gap-8 md:grid-cols-[1fr_2fr] md:items-end">
            <div className="reveal">
              <span className="label-mono text-electric-400">01 / Stack</span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-cream-100 md:text-5xl">
                De principio
                <br />a fin.
              </h2>
            </div>
            <p className="reveal text-lg leading-relaxed text-cream-300">
              No copio y pego. Entiendo qué hace cada línea y por qué está ahí —
              desde el primer pixel hasta la última query de SQL.
            </p>
          </div>

          <div className="stagger grid grid-cols-1 gap-px bg-midnight-800 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map(({ id, name, desc, Icon }) => (
              <div
                key={id}
                className="reveal-scale group relative bg-midnight-900 p-8 transition-colors hover:bg-midnight-850"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className="text-electric-400 transition-transform group-hover:-translate-y-1"
                  />
                  <span className="font-mono text-xs text-cream-400 transition-colors group-hover:text-electric-400">
                    {id}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-cream-100">
                  {name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-300">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="border-t border-midnight-800">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <div className="border border-midnight-800 bg-midnight-900 p-10 md:p-16">
            <span className="reveal label-mono text-electric-400">02 / Hablemos</span>
            <h2 className="reveal mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-cream-100 md:text-5xl">
              Abierto a colaborar
              <br />y a aprender.
            </h2>
            <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-cream-300">
              Si tienes un proyecto, una idea o simplemente quieres conectar —
              escríbeme.
            </p>
            <div className="reveal mt-10">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 border border-cream-100 px-7 py-3.5 font-medium text-cream-100 transition-colors hover:border-electric-400 hover:text-electric-300"
              >
                Enviar mensaje
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-midnight-800">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-10 text-sm text-cream-400 md:flex-row md:items-center md:px-10">
        <p>
          Construido con React, Node y SQLite ·{" "}
          <span className="text-cream-300">{new Date().getFullYear()}</span>
        </p>
        <p className="font-mono text-xs">vitio · full-stack</p>
      </div>
    </footer>
  );
}
