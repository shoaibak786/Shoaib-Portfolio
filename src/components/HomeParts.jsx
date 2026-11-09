import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Mail } from "lucide-react";
import { PROFILE, technologies } from "../data/profile";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Typing effect ---------- */
export function Typewriter({ words, speed = 70, deleteSpeed = 36, pause = 1700 }) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return undefined;
    const word = words[wordIndex];
    let delay = deleting ? deleteSpeed : speed;
    if (!deleting && text === word) delay = pause;
    if (deleting && text === "") delay = 350;

    const id = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(id);
  }, [text, deleting, wordIndex, words, speed, deleteSpeed, pause, reduce]);

  return (
    <span className="text-[#c5ff4a]">
      {reduce ? words[0] : text}
      {!reduce && (
        <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-[#c5ff4a]" />
      )}
    </span>
  );
}

/* ---------- Buttons that gently follow the cursor ---------- */
export function Magnetic({ children, strength = 0.28 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return undefined;

    const move = (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * strength,
        y: (e.clientY - (r.top + r.height / 2)) * strength,
        duration: 0.35,
        ease: "power3.out",
      });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  );
}

/* ---------- Thin lime scroll progress bar ---------- */
export function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="pointer-events-none fixed left-0 top-0 z-[1000] h-[2px] w-full origin-left bg-[#c5ff4a] shadow-[0_0_12px_#c5ff4a]"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

/* ---------- Giant outlined text that slides sideways as you scroll ---------- */
export function ScrollMarquee({ text }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { xPercent: 8 },
        {
          xPercent: -38,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden py-10 sm:py-14" aria-hidden="true">
      <div
        ref={trackRef}
        className="display-font flex w-max items-center gap-10 whitespace-nowrap text-[18vw] font-semibold leading-none tracking-[-0.05em] md:text-[12vw]"
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.22)]">{text}</span>
            <span className="text-[#c5ff4a]">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Count-up numbers ---------- */
export function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf;
    let started = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / 1400);
          setValue(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ---------- Copy email button ---------- */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-4 text-sm font-medium text-white/80 transition hover:border-[#c5ff4a] hover:text-[#c5ff4a]"
    >
      {copied ? (
        <>
          <CheckCircle2 size={16} className="text-[#c5ff4a]" /> Email copied
        </>
      ) : (
        <>
          <Mail size={16} /> {PROFILE.email}
        </>
      )}
    </button>
  );
}

export function MarqueeRow({ reverse = false, dim = false }) {
  return (
    <div
      className="marquee-track flex min-w-max items-center gap-8 animate-[marquee_38s_linear_infinite]"
      style={reverse ? { animationDirection: "reverse" } : undefined}
    >
      {[...technologies, ...technologies].map((technology, index) => (
        <span
          key={`${technology}-${index}`}
          className={`flex items-center gap-8 whitespace-nowrap text-xs font-medium uppercase tracking-[0.18em] ${
            dim ? "text-white/20" : "text-white/45"
          }`}
        >
          {technology}
          <span className="text-[#c5ff4a]">✳</span>
        </span>
      ))}
    </div>
  );
}
