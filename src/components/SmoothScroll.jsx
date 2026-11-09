import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

let lenisInstance = null;

export default function SmoothScroll() {
  const { pathname } = useLocation();

  // Lenis start karna
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenisInstance = lenis;

    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // Page badalne par top se shuru karna
  useEffect(() => {
    if (lenisInstance) lenisInstance.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}