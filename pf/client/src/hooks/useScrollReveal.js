import { useEffect, useRef } from "react";

const REVEAL_SELECTOR = ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur";

/**
 * Devuelve un ref para anclar a un contenedor.
 * Observa todos los elementos con clases .reveal* dentro y les aplica
 * la clase .visible al entrar al viewport y la quita al salir
 * (fade reversible — se reactiva cada vez que se scrollea).
 *
 * @param {number} threshold  qué tanto debe estar visible para activar (0-1)
 * @param {Array}  deps       deps que disparan re-observación (ej. [data])
 */
export default function useScrollReveal(threshold = 0.15, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const allTargets = [...el.querySelectorAll(REVEAL_SELECTOR)];
    if (el.matches(REVEAL_SELECTOR)) allTargets.push(el);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      allTargets.forEach((t) => t.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            // Solo quita visible si el elemento salió por completo del viewport
            // (no por scrollear suavemente cerca del borde)
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    allTargets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, ...deps]);

  return ref;
}
