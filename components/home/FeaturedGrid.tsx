"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { home, works, type WorkItem } from "@/lib/content";

const featuredWorks: WorkItem[] = home.featuredWorkSlugs
  .map((slug) => works.find((w) => w.slug === slug))
  .filter((w): w is WorkItem => Boolean(w));

// The same one-off "burst" accent used elsewhere on Home — kept to a single
// glow/border touch here so the work images stay the focus.
const GLOW = "#E63946";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function ShowreelHeader() {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        <p className="text-xs tracking-[0.22em] text-black/60">SELECTED</p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
          Featured Works
        </h2>
      </div>

      <Link
        href="/work"
        className="text-sm text-black/60 transition-colors hover:text-black"
      >
        View all →
      </Link>
    </div>
  );
}

function FeaturedCardBody({ work }: { work: WorkItem }) {
  return (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-black/10">
        <Image
          src={work.cover}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 40vw, 100vw"
        />
        {work.meta && (
          <span
            lang="en"
            className="absolute left-3 top-3 flex items-center rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
          >
            <span
              className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: GLOW }}
            />
            {work.meta.type} · {work.meta.date}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium tracking-tight">{work.title}</p>
          {work.subtitle && (
            <p className="mt-1 text-xs text-black/55">{work.subtitle}</p>
          )}
        </div>

        <span className="text-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          →
        </span>
      </div>
    </>
  );
}

function ClassicGrid() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const updateFocus = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width / 2;

    cardRefs.current.forEach((card) => {
      if (!card) return;
      if (reducedMotion) {
        card.style.transform = "scale(1)";
        card.style.opacity = "1";
        card.style.boxShadow = "none";
        return;
      }
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - centerX);
      const t = Math.max(0, 1 - dist / (trackRect.width / 2));
      const scale = 0.9 + 0.2 * t;
      const opacity = 0.55 + 0.45 * t;
      card.style.transform = `scale(${scale})`;
      card.style.opacity = String(opacity);
      card.style.boxShadow =
        t > 0.6
          ? `0 0 0 3px ${GLOW}${Math.round(t * 70)
              .toString(16)
              .padStart(2, "0")}`
          : "none";
    });
  }, [reducedMotion]);

  useEffect(() => {
    updateFocus();
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        updateFocus();
        rafRef.current = null;
      });
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [updateFocus]);

  return (
    <>
      <ShowreelHeader />
      <div
        ref={trackRef}
        className="mt-8 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: reducedMotion ? "none" : "x proximity" }}
      >
        {featuredWorks.map((work, i) => (
          <Link
            key={work.slug}
            href={`/work/${work.slug}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="group block w-[85vw] max-w-[420px] shrink-0 rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur transition-colors hover:border-black/30 md:w-[420px]"
            style={{ scrollSnapAlign: "center" }}
          >
            <FeaturedCardBody work={work} />
          </Link>
        ))}
      </div>
    </>
  );
}

function ShowreelCard({
  work,
  index,
  count,
  scrollYProgress,
}: {
  work: WorkItem;
  index: number;
  count: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segment = 1 / count;
  const start = Math.max(0, index * segment - segment * 0.5);
  const mid = index * segment + segment * 0.5;
  const end = Math.min(1, index * segment + segment * 1.5);
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.9, 1.1, 0.9]);
  const opacity = useTransform(scrollYProgress, [start, mid, end], [0.55, 1, 0.55]);
  const glowT = useTransform(scrollYProgress, [start, mid, end], [0, 1, 0]);
  const boxShadow = useTransform(glowT, (v) =>
    v > 0.7
      ? `0 0 0 3px ${GLOW}${Math.round(v * 80)
          .toString(16)
          .padStart(2, "0")}, 0 16px 30px -12px ${GLOW}55`
      : "none"
  );

  return (
    <motion.div
      style={{ scale, opacity, boxShadow }}
      className="w-[420px] flex-shrink-0 rounded-2xl"
    >
      <Link
        href={`/work/${work.slug}`}
        className="group block rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur transition-colors hover:border-black/30"
      >
        <FeaturedCardBody work={work} />
      </Link>
    </motion.div>
  );
}

function DesktopShowreel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    function measure() {
      if (trackRef.current && sectionRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = sectionRef.current.clientWidth;
        setMaxScroll(Math.max(0, trackWidth - viewportWidth));
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  return (
    <div ref={sectionRef} className="relative h-[250vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <ShowreelHeader />
        <motion.div ref={trackRef} style={{ x }} className="flex gap-6">
          {featuredWorks.map((work, i) => (
            <ShowreelCard
              key={work.slug}
              work={work}
              index={i}
              count={featuredWorks.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function DesktopFeatured() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduceMotion ? <ClassicGrid /> : <DesktopShowreel />;
}

export default function FeaturedGrid() {
  return (
    <section className="relative z-10 mt-10 md:mt-14">
      <div className="md:hidden">
        <ClassicGrid />
      </div>
      <div className="hidden md:block">
        <DesktopFeatured />
      </div>
    </section>
  );
}
