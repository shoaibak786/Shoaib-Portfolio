import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const wrap = useRef(null);
  const dot = useRef(null);
  const ring = useRef(null);
  const ringInner = useRef(null);

  useEffect(() => {
    // Touch devices par cursor nahi chahiye
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = 0, y = 0, rx = 0, ry = 0, id;
    let started = false;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!started) {
        // Pehli mouse move par ring wahin se shuru ho, corner se udta hua na aaye
        rx = x;
        ry = y;
        started = true;
        if (wrap.current) wrap.current.style.opacity = "1";
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      id = requestAnimationFrame(loop);
    };

    const over = (e) => {
      const hot = e.target.closest("a, button, [role='button']");
      ringInner.current?.classList.toggle("scale-150", !!hot);
      ringInner.current?.classList.toggle("bg-[#c5ff4a]/10", !!hot);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    id = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div
      ref={wrap}
      style={{ opacity: 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden transition-opacity duration-300 lg:block"
    >
      <div
        ref={dot}
        className="absolute left-0 top-0"
      >
        <div className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-[#c5ff4a]" />
      </div>
      <div ref={ring} className="absolute left-0 top-0">
        <div
          ref={ringInner}
          className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-[#c5ff4a]/60 transition-all duration-200"
        />
      </div>
    </div>
  );
}