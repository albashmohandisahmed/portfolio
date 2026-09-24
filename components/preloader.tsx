"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();
  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reduced ? 100 : 1300);
    return () => window.clearTimeout(timeout);
  }, [reduced]);
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-void" exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
          <div className="relative grid place-items-center">
            <motion.div className="h-28 w-28 rounded-full border border-cyan-200/20" animate={reduced ? undefined : { rotate: 360, scale: [1, 1.08, 1] }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />
            <span className="absolute font-mono text-xs uppercase tracking-[.35em] text-cyan-100">Initializing</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
