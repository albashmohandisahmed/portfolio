"use client";

import { motion } from "framer-motion";

const metrics = [
  ["Model health", "98.7%", "+2.4%"],
  ["Data freshness", "4m", "-11m"],
  ["Inference p95", "142ms", "-19%"],
  ["Revenue signal", "$2.4M", "+8.1%"],
];

export function AnalyticsWidgets() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.35fr]">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {metrics.map(([label, value, trend], index) => (
          <motion.div key={label} className="glass-panel rounded-2xl p-5" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
            <p className="font-mono text-xs uppercase tracking-[.18em] text-slate-400">{label}</p>
            <div className="mt-3 flex items-end justify-between"><span className="text-3xl font-semibold text-white">{value}</span><span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">{trend}</span></div>
          </motion.div>
        ))}
      </div>
      <div className="glass-panel overflow-hidden rounded-2xl p-6">
        <p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-100/70">Prediction signal</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Realtime model cockpit</h2>
        <svg viewBox="0 0 520 210" className="mt-8 h-56 w-full" role="img" aria-label="Animated analytics trend line">
          <defs><linearGradient id="labLine" x1="0%" x2="100%" y1="0%" y2="0%"><stop offset="0%" stopColor="#00d9ff" /><stop offset="55%" stopColor="#8757ff" /><stop offset="100%" stopColor="#5fffd2" /></linearGradient></defs>
          {[30, 70, 110, 150, 190].map((y) => <line key={y} x1="20" x2="500" y1={y} y2={y} stroke="rgba(255,255,255,.08)" />)}
          <motion.path d="M20 150 C 90 95, 120 120, 170 74 S 270 55, 330 92 S 430 136, 500 58" fill="none" stroke="url(#labLine)" strokeLinecap="round" strokeWidth="5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
        </svg>
      </div>
    </div>
  );
}
