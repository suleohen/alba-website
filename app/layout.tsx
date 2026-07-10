import type { Metadata } from "next";
import "./globals.css";

import { Rubik_Spray_Paint } from "next/font/google";

import SiteHeader from "@/components/layout/SiteHeader";
import PageContainer from "@/components/layout/PageContainer";

const rubikSpray = Rubik_Spray_Paint({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rubik-spray",
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
        className={`min-h-screen text-black antialiased ${rubikSpray.variable}`}
      >
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
