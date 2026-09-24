import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Database,
  ExternalLink,
  FileCheck2,
  GitBranch,
  Layers,
  LineChart,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { PageVideoShell } from "@/components/page-video-shell";
import { ProjectVisual } from "@/components/project-card";
import { getProjectImageUrl } from "@/components/project-utils";
import { SectionReveal } from "@/components/section-reveal";
import { FlowDiagram } from "@/components/data-flow";
import { AnimatedBars } from "@/components/scenario-panels";
import { projects } from "@/data/portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project
    ? { title: `${project.title} | Case Study`, description: project.summary }
    : {};
}

function GradientTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-b from-slate-50 via-slate-200 to-cyan-300 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const reportHref = project.reportUrl ?? project.demo;
  const reportLabel = project.reportUrl ? "Open PDF Report" : "Live Demo";
  const imageUrl = getProjectImageUrl(project);

  const details = [
    ["Dataset & Data Model", project.dataset],
    ["Data Cleaning & Preprocessing", project.preprocessing],
    [
      "Exploratory Data Analysis",
      "Segmented distributions, cohort behavior, anomaly detection, metric drivers, and executive summary highlights.",
    ],
    ["Model Architecture & DAX Measures", project.architecture],
    ["Validation & Testing", project.evaluation],
    ["Business Impact & Value", project.impact],
    ["Challenges & Key Takeaways", project.challenges],
  ];

  return (
    <PageVideoShell poster="/05-featured-projects.jpg" video="/videos/Projects.mp4">
      <div className="relative w-full pt-28 pb-24">
        {/* Top Back Link + Hero Header */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 hover:text-white transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Projects</span>
          </Link>

          <div className="grid gap-8 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <SectionReveal className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{project.category} Case Study</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                <GradientTitle>{project.title}</GradientTitle>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {project.summary}
              </p>

              {/* Technologies strip */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-cyan-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-wrap gap-4">
                {reportHref && (
                  <Link
                    href={reportHref}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-xs font-mono font-bold text-slate-950 transition hover:bg-white hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]"
                  >
                    <FileCheck2 className="h-4 w-4" />
                    <span>{reportLabel}</span>
                  </Link>
                )}

                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-mono text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 transition"
                  >
                    <GitBranch className="h-4 w-4" />
                    <span>GitHub Repository</span>
                  </Link>
                )}
              </div>
            </SectionReveal>

            {/* Right Dashboard Visual Card */}
            <SectionReveal delay={0.1} className="lg:col-span-6">
              <div className="rounded-3xl border border-cyan-400/30 bg-slate-900/80 backdrop-blur-2xl overflow-hidden shadow-2xl">
                <ProjectVisual
                  imageUrl={imageUrl}
                  title={project.title}
                  category={project.category}
                />
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            KEY VERIFIED METRICS STRIP
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.metrics.map((metric) => (
              <SectionReveal
                key={metric}
                className="p-6 rounded-2xl border border-emerald-400/30 bg-slate-900/80 backdrop-blur-xl shadow-xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-emerald-400">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    Verified KPI Metric
                  </span>
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-black text-white tracking-tight">
                    {metric}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 font-mono">
                    Validated Business Output
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PROBLEM, APPROACH & RESULT GRID
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <SectionReveal className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              Executive Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-8">
              Problem, Approach &amp; Deliverables
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                  01 / Problem
                </span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">
                  Business Challenge
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                  02 / Approach
                </span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">
                  Analytical Solution
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.approach}
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  03 / Result
                </span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">
                  Delivered Impact
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.result}
                </p>
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            TECHNICAL DETAILS & PIPELINE
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {details.map(([title, copy]) => (
              <SectionReveal
                key={title}
                className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-xl space-y-3"
              >
                <div className="flex items-center gap-2 text-cyan-300">
                  <CheckCircle2 className="h-4 w-4" />
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{copy}</p>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal className="mt-8">
            <FlowDiagram title={`${project.title}: End-to-End Pipeline`} />
          </SectionReveal>
        </section>
      </div>
    </PageVideoShell>
  );
}
