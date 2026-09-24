import {
  BarChart3,
  FileCheck2,
  LineChart,
  Rocket,
  Sparkles,
  Workflow,
} from "lucide-react";
import { PageVideoShell } from "@/components/page-video-shell";
import { ProjectGallery } from "@/components/project-gallery";
import { projects } from "@/data/portfolio";

export const metadata = {
  title: "Projects | Ahmed Mohamed Abd El Hamid — Business Intelligence & Analytics Case Studies",
  description:
    "Explore Ahmed's complete portfolio of interactive Power BI, Tableau, Excel, and SQL dashboard case studies built on real operational data.",
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

export default function ProjectsPage() {
  const powerBiCount = projects.filter((p) => p.category === "Power BI").length;
  const tableauCount = projects.filter((p) => p.category === "Tableau").length;
  const excelCount = projects.filter((p) => p.category === "Excel").length;
  const pdfReportsCount = projects.filter((p) => p.reportUrl).length;

  return (
    <PageVideoShell
      className="projects-index-shell"
      poster="/05-featured-projects.jpg"
      video="/videos/Projects.mp4"
    >
      {/* Top Header Banner */}
      <section className="container-shell mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-12 text-center flex flex-col items-center">
        <div className="mb-4">
          <Kicker icon={Rocket} label="02 / Portfolio Proof · Analytics Case Studies" />
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl drop-shadow-2xl">
          <GradientTitle>Business Intelligence Case Studies</GradientTitle>
        </h1>

        <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
          Interactive dashboards, ETL pipelines, and stakeholder reports built on multi-million row business datasets in Power BI, Tableau, Excel, SQL, and Python.
        </p>

        {/* Highlight KPI Stat Cards */}
        <div className="mt-10 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-5 rounded-2xl border border-cyan-400/30 bg-slate-900/80 backdrop-blur-xl shadow-lg flex flex-col justify-between hover:border-cyan-400/60 transition">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.68rem] uppercase font-bold tracking-wider text-cyan-400">
                Total Projects
              </span>
              <BarChart3 className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white">{projects.length}</span>
              <span className="block text-xs text-slate-400 mt-0.5">Verified Case Studies</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-amber-400/30 bg-slate-900/80 backdrop-blur-xl shadow-lg flex flex-col justify-between hover:border-amber-400/60 transition">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.68rem] uppercase font-bold tracking-wider text-amber-400">
                Power BI
              </span>
              <Workflow className="h-4 w-4 text-amber-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white">{powerBiCount}</span>
              <span className="block text-xs text-slate-400 mt-0.5">DAX &amp; Power Query</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-purple-400/30 bg-slate-900/80 backdrop-blur-xl shadow-lg flex flex-col justify-between hover:border-purple-400/60 transition">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.68rem] uppercase font-bold tracking-wider text-purple-400">
                Tableau &amp; Excel
              </span>
              <LineChart className="h-4 w-4 text-purple-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white">{tableauCount + excelCount}</span>
              <span className="block text-xs text-slate-400 mt-0.5">HR &amp; Sales Analytics</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-emerald-400/30 bg-slate-900/80 backdrop-blur-xl shadow-lg flex flex-col justify-between hover:border-emerald-400/60 transition">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.68rem] uppercase font-bold tracking-wider text-emerald-400">
                PDF Reports
              </span>
              <FileCheck2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white">{pdfReportsCount}</span>
              <span className="block text-xs text-slate-400 mt-0.5">Verifiable Reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Project Gallery Component */}
      <ProjectGallery />
    </PageVideoShell>
  );
}
