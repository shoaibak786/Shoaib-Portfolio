import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches;

/* ------------------------------------------------------------------
   1. SmoothScroll — buttery scrolling (Lenis), synced with ScrollTrigger
------------------------------------------------------------------- */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}

/* ------------------------------------------------------------------
   2. CustomCursor — lime dot + trailing ring, grows over links/buttons
------------------------------------------------------------------- */
export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasFinePointer() && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    const move = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      gsap.to([dot, ring], { opacity: 1, duration: 0.2, overwrite: "auto" });
    };

    const over = (e) => {
      const hot = e.target.closest && e.target.closest("a, button, [data-cursor]");
      gsap.to(ring, {
        scale: hot ? 1.9 : 1,
        backgroundColor: hot ? "rgba(197,255,74,0.14)" : "rgba(197,255,74,0)",
        duration: 0.25,
        overwrite: "auto",
      });
      gsap.to(dot, { scale: hot ? 0.5 : 1, duration: 0.2, overwrite: "auto" });
    };

    const leave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      gsap.killTweensOf([dot, ring]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[2000] h-9 w-9 rounded-full border border-[#c5ff4a]/50"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[2001] h-1.5 w-1.5 rounded-full bg-[#c5ff4a] shadow-[0_0_14px_#c5ff4a]"
      />
    </>
  );
}

/* ------------------------------------------------------------------
   3. RevealText — headings reveal word by word when scrolled into view
   Works with coloured <span> and <br /> inside the heading.
   Usage: <RevealText as="h2" className="...">Turning ideas into <span>...</span></RevealText>
------------------------------------------------------------------- */
function splitNode(node, counter) {
  if (typeof node === "string") {
    return node
      .split(/(\s+)/)
      .filter(Boolean)
      .map((part) =>
        /^\s+$/.test(part) ? (
          part
        ) : (
          <span
            key={counter.k++}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          >
            <span className="reveal-word inline-block will-change-transform">{part}</span>
          </span>
        )
      );
  }
  if (isValidElement(node)) {
    if (node.type === "br") return cloneElement(node, { key: counter.k++ });
    return cloneElement(
      node,
      { key: counter.k++ },
      ...Children.toArray(node.props.children).map((child) => splitNode(child, counter))
    );
  }
  return node;
}

export function RevealText({ as: Tag = "h2", className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;
    const words = el.querySelectorAll(".reveal-word");
    if (!words.length) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const counter = { k: 0 };
  return (
    <Tag ref={ref} className={className}>
      {Children.toArray(children).map((child) => splitNode(child, counter))}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   4. Tilt — 3D tilt toward the cursor (optionally with a lime spotlight)
   Spotlight = Tilt + glow. Use Spotlight on cards, Tilt on the hero photo.
------------------------------------------------------------------- */
export function Tilt({ children, className = "", max = 8, glow = false }) {
  const ref = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return undefined;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;

      gsap.to(el, {
        rotationY: px * max * 2,
        rotationX: -py * max * 2,
        transformPerspective: 900,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (glow && glowRef.current) {
        glowRef.current.style.background = `radial-gradient(420px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(197,255,74,0.10), transparent 60%)`;
      }
    };

    const leave = () => {
      gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
      if (glow && glowRef.current) glowRef.current.style.background = "transparent";
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      gsap.killTweensOf(el);
    };
  }, [max, glow]);

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
      {children}
      {glow && <div ref={glowRef} className="pointer-events-none absolute inset-0 rounded-3xl" />}
    </div>
  );
}

export function Spotlight({ children, className = "" }) {
  return (
    <Tilt glow max={4} className={`relative rounded-3xl ${className}`}>
      {children}
    </Tilt>
  );
}
