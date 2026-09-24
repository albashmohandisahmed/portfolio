import { projects } from "@/data/portfolio";

type Project = (typeof projects)[number];

const projectImagesBySlug: Record<string, string> = {
  "baladna-production-distribution-dashboard": "/projects/Baladna Production & Distribution Dashboard.png",
  "electrical-shop-analysis-dashboard": "/projects/Shop Analysis Project.png",
  "hr-attrition-dashboard": "/projects/Hr Analysis.png",
  "mdb-movies-analysis-dashboard": "/projects/imdb project.png",
  "misuo-sales-dashboard": "/projects/MISUO Dashboard.png",
  "salla-call-center-performance-dashboard": "/projects/Salla Dashboard.png",
  "services-revenue-analytics-dashboard": "/projects/Services Revenue Analytics Dashboard.png",
  "supermarket-sales-retail-analytics-dashboard": "/projects/Supermarket Sales & Retail Analytics Dashboard.png",
};

export function getProjectImageUrl(project: Pick<Project, "imageUrl" | "slug">) {
  return project.imageUrl ?? projectImagesBySlug[project.slug];
}
