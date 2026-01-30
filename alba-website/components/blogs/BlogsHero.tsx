"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { blog } from "@/lib/content";

export default function BlogsHero() {
  // spacer başlangıç ve minimum değerleri (vh)
  const START_VH = 30;
  const MIN_VH = 8;

  const [spacerVh, setSpacerVh] = useState<number>(START_VH);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      // 0px → START_VH
      // 500px scroll → MIN_VH (daha hızlı/yavaş istersen 500'ü değiştir)
      const t = Math.min(Math.max(y / 500, 0), 1); // 0..1
      const next = START_VH + (MIN_VH - START_VH) * t;

      setSpacerVh(next);
    };

    onScroll(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div
  className="absolute inset-0"
  style={{
    transform: "translateY(126px)", // 👈 BURAYI DEĞİŞTİR
  }}
>
  <Image
    src="/blog/hero3.jpg"
    alt="Blog background"
    fill
    priority
    className="object-cover"
    sizes="100vw"
  />
</div>

      <div className="absolute inset-0 bg-white/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 md:px-8">
        

        {/* Center title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="text-center text-[clamp(4rem,15vw,11rem)] leading-[0.95] tracking-tighter text-[#1800ad]"
            style={{ fontFamily: "var(--font-rubik-spray)" }}
          >
            BLOG
            <br />
            YAZI-
            <br />
            LARIM
          </h1>
        </div>

        {/* Spacer that shrinks on scroll */}
        <div
          style={{
            height: `${spacerVh}vh`,
            transition: "height 120ms linear",
          }}
        />
      </div>
    </section>
  );
}
