"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/components/utils";

export function MagneticButton({ href, children, variant = "primary", type = "button", target, rel }: { href?: string; children: React.ReactNode; variant?: "primary" | "secondary"; type?: "button" | "submit"; target?: string; rel?: string }) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-200",
    variant === "primary" ? "animated-border bg-cyan-300 text-slate-950 hover:bg-white" : "border border-white/15 bg-white/[0.06] text-white backdrop-blur-xl hover:border-cyan-200/50 hover:bg-white/[0.1]",
  );
  const move = (event: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    el.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.12}px, ${(event.clientY - rect.top - rect.height / 2) * 0.18}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  if (href) {
    return (
      <Link ref={ref as React.RefObject<HTMLAnchorElement>} href={href} target={target} rel={rel} onMouseMove={move} onMouseLeave={reset} className={classes}>
        {children}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    );
  }
  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} type={type} onMouseMove={move} onMouseLeave={reset} className={classes}>
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </button>
  );
}
