import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ArrowDown, ArrowUpRight, ExternalLink, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { PROFILE, navLinks } from "../data/profile";

export function SectionLabel({ number, children }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
      <span className="text-[#c5ff4a]">{number}</span>
      <span>{children}</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export function PageHeading({ eyebrow, title, description }) {
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

export function PageShell({ children }) {
  return (
    <main className="mx-auto min-h-[65vh] max-w-[1376px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      {children}
    </main>
  );
}

export function Header() {
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

export function Footer() {
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
