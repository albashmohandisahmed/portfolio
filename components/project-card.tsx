"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ExternalLink,
  FileText,
  GitBranch,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { projects } from "@/data/portfolio";
import { getProjectImageUrl } from "@/components/project-utils";

export { getProjectImageUrl };

type Project = (typeof projects)[number];

export function ProjectVisual({
  imageUrl,
  title,
  category,
}: {
  imageUrl?: string;
  title: string;
  category?: string;
}) {
  const safeImageUrl = imageUrl ? encodeURI(imageUrl) : null;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl border-b border-white/10 bg-slate-950 group/img">
      {safeImageUrl ? (
        <img
          src={safeImageUrl}
          alt={`${title} dashboard preview`}
          className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover/img:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 p-6">
          <BarChart3 className="h-16 w-16 text-cyan-400/40 animate-pulse" />
        </div>
      )}

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover/img:opacity-60 transition-opacity" />

      {/* Top badges bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-slate-950/80 px-3 py-1 text-[0.68rem] font-mono font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-md shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span>Live Preview</span>
        </div>

        {category && (
          <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-2.5 py-0.5 text-[0.68rem] font-mono font-bold text-purple-300 backdrop-blur-md">
            {category}
          </span>
        )}
      </div>

      {/* Bottom title overlay */}
      <div className="absolute bottom-3 left-4 right-4 z-10">
        <p className="text-xs font-mono font-medium text-cyan-300/90 tracking-wide uppercase">
          Dashboard Case Study
        </p>
        <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-md truncate">
          {title}
        </h3>
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const reportHref = project.reportUrl ?? project.demo;
  const reportLabel = project.reportUrl ? "PDF Report" : "Live Demo";
  const imageUrl = getProjectImageUrl(project);

  // Category badge colors
  let categoryBadgeClass = "border-cyan-400/30 bg-cyan-400/10 text-cyan-300";
  if (project.category === "Power BI") {
    categoryBadgeClass = "border-amber-400/30 bg-amber-400/10 text-amber-300";
  } else if (project.category === "Tableau") {
    categoryBadgeClass = "border-purple-400/30 bg-purple-400/10 text-purple-300";
  } else if (project.category === "Excel") {
    categoryBadgeClass = "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  return (
    <article
      className="project-card-item group flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 shadow-xl"
    >
      <div>
        <Link href={`/projects/${project.slug}`}>
          <ProjectVisual
            imageUrl={imageUrl}
            title={project.title}
            category={project.category}
          />
        </Link>

        <div className="p-5 sm:p-6 space-y-4">
          {/* Header Tag + Title */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span
                className={`rounded-md border px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider ${categoryBadgeClass}`}
              >
                {project.category}
              </span>
              <span className="text-[0.68rem] font-mono text-slate-400">
                #{String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <Link href={`/projects/${project.slug}`}>
              <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {project.title}
              </h2>
            </Link>
          </div>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
            {project.summary}
          </p>

          {/* Key Verified Metrics Strip */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-1.5">
              {project.metrics.slice(0, 3).map((metric) => (
                <span
                  key={metric}
                  className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[0.72rem] font-semibold text-emerald-300"
                >
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span>{metric}</span>
                </span>
              ))}
            </div>
          )}

          {/* Technologies Stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[0.68rem] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="p-5 sm:p-6 pt-0 mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-4">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400 px-4 py-2 text-xs font-mono font-bold text-slate-950 transition hover:bg-white hover:shadow-[0_0_15px_rgba(0,217,255,0.6)]"
        >
          <span>Case Study</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <div className="flex items-center gap-2">
          {reportHref && (
            <Link
              href={reportHref}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 transition"
              title={reportLabel}
            >
              <FileText className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{reportLabel}</span>
            </Link>
          )}

          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-2 text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 transition"
              title="GitHub Repository"
            >
              <GitBranch className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
