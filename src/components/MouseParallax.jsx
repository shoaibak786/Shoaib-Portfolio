import { useEffect, useRef } from "react";

// Mouse ke saath andar ke elements alag alag speed se hilte hain (depth feel)
// Andar ke element par data-depth="20" jaisa attribute lagayein
export default function MouseParallax({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = [...el.querySelectorAll("[data-depth]")];
    let tx = 0, ty = 0, cx = 0, cy = 0, id;

    const move = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      layers.forEach((l) => {
        const d = parseFloat(l.dataset.depth) || 10;
        l.style.transform = `translate3d(${cx * d}px, ${cy * d}px, 0)`;
      });
      id = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    id = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(id); };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
