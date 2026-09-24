"use client";

import { motion } from "framer-motion";
import { BarChart3, Database, LineChart, MessageSquareText } from "lucide-react";
import { InteractiveTilt } from "@/components/interactive-tilt";

const roles = [
  {
    title: "Data Analyst",
    icon: BarChart3,
    focus: "EDA, statistical analysis, root cause analysis, KPI reporting, and data storytelling",
    proof: "Python, SQL, Pandas, NumPy, Matplotlib, Seaborn, Plotly, and Jupyter Notebook",
  },
  {
    title: "Business Intelligence Analyst",
    icon: LineChart,
    focus: "Power BI, Tableau, Excel dashboards, DAX, Power Query, KPI development, and executive reporting",
    proof: "Salla call center dashboard, HR attrition dashboard, and Misuo sales dashboard",
  },
  {
    title: "Business Analyst",
    icon: MessageSquareText,
    focus: "Requirements gathering, stakeholder communication, dashboard development, and business requirements",
    proof: "Converts operational questions into clear KPIs, segmentation, and decision-ready insights",
  },
  {
    title: "Junior Data Scientist",
    icon: Database,
    focus: "Feature engineering, preprocessing, regression, classification, clustering, and model evaluation",
    proof: "Computer Science foundation with ML, AI, statistics, and database systems coursework",
  },
];

export function RoleFitSection() {
  return (
    <section className="container-shell py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <span className="section-kicker">Job target</span>
          <h2 className="heading-lg">Built to communicate the exact roles Ahmed is targeting.</h2>
          <p className="muted-copy mt-5">
            The portfolio is structured for hiring managers looking for a Data Analyst or BI Analyst who can clean data,
            build dashboards, report KPIs, communicate with stakeholders, and apply machine learning foundations when useful.
          </p>
          <div className="mt-8 grid gap-3">
            {["Power BI, DAX, Power Query dashboard development", "SQL, Python, EDA, statistical analysis", "Excel, Tableau, KPI reporting, data storytelling", "Business requirements and stakeholder communication"].map((item, index) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.045] p-4"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                {index % 2 === 0 ? <LineChart className="h-5 w-5 text-cyan-100" /> : <MessageSquareText className="h-5 w-5 text-mint" />}
                <span className="text-sm font-semibold text-slate-200">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <InteractiveTilt key={role.title} className="media-frame cinema-card hover-lift rounded-3xl">
                <motion.article
                  className="relative min-h-64 p-6"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300/10 text-cyan-100">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[.16em] text-slate-500">role fit</span>
                  </div>
                  <h3 className="relative z-10 mt-6 text-2xl font-semibold text-white">{role.title}</h3>
                  <p className="relative z-10 mt-3 text-sm leading-6 text-slate-300">{role.focus}</p>
                  <p className="relative z-10 mt-5 rounded-2xl border border-white/10 bg-black/20 p-3 text-xs leading-6 text-cyan-100">{role.proof}</p>
                </motion.article>
              </InteractiveTilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}
