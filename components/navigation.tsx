"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  BarChart3,
  Layers,
  Briefcase,
  FlaskConical,
  FileText,
  Mail,
  X,
  Compass,
  Download,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { cn } from "@/components/utils";

const links = [
  { href: "/", label: "Home", icon: Home, desc: "Interactive Landing & Showcase" },
  { href: "/about", label: "About", icon: User, desc: "CS Honors & Biography" },
  { href: "/projects", label: "Projects", icon: BarChart3, desc: "8 Verified BI Case Studies" },
  { href: "/skills", label: "Skills", icon: Layers, desc: "Power BI, SQL, Python, Excel" },
  { href: "/experience", label: "Experience", icon: Briefcase, desc: "Hands-on Analytics Track" },
  { href: "/lab", label: "Lab", icon: FlaskConical, desc: "Experimental ML & Python Scripts" },
  { href: "/resume", label: "Resume", icon: FileText, desc: "Official CV & Credentials" },
  { href: "/contact", label: "Contact", icon: Mail, desc: "Direct Message & Inquiries" },
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

  // Lock body scroll when mobile bottom sheet menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Main 4 quick tab shortcuts for bottom dock
  const quickTabs = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: BarChart3 },
    { href: "/skills", label: "Skills", icon: Layers },
    { href: "/resume", label: "Resume", icon: FileText },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          DESKTOP HEADER & MOBILE TOP BAR
          ═══════════════════════════════════════════════════════════════════ */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-white/10 bg-slate-950/85 backdrop-blur-2xl shadow-xl shadow-cyan-950/20"
            : "border-transparent bg-gradient-to-b from-slate-950/80 to-transparent"
        )}
      >
        <nav
          className="container-shell flex h-[var(--nav-height)] items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* Logo & Avatar */}
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-cyan-400/40 p-0.5 bg-slate-900 shadow-[0_0_16px_rgba(0,217,255,0.3)] group-hover:border-cyan-300 group-hover:shadow-[0_0_24px_rgba(0,217,255,0.5)] transition-all duration-300">
              <img
                src="/ahmed.jpeg"
                alt={profile.name}
                className="h-full w-full rounded-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <span className="leading-tight">
              <span className="block text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                {profile.name}
              </span>
              <span className="block font-mono text-[10px] sm:text-[11px] uppercase tracking-[.18em] text-cyan-200/80">
                Data &amp; BI Analyst
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map(({ href, label }) => {
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

          {/* Mobile Top Menu Button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-mono font-bold text-cyan-300 backdrop-blur-md hover:bg-cyan-400/20 active:scale-95 transition"
            aria-label="Open mobile menu"
          >
            <Compass className="h-4 w-4 animate-spin-slow" />
            <span>Navigation</span>
          </button>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE FLOATING BOTTOM DOCK BAR (ALWAYS ACCESSIBLE)
          ═══════════════════════════════════════════════════════════════════ */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-4 inset-x-4 z-40 lg:hidden flex items-center justify-between rounded-full border border-cyan-400/30 bg-slate-950/85 p-1.5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      >
        <div className="flex w-full items-center justify-around">
          {quickTabs.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full text-[10px] font-mono font-bold transition-all duration-300",
                  active
                    ? "text-cyan-300 bg-cyan-400/15 border border-cyan-400/30 shadow-[0_0_12px_rgba(0,217,255,0.25)]"
                    : "text-slate-400 hover:text-white"
                )}
              >
                <Icon className={cn("h-4 w-4 mb-0.5", active ? "text-cyan-300" : "text-slate-400")} />
                <span>{label}</span>
                {active && (
                  <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d9ff]" />
                )}
              </Link>
            );
          })}

          {/* More Menu Trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              "flex flex-col items-center justify-center py-1.5 px-3 rounded-full text-[10px] font-mono font-bold text-slate-400 hover:text-white transition",
              open && "text-cyan-300 bg-cyan-400/15 border border-cyan-400/30"
            )}
          >
            <Compass className="h-4 w-4 mb-0.5 text-cyan-400 animate-pulse" />
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE SLIDE-UP GLASSMORPHIC BOTTOM SHEET DRAWER
          ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md lg:hidden"
            />

            {/* Bottom Sheet Drawer Shell */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[88vh] overflow-y-auto rounded-t-3xl border-t border-cyan-400/30 bg-slate-950/95 p-6 backdrop-blur-2xl shadow-2xl lg:hidden flex flex-col justify-between"
            >
              <div>
                {/* Drawer Drag Indicator & Header */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-12 h-1.5 rounded-full bg-white/20 mb-4" />
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full border border-cyan-400/40 overflow-hidden bg-slate-900">
                        <img
                          src="/ahmed.jpeg"
                          alt={profile.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight">
                          {profile.name}
                        </h3>
                        <p className="text-[11px] font-mono text-cyan-300">
                          Data &amp; BI Analytics Portfolio
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="p-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* All 8 Page Links List */}
                <div className="grid gap-2">
                  {links.map(({ href, label, icon: Icon, desc }) => {
                    const active =
                      pathname === href ||
                      (href !== "/" && pathname.startsWith(href));
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200",
                          active
                            ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_15px_rgba(0,217,255,0.15)]"
                            : "border-white/5 bg-slate-900/60 text-slate-200 hover:border-cyan-400/30 hover:bg-slate-900"
                        )}
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={cn(
                              "p-2.5 rounded-xl border transition-colors",
                              active
                                ? "border-cyan-400/40 bg-cyan-400/20 text-cyan-300"
                                : "border-white/10 bg-white/5 text-slate-400 group-hover:text-cyan-300"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {label}
                            </span>
                            <span className="block text-[0.68rem] text-slate-400">
                              {desc}
                            </span>
                          </div>
                        </div>

                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform group-hover:translate-x-1",
                            active ? "text-cyan-400" : "text-slate-500"
                          )}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-cyan-400/40 bg-cyan-400/15 text-xs font-mono font-bold text-cyan-200 hover:bg-cyan-400/25 transition"
                >
                  <Download className="h-4 w-4 text-cyan-300" />
                  <span>Resume PDF</span>
                </a>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/15 bg-white/10 text-xs font-mono font-bold text-white hover:bg-white/15 transition"
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Contact Me</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
