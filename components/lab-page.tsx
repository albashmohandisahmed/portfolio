"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileCheck2,
  FileSpreadsheet,
  Filter,
  Headphones,
  LineChart,
  Mail,
  Network,
  Rocket,
  Search,
  Sparkles,
  Table,
  Terminal,
  TrendingUp,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import { PageVideoShell } from "@/components/page-video-shell";
import { SectionReveal } from "@/components/section-reveal";
import { profile, projects } from "@/data/portfolio";
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

const commandCards = [
  {
    icon: Headphones,
    label: "Call Center Operations Lab",
    value: "1.74M Offered Calls",
    detail: "Modeled SLA (91.06%), abandonment (1.32%), ASA (9.22s), forecast accuracy (71.60%), and agent performance across 16 channels.",
    color: "#00d9ff",
    glow: "from-cyan-500/10 to-transparent",
    tool: "Power BI & DAX",
  },
  {
    icon: Users,
    label: "HR Workforce Analytics Lab",
    value: "1,480 Employees Studied",
    detail: "Segmented 238 departures across role, age band (35.77% in 18-25 group), and job satisfaction metrics for retention strategy.",
    color: "#8757ff",
    glow: "from-purple-500/10 to-transparent",
    tool: "Tableau & Storytelling",
  },
  {
    icon: FileSpreadsheet,
    label: "Retail & Sales Command",
    value: "1.1M Sales Volume",
    detail: "Analyzed 109 orders, 10,478 avg selling price, regional trends, customer type contribution, and 69.72% on-time delivery status.",
    color: "#5fffd2",
    glow: "from-emerald-500/10 to-transparent",
    tool: "Excel & Power Query",
  },
  {
    icon: BarChart3,
    label: "BI Semantic Architecture",
    value: "8 Star Schema Models",
    detail: "DAX time-intelligence, Power Query ETL pipelines, facts & dimension relationships, pivot summaries, and executive dashboard design.",
    color: "#fbbf24",
    glow: "from-amber-500/10 to-transparent",
    tool: "Full BI Stack",
  },
];

const labProtocolSteps = [
  {
    step: "01",
    title: "Business Problem & KPI Framing",
    desc: "Collaborate with business stakeholders to define objectives, metrics, SLA targets, and decision questions before writing queries.",
    icon: Network,
    color: "text-cyan-400",
  },
  {
    step: "02",
    title: "Data Validation & Power Query ETL",
    desc: "Query databases (SQL), inspect schemas, handle missing values, standardize columns, and remove duplicates.",
    icon: Workflow,
    color: "text-purple-400",
  },
  {
    step: "03",
    title: "Star Schema & DAX Modeling",
    desc: "Establish fact/dimension relationships, build calendar tables, and author reusable DAX time-intelligence calculations.",
    icon: Database,
    color: "text-emerald-400",
  },
  {
    step: "04",
    title: "Executive Visual Design",
    desc: "Design interactive Power BI, Tableau, and Excel dashboards featuring clean typography, slicers, and drill-through pages.",
    icon: LineChart,
    color: "text-amber-400",
  },
  {
    step: "05",
    title: "Insight Communication & PDF Reports",
    desc: "Deliver executive summaries, publish PDF reports, and present actionable findings to decision makers.",
    icon: CheckCircle2,
    color: "text-cyan-300",
  },
];

export function LabPageClient() {
  const [activeTool, setActiveTool] = useState<"All" | "Power BI" | "Tableau" | "Excel">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesTool = activeTool === "All" || p.category === activeTool;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.dataset.toLowerCase().includes(q) ||
        p.metrics.some((m) => m.toLowerCase().includes(q)) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesTool && matchesSearch;
    });
  }, [activeTool, searchQuery]);

  return (
    <PageVideoShell poster="/02-data-science.jpg" video="/videos/Lab.mp4">
      <div className="relative w-full pt-28 pb-24 overflow-hidden">
        {/* Ambient Glows */}
        <div
          className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[150px] -z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-[40%] right-10 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[140px] -z-10"
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — HERO HEADER & COMMAND CARDS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mb-4">
            <Kicker icon={Cpu} label="Data &amp; Analytics Command Center" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl drop-shadow-2xl">
            <GradientTitle>Data &amp; Analytics Lab</GradientTitle>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            A real-time evidence hub showcasing dataset scale, BI architecture, verified metrics, and 5-step analytical methodology.
          </p>

          {/* 4 Lab Command Cards */}
          <div className="mt-10 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {commandCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className={`p-6 rounded-2xl border border-white/10 bg-gradient-to-b ${c.glow} bg-slate-900/80 backdrop-blur-xl shadow-xl hover:border-cyan-400/40 transition-all flex flex-col justify-between group`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="p-2.5 rounded-xl border border-white/10 flex-shrink-0"
                        style={{ color: c.color, backgroundColor: `${c.color}15` }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[0.65rem] font-bold text-slate-300">
                        {c.tool}
                      </span>
                    </div>

                    <p className="text-[0.68rem] font-mono font-bold uppercase tracking-wider text-slate-400">
                      {c.label}
                    </p>
                    <h2 className="text-xl font-black text-white mt-1 group-hover:text-cyan-300 transition-colors">
                      {c.value}
                    </h2>
                  </div>

                  <p className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-300 leading-relaxed">
                    {c.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — SEARCHABLE DATASET MATRIX & PROTOCOL PIPELINE
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Interactive Dataset Evidence Matrix Table */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                    Verified Portfolio Evidence Matrix
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">
                    Dataset &amp; KPI Matrix
                  </h2>
                </div>

                {/* Filter tool tabs */}
                <div className="flex flex-wrap gap-1.5">
                  {(["All", "Power BI", "Tableau", "Excel"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setActiveTool(t)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all",
                        activeTool === t
                          ? "bg-cyan-400 text-slate-950 font-bold"
                          : "bg-white/5 border border-white/10 text-slate-300 hover:text-white"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter lab matrix by keyword (e.g. Sales, SLA, Call Center, HR)..."
                  className="w-full rounded-xl border border-white/10 bg-slate-950/80 pl-10 pr-9 py-2 text-xs text-white placeholder-slate-400 focus:border-cyan-400/60 focus:outline-none"
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

              {/* Evidence Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/70">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-white/5 text-slate-300 font-mono text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Project Title</th>
                      <th className="px-4 py-3">Tool</th>
                      <th className="px-4 py-3">Primary Metric Output</th>
                      <th className="px-4 py-3 text-right">Case Study</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredProjects.map((p) => (
                      <tr key={p.slug} className="hover:bg-cyan-400/5 transition">
                        <td className="px-4 py-3.5 font-bold text-white">
                          <Link href={`/projects/${p.slug}`} className="hover:text-cyan-300 transition">
                            {p.title}
                          </Link>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-xs whitespace-nowrap">
                          <span className="rounded bg-white/10 border border-white/10 px-2 py-0.5 text-cyan-300 font-semibold">
                            {p.category}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="rounded-full bg-emerald-400/10 border border-emerald-400/30 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 whitespace-nowrap">
                            {p.metrics[0] ?? "Verified Metric"}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-right font-mono text-xs">
                          <Link
                            href={`/projects/${p.slug}`}
                            className="inline-flex items-center gap-1 text-cyan-300 hover:text-white font-bold transition"
                          >
                            <span>View</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Col: 5-Step Analytical Pipeline */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-cyan-400/30 bg-slate-900/80 backdrop-blur-2xl shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                  Methodology Protocol
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  5-Step Analytical Pipeline
                </h2>
              </div>

              <div className="space-y-3">
                {labProtocolSteps.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.step}
                      className="p-4 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-md flex items-start gap-3 hover:border-cyan-400/40 transition group"
                    >
                      <div className={`p-2 rounded-xl border border-white/10 bg-white/5 ${s.color} flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[0.68rem] font-mono font-bold text-cyan-400">
                            STEP {s.step}
                          </span>
                          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {s.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 — RECRUITER CTA BANNER
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
          <div className="p-8 sm:p-12 rounded-3xl border border-cyan-400/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-2xl shadow-2xl text-center flex flex-col items-center">
            <Kicker icon={Rocket} label="Explore Evidence Case Studies" />

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-4 max-w-3xl">
              Ready to review Ahmed&apos;s full dashboard portfolio?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Explore interactive Power BI, Tableau, and Excel case studies built on verified operational datasets.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/projects">
                <span>Browse All Projects →</span>
              </MagneticButton>
              <MagneticButton href={profile.resumeUrl} target="_blank" variant="secondary">
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </span>
              </MagneticButton>
            </div>
          </div>
        </section>
      </div>
    </PageVideoShell>
  );
}
