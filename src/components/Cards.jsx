import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";

export function ProjectCard({ project }) {
  const Icon = project.icon;

  return (
    <article className="project-card group overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] transition-colors duration-300 hover:border-white/25">
      <div
        className="relative m-3 flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[1.3rem] p-6 sm:min-h-[290px] sm:p-8"
        style={{
          background: `radial-gradient(circle at 80% 15%, ${project.accent}25, transparent 35%), linear-gradient(135deg, #181818, #0c0c0c 75%)`,
        }}
      >
        {project.image && (
          <>
            <img
              src={project.image}
              alt={`${project.name} preview`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />
          </>
        )}

        <div className="relative z-10 flex items-center justify-between">
          <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-white/60">
            {project.type}
          </span>
          <span className="text-xs text-white/35">{project.number} / 06</span>
        </div>

        {!project.image && (
          <>
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

          </>
        )}

        <div className="absolute bottom-5 right-5 z-10 text-[10px] uppercase tracking-[0.15em] text-white/35">
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

export function SkillCard({ skill }) {
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
