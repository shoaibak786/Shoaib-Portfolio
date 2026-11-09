import { PageShell, PageHeading } from "../components/Layout";
import { SkillCard } from "../components/Cards";
import { skills } from "../data/content";
import { technologies } from "../data/profile";

export default function ExpertisePage() {
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
