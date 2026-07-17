import type { Metadata } from "next";
import "./globals.css";

import { Inter, Jost } from "next/font/google";

import SiteHeader from "@/components/layout/SiteHeader";
import PageContainer from "@/components/layout/PageContainer";
import InteractiveDots from "@/components/home/InteractiveDots";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Geometric sans (Futura-style) for headings and the logo wordmark, per the
// design brief's "futura gibi sans-serif, ciddi ve minimalist" direction.
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Studio",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`min-h-screen text-black antialiased ${inter.variable} ${jost.variable}`}
      >
        <InteractiveDots className="pointer-events-none fixed inset-0 -z-10" />
        <div className="relative z-10">
          <SiteHeader />
          <main className="py-20 md:py-24">
            <PageContainer>{children}</PageContainer>
          </main>
        </div>
      </body>
    </html>
  );
}
