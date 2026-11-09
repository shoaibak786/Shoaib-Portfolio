import { PageShell, PageHeading } from "../components/Layout";
import { ProjectCard } from "../components/Cards";
import { projects } from "../data/content";

export default function ProjectsPage() {
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
