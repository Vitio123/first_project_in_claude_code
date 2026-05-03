import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index = 0 }) {
  const techs = project.tech.split(",").map((t) => t.trim());
  const topics = project.topics
    ? project.topics.split(",").map((t) => t.trim())
    : [];

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group relative flex h-full flex-col border border-midnight-800 bg-midnight-900 p-7 transition-colors duration-300 hover:border-electric-500 focus-visible:border-electric-400"
    >
      {/* Número grande de fondo */}
      <span className="absolute right-5 top-4 font-mono text-xs text-cream-400 transition-colors group-hover:text-electric-400">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="mb-3 pr-8 text-xl font-semibold text-cream-100 transition-colors group-hover:text-electric-300">
        {project.title}
      </h3>

      <p className="mb-6 text-sm leading-relaxed text-cream-300">
        {project.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {techs.map((t) => (
          <span
            key={t}
            className="border border-midnight-700 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-cream-200"
          >
            {t}
          </span>
        ))}
      </div>

      {topics.length > 0 && (
        <p className="mb-6 text-xs text-cream-400">
          <span className="text-cream-300">Temas · </span>
          {topics.join(" / ")}
        </p>
      )}

      <div className="mt-auto flex items-center gap-2 pt-4">
        <span className="label-mono text-electric-400">Ver contenido</span>
        <ArrowUpRight
          size={16}
          className="text-electric-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>
    </Link>
  );
}
