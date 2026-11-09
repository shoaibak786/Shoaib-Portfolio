import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { PageShell, PageHeading } from "../components/Layout";
import { experience } from "../data/content";

export default function ExperiencePage() {
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
