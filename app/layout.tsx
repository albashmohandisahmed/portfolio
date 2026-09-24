import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CursorGlow } from "@/components/cursor-glow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Ahmed Mohamed Abd El Hamid | Data Analyst & BI Analyst",
    template: "%s | Ahmed Mohamed Abd El Hamid",
  },
  description:
    "Portfolio of Ahmed Mohamed Abd El Hamid, Data Analyst and Business Intelligence Analyst in Cairo, Egypt, focused on dashboards, SQL, Python, Power BI, Tableau, Excel, ETL, EDA, KPI reporting, machine learning, and business analysis.",
  keywords: ["Ahmed Mohamed Abd El Hamid", "Data Analyst", "Business Intelligence Analyst", "Power BI", "Tableau", "Excel", "SQL", "Python", "Machine Learning", "Business Analysis"],
  openGraph: {
    title: "Ahmed Mohamed Abd El Hamid | Data Analyst & BI Analyst",
    description: "Turning Business Data Into Decisions.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ion focus:px-4 focus:py-2 focus:text-black">
          Skip to content
        </a>
        <CursorGlow />
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <div className="noise" aria-hidden="true" />
      </body>
    </html>
  );
}
