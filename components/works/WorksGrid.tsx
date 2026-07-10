"use client";

import { useMemo, useState } from "react";
import WorkCard from "@/components/works/WorkCard";
import { workCategories, works, type WorkCategory } from "@/lib/content";

const ALL = "All" as const;
type Filter = typeof ALL | WorkCategory;

export default function WorksGrid() {
  const [filter, setFilter] = useState<Filter>(ALL);

  const filtered = useMemo(() => {
    if (filter === ALL) return works;
    return works.filter((w) => w.categories.includes(filter));
  }, [filter]);

  return (
    <div className="mt-10">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter(ALL)}
          className={[
            "rounded-full border px-3 py-1 text-xs transition-all",
            filter === ALL
              ? "border-black/25 bg-white text-black"
              : "border-black/10 bg-white/60 text-black/60 hover:border-black/25 hover:text-black",
          ].join(" ")}
        >
          All
        </button>

        {workCategories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={[
              "rounded-full border px-3 py-1 text-xs transition-all",
              filter === c
                ? "border-black/25 bg-white text-black"
                : "border-black/10 bg-white/60 text-black/60 hover:border-black/25 hover:text-black",
            ].join(" ")}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-12 gap-4 md:gap-6">
        {filtered.map((work) => (
          <div key={work.slug} className="col-span-12 md:col-span-6">
            <WorkCard work={work} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-xs text-black/50">
        Showing <span className="text-black">{filtered.length}</span> works
        {filter === ALL ? "" : (
          <>
            {" "}
            in <span className="text-black">{filter}</span>
          </>
        )}
        .
      </div>
    </div>
  );
}