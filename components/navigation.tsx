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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-all duration-300",
        scrolled
          ? "border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-xl shadow-cyan-950/20"
          : "border-transparent bg-gradient-to-b from-slate-950/60 to-transparent"
      )}
    >
      <nav
        className="container-shell flex h-[var(--nav-height)] items-center justify-between"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          {/* Avatar Image replacing 'AH' */}
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-cyan-400/40 p-0.5 bg-slate-900 shadow-[0_0_16px_rgba(0,217,255,0.3)] group-hover:border-cyan-300 group-hover:shadow-[0_0_24px_rgba(0,217,255,0.5)] transition-all duration-300">
            <img
              src="/ahmed.jpeg"
              alt={profile.name}
              className="h-full w-full rounded-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
              {profile.name}
            </span>
            <span className="block font-mono text-[11px] uppercase tracking-[.18em] text-cyan-200/80">
              Data &amp; BI Analyst
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([href, label]) => {
            const active =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white",
                  active &&
                    "bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 shadow-[0_0_12px_rgba(0,217,255,0.2)]"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-white lg:hidden hover:border-cyan-400/50 hover:bg-white/10 transition"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="container-shell pb-5 lg:hidden">
          <div className="glass-panel grid gap-1 rounded-2xl p-2 border border-cyan-400/20 bg-slate-950/90 backdrop-blur-2xl">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
