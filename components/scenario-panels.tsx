"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Database, Settings2 } from "lucide-react";
import { InteractiveTilt } from "@/components/interactive-tilt";

const scenarios = [
  {
    icon: Database,
    title: "Messy source data",
    copy: "Schema drift, missing values, duplicate events, and delayed batches are detected before analysis.",
    tone: "text-cyan-100",
  },
  {
    icon: Settings2,
    title: "Feature factory",
    copy: "Reusable transformations convert noisy inputs into predictive signals and explainable attributes.",
    tone: "text-purple-200",
  },
  {
    icon: AlertTriangle,
    title: "Model risk scan",
    copy: "Bias checks, drift windows, outlier audits, and confidence thresholds catch fragile predictions.",
    tone: "text-amber-200",
  },
  {
    icon: CheckCircle2,
    title: "Decision output",
    copy: "Predictions become dashboards, alerts, recommendations, and business actions with measurable impact.",
    tone: "text-mint",
  },
];

export function ScenarioPanels() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {scenarios.map((scenario, index) => {
        const Icon = scenario.icon;
        return (
          <InteractiveTilt key={scenario.title} className="glass-panel float-panel hover-lift rounded-2xl">
            <motion.article
              className="relative overflow-hidden rounded-2xl p-6"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="data-grid absolute inset-0 opacity-15" />
              <Icon className={`relative z-10 h-6 w-6 ${scenario.tone}`} />
              <h3 className="relative z-10 mt-5 text-xl font-semibold text-white">{scenario.title}</h3>
              <p className="relative z-10 mt-3 text-sm leading-7 text-slate-300">{scenario.copy}</p>
              <div className="relative z-10 mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-purple-400 to-mint"
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${62 + index * 9}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.08 }}
                />
              </div>
            </motion.article>
          </InteractiveTilt>
        );
      })}
    </div>
  );
}

export function AnimatedBars({ values = [38, 62, 45, 82, 71, 94, 66, 88] }: { values?: number[] }) {
  return (
    <div className="flex h-40 items-end gap-2">
      {values.map((value, index) => (
        <motion.span
          key={`${value}-${index}`}
          className="flex-1 rounded-t bg-gradient-to-t from-cyan-300/25 via-cyan-200/70 to-white"
          initial={{ height: 12 }}
          whileInView={{ height: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function MetricOrbit() {
  return (
    <div className="relative mx-auto aspect-square max-w-sm rounded-full border border-cyan-200/20 bg-white/[.035]">
      <div className="absolute inset-10 rounded-full border border-purple-300/20" />
      <div className="absolute inset-20 rounded-full border border-mint/20" />
      {["F1", "AUC", "MAPE", "Drift", "ROI", "Latency"].map((metric, index) => {
        const angle = (index / 6) * Math.PI * 2;
        const x = 50 + Math.cos(angle) * 39;
        const y = 50 + Math.sin(angle) * 39;
        return (
          <motion.span
            key={metric}
            className="absolute grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-void/80 font-mono text-xs text-cyan-100"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3 + index * 0.15, repeat: Infinity, delay: index * 0.2 }}
          >
            {metric}
          </motion.span>
        );
      })}
      <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cyan-300 text-center text-sm font-semibold text-slate-950 shadow-[0_0_45px_rgba(0,217,255,.35)]">
        Model
      </div>
    </div>
  );
}
