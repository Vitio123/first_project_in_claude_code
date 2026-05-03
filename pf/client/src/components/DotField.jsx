import { useEffect, useRef } from "react";

/**
 * Canvas de puntos en grid que reaccionan al cursor:
 * - se desplazan suavemente alejándose del mouse (efecto repulsión sutil)
 * - se iluminan con azul eléctrico cuanto más cerca estén
 *
 * Pensado para ir como fondo decorativo (absolute inset-0) detrás del hero.
 */
export default function DotField({
  spacing = 28,
  radius = 1.4,
  influence = 140,
  className = "",
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let dots = [];

    const buildDots = () => {
      dots = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          dots.push({ baseX: x, baseY: y, x, y });
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const active = mouseRef.current.active;
      const inf2 = influence * influence;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // distancia al cursor
        const dx = d.baseX - mx;
        const dy = d.baseY - my;
        const dist2 = dx * dx + dy * dy;

        // proximidad normalizada (1 = encima, 0 = lejos)
        const proximity = active && dist2 < inf2 ? 1 - dist2 / inf2 : 0;

        // desplazamiento por repulsión
        if (proximity > 0) {
          const dist = Math.sqrt(dist2) || 1;
          const push = proximity * 14;
          const targetX = d.baseX + (dx / dist) * push;
          const targetY = d.baseY + (dy / dist) * push;
          d.x += (targetX - d.x) * 0.18;
          d.y += (targetY - d.y) * 0.18;
        } else {
          // volver a la base
          d.x += (d.baseX - d.x) * 0.08;
          d.y += (d.baseY - d.y) * 0.08;
        }

        // color según proximidad: midnight oscuro → azul electric
        const alpha = 0.18 + proximity * 0.82;
        const r = Math.round(125 + (56 - 125) * (1 - proximity)); // mezcla hacia 7dd3fc
        const g = Math.round(211 + (189 - 211) * (1 - proximity));
        const b = Math.round(252 + (248 - 252) * (1 - proximity));
        ctx.fillStyle =
          proximity > 0
            ? `rgba(${r}, ${g}, ${b}, ${alpha})`
            : `rgba(61, 94, 147, 0.35)`;

        const size = radius + proximity * 1.6;
        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [spacing, radius, influence]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
