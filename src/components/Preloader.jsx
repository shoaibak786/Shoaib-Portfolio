import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NAME = "SHOAIB";
const WORDS = ["Design", "Build", "Deliver"];

// Overall speed: 1 = normal, 0.75 = slower, 0.5 = twice as slow
const SPEED = 0.75;

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const t = setTimeout(() => onComplete?.(), 350);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = prevOverflow;
      };
    }

    const ctx = gsap.context(() => {
      const progress = { v: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => onComplete?.(),
      });

      // Frame corners and small labels settle in
      tl.from(".pre-corner", { opacity: 0, scale: 0.6, duration: 0.7, stagger: 0.08 }, 0)
        .from(".pre-meta", { opacity: 0, duration: 0.6 }, 0.2);

      // Act 1: three words flash through the centre (the site's own tagline)
      // Explicit start states: everything is hidden until its own turn
      gsap.set(".pre-word", { yPercent: 110, autoAlpha: 0 });
      gsap.set(".pre-char", { yPercent: 115, autoAlpha: 0 });
      gsap.set(".pre-role", { autoAlpha: 0, y: 12 });

      gsap.utils.toArray(".pre-word").forEach((word, i) => {
        const t = 0.2 + i * 0.45;
        tl.to(word, { yPercent: 0, autoAlpha: 1, duration: 0.25, ease: "power3.out" }, t).to(
          word,
          { yPercent: -110, autoAlpha: 0, duration: 0.18, ease: "power3.in" },
          t + 0.3
        );
      });

      // Act 2: the name rises out of a mask, letter by letter
      tl.to(".pre-char", { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.045 }, 1.5).to(
        ".pre-role",
        { autoAlpha: 1, y: 0, duration: 0.7 },
        2.0
      );

      // Counter, progress line and glow share one clock
      tl.to(
        progress,
        {
          v: 100,
          duration: 2.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = String(Math.round(progress.v));
          },
        },
        0.1
      )
        .fromTo(".pre-line", { scaleX: 0 }, { scaleX: 1, duration: 2.5, ease: "power2.inOut" }, 0.1)
        .fromTo(
          ".pre-glow",
          { scale: 0.5, opacity: 0.2 },
          { scale: 1.5, opacity: 1, duration: 2.5, ease: "power2.inOut" },
          0.1
        );

      // Exit: content lifts away, then the curtain splits open
      tl.to(".pre-content", { opacity: 0, y: -24, duration: 0.45, ease: "power2.in" }, 2.95)
        .to(".pre-top", { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, 3.35)
        .to(".pre-bottom", { yPercent: 100, duration: 0.95, ease: "power4.inOut" }, 3.35)
        .to(".pre-edge", { opacity: 0, duration: 0.3 }, 3.35);

      tl.timeScale(SPEED);
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = prevOverflow;
    };
  }, [onComplete]);

  const wordClass =
    "display-font text-6xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-8xl md:text-9xl";

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] overflow-hidden"
      role="status"
      aria-label="Loading"
    >
      {/* Curtain halves */}
      <div className="pre-top absolute inset-x-0 top-0 h-1/2 bg-[#0a0a0a]" />
      <div className="pre-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#0a0a0a]" />
      <div className="pre-edge pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[#c5ff4a]/30" />

      <div className="pre-content absolute inset-0">
        <div className="pre-glow pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5ff4a]/[0.10] blur-[110px]" />

        {/* Frame corners */}
        <span className="pre-corner absolute left-5 top-5 h-6 w-6 border-l border-t border-white/25 sm:left-8 sm:top-8" />
        <span className="pre-corner absolute right-5 top-5 h-6 w-6 border-r border-t border-white/25 sm:right-8 sm:top-8" />
        <span className="pre-corner absolute bottom-5 left-5 h-6 w-6 border-b border-l border-white/25 sm:bottom-8 sm:left-8" />
        <span className="pre-corner absolute bottom-5 right-5 h-6 w-6 border-b border-r border-white/25 sm:bottom-8 sm:right-8" />

        {/* Centre stage: words first, then the name */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="relative text-center">
            <h1 className={`${wordClass} text-white`} aria-label={NAME}>
              {NAME.split("").map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
                  <span className="pre-char invisible inline-block">{ch}</span>
                </span>
              ))}
              <span className="inline-block overflow-hidden align-bottom" aria-hidden="true">
                <span className="pre-char invisible inline-block text-[#c5ff4a]">.</span>
              </span>
            </h1>

            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {WORDS.map((w) => (
                <div key={w} className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <span className={`pre-word invisible ${wordClass} text-[#c5ff4a]`}>{w}</span>
                </div>
              ))}
            </div>

            <p className="pre-role invisible absolute left-0 right-0 top-full mt-5 text-xs tracking-[0.2em] text-[#c5ff4a] sm:text-sm">
              CRAFTING DIGITAL EXPERIENCES
            </p>
          </div>
        </div>

        {/* Bottom: counter and progress */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:px-12 sm:pb-16">
          <div className="mb-4 flex items-end justify-between">
            <p className="display-font text-6xl font-semibold tabular-nums tracking-[-0.05em] text-white sm:text-8xl">
              <span ref={countRef}>0</span>
              <span className="text-[#c5ff4a]">%</span>
            </p>
            <p className="pre-meta pb-2 text-[11px] tracking-[0.25em] text-white/40">PORTFOLIO LOADING</p>
          </div>
          <div className="h-px w-full bg-white/10">
            <div className="pre-line h-full origin-left bg-[#c5ff4a]" />
          </div>
        </div>
      </div>
    </div>
  );
}
