"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, BrainCircuit, CloudCog, Database, LineChart, Sigma, Sparkles, Workflow } from "lucide-react";
import { InteractiveTilt } from "@/components/interactive-tilt";

const iconMap = {
  collect: Database,
  clean: Workflow,
  explore: BarChart3,
  features: Sparkles,
  train: BrainCircuit,
  evaluate: Sigma,
  deploy: CloudCog,
  output: LineChart,
};

export type FlowStage = {
  key: keyof typeof iconMap;
  label: string;
  detail: string;
  signal: string;
};

export const defaultFlow: FlowStage[] = [
  { key: "collect", label: "Collect", detail: "APIs, events, files, warehouse tables", signal: "raw" },
  { key: "clean", label: "Clean", detail: "validation, joins, missing values", signal: "trusted" },
  { key: "explore", label: "EDA", detail: "segments, drift, distributions", signal: "insight" },
  { key: "features", label: "Features", detail: "lags, embeddings, transformations", signal: "signal" },
  { key: "train", label: "Train", detail: "baselines, tuning, neural models", signal: "model" },
  { key: "evaluate", label: "Evaluate", detail: "metrics, bias, error analysis", signal: "proof" },
  { key: "deploy", label: "Deploy", detail: "API, dashboard, monitoring", signal: "live" },
  { key: "output", label: "Output", detail: "predictions, decisions, actions", signal: "value" },
];

export function DataPipelineFlow({
  stages = defaultFlow,
  compact = false,
}: {
  stages?: FlowStage[];
  compact?: boolean;
}) {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent lg:block" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, index) => {
          const Icon = iconMap[stage.key];
          return (
            <InteractiveTilt key={stage.label} className="glass-panel hover-lift rounded-2xl">
              <motion.div
                className="relative min-h-44 overflow-hidden rounded-2xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="data-grid absolute inset-0 opacity-20" />
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[.18em] text-cyan-100/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="relative z-10 mt-6 text-xl font-semibold text-white">{stage.label}</h3>
                <p className="relative z-10 mt-2 text-sm leading-6 text-slate-300">{stage.detail}</p>
                <div className="relative z-10 mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-white/[.07] px-3 py-1 font-mono text-xs text-slate-200">{stage.signal}</span>
                  {index < stages.length - 1 ? <ArrowRight className="h-4 w-4 text-cyan-100/70" /> : <Sparkles className="h-4 w-4 text-mint" />}
                </div>
                {!compact ? <span className="pulse-ring absolute right-7 top-7 h-8 w-8 rounded-full border border-cyan-200/30" /> : null}
              </motion.div>
            </InteractiveTilt>
          );
        })}
      </div>
    </div>
  );
}

export function FlowDiagram({ title = "Data to intelligence flow" }: { title?: string }) {
  return (
    <div className="glass-panel scan-surface cinema-card rounded-3xl p-6">
      <div className="cinema-lines absolute inset-0 opacity-25" />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-100/70">Scenario simulation</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
        </div>
        <span className="w-fit rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">streaming</span>
      </div>
      <svg viewBox="0 0 900 260" className="mt-6 h-72 w-full" role="img" aria-label={title}>
        <defs>
          <linearGradient id="flowGradient" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#00d9ff" />
            <stop offset="50%" stopColor="#8757ff" />
            <stop offset="100%" stopColor="#5fffd2" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor="#dffcff" />
            <stop offset="40%" stopColor="#00d9ff" />
            <stop offset="100%" stopColor="rgba(0,217,255,0)" />
          </radialGradient>
        </defs>
        <rect x="18" y="24" width="864" height="188" rx="28" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.08)" />
        {[72, 176, 280, 384, 488, 592, 696, 800].map((x) => (
          <line key={x} x1={x} x2={x + 40} y1="48" y2="188" stroke="rgba(255,255,255,.05)" />
        ))}
        <path className="flow-line" d="M60 155 C180 50 270 230 390 128 S590 38 710 132 S820 188 850 86" fill="none" stroke="url(#flowGradient)" strokeWidth="4" strokeLinecap="round" filter="url(#softGlow)" />
        {[0, 1, 2].map((item) => (
          <circle key={item} className="packet" r="8" fill="#dffcff" style={{ offsetPath: "path('M60 155 C180 50 270 230 390 128 S590 38 710 132 S820 188 850 86')" }} />
        ))}
        {[
          [70, 155, "source"],
          [270, 185, "clean"],
          [450, 96, "model"],
          [650, 112, "score"],
          [840, 86, "decision"],
        ].map(([x, y, label]) => (
          <g key={label as string}>
            <circle cx={x as number} cy={y as number} r="43" fill="url(#nodeGlow)" opacity=".18" />
            <circle cx={x as number} cy={y as number} r="25" fill="rgba(5,6,10,.9)" stroke="rgba(165,243,252,.48)" strokeWidth="1.5" />
            <circle cx={x as number} cy={y as number} r="5" fill="#dffcff" />
            <text x={x as number} y={(y as number) + 48} textAnchor="middle" fill="#cbd5e1" fontSize="14" fontFamily="monospace">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
