import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { PageShell, PageHeading } from "../components/Layout";

export default function AboutPage() {
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
