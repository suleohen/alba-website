import type { Metadata } from "next";
import "./globals.css";

import SiteHeader from "@/components/layout/SiteHeader";
import PageContainer from "@/components/layout/PageContainer";

// ShapeLayer path’i sende neredeyse ona göre kalsın
import ShapeLayer from "@/components/sections/ShapeLayer";

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
      <body className="min-h-screen bg-white text-black antialiased">
        {/* Background layers */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <ShapeLayer />

          {/* subtle dot texture (light) */}
          <div className="absolute inset-0 opacity-[0.25]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>
        </div>

        {/* Foreground */}
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