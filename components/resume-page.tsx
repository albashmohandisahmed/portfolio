"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  BarChart3,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileCheck2,
  GitBranch,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  Printer,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import { PageVideoShell } from "@/components/page-video-shell";
import { getProjectImageUrl } from "@/components/project-card";
import { ProjectShowcase } from "@/components/project-showcase";
import {
  certifications,
  education,
  experiences,
  languages,
  profile,
  projects,
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

export function ResumePageClient() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <PageVideoShell
      poster="/06-education-certifications.jpg"
      video="/videos/Resume.mp4"
    >
      <div className="relative w-full pt-28 pb-24 overflow-hidden">
        {/* Ambient Glow */}
        <div
          className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[150px] -z-10 print-hide"
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — HERO HEADER & RECRUITER ACTIONS (HIDDEN ON PRINT)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pb-10 print-hide">
          <div className="mb-4">
            <Kicker icon={FileCheck2} label="05 / Official Resume & Credentials" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl drop-shadow-2xl">
            <GradientTitle>Curriculum Vitae &amp; Credentials</GradientTitle>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Verified resume preview for recruiters and hiring managers. Review education, certificates, tech stack, and BI project case studies.
          </p>

          {/* Quick Action Strip */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <MagneticButton href="/Ahmed_Mohamed_Abd_El_Hamid_CV.pdf" target="_blank">
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Download PDF Resume</span>
              </span>
            </MagneticButton>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-6 py-3 text-xs font-mono font-bold text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 transition backdrop-blur-md shadow-lg cursor-pointer"
            >
              <Printer className="h-4 w-4 text-cyan-400" />
              <span>Print Resume</span>
            </button>

            <button
              type="button"
              onClick={() => copyToClipboard(profile.email, "Email")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-5 py-3 text-xs font-mono font-bold text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 transition backdrop-blur-md shadow-lg cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5 text-cyan-400" />
              <span>{copiedText === "Email" ? "Email Copied!" : "Copy Email"}</span>
            </button>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — PRINT-OPTIMIZED EXECUTIVE RESUME DOCUMENT SHELL
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="container-shell mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="print-resume-document p-6 sm:p-10 rounded-3xl border border-cyan-400/30 bg-slate-900/90 backdrop-blur-2xl shadow-2xl space-y-8">
            {/* Document Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-white/10 pb-8">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-mono font-bold text-cyan-300 print-badge">
                  <Sparkles className="h-3.5 w-3.5 print-hide" />
                  <span>{profile.title}</span>
                </span>

                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {profile.name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {profile.intro}
                </p>

                {/* Contact information badges */}
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-cyan-400 print-hide" />
                    <span>{profile.location}</span>
                  </span>
                  <Link
                    href={`tel:${profile.phone.replaceAll(" ", "")}`}
                    className="flex items-center gap-1.5 hover:text-cyan-300 transition"
                  >
                    <Phone className="h-3.5 w-3.5 text-cyan-400 print-hide" />
                    <span>{profile.phone}</span>
                  </Link>
                  <Link
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-1.5 hover:text-cyan-300 transition"
                  >
                    <Mail className="h-3.5 w-3.5 text-cyan-400 print-hide" />
                    <span>{profile.email}</span>
                  </Link>
                </div>
              </div>

              {/* Status Badge (Hidden on print) */}
              <div className="self-start p-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-xs font-mono space-y-1 flex-shrink-0 print-hide">
                <div className="flex items-center gap-2 font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>Available for Hire</span>
                </div>
                <p className="text-[0.68rem] text-slate-300">
                  Data Analyst / BI Specialist
                </p>
              </div>
            </div>

            {/* Practical Project Experience */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-300 border-b border-white/10 pb-3">
                <Briefcase className="h-5 w-5 print-hide" />
                <h3 className="text-xl font-bold text-white">
                  Practical BI Project Experience
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.company}
                    className="p-5 rounded-2xl border border-white/10 bg-slate-950/60 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-white">
                          {exp.role}
                        </h4>
                        <p className="text-xs font-mono font-bold text-cyan-300">
                          {exp.company}
                        </p>
                      </div>
                      <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs text-cyan-300 print-badge">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {exp.summary}
                    </p>

                    <ul className="space-y-1 text-xs text-slate-300">
                      {exp.achievements.map((ach) => (
                        <li key={ach} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0 mt-0.5 print-hide" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[0.68rem] font-mono text-slate-300 print-badge"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Case Studies Matrix */}
            <div className="space-y-4 pt-4 border-t border-white/10 print-page-break">
              <div className="flex items-center gap-2 text-cyan-300 border-b border-white/10 pb-3">
                <BarChart3 className="h-5 w-5 print-hide" />
                <h3 className="text-xl font-bold text-white">
                  Verified Case Studies ({projects.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <div
                    key={p.slug}
                    className="p-4 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-md flex flex-col justify-between hover:border-cyan-400/40 transition"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={encodeURI(getProjectImageUrl(p))}
                        alt={`${p.title} preview`}
                        className="h-16 w-24 rounded-xl object-cover object-top flex-shrink-0 print-hide"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white leading-tight">
                            {p.title}
                          </h4>
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[0.65rem] font-mono text-cyan-300 font-bold print-badge">
                            {p.category}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {p.summary}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="font-mono text-[0.68rem] text-emerald-300 font-semibold truncate max-w-[70%]">
                        {p.metrics[0]}
                      </span>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="font-mono text-xs font-bold text-cyan-300 hover:underline flex items-center gap-1 print-hide"
                      >
                        <span>Details</span>
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications 2-Col Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-white/10">
              {/* Academic Degree */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300">
                  <GraduationCap className="h-5 w-5 print-hide" />
                  <h3 className="text-xl font-bold text-white">Academic Education</h3>
                </div>

                {education.map((item) => (
                  <div
                    key={item.degree}
                    className="p-5 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 space-y-2"
                  >
                    <h4 className="text-base font-bold text-white">
                      {item.degree}
                    </h4>
                    <p className="text-xs font-mono font-bold text-cyan-300">
                      {item.school} · {item.period}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Award className="h-5 w-5 print-hide" />
                  <h3 className="text-xl font-bold text-white">
                    Certifications ({certifications.length})
                  </h3>
                </div>

                <div className="space-y-2">
                  {certifications.map((certString) => {
                    const parts = certString.split(" — ");
                    const title = parts[0] || certString;
                    const date = parts[1] || "";

                    return (
                      <div
                        key={certString}
                        className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-slate-950/60 text-xs text-slate-200"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0 print-hide" />
                          <span className="font-semibold text-white">
                            {title}
                          </span>
                        </div>
                        {date && (
                          <span className="font-mono text-[0.68rem] text-cyan-300 font-bold ml-2">
                            {date}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Technical Stack Snapshot */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-cyan-400">
                Technical Stack &amp; Skill Scores
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-200 print-badge"
                  >
                    {skill.name} ({skill.level}%)
                  </span>
                ))}
              </div>
            </div>

            {/* Document Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-cyan-400 print-hide" />
                <span>Languages: {languages.join(" · ")}</span>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href={profile.linkedin}
                  target="_blank"
                  className="text-cyan-300 hover:underline font-bold"
                >
                  LinkedIn
                </Link>
                <Link
                  href={profile.github}
                  target="_blank"
                  className="text-cyan-300 hover:underline font-bold"
                >
                  GitHub
                </Link>
                <Link
                  href={`mailto:${profile.email}`}
                  className="text-cyan-300 hover:underline font-bold"
                >
                  Email
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Appendix Footer (Hidden on Print) */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20 print-hide">
          <ProjectShowcase
            title="Visual portfolio appendix."
            description="A recruiter-friendly visual index of all dashboard and analytics projects included in this portfolio."
          />
        </section>
      </div>
    </PageVideoShell>
  );
}
