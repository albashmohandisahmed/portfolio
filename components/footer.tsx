import Link from "next/link";
import { GitBranch, Mail, Network } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-10 bg-slate-950/60 backdrop-blur-md">
      <div className="container-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">{profile.name}</p>
          <p className="mt-1 text-sm text-slate-400">Data Analyst | Business Intelligence Analyst | Cairo, Egypt</p>
          <p className="mt-2 text-xs text-slate-500 font-mono">© {currentYear} {profile.name}. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-3">
          {[
            [profile.github, GitBranch, "GitHub"],
            [profile.linkedin, Network, "LinkedIn"],
            [`mailto:${profile.email}`, Mail, "Email"],
          ].map(([href, Icon, label]) => (
            <Link key={label as string} href={href as string} aria-label={label as string} className="rounded-full border border-white/10 p-3 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-cyan-400/10">
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
