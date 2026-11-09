import { Quote } from "lucide-react";
import { SectionLabel } from "./Layout";

// items khali hon to ye section nazar hi nahi aata
export default function Testimonials({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="section-reveal mx-auto max-w-[1376px] px-5 pb-24 sm:px-8 md:pb-28 lg:px-12">
      <SectionLabel number="05">Kind words</SectionLabel>
      <h2 className="display-font mb-10 max-w-2xl text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
        What people say<span className="text-[#c5ff4a]">.</span>
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.name}
            className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-colors duration-300 hover:border-[#c5ff4a]/40"
          >
            <div>
              <Quote size={26} strokeWidth={1.4} className="text-[#c5ff4a]" />
              <blockquote className="mt-5 text-sm leading-7 text-white/65">
                {t.quote}
              </blockquote>
            </div>
            <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.08] pt-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c5ff4a]/10 text-xs font-semibold text-[#c5ff4a]">
              {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{t.name}</span>
                <span className="block text-xs text-white/40">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
