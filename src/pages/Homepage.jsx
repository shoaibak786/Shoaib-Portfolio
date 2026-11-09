import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Code2, ExternalLink, MapPin, Sparkles,
} from "lucide-react";
import { RevealText, Spotlight, Tilt } from "../components/Effects";
import HeroNetwork from "../components/HeroNetwork";
import SplitChars from "../components/SplitChars";
import ScrambleText from "../components/ScrambleText";
import MouseParallax from "../components/MouseParallax";
import Testimonials from "../components/Testimonials";
import { SectionLabel } from "../components/Layout";
import { SkillCard, ProjectCard } from "../components/Cards";

import {
  Typewriter, Magnetic, ScrollProgress, ScrollMarquee, CountUp, CopyEmail, MarqueeRow,
} from "../components/HomeParts";
import { PROFILE, TYPED } from "../data/profile";
import { STATS, VALUES, STEPS, skills, projects, testimonials } from "../data/content";

// Thin gradient line between major sections
const Hairline = () => <div className="hairline mx-auto max-w-[1376px]" aria-hidden="true" />;

export default function HomePage() {
  // Soft glow that follows the mouse across the whole page (desktop only)
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;
    const root = document.documentElement;
    let frame;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="mouse-glow" aria-hidden="true" />
      <ScrollProgress />

      {/* ============ HERO ============ */}
      <section className="relative mx-auto grid min-h-[calc(100vh-85px)] max-w-[1376px] items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-12 lg:py-24">
        <HeroNetwork />

        <div className="hero-scroll-out relative z-10">
          <div className="hero-intro mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] text-white/65 backdrop-blur sm:text-xs">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5ff4a] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c5ff4a]" />
            </span>
            OPEN TO WEB DEVELOPMENT OPPORTUNITIES
          </div>

          <p className="hero-intro mb-3 text-xs font-medium tracking-[0.2em] text-[#c5ff4a] sm:text-sm">
            <ScrambleText text={`HELLO, I'M ${PROFILE.name.toUpperCase()}`} />
          </p>

          <h1 className="display-font text-6xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-7xl md:text-8xl xl:text-[108px]">
            <SplitChars text="Web" delay={0} />
            <br />
            <span className="shimmer-text bg-gradient-to-r from-[#c5ff4a] via-white to-[#c5ff4a] bg-clip-text text-transparent">
              <SplitChars text="Developer" delay={0.2} />
            </span>
            <span className="text-white">.</span>
          </h1>

          <h2 className="hero-intro mt-6 min-h-[2rem] text-lg font-medium tracking-tight text-white/70 sm:text-2xl">
            I build <Typewriter words={TYPED} />
          </h2>

          <p className="hero-intro mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            Frontend, WordPress, Shopify and backend basics: I turn ideas into
            fast, responsive websites and e-commerce experiences people enjoy using.
          </p>

          <div className="hero-intro mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Link
                to="/projects"
                className="shine inline-flex items-center gap-3 rounded-full bg-[#c5ff4a] px-5 py-4 text-sm font-semibold !text-black shadow-[0_0_40px_rgba(197,255,74,0.25)] transition hover:bg-white hover:!text-black sm:px-6"
              >
                Explore my work <ArrowRight size={17} />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-4 text-sm font-medium text-white transition hover:border-[#c5ff4a] hover:text-[#c5ff4a] sm:px-6"
              >
                Get in touch <ArrowUpRight size={17} />
              </Link>
            </Magnetic>
          </div>

          <div className="hero-intro mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/45">
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-[#c5ff4a]" />
              {PROFILE.location}
            </span>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-[#c5ff4a]"
            >
              <ExternalLink size={14} />
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Hero visual: the one "wow" moment. Quieter accents around the portrait. */}
        <MouseParallax className="hero-visual relative mx-auto flex aspect-square w-full max-w-[480px] items-center justify-center">
          <div data-depth="-12" className="absolute inset-[12%] rounded-full bg-[#c5ff4a]/10 blur-[90px]" />
          <div data-depth="8" className="absolute inset-[5%]"><div className="orbit-one h-full w-full rounded-full border border-dashed border-[#c5ff4a]/40" /></div>
          <div data-depth="14" className="absolute inset-[13%]"><div className="orbit-two h-full w-full rounded-full border border-white/20" /></div>

          <div data-depth="26" className="absolute left-[12%] top-[20%] z-20 h-3 w-3 rounded-full bg-[#c5ff4a] shadow-[0_0_25px_#c5ff4a]" />
          <div data-depth="-20" className="absolute right-[13%] top-[16%] z-20">
            <div className="floating-star text-[#c5ff4a]">
              <Sparkles size={27} strokeWidth={1.2} />
            </div>
          </div>

          <div data-depth="18" className="relative z-10 aspect-square w-[68%] rounded-full">
            <Tilt max={12} className="relative aspect-square w-full rounded-full">
              <div className="portrait-frame portrait-ring relative aspect-square w-full overflow-hidden rounded-full border border-[#c5ff4a]/40 bg-[#111] shadow-[0_0_80px_rgba(197,255,74,0.14)]">
                <img
                  src="/images/profile.png"
                  alt="Shoaib Ajmal — Web Developer"
                  className="h-full w-full rounded-full object-cover object-center transition-transform duration-700 hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-black/55 via-transparent to-black/10" />
                <div className="absolute bottom-[13%] left-0 right-0 text-center">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#c5ff4a] sm:text-[10px]">
                    Creative Developer
                  </p>
                  <p className="mt-1 text-base font-semibold tracking-tight text-white sm:text-xl">
                    Shoaib Ajmal<span className="text-[#c5ff4a]">.</span>
                  </p>
                </div>
              </div>
            </Tilt>
          </div>

          {/* One floating card only (the second one repeated the "open to opportunities" badge) */}
          <div data-depth="32" className="absolute bottom-[9%] left-0 z-20 sm:left-[-2%]">
            <div className="floating-card rounded-2xl border border-white/10 bg-[#111]/95 px-3 py-3 shadow-2xl backdrop-blur-xl sm:px-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c5ff4a]/10 text-[#c5ff4a]">
                  <Code2 size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">Web Development</p>
                  <p className="mt-1 text-[10px] text-white/45">Design · Build · Deliver</p>
                </div>
              </div>
            </div>
          </div>
        </MouseParallax>

        <a
          href="#technology"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/35 transition hover:text-[#c5ff4a] lg:flex"
        >
          Scroll to explore <ArrowDown size={13} />
        </a>
      </section>

      {/* ============ TECH MARQUEE ============ */}
      <section
        id="technology"
        aria-label="Technologies"
        className="marquee-wrap overflow-hidden border-y border-white/[0.08] bg-white/[0.02] py-5"
      >
        <div
          className="space-y-4"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
            maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
          }}
        >
          <MarqueeRow />
          <MarqueeRow reverse dim />
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="section-reveal mx-auto max-w-[1376px] px-5 pt-20 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-cell p-6 sm:p-9 ${i % 2 === 1 ? "border-l border-white/10" : ""} ${
                i > 1 ? "border-t border-white/10 lg:border-t-0" : ""
              } ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`}
            >
              <p className="display-font bg-gradient-to-b from-white to-white/60 bg-clip-text text-5xl font-semibold tracking-[-0.05em] text-transparent sm:text-6xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="section-reveal mx-auto max-w-[1376px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <SectionLabel number="01">A little about me</SectionLabel>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <RevealText
            as="h2"
            className="display-font text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-6xl"
          >
            Turning ideas into
            <span className="text-[#c5ff4a]"> useful digital </span>
            experiences.
          </RevealText>
          <div>
            <p className="text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              I'm a Lahore-based web developer interested in building clean,
              responsive and user-friendly digital products across web
              development and e-commerce.
            </p>
            <Link
              to="/about"
              className="link-underline mt-6 inline-flex items-center gap-2 text-sm text-[#c5ff4a] transition hover:text-white"
            >
              More about me <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {VALUES.map(([title, text]) => (
            <Spotlight
              key={title}
              className="glow-card group border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#c5ff4a]/40 sm:p-7"
            >
              <span className="mb-5 block h-px w-10 bg-[#c5ff4a] transition-all duration-300 group-hover:w-16" />
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/50">{text}</p>
            </Spotlight>
          ))}
        </div>
      </section>

      <ScrollMarquee text="Design · Build · Deliver" />

      {/* ============ EXPERTISE ============ */}
      <section className="section-reveal relative overflow-hidden border-y border-white/[0.07] bg-[#0b0b0b]/80 px-5 py-24 sm:px-8 md:py-28 lg:px-12">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#c5ff4a]/[0.06] blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionLabel number="02">Expertise</SectionLabel>
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <RevealText
              as="h2"
              className="display-font max-w-2xl text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl"
            >
              Skills built around
              <br />
              <span className="text-white/35">real-world solutions.</span>
            </RevealText>
            <Link
              to="/expertise"
              className="link-underline inline-flex items-center gap-2 text-sm text-[#c5ff4a] hover:text-white"
            >
              All expertise <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill) => (
              <Spotlight key={skill.number}>
                <SkillCard skill={skill} />
              </Spotlight>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="section-reveal mx-auto max-w-[1376px] px-5 py-24 sm:px-8 md:py-28 lg:px-12">
        <SectionLabel number="03">How I work</SectionLabel>
        <RevealText
          as="h2"
          className="display-font mb-12 max-w-2xl text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl"
        >
          A simple process,
          <span className="text-white/35"> clear results.</span>
        </RevealText>

        <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <Spotlight
              key={step.number}
              className="glow-card group overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#c5ff4a]/40 sm:p-7"
            >
              <span className="display-font text-6xl font-semibold tracking-[-0.06em] text-white/[0.07] transition-colors duration-300 group-hover:text-[#c5ff4a]/25">
                {step.number}
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/50">{step.text}</p>
            </Spotlight>
          ))}
        </div>
      </section>

      <Hairline />

      {/* ============ PROJECTS ============ */}
      <section className="section-reveal mx-auto max-w-[1376px] px-5 py-24 sm:px-8 md:py-28 lg:px-12">
        <SectionLabel number="04">Selected projects</SectionLabel>
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <RevealText
            as="h2"
            className="display-font text-4xl font-medium tracking-[-0.045em] sm:text-5xl"
          >
            Work & experiments<span className="text-[#c5ff4a]">.</span>
          </RevealText>
          <Link
            to="/projects"
            className="link-underline inline-flex items-center gap-2 text-sm text-[#c5ff4a] hover:text-white"
          >
            View all {projects.length} projects <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Spotlight className="md:col-span-2">
            <ProjectCard project={projects[0]} />
          </Spotlight>
          {projects.slice(1, 3).map((project) => (
            <Spotlight key={project.number}>
              <ProjectCard project={project} />
            </Spotlight>
          ))}
        </div>
      </section>

      <Testimonials items={testimonials} />

      {/* ============ FINAL CTA: the closing "wow" moment ============ */}
      <section className="section-reveal px-5 pb-24 sm:px-8 lg:px-12">
        <div className="cta-border relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#10130c] p-7 sm:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#c5ff4a]/[0.14] blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-[#c5ff4a]/[0.06] blur-[100px]" />
          <div className="relative">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5ff4a]">
              <span className="h-2 w-2 rounded-full bg-[#c5ff4a]" />
              Have a project in mind?
            </p>
            <RevealText
              as="h2"
              className="display-font mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-7xl"
            >
              Let's build something
              <span className="shimmer-text bg-gradient-to-r from-[#c5ff4a] via-white to-[#c5ff4a] bg-clip-text "> meaningful</span>.
            </RevealText>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              Tell me about your website, online store or idea. Email is the
              easiest way to start.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <Link
                  to="/contact"
                  className="shine inline-flex items-center gap-3 rounded-full bg-[#c5ff4a] px-6 py-4 text-sm font-semibold !text-black transition hover:bg-white hover:!text-black"
                >
                  Contact me <ArrowUpRight size={17} />
                </Link>
              </Magnetic>
              <CopyEmail />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
