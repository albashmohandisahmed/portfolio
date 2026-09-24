"use client";

import {
  Award,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Database,
  Download,
  FileSpreadsheet,
  GraduationCap,
  HeartHandshake,
  Layers,
  LineChart,
  Mail,
  MapPin,
  MessageSquareText,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  UserCheck,
  Workflow,
} from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/magnetic-button";
import { PageVideoShell } from "@/components/page-video-shell";
import {
  certifications,
  education,
  experiences,
  languages,
  philosophy,
  profile,
  skills,
} from "@/data/portfolio";

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

export function AboutPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = containerRef.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const animatedElements = el.querySelectorAll(".about-fade-in");
      animatedElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const coreStrengths = [
    {
      icon: ShieldCheck,
      title: "Data Quality & Validation First",
      desc: "Ensuring raw datasets undergo thorough cleaning, deduplication, and anomaly checks before constructing analytical pipelines or reports.",
      color: "#00d9ff",
      glow: "from-cyan-500/10 to-transparent",
    },
    {
      icon: BarChart3,
      title: "Stakeholder-Focused Reporting",
      desc: "Building clean Power BI & Tableau dashboards designed specifically to answer executive questions without visual noise.",
      color: "#8757ff",
      glow: "from-purple-500/10 to-transparent",
    },
    {
      icon: Terminal,
      title: "Advanced DAX & SQL Modeling",
      desc: "Crafting star schemas, complex DAX measures, time intelligence, and SQL queries to structure datasets efficiently.",
      color: "#5fffd2",
      glow: "from-emerald-500/10 to-transparent",
    },
    {
      icon: Award,
      title: "Certified Continuous Learner",
      desc: "6 professional certifications across Google, Microsoft, and IBM covering data analysis, Power BI, and Python workflows.",
      color: "#fbbf24",
      glow: "from-amber-500/10 to-transparent",
    },
  ];

  const methodologySteps = [
    {
      num: "01",
      title: "Understand Business Objectives",
      desc: "Align with stakeholders to identify key performance indicators (KPIs), business questions, and target decisions before writing code.",
      icon: Target,
      color: "text-cyan-400",
      border: "hover:border-cyan-400/50",
    },
    {
      num: "02",
      title: "Clean & Validate Data",
      desc: "Use SQL, Python (Pandas), and Power Query to inspect schemas, handle missing values, resolve data type conflicts, and verify accuracy.",
      icon: Workflow,
      color: "text-purple-400",
      border: "hover:border-purple-400/50",
    },
    {
      num: "03",
      title: "Data Modeling & DAX Measures",
      desc: "Design efficient dimensional data models (star schema), build relational joins, and author reusable DAX formulas for flexible metrics.",
      icon: Layers,
      color: "text-emerald-400",
      border: "hover:border-emerald-400/50",
    },
    {
      num: "04",
      title: "Dashboard Design & Storytelling",
      desc: "Transform data into interactive, intuitive visualizations that highlight actionable trends, driver analysis, and executive takeaways.",
      icon: LineChart,
      color: "text-amber-400",
      border: "hover:border-amber-400/50",
    },
  ];

  const categorizedSkills = [
    {
      category: "Business Intelligence & Visualization",
      icon: BarChart3,
      color: "#00d9ff",
      items: [
        { name: "Power BI", level: 90 },
        { name: "DAX (Data Analysis Expressions)", level: 84 },
        { name: "Tableau", level: 82 },
        { name: "Excel (Pivot Tables / Power Query)", level: 90 },
      ],
    },
    {
      category: "Querying, ETL & Engineering",
      icon: Database,
      color: "#8757ff",
      items: [
        { name: "SQL (SQL Server / MySQL)", level: 88 },
        { name: "Power Query / ETL Pipelines", level: 88 },
        { name: "Data Cleaning & Validation", level: 90 },
        { name: "Dimensional Data Modeling", level: 86 },
      ],
    },
    {
      category: "Python & Scientific Computing",
      icon: BrainCircuit,
      color: "#5fffd2",
      items: [
        { name: "Python", level: 86 },
        { name: "Pandas & NumPy", level: 84 },
        { name: "Matplotlib & Seaborn & Plotly", level: 82 },
        { name: "Scikit-learn (ML Fundamentals)", level: 76 },
      ],
    },
    {
      category: "Analytics & Business Strategy",
      icon: LineChart,
      color: "#fbbf24",
      items: [
        { name: "Exploratory Data Analysis (EDA)", level: 90 },
        { name: "KPI Reporting & Metric Design", level: 88 },
        { name: "Stakeholder Communication", level: 86 },
        { name: "Workforce & Sales Analytics", level: 88 },
      ],
    },
  ];

  return (
    <PageVideoShell poster="/10-about-me.jpg" video="/videos/About.mp4">
      <div ref={containerRef} className="relative w-full pt-28 pb-24 overflow-hidden">
        {/* Background Ambient Glows */}
        <div
          className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[150px] -z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-[40%] right-10 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[140px] -z-10"
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — HERO / HEADER BANNER
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="about-fade-in mb-4">
            <Kicker icon={UserCheck} label="01 / About Me · BI & Data Specialist" />
          </div>

          <h1 className="about-fade-in text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl drop-shadow-2xl">
            <GradientTitle>About Ahmed Mohamed Abd El Hamid</GradientTitle>
          </h1>

          <p className="about-fade-in mt-4 text-lg sm:text-xl font-semibold text-cyan-200 max-w-3xl leading-snug">
            {profile.headline}
          </p>

          <p className="about-fade-in mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {profile.subtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div className="about-fade-in mt-8 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl border border-cyan-400/30 bg-slate-900/80 backdrop-blur-xl flex flex-col items-center text-center shadow-lg hover:border-cyan-400/60 transition-all">
              <GraduationCap className="h-6 w-6 text-cyan-400 mb-1" />
              <span className="text-xl font-bold text-white">GPA 3.4</span>
              <span className="text-xs font-mono text-slate-400 mt-0.5">B.Sc. CS (Honors)</span>
            </div>
            <div className="p-4 rounded-2xl border border-purple-400/30 bg-slate-900/80 backdrop-blur-xl flex flex-col items-center text-center shadow-lg hover:border-purple-400/60 transition-all">
              <BarChart3 className="h-6 w-6 text-purple-400 mb-1" />
              <span className="text-xl font-bold text-white">8 Dashboards</span>
              <span className="text-xs font-mono text-slate-400 mt-0.5">Power BI & Tableau</span>
            </div>
            <div className="p-4 rounded-2xl border border-emerald-400/30 bg-slate-900/80 backdrop-blur-xl flex flex-col items-center text-center shadow-lg hover:border-emerald-400/60 transition-all">
              <Award className="h-6 w-6 text-emerald-400 mb-1" />
              <span className="text-xl font-bold text-white">6 Certificates</span>
              <span className="text-xs font-mono text-slate-400 mt-0.5">Google, IBM, MSFT</span>
            </div>
            <div className="p-4 rounded-2xl border border-amber-400/30 bg-slate-900/80 backdrop-blur-xl flex flex-col items-center text-center shadow-lg hover:border-amber-400/60 transition-all">
              <MapPin className="h-6 w-6 text-amber-400 mb-1" />
              <span className="text-xl font-bold text-white">Cairo, Egypt</span>
              <span className="text-xs font-mono text-slate-400 mt-0.5">Remote &amp; On-Site</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="about-fade-in mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton href={profile.resumeUrl} target="_blank">
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Download Resume</span>
              </span>
            </MagneticButton>
            <MagneticButton href={`mailto:${profile.email}`} variant="secondary">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Get in Touch</span>
              </span>
            </MagneticButton>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — EXECUTIVE BIOGRAPHY & CORE STRENGTHS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="about-fade-in mb-6">
            <Kicker icon={BrainCircuit} label="02 / Executive Summary" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
              <GradientTitle>Professional Biography</GradientTitle>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Col: Executive Photo & Status Card */}
            <div className="about-fade-in lg:col-span-5 relative group rounded-3xl border border-cyan-400/30 bg-slate-900/80 backdrop-blur-2xl p-5 shadow-2xl overflow-hidden flex flex-col justify-between">
              <div className="relative w-full aspect-[4/3.5] rounded-2xl overflow-hidden border border-cyan-400/20 shadow-xl">
                <img
                  src="/ahmed_mohamed.jpeg"
                  alt="Ahmed Mohamed Abd El Hamid - Data & BI Analyst"
                  className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-slate-950/90 px-3 py-1 text-[0.7rem] font-mono text-emerald-300 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Open to BI &amp; Analyst Roles</span>
                  </span>
                  <span className="text-[0.68rem] font-mono text-cyan-300 bg-slate-950/90 px-2.5 py-1 rounded-full border border-cyan-400/30">
                    Cairo, Egypt
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-bold text-white">Ahmed Mohamed Abd El Hamid</h3>
                <p className="text-xs font-mono text-cyan-300">B.Sc. Computer Science (Honors) · Data &amp; BI Analyst</p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-slate-300 font-mono">Power BI</span>
                  <span className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-slate-300 font-mono">SQL</span>
                  <span className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-slate-300 font-mono">Python</span>
                  <span className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-slate-300 font-mono">Tableau</span>
                </div>
              </div>
            </div>

            {/* Right Col: Main Bio & Core Snapshot */}
            <div className="about-fade-in lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-cyan-400/30 bg-slate-900/80 backdrop-blur-2xl shadow-2xl space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl border-l-4 border-cyan-400 bg-cyan-400/10 text-cyan-200 text-sm sm:text-base font-semibold italic">
                  <Quote className="h-6 w-6 text-cyan-300 flex-shrink-0" />
                  <span>
                    &ldquo;Turning scattered, high-volume business data into clean models, interactive dashboards, and executive insights.&rdquo;
                  </span>
                </div>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  {profile.intro}
                </p>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  With a solid Computer Science background (GPA 3.4 with Honors), Ahmed pairs core technical knowledge—such as database design, statistics, and algorithms—with practical Business Intelligence tools. Whether analyzing 1.74M customer service calls or segmenting workforce attrition across 1,480 employee records, his priority is always clarity, metric precision, and business utility.
                </p>
              </div>

              {/* Personal Details Snapshot Grid */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                  <span>Degree: B.Sc. Computer Science (Honors)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                  <span>Location: Cairo, Egypt</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                  <span>Primary Tools: Power BI, SQL, Python, Excel</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                  <span>Certifications: 6 Professional Certificates</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 — ANALYSIS PHILOSOPHY & METHODOLOGY
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="about-fade-in text-center max-w-3xl mx-auto mb-10">
            <Kicker icon={Workflow} label="03 / Workflow & Methodology" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
              <GradientTitle>Analysis Philosophy</GradientTitle>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-300">
              A structured 4-step approach to turning raw operational data into trusted decision dashboards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className={`about-fade-in p-6 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-xl ${step.border} transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 rounded-xl border border-white/10 bg-white/5 ${step.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-cyan-300 transition-colors">
                        #{step.num}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 text-[0.7rem] font-mono text-cyan-400 flex items-center justify-between">
                    <span>Phase {step.num}</span>
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Philosophy Bullets */}
          <div className="about-fade-in mt-8 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-4">
            {philosophy.map((item, idx) => (
              <div key={item} className="flex items-start gap-3">
                <span className="rounded-full bg-cyan-400/20 text-cyan-300 px-2 py-0.5 text-xs font-mono font-bold mt-0.5">
                  0{idx + 1}
                </span>
                <p className="text-sm font-medium text-slate-200 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4 — TECHNICAL MASTERY & SKILLS MATRIX
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="about-fade-in mb-8">
            <Kicker icon={Layers} label="04 / Technical Stack" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
              <GradientTitle>Skills &amp; Tools Matrix</GradientTitle>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Demonstrated proficiency across business intelligence, data engineering, Python scripting, and analytics domain knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categorizedSkills.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.category}
                  className="about-fade-in p-6 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-xl flex flex-col justify-between hover:border-cyan-400/40 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                      <div
                        className="p-2.5 rounded-xl border border-white/10 flex-shrink-0"
                        style={{ color: group.color, backgroundColor: `${group.color}15` }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {group.category}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {group.items.map((s) => (
                        <div key={s.name} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-200">
                              {s.name}
                            </span>
                            <span className="font-mono font-bold" style={{ color: group.color }}>
                              {s.level}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width: `${s.level}%`,
                                backgroundColor: group.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10 text-center">
                    <span className="text-[0.68rem] font-mono text-slate-400 uppercase tracking-widest">
                      Verified Portfolio Experience
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5 — EDUCATION & CERTIFICATIONS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="about-fade-in mb-8">
            <Kicker icon={GraduationCap} label="05 / Continuous Learning" />
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
              <GradientTitle>Education &amp; Professional Certifications</GradientTitle>
            </h2>
          </div>

          {/* Academic Degree Card */}
          <div className="about-fade-in p-6 sm:p-8 rounded-3xl border border-cyan-400/30 bg-slate-900/80 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-mono font-semibold text-cyan-300">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Bachelor Degree</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Bachelor of Computer Science — Honors
              </h3>
              <p className="text-base text-slate-200 font-medium">
                Faculty of Computer and Artificial Intelligence · Cumulative GPA: 3.4 / 4.0
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Relevant Coursework: Database Management Systems, Data Structures &amp; Algorithms, Applied Statistics, Artificial Intelligence, Software Engineering, Object-Oriented Programming.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono font-medium text-slate-300 whitespace-nowrap">
                09/2019 – 07/2023
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400">
                Honors Graduate
              </span>
            </div>
          </div>

          {/* Professional Certifications Grid */}
          <div className="about-fade-in mb-4">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              Verified Certifications ({certifications.length})
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((certString, i) => {
              const parts = certString.split(" — ");
              const certTitle = parts[0] || certString;
              const certDate = parts[1] || "";
              
              let issuer = "Google / IBM / Microsoft";
              if (certTitle.includes("Google")) issuer = "Google";
              else if (certTitle.includes("IBM")) issuer = "IBM";
              else if (certTitle.includes("Microsoft")) issuer = "Microsoft";
              else if (certTitle.includes("DataCamp")) issuer = "DataCamp";

              return (
                <div
                  key={certString}
                  className="about-fade-in p-6 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-xl hover:border-cyan-400/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="p-2.5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 group-hover:scale-110 transition-transform">
                        <Award className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-400/70">
                        #{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <span className="inline-block text-[0.68rem] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      {issuer}
                    </span>

                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {certTitle}
                    </h4>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Completion</span>
                    <span className="font-semibold text-cyan-300">{certDate || "Verified"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 6 — APPLIED BI PROJECT TRACK RECORD
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="about-fade-in flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <Kicker icon={Rocket} label="06 / Hands-on Work" />
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
                <GradientTitle>Applied BI Projects</GradientTitle>
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Real dashboard case studies built on multi-million row operational datasets.
              </p>
            </div>
            <MagneticButton href="/projects">
              Explore All Case Studies →
            </MagneticButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className="about-fade-in p-6 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-xl hover:border-cyan-400/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-mono font-bold text-cyan-300">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {exp.role}
                  </h3>

                  <p className="text-xs font-mono font-semibold text-purple-300 mt-1">
                    {exp.company}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {exp.summary}
                  </p>

                  <ul className="mt-4 space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                    {exp.achievements.map((ach) => (
                      <li key={ach}>{ach}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[0.68rem] font-mono text-slate-300"
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
            SECTION 7 — LANGUAGES & CONTACT CTA
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="about-fade-in p-8 sm:p-12 rounded-3xl border border-cyan-400/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-2xl shadow-2xl text-center flex flex-col items-center">
            <Kicker icon={HeartHandshake} label="07 / Get In Touch" />

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-4 max-w-3xl">
              Ready to bring data clarity to your team?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Currently open for Data Analyst and Business Intelligence Analyst roles (Remote &amp; On-Site in Cairo, Egypt).
            </p>

            {/* Languages strip */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-mono font-semibold text-cyan-200"
                >
                  🌐 {lang}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton href={`mailto:${profile.email}`}>
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Send Email</span>
                </span>
              </MagneticButton>
              <MagneticButton href={profile.linkedin} target="_blank" variant="secondary">
                <span>Connect on LinkedIn</span>
              </MagneticButton>
              <MagneticButton href={profile.github} target="_blank" variant="secondary">
                <span>Explore GitHub</span>
              </MagneticButton>
            </div>
          </div>
        </section>
      </div>
    </PageVideoShell>
  );
}
