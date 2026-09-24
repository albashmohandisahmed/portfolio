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
  metadataBase: new URL("https://portfolio-mu-livid-bp0khubbw2.vercel.app"),
  title: {
    default: "Ahmed Mohamed Abd El Hamid | Data Analyst & BI Analyst Portfolio",
    template: "%s | Ahmed Mohamed Abd El Hamid",
  },
  description:
    "Data Analyst & Business Intelligence Analyst specializing in Power BI, Tableau, Advanced Excel, SQL, Python, and ETL pipelines. Explore 8 interactive enterprise case studies with dashboards, data models, and downloadable PDF reports.",
  keywords: [
    "Ahmed Mohamed Abd El Hamid",
    "Data Analyst Portfolio",
    "Business Intelligence Analyst",
    "Power BI Dashboard",
    "Tableau Developer",
    "Advanced Excel Analytics",
    "SQL Data Modeling",
    "Python Data Science",
    "ETL Pipelines",
    "Cairo Data Analyst",
  ],
  authors: [{ name: "Ahmed Mohamed Abd El Hamid", url: "https://github.com/albashmohandisahmed" }],
  creator: "Ahmed Mohamed Abd El Hamid",
  publisher: "Ahmed Mohamed Abd El Hamid",
  icons: {
    icon: "/ahmed.jpeg",
    shortcut: "/ahmed.jpeg",
    apple: "/ahmed.jpeg",
  },
  openGraph: {
    title: "Ahmed Mohamed Abd El Hamid | Data & BI Analyst Portfolio",
    description:
      "Turning Complex Business Data Into Actionable Strategic Decisions. View 8 interactive enterprise case studies built with Power BI, Tableau, Excel, and SQL.",
    url: "https://portfolio-mu-livid-bp0khubbw2.vercel.app",
    siteName: "Ahmed Mohamed — Data & BI Portfolio",
    images: [
      {
        url: "/ahmed.jpeg",
        width: 1200,
        height: 1200,
        alt: "Ahmed Mohamed Abd El Hamid - Data Analyst & BI Analyst",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Mohamed Abd El Hamid | Data & BI Analyst Portfolio",
    description:
      "Interactive Data Science & Business Intelligence Portfolio featuring 8 enterprise analytics dashboards.",
    images: ["/ahmed.jpeg"],
    creator: "@albashmohandisahmed",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/ahmed.jpeg" sizes="any" />
        <link rel="apple-touch-icon" href="/ahmed.jpeg" />
      </head>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ion focus:px-4 focus:py-2 focus:text-black"
        >
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
