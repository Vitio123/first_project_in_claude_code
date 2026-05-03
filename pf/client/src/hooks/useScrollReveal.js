import { useEffect, useRef } from "react";

const REVEAL_SELECTOR = ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur";

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
            entry.target.querySelectorAll(REVEAL_SELECTOR)
              .forEach((child) => child.classList.add("visible"));
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    allTargets.forEach((t) => observer.observe(t));

    // Safety net: if for any reason the observer hasn't revealed an element,
    // force-show it after a short delay so buttons/content never stay hidden.
    const fallback = setTimeout(() => {
      allTargets.forEach((t) => t.classList.add("visible"));
    }, 600);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, ...deps]);

  return ref;
}
