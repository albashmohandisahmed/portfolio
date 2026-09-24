"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileCheck2,
  GitBranch,
  Grid,
  HeartHandshake,
  Layers,
  LineChart,
  ListFilter,
  Mail,
  Rocket,
  Search,
  Sparkles,
  TrendingUp,
  Workflow,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageVideoShell } from "@/components/page-video-shell";
import { getProjectImageUrl } from "@/components/project-card";
import { DataPipelineFlow } from "@/components/data-flow";
import { MagneticButton } from "@/components/magnetic-button";
import { experiences, profile, projects } from "@/data/portfolio";
import { cn } from "@/components/utils";

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

function Kicker({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-300 backdrop-blur-md">
      <Icon className="h-3.5 w-3.5 text-cyan-300" />
      <span>{label}</span>
    </div>
  );
}

export function ExperiencePageClient() {
  const [activeTab, setActiveTab] = useState<"All" | "Power BI" | "Tableau" | "Excel">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline");
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = timelineRef.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(".exp-timeline-item");
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [viewMode, activeTab, searchQuery]);

  // Filtered timeline projects
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesTab = activeTab === "All" || item.category === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.technologies.some((t) => t.toLowerCase().includes(q)) ||
        item.metrics.some((m) => m.toLowerCase().includes(q));

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <PageVideoShell poster="/07-experience-skills.jpg" video="/videos/Experience.mp4">
      <div className="relative w-full pt-28 pb-24 overflow-hidden">
        {/* Background Ambient Glows */}
        <div
          className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[150px] -z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-[45%] right-10 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[140px] -z-10"
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — HERO HEADER & IMPACT STATS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mb-4">
            <Kicker icon={Briefcase} label="04 / Applied Experience · Analytics Process" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl drop-shadow-2xl">
            <GradientTitle>Analytics Project Experience</GradientTitle>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            End-to-end Business Intelligence projects delivered on real operational datasets—from SQL querying and Power Query ETL to DAX measures and executive dashboard reporting.
          </p>

          {/* Impact Stats Grid */}
          <div className="mt-8 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="p-4 rounded-2xl border border-cyan-400/30 bg-slate-900/80 backdrop-blur-xl shadow-lg hover:border-cyan-400/60 transition">
              <span className="block text-2xl font-black text-white">1.74M</span>
              <span className="text-xs font-mono text-cyan-300 font-semibold">Calls Processed</span>
            </div>
            <div className="p-4 rounded-2xl border border-purple-400/30 bg-slate-900/80 backdrop-blur-xl shadow-lg hover:border-purple-400/60 transition">
              <span className="block text-2xl font-black text-white">1,480</span>
              <span className="text-xs font-mono text-purple-300 font-semibold">HR Records Analyzed</span>
            </div>
            <div className="p-4 rounded-2xl border border-emerald-400/30 bg-slate-900/80 backdrop-blur-xl shadow-lg hover:border-emerald-400/60 transition">
              <span className="block text-2xl font-black text-white">1.1M</span>
              <span className="text-xs font-mono text-emerald-300 font-semibold">Sales Volume Reported</span>
            </div>
            <div className="p-4 rounded-2xl border border-amber-400/30 bg-slate-900/80 backdrop-blur-xl shadow-lg hover:border-amber-400/60 transition">
              <span className="block text-2xl font-black text-white">91.06%</span>
              <span className="text-xs font-mono text-amber-300 font-semibold">SLA Target Met</span>
            </div>
          </div>

          {/* Workflow Pipeline Banner */}
          <div className="mt-10 w-full max-w-5xl">
            <DataPipelineFlow
              compact
              stages={[
                {
                  key: "collect",
                  label: "01. Business Framing",
                  detail: "Identify stakeholder questions, query SQL databases, and define target KPIs.",
                  signal: "scope",
                },
                {
                  key: "clean",
                  label: "02. ETL & Modeling",
                  detail: "Transform data in Power Query, build star schemas, and author DAX measures.",
                  signal: "system",
                },
                {
                  key: "deploy",
                  label: "03. Dashboard Visuals",
                  detail: "Design executive dashboards in Power BI, Tableau, and Excel with interactive slicers.",
                  signal: "release",
                },
                {
                  key: "output",
                  label: "04. Insight Delivery",
                  detail: "Communicate findings, publish PDF documentation, and measure operational lift.",
                  signal: "growth",
                },
              ]}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — PRACTICAL EXPERIENCE MILESTONES (NO IMAGES HERE)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="mb-8 text-center max-w-3xl mx-auto">
            <Kicker icon={Rocket} label="Domain Milestones" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              <GradientTitle>Core Experience Summary</GradientTitle>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              High-impact analytics milestones delivered across Call Center, HR Attrition, and Retail Sales domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, idx) => (
              <div
                key={exp.company}
                className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-xl hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs font-bold text-cyan-300">
                      {exp.period}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Phase 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {exp.role}
                    </h3>
                    <p className="text-xs font-mono font-bold text-purple-300 mt-1">
                      {exp.company}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {exp.summary}
                  </p>

                  <div className="space-y-2 pt-2">
                    <p className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-cyan-400">
                      Verified Accomplishments:
                    </p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {exp.achievements.map((ach) => (
                        <li key={ach} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[0.68rem] font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 — SINGLE SEARCHABLE PORTFOLIO TIMELINE & GRID
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-24" ref={timelineRef}>
          <div className="mb-4 text-center max-w-3xl mx-auto">
            <Kicker icon={Workflow} label="Portfolio Timeline &amp; Case Studies" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
              <GradientTitle>Interactive Project Showcase</GradientTitle>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Browse all 8 dashboard case studies with search, tool filters, live preview cards, and report downloads.
            </p>
          </div>

          <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-xl mt-8">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search experience timeline by keyword (e.g. Call Center, Sales, DAX, Excel)..."
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/60 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <div className="flex rounded-xl border border-white/10 bg-slate-950 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("timeline")}
                  className={cn(
                    "p-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5",
                    viewMode === "timeline"
                      ? "bg-cyan-400 text-slate-950"
                      : "text-slate-400 hover:text-white"
                  )}
                  title="Timeline View"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Timeline</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5",
                    viewMode === "grid"
                      ? "bg-cyan-400 text-slate-950"
                      : "text-slate-400 hover:text-white"
                  )}
                  title="Grid View"
                >
                  <Grid className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Category Tabs */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="tablist">
              {(["All", "Power BI", "Tableau", "Excel"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-mono font-semibold transition-all",
                    activeTab === tab
                      ? "border-cyan-400 bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(0,217,255,0.4)]"
                      : "border-white/10 bg-slate-900/80 text-slate-300 hover:border-cyan-400/40 hover:text-white"
                  )}
                  aria-pressed={activeTab === tab}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-slate-400">
              Showing <strong className="text-cyan-300">{filteredProjects.length}</strong> Portfolio Projects
            </div>
          </div>

          {/* Timeline View */}
          {filteredProjects.length > 0 ? (
            viewMode === "timeline" ? (
              <div className="relative pl-6 sm:pl-10 border-l-2 border-cyan-400/30 space-y-12">
                {filteredProjects.map((item, index) => {
                  const imageUrl = getProjectImageUrl(item);
                  const safeImageUrl = encodeURI(imageUrl);
                  const reportHref = item.reportUrl ?? item.demo;

                  return (
                    <div key={item.slug} className="exp-timeline-item relative group">
                      {/* Timeline Node Dot */}
                      <div className="absolute -left-[31px] sm:-left-[47px] top-6 h-4 w-4 rounded-full border-2 border-cyan-400 bg-slate-950 shadow-[0_0_15px_rgba(0,217,255,0.8)] group-hover:scale-125 transition-transform" />

                      {/* Card Container */}
                      <article className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl hover:border-cyan-400/40 transition-all duration-300">
                        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                          {/* Left Dashboard Image */}
                          <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-950 border-b lg:border-b-0 lg:border-r border-white/10">
                            <img
                              src={safeImageUrl}
                              alt={`${item.title} dashboard preview`}
                              className="h-full w-full object-cover object-top group-hover:scale-105 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                            <div className="absolute top-4 left-4">
                              <span className="rounded-full border border-cyan-400/30 bg-slate-950/80 px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
                                {item.category}
                              </span>
                            </div>
                          </div>

                          {/* Right Details */}
                          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="text-xs font-mono font-bold text-cyan-400">
                                  Portfolio Case Study #{String(index + 1).padStart(2, "0")}
                                </span>
                              </div>

                              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                                {item.title}
                              </h2>

                              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                                {item.summary}
                              </p>

                              {/* Metrics Pills */}
                              {item.metrics && (
                                <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {item.metrics.slice(0, 3).map((metric) => (
                                    <div
                                      key={metric}
                                      className="flex items-center gap-2 p-2.5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 text-xs font-semibold"
                                    >
                                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                                      <span className="truncate">{metric}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Technologies */}
                              <div className="mt-4 flex flex-wrap gap-1.5">
                                {item.technologies.map((t) => (
                                  <span
                                    key={t}
                                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[0.68rem] font-mono text-slate-300"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Action buttons */}
                            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                              <Link
                                href={`/projects/${item.slug}`}
                                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400 px-4.5 py-2 text-xs font-mono font-bold text-slate-950 transition hover:bg-white hover:shadow-[0_0_15px_rgba(0,217,255,0.6)]"
                              >
                                <span>Read Case Study</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>

                              {reportHref && (
                                <Link
                                  href={reportHref}
                                  target="_blank"
                                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-mono text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 transition"
                                >
                                  <FileCheck2 className="h-3.5 w-3.5 text-cyan-400" />
                                  <span>View PDF Report</span>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((item, index) => {
                  const imageUrl = getProjectImageUrl(item);
                  const safeImageUrl = encodeURI(imageUrl);
                  const reportHref = item.reportUrl ?? item.demo;

                  return (
                    <article
                      key={item.slug}
                      className="exp-timeline-item overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-white/10">
                          <img
                            src={safeImageUrl}
                            alt={`${item.title} preview`}
                            className="h-full w-full object-cover object-top group-hover:scale-105 transition duration-700"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="rounded-full border border-cyan-400/30 bg-slate-950/80 px-2.5 py-0.5 font-mono text-[0.65rem] font-bold uppercase text-cyan-300">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 space-y-3">
                          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                            {item.summary}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {item.metrics.slice(0, 2).map((m) => (
                              <span
                                key={m}
                                className="rounded bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 text-[0.68rem] font-semibold text-emerald-300"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 flex items-center justify-between gap-2 border-t border-white/10 mt-4 pt-4">
                        <Link
                          href={`/projects/${item.slug}`}
                          className="inline-flex items-center gap-1 rounded-full bg-cyan-400 px-3.5 py-1.5 text-xs font-mono font-bold text-slate-950 transition hover:bg-white"
                        >
                          <span>Case Study</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                        {reportHref && (
                          <Link
                            href={reportHref}
                            target="_blank"
                            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-cyan-300"
                          >
                            <FileCheck2 className="h-3.5 w-3.5 text-cyan-400" />
                            <span>Report</span>
                          </Link>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )
          ) : (
            <div className="text-center py-16 p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
              <p className="text-lg font-bold text-white">
                No project matched &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("All");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-xs font-mono font-semibold text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 transition"
              >
                Reset Search &amp; Filters
              </button>
            </div>
          )}
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4 — RECRUITER / CAREER CTA BANNER (NO DUPLICATE CARDS)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
          <div className="p-8 sm:p-12 rounded-3xl border border-cyan-400/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-2xl shadow-2xl text-center flex flex-col items-center">
            <Kicker icon={HeartHandshake} label="Work With Ahmed" />

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-4 max-w-3xl">
              Looking for a Data &amp; BI Analyst for your team?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Open for Data Analyst and Business Intelligence Analyst positions (Remote &amp; On-Site in Cairo, Egypt).
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton href={profile.resumeUrl} target="_blank">
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </span>
              </MagneticButton>
              <MagneticButton href={`mailto:${profile.email}`} variant="secondary">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Get in Touch</span>
                </span>
              </MagneticButton>
            </div>
          </div>
        </section>
      </div>
    </PageVideoShell>
  );
}
