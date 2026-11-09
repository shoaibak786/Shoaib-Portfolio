import { ArrowDown, GraduationCap } from "lucide-react";
import { PageShell, PageHeading } from "../components/Layout";
import { education } from "../data/content";

export default function EducationPage() {
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
