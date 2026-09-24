"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Database, LineChart, Cpu, Sparkles } from "lucide-react";

const STAGES = [
  "Initializing Data Science Core...",
  "Connecting SQL & Power BI Data Models...",
  "Loading Enterprise Dashboards & Analytics...",
  "Preparing Analytics Workspace...",
];

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => setVisible(false), 100);
      return () => clearTimeout(t);
    }

    // Progress counter animation from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 300);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [reduced]);

  useEffect(() => {
    if (progress < 25) setStageIndex(0);
    else if (progress < 55) setStageIndex(1);
    else if (progress < 85) setStageIndex(2);
    else setStageIndex(3);
  }, [progress]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 px-4 text-white overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Futuristic Background Grid & Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.12)_0,transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Central High-Tech Loader Ring */}
          <div className="relative flex items-center justify-center">
            {/* Outer Counter-Rotating HUD Ticks */}
            <motion.div
              className="absolute -inset-6 rounded-full border border-dashed border-cyan-400/30"
              animate={reduced ? undefined : { rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Glowing Orbit Ring */}
            <motion.div
              className="absolute -inset-3 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400/40 shadow-[0_0_25px_rgba(0,217,255,0.4)]"
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Center Profile Avatar */}
            <div className="relative h-24 w-24 rounded-full p-1 bg-slate-900 border border-cyan-400/50 shadow-[0_0_30px_rgba(0,217,255,0.5)] overflow-hidden z-10">
              <img
                src="/ahmed.jpeg"
                alt="Ahmed Mohamed"
                className="h-full w-full rounded-full object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-cyan-400/10 mix-blend-overlay" />
            </div>
          </div>

          {/* Percentage Counter */}
          <div className="mt-8 flex items-baseline gap-1 font-mono">
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,217,255,0.6)]">
              {progress}
            </span>
            <span className="text-lg font-bold text-cyan-400">%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="mt-4 w-full max-w-xs sm:max-w-md h-1.5 rounded-full bg-slate-900 border border-white/10 p-0.5 overflow-hidden shadow-inner">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-400 shadow-[0_0_12px_rgba(0,217,255,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            />
          </div>

          {/* Animated Dynamic Status Stage */}
          <div className="mt-5 h-6 flex items-center justify-center">
            <motion.div
              key={stageIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-950/60 border border-cyan-400/30 px-4 py-1 text-xs font-mono text-cyan-200 shadow-md backdrop-blur-md"
            >
              <Cpu className="h-3.5 w-3.5 text-cyan-400 animate-spin" />
              <span>{STAGES[stageIndex]}</span>
            </motion.div>
          </div>

          {/* Bottom Branding */}
          <div className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-cyan-400/60" />
            <span>Ahmed Mohamed Abd El Hamid · Analytics Portfolio</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
