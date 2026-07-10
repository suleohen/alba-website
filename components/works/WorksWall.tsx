"use client";

import { useRef } from "react";
import WorkCard from "@/components/works/WorkCard";
import {
  workCategories,
  works,
  type WorkCategory,
  type WorkItem,
} from "@/lib/content";

/**
 * Category filtre + aynı slug tekrar ediyorsa dedupe
 */
function groupByCategoryUnique(items: WorkItem[], category: WorkCategory) {
  const filtered = items.filter((w) => w.categories.includes(category));

  const map = new Map<string, WorkItem>();
  for (const w of filtered) {
    if (!map.has(w.slug)) map.set(w.slug, w);
  }
  return Array.from(map.values());
}

export default function WorksWall() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCategory = (category: WorkCategory) => {
    const section = sectionRefs.current[category];
    if (section) {
      const offset = 100; // Header offset
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // useMemo yok: dataset küçükse en temiz ve warningsiz yol
  const grouped = workCategories
    .map((category) => {
      const items = groupByCategoryUnique(works, category);
      return { category, items, count: items.length };
    })
    .filter((x) => x.count > 0);

  return (
    <div className="mt-10">
      {/* Floating category navigation */}
      <div className="sticky top-4 z-10 mb-12">
        <div className="rounded-2xl border border-black/10 bg-white/80 p-2 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-2">
            {grouped.map(({ category, count }) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className="group relative overflow-hidden rounded-xl border border-black/10 bg-white px-4 py-2 text-sm transition-all hover:border-[#F73914] hover:bg-[#F73914] hover:text-white"
                type="button"
              >
                <span className="relative z-10">{category}</span>
                <span className="relative z-10 ml-2 text-xs opacity-60">
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery sections */}
      <div className="space-y-24 md:space-y-32">
        {grouped.map(({ category, items }) => (
          <section
            key={category}
            ref={(el) => {
              sectionRefs.current[category] = el;
            }}
          >
            {/* Striking category header */}
            <div className="relative mb-12 md:mb-16">
              <div className="absolute -top-8 left-0 right-0 overflow-hidden opacity-[0.08] md:-top-12">
                <h2 className="origin-left scale-x-75 whitespace-nowrap text-7xl font-bold tracking-tighter text-gray-800 md:text-9xl">
                  {category.toUpperCase()}
                </h2>
              </div>

              <div className="relative flex items-end justify-between gap-6 border-b border-black/10 pb-6">
                <div>
                  <p className="text-xs tracking-[0.25em] text-[#F73914]">
                    CATEGORY
                  </p>
                  <h2 className="mt-2 text-3xl font-medium tracking-tight md:text-5xl">
                    {category}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-black/20" />
                  <p className="text-2xl font-light tabular-nums text-black/40 md:text-3xl">
                    {String(items.length).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              {items.map((work, idx) => {
                const patterns = [
                  { col: "md:col-span-8" },
                  { col: "md:col-span-4" },
                  { col: "md:col-span-5" },
                  { col: "md:col-span-7" },
                  { col: "md:col-span-6" },
                  { col: "md:col-span-6" },
                  { col: "md:col-span-4" },
                  { col: "md:col-span-8" },
                  { col: "md:col-span-5" },
                  { col: "md:col-span-7" },
                  { col: "md:col-span-12" },
                ];

                const layout = patterns[idx % patterns.length];

                const sizeHint =
                  layout.col.includes("span-8") ||
                  layout.col.includes("span-12") ||
                  layout.col.includes("span-7")
                    ? ("lg" as const)
                    : layout.col.includes("span-4")
                    ? ("sm" as const)
                    : ("md" as const);

                return (
                  <div
                    // ✅ duplicate key fix: category + slug (deterministic)
                    key={`${category}-${work.slug}`}
                    className={`col-span-12 ${layout.col}`}
                    style={{ animationDelay: `${(idx % 6) * 50}ms` }}
                  >
                    <WorkCard work={work} size={sizeHint} />
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 border-t border-black/10 pt-12 text-center">
        <p className="text-sm text-black/50">
          Thats all for now.{" "}
          <a
            className="text-black underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-[#F73914]"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to top
          </a>
        </p>
      </div>
    </div>
  );
}
