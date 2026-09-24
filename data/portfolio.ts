import { BarChart3, BrainCircuit, CloudCog, Database, FileSpreadsheet, LineChart, MessageSquareText, Network, Sigma, Workflow } from "lucide-react";

export const profile = {
  name: "Ahmed Mohamed Abd El Hamid",
  title: "Data Analyst | Business Intelligence Analyst",
  headline: "Turning Business Data Into Decisions.",
  subtitle:
    "Data Analyst and Business Intelligence Analyst in Cairo, building dashboards, ETL pipelines, KPI reports, and analysis workflows with Python, SQL, Excel, Power BI, Tableau, DAX, and Power Query.",
  intro:
    "Recent Computer Science graduate targeting Data Analyst and Business Intelligence Analyst roles. Built portfolio dashboards across call center performance, HR attrition, and sales analytics. Skilled in data validation, ETL, data cleaning, EDA, KPI reporting, stakeholder communication, machine learning fundamentals, and translating findings into business insights.",
  email: "albashmohandisahmed@gmail.com",
  phone: "+20 1009480722",
  location: "Cairo, Egypt",
  linkedin: "https://linkedin.com/in/ahmed-mohamed-abd-el-hamid-ali",
  github: "https://github.com/albashmohandisahmed",
  resumeUrl: "/Ahmed_Mohamed_Abd_El_Hamid_CV.pdf",
};

export const stats = [
  { value: "8", label: "Portfolio dashboards" },
  { value: "1.74M", label: "Calls analyzed" },
  { value: "1,480", label: "HR records studied" },
  { value: "1.1M", label: "Sales reported" },
];

export const skills = [
  { name: "Python", group: "Programming", level: 86, icon: BrainCircuit },
  { name: "SQL", group: "Querying", level: 88, icon: Database },
  { name: "Power BI", group: "BI", level: 90, icon: BarChart3 },
  { name: "DAX", group: "BI", level: 84, icon: Sigma },
  { name: "Tableau", group: "BI", level: 82, icon: LineChart },
  { name: "Excel", group: "BI", level: 90, icon: FileSpreadsheet },
  { name: "Power Query", group: "ETL", level: 88, icon: Workflow },
  { name: "Pandas / NumPy", group: "Python Data", level: 84, icon: BarChart3 },
  { name: "Matplotlib / Seaborn / Plotly", group: "Visualization", level: 82, icon: LineChart },
  { name: "EDA", group: "Analysis", level: 90, icon: Network },
  { name: "KPI Reporting", group: "Business Analysis", level: 88, icon: BarChart3 },
  { name: "Stakeholder Communication", group: "Business Analysis", level: 86, icon: MessageSquareText },
  { name: "Data Validation & Cleaning", group: "Data Quality", level: 90, icon: Workflow },
  { name: "ETL / Data Pipelines", group: "Engineering", level: 84, icon: CloudCog },
  { name: "Scikit-learn", group: "Machine Learning", level: 76, icon: BrainCircuit },
  { name: "Regression / Classification / Clustering", group: "Machine Learning", level: 74, icon: Sigma },
  { name: "SQL Server / MySQL", group: "Databases", level: 82, icon: Database },
  { name: "Git / GitHub / Jupyter / VS Code / Linux", group: "Tools", level: 80, icon: Workflow },
];

export const experiences = [
  {
    period: "01/2026 - 02/2026",
    role: "Power BI Retail Analytics Project",
    company: "Super Market Retail Analysis",
    summary:
      "Built a Power BI retail analytics dashboard connecting sales, cost, profit, products, stores, customers, returns, regions, and calendar data.",
    achievements: [
      "Analyzed sales performance, product profitability, and store efficiency.",
      "Tracked gross margin logic, return rates, and month-over-month KPI growth.",
      "Built multi-level executive reporting across sales, product, store, and customer dimensions.",
    ],
    technologies: ["Power BI", "Power Query", "DAX", "Data Modeling", "Retail Analytics"],
  },
  {
    period: "02/2026 - 03/2026",
    role: "Power BI Inventory & Financial Project",
    company: "Electrical Shop Business Analysis",
    summary:
      "Developed a Power BI dashboard for an electrical shop joining sales, purchases, inventory, operations, cash flow, and bank transactions.",
    achievements: [
      "Analyzed gross profit, inventory quantity/value, transfers, and shortages.",
      "Monitored daily sales timing patterns, cash inflows, outflows, and net cash flow.",
      "Delivered a three-page dashboard connecting operational activity to financial health.",
    ],
    technologies: ["Power BI", "Power Query", "DAX", "Inventory Analytics", "Cash Flow"],
  },
  {
    period: "03/2026 - 04/2026",
    role: "Operations BI Dashboard Project",
    company: "Baladna Production & Distribution",
    summary:
      "Created a Power BI operations dashboard transforming sales, production, distribution, products, categories, regions, and target metrics.",
    achievements: [
      "Reported 839M total sales quantity and 690M total production quantity.",
      "Monitored 43M distribution quantity and 107M target remaining.",
      "Aligned Sales and Production daily structures under a shared calendar model.",
    ],
    technologies: ["Power BI", "Power Query", "DAX", "Operations Analytics", "Target Monitoring"],
  },
  {
    period: "04/2026 - 05/2026",
    role: "Services Revenue Analytics Project",
    company: "Services Business Performance Dashboard",
    summary:
      "Designed a Power BI services dashboard analyzing revenue, service volume, hours, active clients, branches, regions, and department contribution.",
    achievements: [
      "Modeled service data, branch data, and calendar tables into a unified schema.",
      "Engineered KPIs for revenue per service, revenue per client, and active clients.",
      "Evaluated branch performance, department contribution, and client rankings.",
    ],
    technologies: ["Power BI", "Power Query", "DAX", "Services Analytics", "Client Analysis"],
  },
  {
    period: "05/2026 - 06/2026",
    role: "Power BI Call Center Project",
    company: "Salla Call Center Performance Dashboard",
    summary:
      "Developed stakeholder-ready call center reporting with Power BI, DAX, Power Query, and data modeling across 16 agents.",
    achievements: [
      "Reported 1.74M offered calls and 1.72M handled calls.",
      "Surfaced 91.06% SLA, 1.32% abandonment, 9.22-second ASA, and 71.60% forecast accuracy.",
      "Engineered a Power Query and DAX reporting pipeline across 16 agents.",
    ],
    technologies: ["Power BI", "DAX", "Power Query", "Data Modeling", "KPI Reporting"],
  },
  {
    period: "06/2026 - 07/2026",
    role: "Media & Entertainment Analytics Project",
    company: "MDb Movies Financial & Audience Dashboard",
    summary:
      "Built a Power BI movie analytics dashboard connecting revenue, budget, profit, ROI, ratings, genres, directors, cast, and release years.",
    achievements: [
      "Reported 528.25bn total revenue, 170.52bn budget, and 357.73bn profit (209.79% ROI).",
      "Created interactive filter dimensions for genre, release year, director, and title.",
      "Analyzed budget vs revenue, genre contribution, and audience rating signals.",
    ],
    technologies: ["Power BI", "Power Query", "DAX", "Movie Analytics", "Data Visualization"],
  },
  {
    period: "07/2026 - 08/2026",
    role: "Tableau HR Analytics Project",
    company: "HR Attrition Dashboard",
    summary:
      "Created an HR attrition dashboard in Tableau to support workforce planning and identify high-risk employee segments.",
    achievements: [
      "Analyzed 1,480 employees and 238 departures.",
      "Reported 16.08% overall attrition.",
      "Segmented attrition by role, age, and satisfaction, including 35.77% visible attrition for ages 18-25.",
    ],
    technologies: ["Tableau", "HR Analytics", "Segmentation", "Data Storytelling"],
  },
  {
    period: "08/2026 - 09/2026",
    role: "Excel Sales Analytics Project",
    company: "Misuo Sales Dashboard",
    summary:
      "Developed an Excel sales dashboard using Power Query and Pivot Tables to analyze sales, delivery, and regional trends.",
    achievements: [
      "Reported 1,100,228 sales across 109 orders.",
      "Calculated an average selling price of 10,478.",
      "Analyzed customer type, product performance, regional trends, and 69.72% on-time delivery.",
    ],
    technologies: ["Excel", "Power Query", "Pivot Tables", "Sales Analytics"],
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Science",
    school: "Faculty of Computer and Artificial Intelligence",
    period: "09/2019 - 07/2023",
    details:
      "GPA: 3.4, Graduation with Honors. Relevant coursework: Database Systems, Statistics, Machine Learning, Artificial Intelligence.",
  },
];

export const certifications = [
  "Google Data Analytics Professional Certificate — 03/2026",
  "Google Advanced Data Analytics Professional Certificate — 03/2026",
  "IBM Data Analyst Professional Certificate — 04/2026",
  "Microsoft Power BI Data Analyst Professional Certificate — 04/2026",
  "Data Analysis with Excel Power Tools, DataCamp — 04/2026",
  "Professional Data Analyst Diploma — 08/2026",
];

export const languages = ["Arabic: Native", "English: Professional"];

export type ProjectCategory = "Power BI" | "Tableau" | "Excel" | "Data Analysis" | "Business Intelligence" | "Machine Learning";
export const projectCategories: ProjectCategory[] = ["Power BI", "Tableau", "Excel", "Data Analysis", "Business Intelligence", "Machine Learning"];

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  technologies: string[];
  github: string;
  demo: string;
  imageUrl?: string;
  reportUrl?: string;
  metrics: string[];
  dataset: string;
  preprocessing: string;
  architecture: string;
  evaluation: string;
  impact: string;
  challenges: string;
};

export const projects: Project[] = [
  {
    slug: "supermarket-sales-retail-analytics-dashboard",
    title: "Super Market Analysis",
    category: "Power BI",
    summary:
      "Power BI retail analytics dashboard connecting sales, cost, profit, products, stores, customers, returns, regions, and calendar data into one business view.",
    problem:
      "Supermarket data was split across sales, products, customers, stores, returns, regions, and calendar tables, making it difficult to understand performance beyond total sales.",
    approach:
      "Built a connected data model around Sales and Returns with product, customer, store, region, and calendar dimensions, then analyzed sales performance, product profitability, store efficiency, customer behavior, and returns.",
    result:
      "Created a three-level dashboard covering executive sales overview, products and store profitability, and customer returns analysis with month-over-month KPI comparisons.",
    technologies: ["Power BI", "Power Query", "DAX", "Data Modeling", "Retail Analytics"],
    github: "https://github.com/albashmohandisahmed/supermarket-sales-retail-analytics-dashboard",
    demo: "/Supermarket Sales & Retail Analytics Dashboard.pdf",
    imageUrl: "/projects/Supermarket Sales & Retail Analytics Dashboard.png",
    reportUrl: "/Supermarket Sales & Retail Analytics Dashboard.pdf",
    metrics: ["Sales vs cost", "Gross margin", "Return rate"],
    dataset:
      "Retail supermarket dataset covering sales, products, customers, stores, returns, regions, and calendar dimensions.",
    preprocessing:
      "Prepared the supermarket tables in Power Query, connected fact and dimension tables, and created model-ready structures for time, region, product, customer, store, and return analysis.",
    architecture:
      "Power BI semantic model centered on Sales and Returns facts with DAX measures for total sales, total cost, gross profit, gross margin, sales growth, active customers, active products, and last-month comparisons.",
    evaluation:
      "Checked KPI totals, margin logic, return-rate calculations, product/store rankings, and month-over-month card references for business consistency.",
    impact:
      "Turned scattered supermarket data into an integrated decision view that explains how sales, profitability, products, stores, customers, and returns interact.",
    challenges:
      "Moved the analysis away from a single total sales number and toward a fuller business model that shows whether revenue volume is actually converting into profit.",
  },
  {
    slug: "electrical-shop-analysis-dashboard",
    title: "Electrical Shop Analysis",
    category: "Power BI",
    summary:
      "Power BI dashboard for an electrical shop, joining sales, purchases, inventory, operations, finance, cash flow, bank transactions, and sales timing.",
    problem:
      "Electrical shop data was spread across operational and financial sources, so sales alone could not explain inventory movement, cash flow, or business health.",
    approach:
      "Analyzed sales, cost, gross profit, inventory quantity and value, transfers, additions, shortages, revenue, expenses, cash movement, bank transactions, and sales patterns by time of day.",
    result:
      "Built a three-page dashboard for executive monitoring, sales and operations, and finance and cash flow so operational activity can be compared with financial outcomes.",
    technologies: ["Power BI", "Power Query", "DAX", "Inventory Analytics", "Cash Flow Analysis"],
    github: "https://github.com/albashmohandisahmed/electrical-shop-analysis-dashboard",
    demo: "/Shop Analysis Project.pdf",
    imageUrl: "/projects/Shop Analysis Project.png",
    reportUrl: "/Shop Analysis Project.pdf",
    metrics: ["Gross margin", "Inventory value", "Net cash flow"],
    dataset:
      "Electrical shop business data covering sales, purchases, inventory, transfers, revenue, expenses, cash transactions, bank transactions, and transaction timing.",
    preprocessing:
      "Cleaned and connected operational and financial tables, prepared inventory movement fields, standardized transaction categories, and created time-period dimensions for daily sales analysis.",
    architecture:
      "Power BI model with measures for sales, cost, gross profit, gross margin, stock quantity, inventory value, cash inflow, cash outflow, net cash flow, and AM/PM sales behavior.",
    evaluation:
      "Validated sales-to-cost logic, inventory balances, transfer/addition/shortage measures, cash flow totals, and time-period breakdowns.",
    impact:
      "Gave the shop a unified view of sales, inventory, operations, expenses, cash movement, and banking activity instead of isolated reports.",
    challenges:
      "Connected operational performance to financial position so the dashboard could show whether shop activity is reflected in cash and bank movement.",
  },
  {
    slug: "baladna-production-distribution-dashboard",
    title: "Baladna Production & Distribution",
    category: "Power BI",
    summary:
      "Power BI operations dashboard transforming Baladna sales, production, distribution, products, categories, regions, and targets into business insights.",
    problem:
      "Sales, production, and distribution data were distributed across sources, making it hard to compare performance, locate gaps, and understand target progress.",
    approach:
      "Used Power Query to restructure daily data, appended sales and production tables, built a shared calendar, and created DAX KPIs for sales, production, distribution, products, categories, regions, and targets.",
    result:
      "Reported 839M total sales quantity, 690M total production quantity, 43M total distribution quantity, and 107M target remaining across executive, analysis, and monitoring pages.",
    technologies: ["Power BI", "Power Query", "DAX", "Operations Analytics", "Target Monitoring"],
    github: "https://github.com/albashmohandisahmed/baladna-production-distribution-dashboard",
    demo: "/Baladna Production & Distribution Dashboard_compressed.pdf",
    imageUrl: "/projects/Baladna Production & Distribution Dashboard.png",
    reportUrl: "/Baladna Production & Distribution Dashboard_compressed.pdf",
    metrics: ["839M sales qty", "690M production qty", "107M target remaining"],
    dataset:
      "Baladna operational data covering sales, production, distribution, products, categories, regions, dates, and target values.",
    preprocessing:
      "Transformed daily operational files in Power Query, appended Sales and Production structures, and built a common calendar to align all performance views on the same timeline.",
    architecture:
      "Power BI model with DAX measures for sales quantity, production quantity, distribution quantity, product/category performance, regional distribution, target remaining, and daily trends.",
    evaluation:
      "Reviewed totals, trend logic, top-product rankings, regional distributions, and target remaining calculations while noting that target versus dispatch definitions need business confirmation before service-level interpretation.",
    impact:
      "Shifted the work from raw operational data to a dashboard that helps identify gaps, focus investigations, and monitor regional target progress.",
    challenges:
      "Made the current performance view useful while clearly separating confirmed KPIs from metrics that require stronger business definitions, such as target versus dispatch.",
  },
  {
    slug: "services-revenue-analytics-dashboard",
    title: "Services Revenue Analytics",
    category: "Power BI",
    summary:
      "Power BI services dashboard analyzing revenue, service volume, hours, active clients, branches, regions, departments, and client contribution.",
    problem:
      "Services business data covered clients, branches, regions, departments, dates, and service activity, but needed a model that could explain revenue and operational performance together.",
    approach:
      "Modeled Services_data, Branch_data, and a calendar table, then created KPIs for total revenue, total services, total hours, active clients, average revenue per service, and average revenue per client.",
    result:
      "Delivered a three-page dashboard for executive overview, branch and service performance, and client/detail analysis while making data limitations around cost, profit, budget, and targets explicit.",
    technologies: ["Power BI", "Power Query", "DAX", "Services Analytics", "Client Analysis"],
    github: "https://github.com/albashmohandisahmed/services-revenue-analytics-dashboard",
    demo: "/Services Revenue Analytics Dashboard.pdf",
    imageUrl: "/projects/Services Revenue Analytics Dashboard.png",
    reportUrl: "/Services Revenue Analytics Dashboard.pdf",
    metrics: ["Total revenue", "Total services", "Active clients"],
    dataset:
      "Services business dataset covering services, clients, branches, regions, departments, dates, revenue, and operational hours.",
    preprocessing:
      "Prepared service and branch tables, connected them through a clean data model, and added a calendar structure for time-based revenue and service analysis.",
    architecture:
      "Power BI model with DAX measures for total revenue, total services, total hours, active clients, revenue per service, revenue per client, branch performance, department contribution, and top clients.",
    evaluation:
      "Validated revenue totals, service counts, hour calculations, branch and region splits, department/service contribution, and client rankings against the available data fields.",
    impact:
      "Converted service activity into a clear view of revenue distribution, operational workload, and client contribution while keeping KPI limits transparent.",
    challenges:
      "Kept the dashboard honest by avoiding profit, margin, budget, and target KPIs that cannot be calculated from the available data.",
  },
  {
    slug: "salla-call-center-performance-dashboard",
    title: "Salla Call Center Performance Dashboard",
    category: "Power BI",
    summary:
      "Stakeholder-ready Power BI dashboard for call center performance, SLA monitoring, abandonment, forecast accuracy, and agent-level reporting.",
    problem:
      "Call center stakeholders needed a clear operational view of offered calls, handled calls, SLA, abandonment, ASA, forecast accuracy, and agent performance.",
    approach:
      "Built a Power Query and DAX reporting pipeline, modeled call center data across 16 agents, and designed KPI views for operational decision-making.",
    result:
      "Reported 1.74M offered calls, 1.72M handled calls, 91.06% SLA, 1.32% abandonment, 9.22-second ASA, and 71.60% forecast accuracy.",
    technologies: ["Power BI", "DAX", "Power Query", "Data Modeling", "KPI Reporting"],
    github: "https://github.com/albashmohandisahmed/salla-call-center-performance-dashboard",
    demo: "/Salla Dashboard.pdf",
    imageUrl: "/projects/Salla Dashboard.png",
    metrics: ["1.74M offered calls", "91.06% SLA", "1.32% abandonment"],
    dataset: "Call center performance data covering offered calls, handled calls, SLA, abandonment, ASA, forecast accuracy, and agent-level activity.",
    preprocessing:
      "Cleaned and transformed call center records with Power Query, standardized KPI fields, validated call status categories, and prepared model-ready tables.",
    architecture:
      "Power BI semantic model with DAX measures for SLA, abandonment rate, ASA, handled calls, forecast accuracy, and agent performance.",
    evaluation:
      "Validated dashboard outputs against business KPIs, checked totals and rate calculations, and reviewed stakeholder-facing metrics for clarity.",
    impact:
      "Created a single operational reporting view for call center performance, agent monitoring, and service-level decision support.",
    challenges:
      "Balanced high-level executive KPIs with detailed agent-level reporting while keeping the dashboard readable and stakeholder-ready.",
  },
  {
    slug: "mdb-movies-analysis-dashboard",
    title: "MDb Movies Analysis",
    category: "Power BI",
    summary:
      "Power BI movie analytics dashboard connecting revenue, budget, profit, ROI, ratings, genres, directors, cast, popularity, and release years into one analytical view.",
    problem:
      "Movie data included financial, audience, creative, and release attributes, but the raw tables did not clearly explain which factors were connected to movie success.",
    approach:
      "Converted raw movie records into KPIs and analysis views for financial performance, profitability trends, budget versus revenue, top profitable movies, genres, directors, ratings, audience metrics, and cast-level revenue exploration.",
    result:
      "Reported 528.25bn total revenue, 170.52bn total budget, 357.73bn total profit, and 209.79% ROI, with interactive filtering by movie title, genre, release year, and director.",
    technologies: ["Power BI", "Power Query", "DAX", "Movie Analytics", "Data Visualization"],
    github: "https://github.com/albashmohandisahmed/mdb-movies-analysis-dashboard",
    demo: "/imdb project.pdf",
    imageUrl: "/projects/imdb project.png",
    reportUrl: "/imdb project.pdf",
    metrics: ["528.25bn revenue", "357.73bn profit", "209.79% ROI"],
    dataset:
      "Movie dataset covering movies, revenue, budget, profit, ratings, genres, directors, cast, popularity, average runtime, and release years.",
    preprocessing:
      "Prepared movie fields for KPI analysis, organized financial measures, normalized categorical dimensions such as genres, directors, and cast, and created filter-ready structures for title, genre, release year, and director exploration.",
    architecture:
      "Power BI model with DAX measures for total revenue, total budget, total profit, ROI, vote average, popularity, runtime, profit trends, top profitable movies, genre revenue, director revenue, and cast-level revenue contribution.",
    evaluation:
      "Validated financial totals, ROI logic, budget versus revenue comparisons, top movie rankings, genre/director splits, rating distribution, and drill-down filtering behavior.",
    impact:
      "Turned movie data into a business-style analytics experience that explains both financial performance and audience signals behind movie success.",
    challenges:
      "Kept the dashboard focused on meaningful context instead of isolated charts, connecting Budget, Revenue, Profit, ROI, Movies, Genres, Directors, Cast, Ratings, and Popularity in one narrative.",
  },
  {
    slug: "hr-attrition-dashboard",
    title: "HR Attrition Dashboard",
    category: "Tableau",
    summary:
      "Tableau HR analytics dashboard analyzing employee attrition by role, age, satisfaction, and workforce planning segments.",
    problem:
      "HR stakeholders needed to understand attrition patterns across employee demographics, job roles, age groups, and satisfaction segments.",
    approach:
      "Created a Tableau dashboard for 1,480 employees and 238 departures, segmenting attrition by role, age, and satisfaction.",
    result:
      "Reported 16.08% overall attrition and identified a high visible attrition rate of 35.77% among employees aged 18-25.",
    technologies: ["Tableau", "Human Resources Analytics", "Data Storytelling", "Segmentation"],
    github: "https://github.com/albashmohandisahmed/hr-attrition-dashboard",
    demo: "/projects/Hr Analysis.png",
    imageUrl: "/projects/Hr Analysis.png",
    metrics: ["1,480 employees", "238 departures", "16.08% attrition"],
    dataset:
      "Human resources dataset containing employee records, attrition status, age bands, roles, satisfaction indicators, and workforce attributes.",
    preprocessing:
      "Prepared HR fields for segmentation, validated departure counts, created attrition calculations, and organized views by role, age, and satisfaction.",
    architecture:
      "Tableau dashboard with attrition KPI cards, segmentation views, role analysis, age group analysis, and workforce planning visuals.",
    evaluation:
      "Checked employee totals, departure counts, attrition rates, and segment-level calculations for consistency and business interpretability.",
    impact:
      "Supported workforce planning by surfacing attrition risk patterns and making HR insights easier to communicate.",
    challenges:
      "Converted HR records into clear business narratives that explain where attrition is concentrated and why teams should investigate.",
  },
  {
    slug: "misuo-sales-dashboard",
    title: "Misuo Sales Dashboard",
    category: "Excel",
    summary:
      "Excel dashboard using Power Query and Pivot Tables to analyze sales, orders, customer type, product performance, regional trends, and delivery.",
    problem:
      "Sales performance data needed to be transformed into an accessible dashboard for revenue, orders, customer segments, and delivery performance.",
    approach:
      "Developed an Excel analytics workflow using Power Query and Pivot Tables to clean, model, summarize, and visualize sales performance.",
    result:
      "Reported 1,100,228 sales across 109 orders, an average selling price of 10,478, and 69.72% on-time delivery.",
    technologies: ["Excel", "Power Query", "Pivot Tables", "Sales Analytics", "Dashboard Development"],
    github: "https://github.com/albashmohandisahmed/misuo-sales-dashboard",
    demo: "/projects/MISUO Dashboard.png",
    imageUrl: "/projects/MISUO Dashboard.png",
    metrics: ["1,100,228 sales", "109 orders", "69.72% on-time delivery"],
    dataset:
      "Sales dataset covering orders, customers, products, regions, sales totals, average selling price, and delivery performance.",
    preprocessing:
      "Used Power Query to clean sales records, standardize categories, prepare order-level summaries, and support Pivot Table analysis.",
    architecture:
      "Excel dashboard with Power Query transformations, Pivot Tables, KPI cards, customer segmentation, product views, and regional trend analysis.",
    evaluation:
      "Validated sales totals, order counts, average selling price, and delivery percentage against dashboard calculations.",
    impact:
      "Converted raw sales data into practical insights about customer behavior, product performance, regional trends, and delivery reliability.",
    challenges:
      "Designed an Excel-based reporting workflow that stays understandable while covering multiple sales and delivery dimensions.",
  },
];

export const workflow = [
  { label: "Collect", icon: Database },
  { label: "Clean", icon: Workflow },
  { label: "Analyze", icon: BarChart3 },
  { label: "Model", icon: BrainCircuit },
  { label: "Report", icon: LineChart },
];

export const philosophy = [
  "Start with business questions, then choose the right analysis.",
  "Make data quality visible before building dashboards.",
  "Turn KPIs into clear decisions for stakeholders.",
  "Use machine learning carefully when it improves the business answer.",
];
