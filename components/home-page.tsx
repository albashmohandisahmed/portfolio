"use client";

import {
  Award,
  BarChart3,
  BrainCircuit,
  Database,
  ExternalLink,
  FileSpreadsheet,
  GraduationCap,
  LineChart,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GsapEffects } from "@/components/gsap-effects";
import { MagneticButton } from "@/components/magnetic-button";
import { PageVideoShell } from "@/components/page-video-shell";
import { Preloader } from "@/components/preloader";
import {
  certifications,
  education,
  experiences,
  profile,
  projects,
  skills,
  stats,
} from "@/data/portfolio";

// ─── Gradient title ───────────────────────────────────────────────────────────

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

// ─── Social SVG Icons ─────────────────────────────────────────────────────────

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

// ─── Section kicker badge ─────────────────────────────────────────────────────

function Kicker({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-300 backdrop-blur-md">
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — HERO  (centered, name + role + stat strip)
// ═══════════════════════════════════════════════════════════════════════════════

function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const badge = el.querySelector(".hero-badge");
      const name = el.querySelector(".hero-name");
      const sub = el.querySelector(".hero-sub");
      const strip = el.querySelector(".hero-strip");
      const btns = el.querySelector(".hero-btns");
      const floaters = el.querySelectorAll(".hero-floater");
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      if (badge) tl.from(badge, { y: -20, opacity: 0, duration: 0.6 }, 0);
      if (name) tl.from(name, { y: 40, opacity: 0, duration: 1 }, 0.1);
      if (sub) tl.from(sub, { y: 20, opacity: 0, duration: 0.8 }, 0.3);
      if (btns) tl.from(btns, { y: 20, opacity: 0, duration: 0.7 }, 0.5);
      if (floaters.length > 0) tl.from(floaters, { scale: 0.8, opacity: 0, stagger: 0.2, duration: 0.8 }, 0.4);
      if (strip && strip.children)
        tl.from(
          strip.children,
          { y: 20, opacity: 0, stagger: 0.08, duration: 0.7 },
          0.6
        );
    }, el);
    return () => ctx.revert();
  }, []);

  const analysisWorkflowCards = [
    {
      step: "01",
      phase: "Data Cleaning",
      value: "100%",
      label: "Validated Data",
      icon: Database,
      color: "#00d9ff",
      bgGlow: "from-cyan-500/10 via-cyan-500/5 to-transparent",
      borderGlow: "group-hover:border-cyan-400/60",
    },
    {
      step: "02",
      phase: "SQL & ETL",
      value: "1.74M",
      label: "Calls Processed",
      icon: Workflow,
      color: "#8757ff",
      bgGlow: "from-purple-500/10 via-purple-500/5 to-transparent",
      borderGlow: "group-hover:border-purple-400/60",
    },
    {
      step: "03",
      phase: "EDA & Insights",
      value: "1,480",
      label: "HR Records Studied",
      icon: BrainCircuit,
      color: "#5fffd2",
      bgGlow: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      borderGlow: "group-hover:border-emerald-400/60",
    },
    {
      step: "04",
      phase: "Data Modeling",
      value: "8",
      label: "BI Dashboards",
      icon: BarChart3,
      color: "#fbbf24",
      bgGlow: "from-amber-500/10 via-amber-500/5 to-transparent",
      borderGlow: "group-hover:border-amber-400/60",
    },
    {
      step: "05",
      phase: "KPI Reporting",
      value: "1.1M",
      label: "Sales Reported",
      icon: LineChart,
      color: "#38bdf8",
      bgGlow: "from-sky-500/10 via-sky-500/5 to-transparent",
      borderGlow: "group-hover:border-sky-400/60",
    },
    {
      step: "06",
      phase: "Impact & Certs",
      value: `${certifications.length}`,
      label: "Certifications",
      icon: Award,
      color: "#f43f5e",
      bgGlow: "from-rose-500/10 via-rose-500/5 to-transparent",
      borderGlow: "group-hover:border-rose-400/60",
    },
  ];

  const quickTools = [
    "Power BI",
    "Python",
    "SQL",
    "Tableau",
    "DAX",
    "Excel",
    "Power Query",
  ];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-full min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Glowing Ambient Aura Orbs */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/15 blur-[130px] -z-10 animate-pulse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full bg-purple-500/10 blur-[110px] -z-10"
        aria-hidden="true"
      />

      {/* Left Floating High-Tech Visual Badge (Desktop) */}
      <div className="hero-floater hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-2.5 p-4.5 rounded-2xl border border-cyan-400/30 bg-slate-950/80 backdrop-blur-2xl shadow-2xl z-20 w-64 pointer-events-none">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-300">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span>ETL Pipeline</span>
          </div>
          <span className="text-[0.65rem] text-slate-400">Live</span>
        </div>
        <p className="text-sm font-extrabold text-white">1.74M Calls Processed</p>
        
        {/* Mini SVG Sparkline */}
        <div className="flex items-end gap-1.5 h-8 pt-1">
          <div className="w-1.5 h-3/5 rounded-full bg-cyan-400/40" />
          <div className="w-1.5 h-4/5 rounded-full bg-cyan-400/70" />
          <div className="w-1.5 h-full rounded-full bg-cyan-400" />
          <div className="w-1.5 h-2/3 rounded-full bg-cyan-400/60" />
          <div className="w-1.5 h-5/6 rounded-full bg-cyan-300" />
          <div className="w-1.5 h-full rounded-full bg-cyan-400" />
        </div>
      </div>

      {/* Right Floating High-Tech Visual Badge (Desktop) */}
      <div className="hero-floater hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-2.5 p-4.5 rounded-2xl border border-purple-400/30 bg-slate-950/80 backdrop-blur-2xl shadow-2xl z-20 w-64 pointer-events-none">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-300">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
            </span>
            <span>BI Performance</span>
          </div>
          <span className="text-[0.65rem] text-purple-300 font-bold">91.06%</span>
        </div>
        <p className="text-sm font-extrabold text-white">Call Center SLA Achieved</p>
        
        {/* Mini Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mt-1">
          <div className="h-full bg-gradient-to-r from-purple-400 to-cyan-400 w-[91%]" />
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Role badge */}
        <div className="hero-badge inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4.5 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300 backdrop-blur-md mb-6 shadow-lg">
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
          <span>Data Analyst &amp; Business Intelligence Analyst</span>
        </div>

        {/* Name */}
        <h1 className="hero-name text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl drop-shadow-2xl">
          <GradientTitle>{profile.name}</GradientTitle>
        </h1>

        {/* Headline + subtitle */}
        <p className="hero-sub text-lg sm:text-2xl font-bold text-cyan-200 max-w-2xl mt-4 leading-tight drop-shadow-md">
          {profile.headline}
        </p>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-3 leading-relaxed drop-shadow-sm">
          {profile.subtitle}
        </p>

        {/* Buttons */}
        <div className="hero-btns mt-8 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/projects">View Projects</MagneticButton>
          <MagneticButton href={`mailto:${profile.email}`} variant="secondary">
            Get in touch
          </MagneticButton>
        </div>

        {/* Quick Tools Badge Strip */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-2 max-w-xl">
          {quickTools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono font-medium text-slate-300 backdrop-blur-sm hover:border-cyan-400/40 hover:text-cyan-300 transition-all"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* 6-Column Data Analysis Process Cards Strip */}
        <div className="hero-strip mt-12 w-full max-w-6xl">
          <div className="text-center mb-5">
            <span className="text-[0.7rem] font-mono font-bold uppercase tracking-widest text-cyan-300/80">
              ── End-to-End Analytics Workflow ──
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {analysisWorkflowCards.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.step}
                  className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-white/10 bg-gradient-to-b ${c.bgGlow} bg-slate-900/80 backdrop-blur-xl ${c.borderGlow} hover:-translate-y-2 transition-all duration-300 shadow-xl overflow-hidden`}
                >
                  {/* Card Header: Icon & Step */}
                  <div className="flex items-center justify-between">
                    <div
                      className="p-2 rounded-xl border border-white/10"
                      style={{ color: c.color, backgroundColor: `${c.color}15` }}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[0.65rem] font-mono font-bold text-slate-400 group-hover:text-white transition-colors">
                      #{c.step}
                    </span>
                  </div>

                  {/* Value */}
                  <div className="my-3 text-left">
                    <span className="block text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:scale-105 transition-transform origin-left">
                      {c.value}
                    </span>
                    <span className="block text-xs font-mono font-bold mt-0.5" style={{ color: c.color }}>
                      {c.phase}
                    </span>
                  </div>

                  {/* Label */}
                  <div className="pt-2 border-t border-white/10 text-left">
                    <span className="text-[0.7rem] font-medium text-slate-300 block">
                      {c.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 flex flex-col items-center gap-1 text-xs font-mono text-slate-400 animate-bounce">
          <span>Scroll to explore</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — ABOUT  (full-width editorial block)
// ═══════════════════════════════════════════════════════════════════════════════

const aboutTags = [
  "Cairo, Egypt",
  "CS Graduate — GPA 3.4",
  "Power BI",
  "Tableau",
  "SQL",
  "Python",
  "DAX",
  "Excel",
  "Power Query",
  "ETL Pipelines",
  "KPI Reporting",
  "EDA",
];

function AboutSection() {
  return (
    <section id="about" className="relative w-full py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Kicker icon={MapPin} label="01 / Who I am" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left col */}
          <div className="about-animate lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              <GradientTitle>About Ahmed</GradientTitle>
            </h2>
            <div className="p-5 sm:p-6 rounded-2xl border-l-4 border-cyan-400 bg-slate-900/70 border border-white/10 backdrop-blur-xl text-base sm:text-lg italic text-slate-200 leading-relaxed shadow-lg">
              &ldquo;A data analyst who turns scattered business data into
              clear, decision-ready insights.&rdquo;
            </div>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {profile.intro}
            </p>
            <div className="pt-2">
              <MagneticButton href="/about">Read full bio</MagneticButton>
            </div>
          </div>

          {/* Right col */}
          <div className="about-animate lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-2xl space-y-6">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3">
                Skills &amp; tools snapshot
              </p>
              <div className="flex flex-wrap gap-2">
                {aboutTags.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-mono font-medium text-cyan-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/5 text-sm font-medium text-slate-200">
                <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/5 text-sm font-medium text-slate-200">
                <GraduationCap className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span>B.Sc. Computer Science — Honors (GPA 3.4)</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/5 text-sm font-medium text-slate-200">
                <Award className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span>{certifications.length} Professional Certificates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — FEATURED PROJECTS  (Portfolio proof grid)
// ═══════════════════════════════════════════════════════════════════════════════

const featuredProjects = projects.slice(0, 6);

function ProjectsSection() {
  return (
    <section
      id="featured-projects"
      className="relative w-full py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <Kicker icon={Rocket} label="02 / Portfolio proof" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
              <GradientTitle>Featured Projects</GradientTitle>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Real dashboards built on real business datasets — Power BI,
              Tableau, and Excel.
            </p>
          </div>
          <MagneticButton href="/projects">All case studies →</MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProjects.map((p) => (
            <a
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="proj-animate flex flex-col h-full rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl overflow-hidden hover:border-cyan-400/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl group"
            >
              <div className="flex flex-col flex-1 p-6">
                {/* Category tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                    {p.category}
                  </span>
                  <span className="text-slate-400 text-xs font-mono group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                    View project →
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {p.title}
                </h3>

                {/* Summary */}
                <p className="mt-3 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed flex-1">
                  {p.summary}
                </p>

                {/* Metrics */}
                <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {p.metrics.slice(0, 2).map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[0.72rem] font-semibold text-emerald-300"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Tools */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[0.68rem] font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — SKILLS  (Technical range)
// ═══════════════════════════════════════════════════════════════════════════════

const skillGroups = [
  {
    category: "BI & Visualization",
    icon: BarChart3,
    color: "#00d9ff",
    items: skills.filter(
      (s) => s.group === "BI" || s.group === "Visualization",
    ),
  },
  {
    category: "Programming & Data",
    icon: BrainCircuit,
    color: "#8757ff",
    items: skills.filter(
      (s) => s.group === "Programming" || s.group === "Python Data",
    ),
  },
  {
    category: "Data Engineering",
    icon: Workflow,
    color: "#5fffd2",
    items: skills.filter(
      (s) =>
        s.group === "ETL" ||
        s.group === "Querying" ||
        s.group === "Databases" ||
        s.group === "Data Quality",
    ),
  },
  {
    category: "Analysis & Reporting",
    icon: LineChart,
    color: "#fbbf24",
    items: skills.filter(
      (s) => s.group === "Analysis" || s.group === "Business Analysis",
    ),
  },
];

function SkillsSection() {
  return (
    <section
      id="skills-tools"
      className="relative w-full py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Kicker icon={Database} label="03 / Technical range" />
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
          <GradientTitle>Skills &amp; Tools</GradientTitle>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          A full analytical stack — from raw SQL queries and Python EDA to Power
          BI semantic models and Tableau storytelling.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="skill-card-animate p-6 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-xl hover:border-cyan-400/40 transition-all flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="p-2.5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-4 flex-1">
                  {group.items.map((s) => (
                    <div key={s.name} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-200">
                          {s.name}
                        </span>
                        <span className="font-mono font-bold text-cyan-400">
                          {s.level}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <MagneticButton href="/skills">Full skills matrix →</MagneticButton>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — EXPERIENCE  (Timeline)
// ═══════════════════════════════════════════════════════════════════════════════

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative w-full py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Kicker icon={Workflow} label="04 / Hands-on work" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
              <GradientTitle>Project Experience</GradientTitle>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              End-to-end BI projects delivered on real datasets with measurable,
              stakeholder-ready outcomes.
            </p>
          </div>
          <MagneticButton href="/experience">
            See all experience →
          </MagneticButton>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative pl-6 sm:pl-8 border-l-2 border-cyan-400/30">
          {experiences.map((exp) => (
            <div key={exp.company} className="exp-animate relative">
              {/* Node dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-2 h-4 w-4 rounded-full border-2 border-cyan-400 bg-slate-950 shadow-[0_0_12px_rgba(0,217,255,0.8)]" />

              {/* Card */}
              <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-cyan-300 mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-mono font-medium text-cyan-200">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {exp.summary}
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed list-disc list-inside">
                  {exp.achievements.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — EDUCATION  (Continuous learning)
// ═══════════════════════════════════════════════════════════════════════════════

function EducationSection() {
  return (
    <section
      id="education"
      className="relative w-full py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Kicker icon={GraduationCap} label="05 / Continuous learning" />
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
          <GradientTitle>Education &amp; Certifications</GradientTitle>
        </h2>

        {/* Degree Banner */}
        <div className="edu-animate mt-8 p-6 sm:p-8 rounded-2xl border border-cyan-400/30 bg-slate-900/80 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="h-4 w-4" />
              <span>Bachelor Degree</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Bachelor of Computer Science — Honors
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              Faculty of Computer and Artificial Intelligence · GPA: 3.4
            </p>
            <p className="text-xs text-slate-400">
              Relevant coursework: Database Systems, Statistics, Machine
              Learning, Data Structures
            </p>
          </div>
          <span className="self-start md:self-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono font-medium text-slate-300 whitespace-nowrap">
            09/2019 – 07/2023
          </span>
        </div>

        {/* Certifications Subheading */}
        <p className="mt-12 text-sm font-mono font-bold uppercase tracking-wider text-cyan-400">
          Professional Certificates ({certifications.length})
        </p>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {certifications.map((certString, i) => {
            const parts = certString.split(" — ");
            const certTitle = parts[0] || certString;
            const certDate = parts[1] || "";
            return (
              <div
                key={certString}
                className="edu-animate p-6 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-xl hover:border-cyan-400/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-2.5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                      <Award className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400/70">
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white leading-snug">
                    {certTitle}
                  </h4>
                </div>

                {certDate && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Issued</span>
                    <span className="font-semibold text-cyan-300">
                      {certDate}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7 — CONTACT
// ═══════════════════════════════════════════════════════════════════════════════

function ContactSection() {
  return (
    <section id="contact" className="relative w-full py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="contact-card max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-2xl text-center shadow-2xl space-y-6">
          <Kicker icon={Mail} label="06 / Open to opportunities" />

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            <GradientTitle>Let&apos;s Connect</GradientTitle>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Open to Data Analyst &amp; BI Analyst roles. Based in Cairo,
            available for full-time, contract, or freelance analytics work.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-4">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white transition-all shadow-md"
            >
              <LinkedinIcon className="h-4 w-4 text-cyan-400" /> LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white transition-all shadow-md"
            >
              <GithubIcon className="h-4 w-4 text-cyan-400" /> GitHub
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white transition-all shadow-md"
            >
              <ExternalLink className="h-4 w-4 text-cyan-400" /> Download CV
            </a>
          </div>

          <div className="pt-6 flex flex-wrap justify-center gap-4 border-t border-white/10">
            <MagneticButton href={`mailto:${profile.email}`}>
              Send an email
            </MagneticButton>
            <MagneticButton href="/projects" variant="secondary">
              Browse projects
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SIDE DOT NAVIGATOR
// ═══════════════════════════════════════════════════════════════════════════════

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "featured-projects", label: "Projects" },
  { id: "skills-tools", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function SectionNavigator() {
  return (
    <div
      className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 xl:flex"
      aria-hidden="true"
    >
      {navItems.map((n) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          title={n.label}
          className="pointer-events-auto h-2.5 w-2.5 rounded-full border border-white/35 bg-white/10 transition hover:h-8 hover:bg-cyan-200"
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export function HomePage() {
  return (
    <PageVideoShell
      className="relative"
      poster="/00-hero-data-portfolio.jpg"
      video="/videos/home.mp4"
    >
      <Preloader />
      <GsapEffects />
      <SectionNavigator />
      <div className="relative z-10 space-y-12 sm:space-y-20 pb-12">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </div>
    </PageVideoShell>
  );
}
