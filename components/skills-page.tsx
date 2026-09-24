"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  CloudCog,
  Database,
  FileSpreadsheet,
  Layers,
  LineChart,
  MessageSquareText,
  Network,
  Rocket,
  Search,
  Sigma,
  Sparkles,
  Terminal,
  Workflow,
  X,
} from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import { PageVideoShell } from "@/components/page-video-shell";
import { ProjectShowcase } from "@/components/project-showcase";
import { skills } from "@/data/portfolio";
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

// Group mapping helper
function getCategoryGroup(groupName: string): string {
  if (["BI", "Visualization"].includes(groupName)) return "BI & Visualization";
  if (["Programming", "Python Data"].includes(groupName)) return "Python & Data Science";
  if (["Querying", "ETL", "Engineering", "Data Quality", "Databases"].includes(groupName))
    return "ETL & Engineering";
  if (["Analysis", "Business Analysis"].includes(groupName)) return "Business Analysis";
  return "Machine Learning & Tools";
}

const mainCategoryGroups = [
  "All",
  "BI & Visualization",
  "ETL & Engineering",
  "Python & Data Science",
  "Business Analysis",
  "Machine Learning & Tools",
] as const;

export function SkillsPageClient() {
  const [activeTab, setActiveTab] = useState<typeof mainCategoryGroups[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const category = getCategoryGroup(skill.group);
      const matchesCategory = activeTab === "All" || category === activeTab;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.group.toLowerCase().includes(q) ||
        category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const topDomainSummary = [
    {
      title: "Business Intelligence & Storytelling",
      subtitle: "Power BI, Tableau, Excel & DAX",
      count: "90% Max Score",
      icon: BarChart3,
      color: "#00d9ff",
      bgGlow: "from-cyan-500/10 to-transparent",
      skillsList: ["Power BI", "DAX", "Tableau", "Excel Power Tools"],
    },
    {
      title: "Data Engineering & ETL Pipelines",
      subtitle: "SQL, Power Query, Schema Modeling",
      count: "90% Max Score",
      icon: Database,
      color: "#8757ff",
      bgGlow: "from-purple-500/10 to-transparent",
      skillsList: ["SQL Server / MySQL", "Power Query", "ETL Pipelines", "Data Validation"],
    },
    {
      title: "Python Data Stack & ML",
      subtitle: "Pandas, NumPy, Plotly, Scikit-learn",
      count: "86% Max Score",
      icon: BrainCircuit,
      color: "#5fffd2",
      bgGlow: "from-emerald-500/10 to-transparent",
      skillsList: ["Python", "Pandas / NumPy", "Matplotlib / Plotly", "Scikit-learn"],
    },
    {
      title: "Business & Stakeholder Analytics",
      subtitle: "EDA, KPI Reporting, Storytelling",
      count: "90% Max Score",
      icon: LineChart,
      color: "#fbbf24",
      bgGlow: "from-amber-500/10 to-transparent",
      skillsList: ["Exploratory Data Analysis", "KPI Reporting", "Stakeholder Comm."],
    },
  ];

  return (
    <PageVideoShell poster="/07-experience-skills.jpg" video="/videos/Skills.mp4">
      <div className="relative w-full pt-28 pb-24 overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div
          className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[150px] -z-10"
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — HERO BANNER & DOMAIN OVERVIEW
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mb-4">
            <Kicker icon={Layers} label="03 / Tech Stack &amp; Skill Matrix" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl drop-shadow-2xl">
            <GradientTitle>Technical Skills &amp; Analytics Stack</GradientTitle>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Full analytical range across Business Intelligence, SQL data warehousing, Python EDA, Power Query ETL, and executive KPI reporting.
          </p>

          {/* 4 Domain Cards Strip */}
          <div className="mt-10 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {topDomainSummary.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className={`p-5 rounded-2xl border border-white/10 bg-gradient-to-b ${d.bgGlow} bg-slate-900/80 backdrop-blur-xl shadow-xl hover:border-cyan-400/40 transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="p-2 rounded-xl border border-white/10 flex-shrink-0"
                        style={{ color: d.color, backgroundColor: `${d.color}15` }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[0.68rem] font-mono font-bold" style={{ color: d.color }}>
                        {d.count}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      {d.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400 font-mono">
                      {d.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1">
                    {d.skillsList.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[0.65rem] font-mono text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — SEARCH & CATEGORY FILTER TABS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
          <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-xl">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills by keyword (e.g. Power BI, DAX, Python, SQL)..."
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

            {/* Results Count */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 px-2 whitespace-nowrap">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span>
                Showing <strong className="text-cyan-300">{filteredSkills.length}</strong> of {skills.length} Skills
              </span>
            </div>
          </div>

          {/* Group Category Tabs */}
          <div className="mb-10 flex flex-wrap gap-2 sm:gap-3" role="tablist">
            {mainCategoryGroups.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-mono font-semibold transition-all duration-300 shadow-md",
                    isActive
                      ? "border-cyan-400 bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,217,255,0.4)] scale-105"
                      : "border-white/10 bg-slate-900/80 text-slate-300 hover:border-cyan-400/40 hover:text-white"
                  )}
                  aria-pressed={isActive}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Skill Cards Grid */}
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill, index) => {
                const Icon = skill.icon;
                const categoryGroup = getCategoryGroup(skill.group);

                let barGradient = "from-cyan-400 to-blue-500";
                let badgeClass = "border-cyan-400/30 bg-cyan-400/10 text-cyan-300";

                if (skill.level >= 88) {
                  barGradient = "from-cyan-300 via-emerald-400 to-emerald-300";
                  badgeClass = "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
                } else if (skill.level >= 82) {
                  barGradient = "from-purple-400 via-cyan-400 to-blue-400";
                  badgeClass = "border-purple-400/30 bg-purple-400/10 text-purple-300";
                }

                return (
                  <div
                    key={skill.name}
                    className="group p-6 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-xl hover:border-cyan-400/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar: Icon & Category */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="p-3 rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5" />
                        </div>

                        <span
                          className={`rounded-full border px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider ${badgeClass}`}
                        >
                          {skill.group}
                        </span>
                      </div>

                      {/* Title & Category Subtitle */}
                      <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {skill.name}
                      </h2>
                      <p className="text-xs font-mono text-slate-400 mt-0.5">
                        {categoryGroup}
                      </p>
                    </div>

                    {/* Progress Bar & Percentage */}
                    <div className="mt-6 space-y-2 pt-4 border-t border-white/10">
                      <div className="flex justify-between items-center text-xs font-mono font-bold">
                        <span className="text-slate-400">Proficiency Score</span>
                        <span className="text-cyan-300">{skill.level}%</span>
                      </div>

                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-1000`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
              <p className="text-lg font-bold text-white">
                No skill matched &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("All");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-xs font-mono font-semibold text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 transition"
              >
                Reset Filters &amp; Search
              </button>
            </div>
          )}
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 — PROJECT SHOWCASE CTA
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
          <ProjectShowcase
            title="Skills proven through real dashboards."
            description="Each skill area is backed by practical portfolio work across Power BI, Tableau, Excel, DAX, Power Query, KPI reporting, and business analysis."
          />
        </section>
      </div>
    </PageVideoShell>
  );
}
