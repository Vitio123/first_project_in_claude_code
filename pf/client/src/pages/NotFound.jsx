import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-enter mx-auto flex min-h-[80vh] max-w-3xl flex-col items-start justify-center px-6 md:px-10">
      <span className="label-mono text-electric-400">Error 404</span>
      <h1 className="mt-6 font-mono text-[8rem] font-bold leading-none text-cream-100 md:text-[12rem]">
        4<span className="text-electric-500">0</span>4
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-cream-300">
        Esta página no existe o fue movida a otra parte del archivo.
      </p>
      <Link
        to="/"
        className="group mt-10 inline-flex items-center gap-3 border border-cream-100 px-7 py-3.5 font-medium text-cream-100 transition-colors hover:border-electric-400 hover:text-electric-300"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        Volver al inicio
      </Link>
    </div>
  );
}
