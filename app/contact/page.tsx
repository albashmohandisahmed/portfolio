import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Copy,
  GitBranch,
  Globe,
  HeartHandshake,
  Mail,
  MapPin,
  MessageSquare,
  Network,
  Phone,
  Sparkles,
  Zap,
} from "lucide-react";
import { ContactBackground } from "@/components/contact-background";
import { ContactForm } from "@/components/contact-form";
import { PageVideoShell } from "@/components/page-video-shell";
import { SectionReveal } from "@/components/section-reveal";
import { profile } from "@/data/portfolio";

export const metadata = {
  title: "Contact | Ahmed Mohamed Abd El Hamid — Data Analyst & BI Specialist",
  description:
    "Reach out to Ahmed Mohamed Abd El Hamid for Data Analyst, Business Intelligence Analyst, Power BI dashboard development, or analytics roles.",
};

function GradientTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-b from-slate-50 via-slate-200 to-cyan-300 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

function Kicker({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-cyan-300 backdrop-blur-md">
      <Icon className="h-3.5 w-3.5 text-cyan-300" />
      <span>{label}</span>
    </div>
  );
}

export default function ContactPage() {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email Address",
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: "text-cyan-400",
      glow: "hover:border-cyan-400/50",
    },
    {
      icon: Phone,
      label: "Phone / WhatsApp",
      value: profile.phone,
      href: `tel:${profile.phone.replaceAll(" ", "")}`,
      color: "text-emerald-400",
      glow: "hover:border-emerald-400/50",
    },
    {
      icon: Network,
      label: "LinkedIn Profile",
      value: "linkedin.com/in/ahmed-mohamed-abd-el-hamid-ali",
      href: profile.linkedin,
      color: "text-purple-400",
      glow: "hover:border-purple-400/50",
    },
    {
      icon: GitBranch,
      label: "GitHub Repositories",
      value: "github.com/albashmohandisahmed",
      href: profile.github,
      color: "text-amber-400",
      glow: "hover:border-amber-400/50",
    },
    {
      icon: MapPin,
      label: "Location & Relocation",
      value: `${profile.location} (Open to Remote & On-Site)`,
      href: "#",
      color: "text-cyan-400",
      glow: "hover:border-cyan-400/50",
    },
  ];

  return (
    <PageVideoShell poster="/11-contact.jpg" video="/videos/Contact.mp4">
      <ContactBackground />
      <div className="relative w-full pt-28 pb-24 overflow-hidden">
        {/* Ambient Glow */}
        <div
          className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[150px] -z-10"
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — HERO HEADER & AVAILABILITY STATS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pb-12">
          <div className="mb-4">
            <Kicker icon={HeartHandshake} label="06 / Connect &amp; Collaborate" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl drop-shadow-2xl">
            <GradientTitle>Get in Touch with Ahmed</GradientTitle>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Interested in hiring a Data Analyst or Business Intelligence Specialist? Have a project brief or dashboard inquiry? Reach out directly via form or email.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="p-4 rounded-2xl border border-cyan-400/30 bg-slate-900/80 backdrop-blur-xl shadow-lg hover:border-cyan-400/60 transition">
              <Zap className="h-5 w-5 text-cyan-400 mb-1" />
              <span className="block text-sm font-extrabold text-white">Immediate</span>
              <span className="text-xs font-mono text-slate-400">Available for Hire</span>
            </div>
            <div className="p-4 rounded-2xl border border-purple-400/30 bg-slate-900/80 backdrop-blur-xl shadow-lg hover:border-purple-400/60 transition">
              <Clock className="h-5 w-5 text-purple-400 mb-1" />
              <span className="block text-sm font-extrabold text-white">&lt; 24 Hours</span>
              <span className="text-xs font-mono text-slate-400">Response Guarantee</span>
            </div>
            <div className="p-4 rounded-2xl border border-emerald-400/30 bg-slate-900/80 backdrop-blur-xl shadow-lg hover:border-emerald-400/60 transition">
              <Globe className="h-5 w-5 text-emerald-400 mb-1" />
              <span className="block text-sm font-extrabold text-white">Remote &amp; On-Site</span>
              <span className="text-xs font-mono text-slate-400">Cairo &amp; Global</span>
            </div>
            <div className="p-4 rounded-2xl border border-amber-400/30 bg-slate-900/80 backdrop-blur-xl shadow-lg hover:border-amber-400/60 transition">
              <Mail className="h-5 w-5 text-amber-400 mb-1" />
              <span className="block text-sm font-extrabold text-white">Direct Email</span>
              <span className="text-xs font-mono text-slate-400">albashmohandisahmed</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — CONTACT CHANNELS & FORM GRID
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Contact Details Panel */}
          <SectionReveal className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-cyan-400/30 bg-slate-900/80 backdrop-blur-2xl shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                Direct Contact Channels
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                Reach Out Directly
              </h2>
            </div>

            <div className="space-y-3">
              {contactLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    className={`block p-4 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-md transition-all duration-300 ${item.glow} group`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl border border-white/10 bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="overflow-hidden flex-1">
                        <p className="text-[0.68rem] font-mono uppercase tracking-wider text-slate-400">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>Available for Immediate Data Analyst &amp; BI Roles</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-300">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>Open for Full-Time, Contract, or Freelance Work</span>
              </div>
            </div>
          </SectionReveal>

          {/* Right Interactive Form Panel */}
          <SectionReveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </SectionReveal>
        </section>
      </div>
    </PageVideoShell>
  );
}
