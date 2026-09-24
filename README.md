# 📊 Data Science & Business Intelligence Portfolio

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Power BI](https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black)
![Tableau](https://img.shields.io/badge/Tableau-E97627?style=for-the-badge&logo=tableau&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-Database-blue?style=for-the-badge)
![Author](https://img.shields.io/badge/Author-Ahmed_Mohamed-cyan?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

---

## 📌 Executive Overview

Welcome to the official repository of **Ahmed Mohamed Abd El Hamid's Data Science & Business Intelligence Portfolio**.

This web platform is designed for enterprise stakeholders, hiring managers, and data engineering leads. Built using **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**, it features **8 end-to-end data analytics case studies** spanning retail sales, call center operations telemetry, supply chain production, HR workforce attrition, film box-office profitability, service revenue, and shop cash flow analysis.

> *"Turning Business Data Into Decisions."*

---

## 🌟 Key Platform Features & Interactive Modules

- 🚀 **Cinematic Glassmorphism UI**: High-impact dark mode aesthetic with video shells, ambient grid animations, and fluid responsive typography.
- 📊 **8 Practical BI Case Studies**: Deep-dive project pages equipped with Star Schema data modeling diagrams, DAX code blocks, verified KPI cards, and media links.
- 🗂️ **Categorized Project Filtering**: Interactive filtering across **Power BI**, **Tableau**, **Excel**, **Data Analysis**, and **Business Intelligence**.
- 🧪 **Interactive Analytics Lab (`/lab`)**: Hands-on DAX and statistical parameter simulator demonstrating retail margin thresholds, SLA compliance curves, and workforce attrition risk.
- 📄 **Print-Optimized CV & PDF Download (`/resume`)**: Executive resume layout with `@media print` CSS styling for 1-click clean PDF export.
- 📬 **Direct Stakeholder Contact Channel (`/contact`)**: Interactive contact form with response time SLA indicators and direct communication links.

---

## 🔗 Portfolio Case Studies & GitHub Repositories

Each of the **8 portfolio projects** is deployed as an independent, dedicated repository containing full source code, DAX measures, PDF executive reports, video walkthroughs, and dashboard snapshots:

| # | Project Title | Primary Stack | Highlights & Verified Metrics | Dedicated GitHub Repository |
|---|---------------|---------------|-------------------------------|-----------------------------|
| 1 | **Super Market Analysis** | Power BI, DAX, Power Query | Sales vs Cost, Gross Margin %, Return Rates | 🔗 [View Repo](https://github.com/albashmohandisahmed/supermarket-sales-retail-analytics-dashboard) |
| 2 | **Electrical Shop Business Analysis** | Power BI, DAX, Cash Flow | Inventory Valuation, Gross Margin, Net Cash Flow | 🔗 [View Repo](https://github.com/albashmohandisahmed/electrical-shop-analysis-dashboard) |
| 3 | **Baladna Production & Distribution** | Power BI, Supply Chain | 839M Sales Qty, 690M Production Qty, 107M Target Gap | 🔗 [View Repo](https://github.com/albashmohandisahmed/baladna-production-distribution-dashboard) |
| 4 | **Services Revenue Analytics** | Power BI, Service KPIs | Total Revenue, Billable Hours, Revenue/Client | 🔗 [View Repo](https://github.com/albashmohandisahmed/services-revenue-analytics-dashboard) |
| 5 | **Salla Call Center Performance** | Power BI, Telemetry | 1.74M Offered Calls, 91.06% SLA, 1.32% Abandonment | 🔗 [View Repo](https://github.com/albashmohandisahmed/salla-call-center-performance-dashboard) |
| 6 | **MDb Movies Analysis** | Power BI, Financial ROI | $528.25B Revenue, $357.73B Net Profit, 209.79% ROI | 🔗 [View Repo](https://github.com/albashmohandisahmed/mdb-movies-analysis-dashboard) |
| 7 | **HR Workforce Attrition Analytics** | Tableau, Segmentation | 1,480 Employees, 16.08% Attrition Rate | 🔗 [View Repo](https://github.com/albashmohandisahmed/hr-attrition-dashboard) |
| 8 | **Misuo Sales Dashboard** | Excel, Power Query, Pivots | $1,100,228 Revenue, 109 Orders, 69.72% On-Time Delivery | 🔗 [View Repo](https://github.com/albashmohandisahmed/misuo-sales-dashboard) |

---

## 🛠️ Technology Stack & Analytical Ecosystem

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND PLATFORM                             │
│       Next.js 16 (App Router)  │  TypeScript  │  Tailwind CSS           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                       BUSINESS INTELLIGENCE & DATA                       │
│   Power BI  │  DAX  │  Tableau  │  Excel  │  Power Query  │  SQL Server │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                    PYTHON & DATA SCIENCE LIBRARIES                      │
│      Python 3.x  │  Pandas  │  NumPy  │  Matplotlib  │  Seaborn         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```text
data-science-portfolio/
├── app/                        # Next.js 16 App Router pages
│   ├── page.tsx                # Home / Landing Page
│   ├── about/                  # About & Professional Journey
│   ├── projects/               # Case Study Catalog & Filtering
│   ├── projects/[slug]/        # Individual Project Deep-Dive Pages
│   ├── skills/                 # Interactive Technical Skill Matrix
│   ├── experience/             # Practical BI & Retail Experience
│   ├── resume/                 # Print-Optimized Resume & CV
│   ├── lab/                    # DAX & Analytics Simulator
│   └── contact/                # Direct Contact & Message Form
├── components/                 # Reusable UI & Layout Components
│   ├── cinematic-hero.tsx      # Video Hero & Stat Counter Component
│   ├── project-card.tsx        # Dynamic Case Study Visual Cards
│   ├── project-utils.ts       # Server-Compatible Image Resolver
│   ├── data-flow.tsx           # Interactive Pipeline Flow Diagrams
│   ├── scenario-panels.tsx     # Dynamic DAX Simulation Controls
│   └── resume-page.tsx         # CV Layout & Media Print Styles
├── data/
│   └── portfolio.ts            # Centralized Data Store (Projects, Skills, CV)
├── public/                     # Static Images, PDFs, and MP4 Videos
├── projects/                   # Sub-repositories directory (Ignored by main repo)
└── README.md                   # Repository Master Documentation
```

---

## ⚡ Getting Started (Local Setup)

To run this portfolio website locally on your machine:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/albashmohandisahmed/portfolio.git
cd portfolio
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Launch Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4️⃣ Build Production Bundle
```bash
npm run build
npm run start
```

---

## 📜 Certifications & Qualifications

- 🎓 **Google Data Analytics Professional Certificate**
- 🎓 **Google Advanced Data Analytics Professional Certificate**
- 🎓 **IBM Data Analyst Professional Certificate**
- 🎓 **Microsoft Power BI Data Analyst Professional Certificate**
- 🎓 **Data Analysis with Excel Power Tools (DataCamp)**
- 🎓 **Professional Data Analyst Diploma**
- 🎓 **Bachelor of Computer Science (Honors, GPA 3.4)** — Faculty of Computer & Artificial Intelligence

---

## 👨‍💻 Author & Contact

**Ahmed Mohamed Abd El Hamid**  
*Data Analyst | Business Intelligence Analyst*  
📍 Cairo, Egypt  

- 📧 **Email**: [albashmohandisahmed@gmail.com](mailto:albashmohandisahmed@gmail.com)  
- 📱 **Phone**: +20 1009480722  
- 🔗 **LinkedIn**: [linkedin.com/in/ahmed-mohamed-abd-el-hamid-ali](https://linkedin.com/in/ahmed-mohamed-abd-el-hamid-ali)  
- 🐙 **GitHub Profile**: [github.com/albashmohandisahmed](https://github.com/albashmohandisahmed)  
- 🌐 **Portfolio Website**: [github.com/albashmohandisahmed/portfolio](https://github.com/albashmohandisahmed/portfolio)
