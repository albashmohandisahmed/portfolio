import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getProjectImageUrl } from "@/components/project-card";
import { projects } from "@/data/portfolio";
import { SectionReveal } from "@/components/section-reveal";

export function ProjectShowcase({
  description = "A visual index of Ahmed's portfolio projects with dashboard previews, tools, and key signals.",
  title = "Portfolio project proof.",
}: {
  description?: string;
  title?: string;
}) {
  return (
    <section className="container-shell pb-24">
      <SectionReveal>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-kicker">Projects</span>
            <h2 className="text-3xl font-semibold text-white">{title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
          </div>
          <Link href="/projects" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 hover:text-cyan-100">
            <ExternalLink className="h-4 w-4" /> Open all case studies
          </Link>
        </div>
      </SectionReveal>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {projects.map((project, index) => (
          <SectionReveal key={project.slug} delay={(index % 4) * 0.04} className="glass-panel group overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:border-cyan-200/30">
            <Link href={`/projects/${project.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#07111e]">
                <img src={encodeURI(getProjectImageUrl(project))} alt={`${project.title} dashboard preview`} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060a]/76 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[.16em] text-cyan-100">{project.category}</span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-white">{project.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-300">{project.metrics.join(" | ")}</p>
              </div>
            </Link>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
