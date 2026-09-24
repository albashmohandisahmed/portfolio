"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

function Heatmap() {
  return (
    <div className="grid h-full grid-cols-8 gap-1.5 p-4">
      {Array.from({ length: 48 }).map((_, index) => {
        const intensity = 0.18 + ((index * 17) % 70) / 100;
        const delay = (index % 9) * 0.18;
        return (
          <span
            key={index}
            className="heatmap-cell rounded-md"
            style={{
              background: `rgba(${index % 3 === 0 ? "0,217,255" : index % 3 === 1 ? "135,87,255" : "95,255,210"}, ${intensity})`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function SignalWave() {
  const path = "M0 84 C 70 20, 120 134, 190 66 S 330 18, 420 92 S 560 138, 640 42";
  return (
    <svg viewBox="0 0 640 170" className="h-full w-full" role="img" aria-label="Animated signal wave">
      <defs>
        <linearGradient id="heroWave" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#00d9ff" />
          <stop offset="55%" stopColor="#8757ff" />
          <stop offset="100%" stopColor="#5fffd2" />
        </linearGradient>
      </defs>
      {[35, 70, 105, 140].map((y) => (
        <line key={y} x1="0" x2="640" y1={y} y2={y} stroke="rgba(255,255,255,.07)" />
      ))}
      <motion.path
        d={path}
        fill="none"
        stroke="url(#heroWave)"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0.15, 1, 0.15] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {[70, 190, 320, 445, 580].map((x, index) => (
        <motion.circle
          key={x}
          cx={x}
          cy={[45, 66, 54, 105, 63][index]}
          r="7"
          fill="#dffcff"
          animate={{ scale: [0.8, 1.35, 0.8], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.28 }}
        />
      ))}
    </svg>
  );
}

export function HeroMediaScene() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22 });
  const sy = useSpring(my, { stiffness: 70, damping: 22 });
  const panelX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const panelY = useTransform(sy, [-0.5, 0.5], [-14, 14]);
  const reverseX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const reverseY = useTransform(sy, [-0.5, 0.5], [12, -12]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mx.set(event.clientX / window.innerWidth - 0.5);
      my.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_18%,rgba(0,217,255,.16),transparent_24rem),radial-gradient(circle_at_82%_68%,rgba(135,87,255,.13),transparent_24rem),linear-gradient(135deg,#05060a,#07101e_48%,#05060a)]" />
      <div className="cinema-lines absolute inset-0 opacity-10" />
      <div className="absolute inset-0 video-noise opacity-45" />
      <div className="absolute inset-x-0 top-1/4 h-96 -rotate-6 data-waterfall opacity-20 blur-[1px]" />

      <motion.div style={{ x: panelX, y: panelY }} className="media-frame media-scan absolute right-[6%] top-[16%] hidden h-52 w-[30rem] overflow-hidden rounded-[2rem] opacity-30 lg:block">
        <div className="relative z-10 h-full p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.22em] text-cyan-100/70">Streaming analytics video wall</p>
              <p className="mt-2 text-2xl font-semibold text-white">Live signal intelligence</p>
            </div>
            <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">24 fps</span>
          </div>
          <div className="mt-6 h-40">
            <SignalWave />
          </div>
        </div>
      </motion.div>

      <motion.div style={{ x: reverseX, y: reverseY }} className="media-frame absolute right-[12%] bottom-[12%] hidden h-56 w-72 overflow-hidden rounded-[2rem] opacity-25 lg:block">
        <div className="relative z-10 flex h-full flex-col">
          <div className="border-b border-white/10 p-4">
            <p className="font-mono text-xs uppercase tracking-[.18em] text-purple-100/80">Feature heatmap</p>
          </div>
          <Heatmap />
        </div>
      </motion.div>

      <motion.div style={{ x: reverseX }} className="media-frame absolute left-[4%] bottom-[12%] hidden h-44 w-[28rem] overflow-hidden rounded-[2rem] opacity-20 lg:block">
        <div className="relative z-10 h-full p-5">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-100/70">Model telemetry ticker</p>
          <div className="mt-5 overflow-hidden">
            <div className="ticker-track flex w-[200%] gap-3">
              {[...Array(2)].flatMap((_, group) =>
                ["F1 0.93", "AUC 0.97", "Drift low", "p95 142ms", "ROI +18%", "MAPE 7.2"].map((item) => (
                  <span key={`${group}-${item}`} className="rounded-full border border-white/10 bg-white/[.06] px-4 py-2 font-mono text-xs text-slate-200">
                    {item}
                  </span>
                )),
              )}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-6 gap-2">
            {[44, 62, 78, 52, 91, 68].map((height, index) => (
              <motion.span
                key={index}
                className="rounded-t bg-gradient-to-t from-cyan-300/30 to-cyan-100"
                animate={{ height: [`${height * 0.55}px`, `${height}px`, `${height * 0.7}px`] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.15 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
