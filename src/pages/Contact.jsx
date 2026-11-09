import { ArrowUpRight, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { PageShell, PageHeading } from "../components/Layout";
import { PROFILE } from "../data/profile";

export default function ContactPage() {
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
