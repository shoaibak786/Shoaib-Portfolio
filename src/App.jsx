
import { useCallback, useEffect, useRef, useState } from "react";
import { CustomCursor, SmoothScroll, RevealText, Spotlight, Tilt } from "./components/Effects";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  ShoppingBag,
  Sparkles,
  X,
  MessageCircle,
} from "lucide-react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./components/Preloader";
import HeroNetwork from "./components/HeroNetwork";
gsap.registerPlugin(ScrollTrigger);

const PROFILE = {
  name: "Shoaib Ajmal",
  role: "Web Developer",
  email: "shoaibak962@gmail.com",
  phone: "+92 300 8034037",
  location: "Lahore, Pakistan",
  linkedin: "https://linkedin.com/in/shoaib-ajmal-7a877239a",
};

const technologies = [
  "HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS",
  "Bootstrap", "AngularJS", "WordPress", "Elementor Pro",
  "WooCommerce", "Shopify", "MongoDB", "Oracle Database",
  "Graphic Design",
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Expertise", to: "/expertise" },
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Education", to: "/education" },
  { label: "Contact", to: "/contact" },
];

const skills = [
  {
    number: "01",
    name: "Frontend Development",
    description:
      "Building responsive, accessible and engaging interfaces with modern frontend technologies.",
    tools: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Bootstrap"],
    icon: Code2,
  },
  {
    number: "02",
    name: "WordPress Development",
    description:
      "Creating business websites, landing pages and e-commerce stores with customizable layouts.",
    tools: ["WordPress", "Elementor", "Elementor Pro", "WooCommerce"],
    icon: Layers3,
  },
  {
    number: "03",
    name: "Shopify Development",
    description:
      "Setting up online stores with organized collections, customized themes and shopping features.",
    tools: ["Shopify", "Theme Customization", "Product Setup"],
    icon: ShoppingBag,
  },
  {
    number: "04",
    name: "Backend & Databases",
    description:
      "Exploring server-side development, database integration and data-driven applications.",
    tools: ["Python", "FastAPI", "MongoDB", "Oracle Database"],
    icon: Database,
  },
  {
    number: "05",
    name: "Graphic Design",
    description:
      "Creating clean visual assets and design concepts for consistent digital experiences.",
    tools: ["Graphic Design", "Visual Design", "Canva"],
    icon: Palette,
  },
  {
    number: "06",
    name: "Tools & Collaboration",
    description:
      "Using development tools and a practical problem-solving approach to build digital products.",
    tools: ["Git", "GitHub", "VS Code", "Problem-Solving"],
    icon: Sparkles,
  },
];

const projects = [
  {
    number: "01",
    name: "Mashfaa",
    type: "REACT E-COMMERCE",
    category: "In Progress",
    description:
      "A modern modest-fashion storefront featuring product discovery, category filtering, product details, cart functionality and a responsive shopping experience.",
    stack: ["React.js", "Tailwind CSS", "MongoDB"],
    accent: "#c5ff4a",
    headline: ["Modern", "modest", "fashion."],
    icon: ShoppingBag,
    link: "https://mashfaa-site.vercel.app/",
    label: "Visit Website ",
  },
  {
    number: "02",
    name: "Lexora Intelligence",
    type: "AI LEGAL TECHNOLOGY",
    category: "AI Prototype",
    description:
      "An AI-powered legal case management prototype exploring document processing, searchable legal knowledge and retrieval-augmented generation.",
    stack: ["React", "Python", "FastAPI", "RAG"],
    accent: "#a9b8ff",
    headline: ["Clarity for", "complex", "legal work."],
    icon: Layers3,
    link: "",
    label: "Prototype",
  },
  {
    number: "03",
    name: "Kitchen Royals",
    type: "SHOPIFY STORE",
    category: "E-commerce",
    description:
      "A kitchen-products e-commerce store featuring customized theme styling, product collections and online shopping configurations.",
    stack: ["Shopify", "Theme Customization", "E-commerce"],
    accent: "#e8bd9b",
    headline: ["Made for", "everyday", "living."],
    icon: ShoppingBag,
    link: "https://kitchenroyals.com/",
    label: "Visit website",
  },
  {
    number: "04",
    name: "Zara Textile",
    type: "WORDPRESS E-COMMERCE",
    category: "E-commerce",
    description:
      "A home-textile online store with organized product categories, customized layouts and responsive shopping pages.",
    stack: ["WordPress", "WooCommerce", "Elementor Pro"],
    accent: "#d9c5a5",
    headline: ["Comfort", "meets", "design."],
    icon: Layers3,
    link: "https://zaratextile.com/",
    label: "Visit website",
  },
  {
    number: "05",
    name: "Kafeen Coffee",
    type: "BUSINESS WEBSITE",
    category: "Frontend",
    description:
      "A coffee-shop website practice project focused on responsive layouts, interactive sections and smooth navigation.",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    accent: "#c9a78d",
    headline: ["A fresh", "digital", "brew."],
    icon: Code2,
    link: "",
    label: "Practice project",
  },
  {
    number: "06",
    name: "J.-Inspired Store",
    type: "E-COMMERCE CONCEPT",
    category: "Practice Project",
    description:
      "A fashion retail practice project focused on WooCommerce layouts, product presentation and theme customization.",
    stack: ["WordPress", "WooCommerce", "Elementor"],
    accent: "#e7e7e7",
    headline: ["Fashion", "storefront", "concept."],
    icon: ShoppingBag,
    link: "",
    label: "Practice project",
  },
];

const education = [
  {
    title: "BS Information Technology",
    institution: "University of Education, Lahore",
    detail: "Undergraduate studies",
    status: "In progress",
  },
  {
    title: "Associate Degree Program",
    institution: "Riphah International College, Lahore",
    detail: "Computer Science",
    status: "Completed",
  },
  {
    title: "Intermediate",
    institution: "Govt. Islamia College, Civil Lines, Lahore",
    detail: "Intermediate in Computer Science",
    status: "Completed",
  },
  {
    title: "Matriculation",
    institution: "Govt. Muslim Model High School No. 2, Lahore",
    detail: "Science",
    status: "Completed",
  },
];

const experience = [
  {
    role: "WordPress Development Instructor",
    company: "Faizan Digital Institute",
    location: "Lahore, Pakistan",
    period: "Aug 2024 – 2025",
    description:
      "Taught WordPress website development and guided learners through website building, page design and practical implementation.",
    points: [
      "Explained WordPress fundamentals and website structure.",
      "Introduced page building with Elementor.",
      "Supported practical website development exercises.",
    ],
  },
];

function SectionLabel({ number, children }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
      <span className="text-[#c5ff4a]">{number}</span>
      <span>{children}</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function PageHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-14 max-w-3xl">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#c5ff4a]">
        {eyebrow}
      </p>
      <h1 className="display-font text-5xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
        {title}
        <span className="text-[#c5ff4a]">.</span>
      </h1>
      {description && (
        <p className="mt-6 max-w-2xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-[999] w-full bg-[#0c0c0c]/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1376px] items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-12">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c5ff4a] text-sm font-black text-black">
            SA.
          </span>
          <span className="text-sm font-semibold tracking-wide">
            Shoaib Ajmal
            <span className="mt-0.5 block text-xs font-normal text-white/40">
              Web Developer
            </span>
          </span>
        </Link>

        <div className="hidden items-center  gap-10 xl:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `nav-link text-sm transition ${isActive
                  ? "text-[#c5ff4a]"
                  : "text-white/60 hover:text-[#c5ff4a]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden items-center gap-2 rounded-full bg-[#c5ff4a] px-5 py-3 text-sm font-semibold !text-black transition hover:bg-white hover:!text-black sm:inline-flex"
        >
          Let's talk <ArrowUpRight size={16} />
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 xl:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0c0c0c] px-5 py-4 sm:px-8 lg:px-12 xl:hidden">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `block border-b border-white/[0.07] py-4 text-sm transition ${isActive
                  ? "text-[#c5ff4a]"
                  : "text-white/70 hover:text-[#c5ff4a]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#c5ff4a] px-5 py-3 text-sm font-semibold !text-black hover:bg-white hover:!text-black "
          >
            Let's talk <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080808] px-5 pb-6 pt-16 sm:px-8 sm:pt-20 lg:px-12">
      <div className="pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-[#c5ff4a]/[0.06] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-7 border-b border-white/10 pb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#c5ff4a]">
              <span className="h-2 w-2 rounded-full bg-[#c5ff4a]" />
              Have a project in mind?
            </p>
            <h2 className="display-font text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Let's create something
              <br />
              <span className="text-white/35">worth building.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/45">
              Have an idea, website project or collaboration in mind?
              Let's connect and turn it into a practical digital experience.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#c5ff4a] px-6 py-4 text-sm font-semibold !text-black transition duration-300 hover:bg-white hover:!text-black"
          >
            Let's talk <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:gap-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c5ff4a] text-sm font-black text-black">
                SA.
              </span>
              <span>
                <span className="block text-base font-semibold tracking-wide text-white">
                  Shoaib Ajmal
                </span>
                <span className="mt-1 block text-xs text-white/40">
                  Web Developer
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/45">
              Building responsive websites, e-commerce experiences and
              thoughtful digital solutions with modern web technologies.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/50">
              <MapPin size={14} className="text-[#c5ff4a]" />
              {PROFILE.location}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Explore
            </h3>
            <div className="mt-6 flex flex-col items-start gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm text-white/45 transition duration-200 hover:translate-x-1 hover:text-[#c5ff4a]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              What I do
            </h3>
            <div className="mt-6 flex flex-col gap-4 text-sm text-white/45">
              <span className="transition hover:text-white">Frontend Development</span>
              <span className="transition hover:text-white">WordPress Websites</span>
              <span className="transition hover:text-white">E-commerce Stores</span>
              <span className="transition hover:text-white">Shopify Development</span>
              <span className="transition hover:text-white">UI Implementation</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Get in touch
            </h3>

            <a
              href={`mailto:${PROFILE.email}`}
              className="mt-6 flex items-start gap-3 text-sm leading-6 text-white/50 transition hover:text-[#c5ff4a]"
            >
              <Mail size={17} className="mt-0.5 shrink-0 text-[#c5ff4a]" />
              <span className="break-all">{PROFILE.email}</span>
            </a>

            <a
              href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
              className="mt-4 flex items-center gap-3 text-sm text-white/50 transition hover:text-[#c5ff4a]"
            >
              <Phone size={17} className="shrink-0 text-[#c5ff4a]" />
              {PROFILE.phone}
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-medium text-white/70 transition hover:border-[#c5ff4a] hover:text-[#c5ff4a]"
            >
              Connect on LinkedIn <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-white/35">
            © {new Date().getFullYear()} Shoaib Ajmal. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-2 text-xs text-white/40">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c5ff4a]" />
              Open to opportunities
            </span>

            <a
              href="#top"
              onClick={(event) => {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-xs text-white/45 transition hover:text-[#c5ff4a]"
            >
              Back to top <ArrowDown size={14} className="rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ProjectCard({ project }) {
  const Icon = project.icon;

  return (
    <article className="project-card group overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] transition-colors duration-300 hover:border-white/25">
      <div
        className="relative m-3 flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[1.3rem] p-6 sm:min-h-[290px] sm:p-8"
        style={{
          background: `radial-gradient(circle at 80% 15%, ${project.accent}25, transparent 35%), linear-gradient(135deg, #181818, #0c0c0c 75%)`,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-white/60">
            {project.type}
          </span>
          <span className="text-xs text-white/35">{project.number} / 06</span>
        </div>

        <div className="absolute right-7 top-1/2 flex h-28 w-28 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 transition-transform duration-500 group-hover:rotate-12 sm:right-12 sm:h-36 sm:w-36">
          <div
            className="absolute inset-3 rounded-full border border-dashed"
            style={{ borderColor: `${project.accent}70` }}
          />
          <Icon size={45} strokeWidth={1} style={{ color: project.accent }} />
        </div>

        <div className="relative z-10 max-w-[70%]">
          <p
            className="display-font text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl"
            style={{ color: project.accent }}
          >
            {project.headline.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </p>
        </div>

        <div className="absolute bottom-5 right-5 text-[10px] uppercase tracking-[0.15em] text-white/35">
          {project.category}
        </div>
      </div>

      <div className="p-6 pt-3 sm:p-8 sm:pt-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.name} website`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition hover:border-[#c5ff4a] hover:text-[#c5ff4a]"
            >
              <ArrowUpRight size={18} />
            </a>
          ) : (
            <span
              title={project.label}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40"
            >
              <Code2 size={17} />
            </span>
          )}
        </div>

        <p className="mt-4 text-sm leading-7 text-white/50">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full bg-white/[0.055] px-3 py-1.5 text-[11px] text-white/55"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 border-t border-white/[0.08] pt-4">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-white/65 transition hover:text-[#c5ff4a]"
            >
              Visit website <ExternalLink size={14} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs text-white/35">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c5ff4a]" />
              {project.label}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function SkillCard({ skill }) {
  const Icon = skill.icon;

  return (
    <article className="skill-card group rounded-3xl border border-white/[0.09] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#c5ff4a]/40 hover:bg-[#c5ff4a]/[0.025] sm:p-7">
      <div className="flex items-center justify-between">
        <span className="text-xs tracking-[0.2em] text-white/30">
          {skill.number}
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-[#c5ff4a] transition group-hover:border-[#c5ff4a]/40 group-hover:bg-[#c5ff4a]/10">
          <Icon size={21} strokeWidth={1.5} />
        </span>
      </div>
      <h3 className="mt-7 text-xl font-semibold tracking-tight">{skill.name}</h3>
      <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/45">
        {skill.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {skill.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-white/[0.09] px-3 py-1.5 text-[11px] text-white/55"
          >
            {tool}
          </span>
        ))}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------
   Replace your CURRENT HomePage block in App.jsx with this whole file
   (from "const TYPED" to the end of HomePage).
   Needs in App.jsx imports:
     import HeroNetwork from "./components/HeroNetwork";
     import { CustomCursor, SmoothScroll, RevealText, Spotlight, Tilt } from "./components/Effects";
   Do NOT keep any other "function Spotlight" in App.jsx.
------------------------------------------------------------------- */

const TYPED = [
  "responsive websites.",
  "online stores.",
  "React interfaces.",
  "WordPress sites.",
  "Shopify experiences.",
];

const STATS = [
  { value: projects.length, suffix: "", label: "Projects built" },
  { value: technologies.length, suffix: "+", label: "Technologies used" },
  { value: 3, suffix: "", label: "E-commerce platforms" },
  { value: 1, suffix: "+", label: "Year teaching WordPress" },
];

const STEPS = [
  { number: "01", title: "Understand", text: "I start with your goals, your audience and what the website needs to achieve." },
  { number: "02", title: "Design", text: "Clean layouts and a visual direction that fits your brand." },
  { number: "03", title: "Build", text: "Responsive, fast pages built with React, WordPress or Shopify." },
  { number: "04", title: "Launch", text: "Testing across devices, then a smooth launch and handover." },
];

const VALUES = [
  ["Responsive by default", "Every layout is built to feel right on phone, tablet and desktop."],
  ["User-focused", "Clear structure and simple interactions that help visitors act."],
  ["Always learning", "Growing in React, Python, databases and AI-powered apps."],
];

/* ---------- Typing effect ---------- */
function Typewriter({ words, speed = 70, deleteSpeed = 36, pause = 1700 }) {
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
function Magnetic({ children, strength = 0.28 }) {
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
function ScrollProgress() {
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
function ScrollMarquee({ text }) {
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
function CountUp({ to, suffix = "" }) {
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
function CopyEmail() {
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

function MarqueeRow({ reverse = false, dim = false }) {
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

function HomePage() {
  return (
    <>
      <ScrollProgress />

      {/* ============ HERO ============ */}
      <section className="relative mx-auto grid min-h-[calc(100vh-85px)] max-w-[1376px] items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-12 lg:py-24">
        <HeroNetwork />

        <div className="relative z-10">
          <div className="hero-intro mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] text-white/65 backdrop-blur sm:text-xs">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5ff4a] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c5ff4a]" />
            </span>
            OPEN TO WEB DEVELOPMENT OPPORTUNITIES
          </div>

          <p className="hero-intro mb-3 text-xs font-medium tracking-[0.2em] text-[#c5ff4a] sm:text-sm">
            HELLO, I'M {PROFILE.name.toUpperCase()}
          </p>

          <h1 className="hero-intro display-font text-6xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-7xl md:text-8xl xl:text-[108px]">
            Web
            <br />
            <span className="bg-gradient-to-r from-[#c5ff4a] to-[#eaffb0] bg-clip-text text-transparent">
              Developer
            </span>
            <span className="text-white">.</span>
          </h1>

          <h2 className="hero-intro mt-6 min-h-[2rem] text-lg font-medium tracking-tight text-white/70 sm:text-2xl">
            I build <Typewriter words={TYPED} />
          </h2>

          <p className="hero-intro mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
            Frontend, WordPress, Shopify and backend basics: I turn ideas into
            fast, responsive websites and e-commerce experiences people enjoy using.
          </p>

          <div className="hero-intro mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 rounded-full bg-[#c5ff4a] px-5 py-4 text-sm font-semibold !text-black shadow-[0_0_40px_rgba(197,255,74,0.25)] transition hover:bg-white hover:!text-black sm:px-6"
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

          <div className="hero-intro mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/40">
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

        <div className="hero-visual relative mx-auto flex aspect-square w-full max-w-[480px] items-center justify-center">
          <div className="absolute inset-[12%] rounded-full bg-[#c5ff4a]/10 blur-[90px]" />
          <div className="orbit-one absolute inset-[5%] rounded-full border border-dashed border-[#c5ff4a]/40" />
          <div className="orbit-two absolute inset-[13%] rounded-full border border-white/20" />

          <div className="absolute left-[12%] top-[20%] z-20 h-3 w-3 rounded-full bg-[#c5ff4a] shadow-[0_0_25px_#c5ff4a]" />
          <div className="floating-star absolute right-[13%] top-[16%] z-20 text-[#c5ff4a]">
            <Sparkles size={27} strokeWidth={1.2} />
          </div>

          <Tilt max={12} className="relative z-10 aspect-square w-[68%] rounded-full">
            <div className="portrait-frame relative aspect-square w-full overflow-hidden rounded-full border border-[#c5ff4a]/40 bg-[#111] shadow-[0_0_80px_rgba(197,255,74,0.12)]">
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

          <div className="floating-card absolute bottom-[9%] left-0 z-20 rounded-2xl border border-white/10 bg-[#111]/95 px-3 py-3 shadow-2xl backdrop-blur-xl sm:left-[-2%] sm:px-4">
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

          <div className="floating-card absolute right-0 top-[36%] z-20 rounded-xl border border-white/10 bg-[#111]/95 px-3 py-3 shadow-xl backdrop-blur-xl sm:right-[-2%]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#c5ff4a] shadow-[0_0_12px_#c5ff4a]" />
              <span className="text-[10px] font-medium text-white/80">Open to opportunities</span>
            </div>
          </div>
        </div>

        <a
          href="#technology"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/30 transition hover:text-[#c5ff4a] lg:flex"
        >
          Scroll to explore <ArrowDown size={13} />
        </a>
      </section>

      {/* ============ TECH MARQUEE (two rows) ============ */}
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
              className={`p-6 sm:p-9 ${i % 2 === 1 ? "border-l border-white/10" : ""} ${
                i > 1 ? "border-t border-white/10 lg:border-t-0" : ""
              } ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`}
            >
              <p className="display-font text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-white/40">{stat.label}</p>
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
            <p className="text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
              I'm a Lahore-based web developer interested in building clean,
              responsive and user-friendly digital products across web
              development and e-commerce.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm text-[#c5ff4a] transition hover:text-white"
            >
              More about me <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {VALUES.map(([title, text]) => (
            <Spotlight
              key={title}
              className="group border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#c5ff4a]/40 sm:p-7"
            >
              <span className="mb-5 block h-px w-10 bg-[#c5ff4a] transition-all duration-300 group-hover:w-16" />
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/45">{text}</p>
            </Spotlight>
          ))}
        </div>
      </section>

      <ScrollMarquee text="Design · Build · Deliver" />

      {/* ============ EXPERTISE ============ */}
      <section className="section-reveal border-y border-white/[0.07] bg-[#0b0b0b] px-5 py-24 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
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
              className="inline-flex items-center gap-2 text-sm text-[#c5ff4a] hover:text-white"
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <Spotlight
              key={step.number}
              className="group overflow-hidden border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#c5ff4a]/40 sm:p-7"
            >
              <span className="display-font text-6xl font-semibold tracking-[-0.06em] text-white/[0.07] transition-colors duration-300 group-hover:text-[#c5ff4a]/25">
                {step.number}
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/45">{step.text}</p>
            </Spotlight>
          ))}
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section className="section-reveal mx-auto max-w-[1376px] px-5 pb-24 sm:px-8 md:pb-28 lg:px-12">
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
            className="inline-flex items-center gap-2 text-sm text-[#c5ff4a] hover:text-white"
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

      {/* ============ FINAL CTA ============ */}
      <section className="section-reveal px-5 pb-24 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#c5ff4a]/20 bg-[#10130c] p-7 sm:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c5ff4a]/[0.12] blur-[90px]" />
          <div className="relative">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5ff4a]">
              <span className="h-2 w-2 rounded-full bg-[#c5ff4a]" />
              Have a project in mind?
            </p>
            <RevealText
              as="h2"
              className="display-font mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] sm:text-6xl"
            >
              Let's build something
              <span className="text-[#c5ff4a]"> meaningful</span>.
            </RevealText>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">
              Tell me about your website, online store or idea. Email is the
              easiest way to start.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[#c5ff4a] px-6 py-4 text-sm font-semibold !text-black transition hover:bg-white hover:!text-black"
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

function AboutPage() {
  return (
    <PageShell>
      <PageHeading
        eyebrow="About me"
        title={<>The person behind the <span className="text-white/40">pixels</span></>}
        description="A little about my background, interests and approach to creating useful digital experiences."
      />

      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="section-reveal">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
            <img
              src="/images/profile.png"
              alt="Shoaib Ajmal"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
            <MapPin size={14} className="text-[#c5ff4a]" />
            Based in Lahore, Pakistan
          </div>
        </div>

        <div className="section-reveal">
          <h2 className="display-font text-3xl leading-tight tracking-tight sm:text-4xl">
            Turning ideas into
            <span className="text-[#c5ff4a]"> useful digital </span>
            experiences.
          </h2>
          <p className="mt-6 text-sm leading-8 text-white/55 sm:text-base">
            I'm Shoaib Ajmal, a web developer interested in building clean,
            responsive and user-friendly websites. My work and learning
            experience span frontend development, WordPress, WooCommerce and
            Shopify e-commerce stores.
          </p>
          <p className="mt-5 text-sm leading-8 text-white/45 sm:text-base">
            I enjoy turning requirements into practical interfaces, improving
            website usability and exploring technologies that help solve
            real-world problems. I'm also developing my knowledge of Python,
            backend development, databases and AI-powered applications.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              ["My approach", "Practical, responsive and user-focused"],
              ["My interests", "Web development, e-commerce and AI"],
              ["My location", "Lahore, Pakistan"],
              ["My goal", "Keep learning and build useful products"],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
              >
                <p className="text-sm font-semibold text-[#c5ff4a]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-white/45">{detail}</p>
              </div>
            ))}
          </div>

          <Link
            to="/projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c5ff4a] px-5 py-3 text-sm font-semibold !text-black transition hover:bg-white hover:!text-black"
          >
            Explore my projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

function ExpertisePage() {
  return (
    <PageShell>
      <PageHeading
        eyebrow="Expertise & capabilities"
        title={<>Skills for building <span className="text-white/40">the web</span></>}
        description="A growing technical toolkit for creating websites, online stores and digital products. These categories reflect my learning and practical work."
      />

      <div className="section-reveal grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill) => (
          <SkillCard key={skill.number} skill={skill} />
        ))}
      </div>

      <div className="section-reveal mt-16 rounded-3xl border border-white/10 bg-[#0d0d0d] p-7 sm:p-10">
        <h2 className="display-font text-3xl tracking-tight sm:text-4xl">
          Technologies I work with<span className="text-[#c5ff4a]">.</span>
        </h2>
        <p className="mt-3 text-sm leading-7 text-white/45">
          Tools and technologies I have used, explored or included in my
          development learning journey.
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 text-xs text-white/65 transition hover:border-[#c5ff4a]/40 hover:text-[#c5ff4a]"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function ProjectsPage() {
  return (
    <PageShell>
      <PageHeading
        eyebrow="Selected projects"
        title={<>Work, ideas & <span className="text-white/40">experiments</span></>}
        description="A collection of e-commerce websites, frontend practice and an AI-powered legal technology prototype. Each project represents a different part of my development journey."
      />

      <div className="mb-8 flex flex-wrap items-center gap-3 text-xs text-white/40">
        <span className="rounded-full border border-white/10 px-3 py-2">
          {projects.length} projects
        </span>
        <span>Web development · E-commerce · AI</span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.number} project={project} />
        ))}
      </div>
    </PageShell>
  );
}

function ExperiencePage() {
  return (
    <PageShell>
      <PageHeading
        eyebrow="Experience"
        title={<>Learning by <span className="text-white/40">doing</span></>}
        description="Teaching, practical website development and continuous technical learning have helped shape my approach to building digital products."
      />

      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="section-reveal">
          <h2 className="display-font text-3xl leading-tight sm:text-4xl">
            Sharing knowledge.
            <br />
            <span className="text-[#c5ff4a]">Building skills.</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/45">
            My experience includes teaching WordPress fundamentals and
            working on website projects that strengthen my skills in layout,
            responsive design and e-commerce.
          </p>

          <a
            href="/Shoaib-Ajmal-CV.pdf"
            download="Shoaib-Ajmal-CV.pdf"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c5ff4a] px-5 py-3 text-sm font-semibold !text-black transition hover:bg-white hover:!text-black"
          >
            Download CV <ArrowDown size={16} />
          </a>
        </div>

        <div className="section-reveal space-y-5">
          {experience.map((item) => (
            <article
              key={item.role}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c5ff4a]/10 text-[#c5ff4a]">
                    <BriefcaseBusiness size={22} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.role}</h3>
                    <p className="mt-1 text-sm text-white/50">{item.company}</p>
                    <p className="mt-1 text-xs text-white/35">{item.location}</p>
                  </div>
                </div>
                <span className="h-fit w-fit rounded-full border border-white/10 px-3 py-2 text-xs text-white/45">
                  {item.period}
                </span>
              </div>

              <p className="mt-6 text-sm leading-7 text-white/55">
                {item.description}
              </p>

              <div className="mt-5 space-y-3">
                {item.points.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-sm text-white/45">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#c5ff4a]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="section-reveal mt-14 rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Ongoing development</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/50">
          Alongside my practical work, I continue developing projects with
          React, e-commerce tools and Python-based technologies to expand my
          technical knowledge.
        </p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 text-sm text-[#c5ff4a] hover:text-white"
        >
          See project work <ArrowRight size={16} />
        </Link>
      </div>
    </PageShell>
  );
}

function EducationPage() {
  return (
    <PageShell>
      <PageHeading
        eyebrow="Education"
        title={<>My learning <span className="text-white/40">journey</span></>}
        description="My academic background and continued learning in information technology and computer science."
      />

      <div className="section-reveal grid gap-4 md:grid-cols-2">
        {education.map((item, index) => (
          <article
            key={item.title}
            className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#c5ff4a]/20 bg-[#c5ff4a]/[0.06] text-sm font-semibold text-[#c5ff4a]">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold">{item.title}</h2>
                <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/40">
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/55">
                {item.institution}
              </p>
              <p className="mt-1 text-xs text-white/35">{item.detail}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="section-reveal mt-12 flex flex-col gap-5 rounded-3xl border border-[#c5ff4a]/15 bg-[#10130c] p-7 sm:flex-row sm:items-center sm:p-9">
        <GraduationCap size={38} strokeWidth={1.2} className="shrink-0 text-[#c5ff4a]" />

        <div className="flex-1">
          <h2 className="text-lg font-semibold">Learning never stops.</h2>
          <p className="mt-2 text-sm leading-7 text-white/50">
            I continue to improve my development skills through practical
            projects, experimentation and exploring new technologies.
          </p>
        </div>

        <a
          href="/Shoaib-Ajmal-CV.pdf"
          download="Shoaib-Ajmal-CV.pdf"
          className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full bg-[#c5ff4a] px-5 py-3 text-sm font-semibold !text-black transition hover:bg-white hover:!text-black"
        >
          Download CV <ArrowDown size={16} />
        </a>
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell>
      <PageHeading
        eyebrow="Contact"
        title={<>Let's make something <span className="text-white/40">useful</span></>}
        description="Have a website, e-commerce project or collaboration in mind? Reach out using the contact details below."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div className="section-reveal rounded-3xl border border-[#c5ff4a]/20 bg-[#10130c] p-7 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c5ff4a]">
            Start a conversation
          </p>
          <h2 className="display-font mt-5 text-4xl leading-tight tracking-tight sm:text-5xl">
            Have an idea?
            <br />
            Let's discuss it.
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/50">
            Tell me about your website, online store or development project.
            Email is the easiest way to get in touch.
          </p>
          <a
            href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Let's discuss a project")}`}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#c5ff4a] px-6 py-4 text-sm font-semibold !text-black transition hover:bg-white hover:!text-black"
          >
            Email me <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="section-reveal space-y-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-[#c5ff4a]/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#c5ff4a]">
              <Mail size={19} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-white/40">Email</span>
              <span className="mt-1 block break-all text-sm text-white/80">
                {PROFILE.email}
              </span>
            </span>
            <ArrowUpRight size={17} className="shrink-0 text-white/30 group-hover:text-[#c5ff4a]" />
          </a>

          <a
            href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-[#c5ff4a]/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#c5ff4a]">
              <Phone size={19} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-white/40">Phone</span>
              <span className="mt-1 block text-sm text-white/80">{PROFILE.phone}</span>
            </span>
            <ArrowUpRight size={17} className="shrink-0 text-white/30 group-hover:text-[#c5ff4a]" />
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-[#c5ff4a]/40"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-[#c5ff4a]">
              <ExternalLink size={19} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-white/40">LinkedIn</span>
              <span className="mt-1 block text-sm text-white/80">Connect with me</span>
            </span>
            <ArrowUpRight size={17} className="shrink-0 text-white/30 group-hover:text-[#c5ff4a]" />
          </a>

          <div className="flex items-center gap-3 px-2 pt-3 text-xs text-white/40">
            <MapPin size={15} className="text-[#c5ff4a]" />
            {PROFILE.location}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function PageShell({ children }) {
  return (
    <main className="mx-auto min-h-[65vh] max-w-[1376px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      {children}
    </main>
  );
}

function WhatsAppChat() {
  const phoneNumber = "923008034037"; // Apna WhatsApp number yahan likhein
  const message = "Hi Shoaib! I visited your portfolio and would like to discuss a project.";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with me on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-3 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full border border-[#c5ff4a]/40 bg-[#c5ff4a] text-black shadow-[0_8px_30px_rgba(197,255,74,0.25)] transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_35px_rgba(197,255,74,0.45)] sm:bottom-8 sm:right-8"
    >
      <MessageCircle size={27} strokeWidth={2.2} />

      <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#111] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-300 hover:opacity-100">
        Chat with me
      </span>

      <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-[#080808] bg-green-500" />
    </a>
  );
}

function PortfolioApp() {
  const [isLoading, setIsLoading] = useState(true);
  const rootRef = useRef(null);
  const location = useLocation();

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    if (isLoading || !rootRef.current) return undefined;

    const root = rootRef.current;
    const cleanups = [];
    let refreshFrame;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-intro",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.1,
          clearProps: "transform",
        }
      );

      gsap.fromTo(
        ".hero-visual",
        { scale: 0.94, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.25,
        }
      );

      gsap.fromTo(
        ".portrait-frame",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.35,
          ease: "power3.out",
        }
      );

      gsap.utils.toArray(".section-reveal", root).forEach((section, index) => {
        let fromX = 0;
        let fromY = 55;

        if (section.classList.contains("reveal-left")) {
          fromX = -70;
          fromY = 0;
        } else if (section.classList.contains("reveal-right")) {
          fromX = 70;
          fromY = 0;
        } else {
          const direction = index % 3;

          if (direction === 1) {
            fromX = -45;
            fromY = 15;
          } else if (direction === 2) {
            fromX = 45;
            fromY = 15;
          }
        }

        gsap.fromTo(
          section,
          { opacity: 0, x: fromX, y: fromY },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "bottom 12%",
              toggleActions: "play reverse play reverse",
              invalidateOnRefresh: true,
            },
          }
        );
      });

      gsap.utils.toArray(".project-card", root).forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: (index % 4) * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "bottom 8%",
              toggleActions: "play reverse play reverse",
              invalidateOnRefresh: true,
            },
          }
        );
      });

      gsap.utils.toArray(".skill-card", root).forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay: (index % 3) * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play reverse play reverse",
              invalidateOnRefresh: true,
            },
          }
        );

        const onEnter = () => {
          gsap.to(card, {
            y: -5,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
          gsap.killTweensOf(card);
        });
      });

      gsap.to(".orbit-one", {
        rotate: 360,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".orbit-two", {
        rotate: -360,
        duration: 36,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".floating-star", {
        y: -12,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".floating-card", {
        y: -8,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
      });
    }, root);

    refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshFrame);
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [isLoading, location.pathname]);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        id="top"
        ref={rootRef}
        className="min-h-screen overflow-x-clip bg-[#080808] text-white selection:bg-[#c5ff4a] selection:text-black"
      >
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PortfolioApp />
      <WhatsAppChat />
      <SmoothScroll />
      <CustomCursor />
    </BrowserRouter>
  );
}
