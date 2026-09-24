"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles, X } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { projectCategories, projects, type ProjectCategory } from "@/data/portfolio";
import { cn } from "@/components/utils";

export function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category check
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;

      // Search check
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q)) ||
        project.metrics.some((m) => m.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    projectCategories.forEach((cat) => {
      counts[cat] = projects.filter((p) => p.category === cat).length;
    });
    return counts;
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
      {/* Search Bar & Filters Header */}
      <div className="mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-xl">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by keyword (e.g. Sales, DAX, SLA, Tableau)..."
            className="w-full rounded-xl border border-white/10 bg-slate-950/80 pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/60 transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 px-2 whitespace-nowrap">
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
          <span>
            Showing <strong className="text-cyan-300">{filteredProjects.length}</strong> of {projects.length} Case Studies
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div
        className="mb-10 flex flex-wrap gap-2 sm:gap-3"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {(["All", ...projectCategories] as const).map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts[category] || 0;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-mono font-semibold transition-all duration-300 shadow-md",
                isActive
                  ? "border-cyan-400 bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,217,255,0.4)] scale-105"
                  : "border-white/10 bg-slate-900/80 text-slate-300 hover:border-cyan-400/40 hover:text-white"
              )}
              aria-pressed={isActive}
            >
              <span>{category}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[0.65rem] font-bold",
                  isActive
                    ? "bg-slate-950 text-cyan-300"
                    : "bg-white/10 text-slate-400"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
          <p className="text-lg font-bold text-white">
            No project matched &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-sm text-slate-400 mt-2">
            Try searching for other keywords like &quot;Power BI&quot;, &quot;Excel&quot;, &quot;Sales&quot;, &quot;HR&quot;, or reset the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="mt-6 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-xs font-mono font-semibold text-cyan-300 hover:bg-cyan-400 hover:text-slate-950 transition"
          >
            Reset Filters &amp; Search
          </button>
        </div>
      )}
    </div>
  );
}
