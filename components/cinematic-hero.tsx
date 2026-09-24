"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, BarChart3, BrainCircuit, CheckCircle2, Database, LineChart, RadioTower, Sparkles, Target } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import { AnimatedBars } from "@/components/scenario-panels";
import { profile, stats } from "@/data/portfolio";
import { HeroMediaScene } from "@/components/hero-media-scene";

export function CinematicHero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-[var(--nav-height)]">
      <HeroMediaScene />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,10,.98),rgba(5,6,10,.72)_52%,rgba(5,6,10,.9))]" />
      <div className="container-shell relative z-10 grid min-h-[calc(100vh-var(--nav-height))] items-center gap-14 py-16 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="section-kicker">
            <Sparkles className="h-4 w-4" /> Ahmed Mohamed Abd El Hamid
          </motion.div>
          <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            {["Data Analyst", "Business Intelligence Analyst", "Business Analysis", "Machine Learning"].map((role) => (
              <span key={role} className="rounded-full border border-white/10 bg-white/[.045] px-3 py-1.5 font-mono text-xs uppercase tracking-[.16em] text-cyan-100/75">
                {role}
              </span>
            ))}
          </motion.div>
          <motion.h1 className="heading-xl aurora-text mt-5 max-w-4xl" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.82, duration: 0.8 }}>
            {profile.headline}
          </motion.h1>
          <motion.p className="muted-copy mt-6 max-w-2xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.98 }}>
            {profile.subtitle}
          </motion.p>
          <motion.div className="mt-9 flex flex-col gap-4 sm:flex-row" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.12 }}>
            <MagneticButton href="/projects">View Projects</MagneticButton>
            <MagneticButton href="/contact" variant="secondary">Contact Me</MagneticButton>
          </motion.div>
          <motion.div className="mt-8 grid gap-3 sm:grid-cols-2" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.18 }}>
            <div className="rounded-2xl border border-cyan-200/15 bg-cyan-300/[.06] p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-white"><Target className="h-4 w-4 text-cyan-100" /> Open to roles</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Data Analyst, Business Intelligence Analyst, Junior Data Scientist, Business Analyst</p>
            </div>
            <div className="rounded-2xl border border-mint/15 bg-mint/[.06] p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-white"><CheckCircle2 className="h-4 w-4 text-mint" /> Recruiter signal</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Power BI, Tableau, Excel, SQL, Python, ETL, EDA, KPIs, and stakeholder reporting</p>
            </div>
          </motion.div>
          <motion.div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25 }}>
            {stats.map((stat) => (
              <div key={stat.label} className="cinema-card rounded-2xl border border-white/10 bg-white/[.055] p-4 backdrop-blur-xl">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div className="hidden lg:block" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.9, duration: 0.9 }}>
          <div className="media-frame cinema-card overflow-hidden rounded-[2rem] p-6">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[.2em] text-cyan-100/70">BI hiring proof dashboard</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Ahmed&apos;s Analytics Portfolio</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-mint/10 px-3 py-1 text-xs text-mint">
                <RadioTower className="h-3.5 w-3.5" /> live
              </span>
            </div>
            <div className="relative z-10 mt-8 grid gap-5">
              <div className="grid grid-cols-3 gap-4">
                {[
                  ["SLA", "91.06%"],
                  ["Attrition", "16.08%"],
                  ["On-time delivery", "69.72%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-2xl font-semibold text-white">{value}</p>
                    <p className="mt-1 text-xs text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-[.18em] text-slate-400">dashboard KPI stream</p>
                  <BarChart3 className="h-5 w-5 text-cyan-100" />
                </div>
                <AnimatedBars values={[32, 48, 67, 72, 56, 86, 74, 92, 64, 81]} />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  [Database, "Collect"],
                  [LineChart, "Analyze"],
                  [BrainCircuit, "Model"],
                  [CheckCircle2, "Report"],
                ].map(([Icon, label], index) => (
                  <motion.div key={label as string} className="rounded-2xl border border-white/10 bg-white/[.04] p-4 text-center text-cyan-100" animate={{ y: [0, -6, 0] }} transition={{ duration: 2.8 + index * 0.15, repeat: Infinity, delay: index * 0.18 }}>
                    <Icon className="mx-auto h-5 w-5" />
                    <p className="mt-3 text-xs font-semibold text-slate-200">{label as string}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Link href="#signal" className="absolute bottom-7 left-1/2 z-10 grid -translate-x-1/2 place-items-center gap-2 text-xs uppercase tracking-[.22em] text-slate-300">
        <span>Scroll</span>
        <ArrowDown className="h-5 w-5 animate-bounce text-cyan-100" />
      </Link>
    </section>
  );
}
