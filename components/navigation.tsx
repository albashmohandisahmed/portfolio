"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { cn } from "@/components/utils";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/projects", "Projects"],
  ["/skills", "Skills"],
  ["/experience", "Experience"],
  ["/lab", "Lab"],
  ["/resume", "Resume"],
  ["/contact", "Contact"],
] as const;

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 border-b transition", scrolled ? "border-white/10 bg-void/75 backdrop-blur-2xl" : "border-transparent")}>
      <nav className="container-shell flex h-[var(--nav-height)] items-center justify-between" aria-label="Primary navigation">
        <Link href="/" className="flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-200">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-200/30 bg-cyan-300/10 font-mono text-sm font-bold text-cyan-100 shadow-[0_0_28px_rgba(0,217,255,.22)]">AH</span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold text-white">{profile.name}</span>
            <span className="block font-mono text-[11px] uppercase tracking-[.18em] text-cyan-100/70">Data & BI Analyst</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([href, label]) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} className={cn("rounded-full px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white", active && "bg-cyan-300/10 text-cyan-100")}>
                {label}
              </Link>
            );
          })}
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white lg:hidden" aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open ? (
        <div className="container-shell pb-5 lg:hidden">
          <div className="glass-panel grid gap-1 rounded-2xl p-2">
            {links.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-slate-200 hover:bg-white/10">
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
