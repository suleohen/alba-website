import Link from "next/link";
import { works } from "@/lib/content";
import WorkCard from "@/components/works/WorkCard";

export default function FeaturedGrid() {
  const featured = works.slice(0, 4);

  return (
    <section className="mt-16 md:mt-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs tracking-[0.22em] text-black/60">SELECTED</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
            Featured Works
          </h2>
        </div>

        <Link
          href="/works"
          className="text-sm text-black/60 transition-colors hover:text-black"
        >
          View all <span className="text-[#F73914]">→</span>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-12 gap-4 md:gap-6">
        {featured.map((work, i) => (
          <div
            key={work.slug}
            className={[
              "col-span-12",
              i === 0 ? "md:col-span-7" : "md:col-span-5",
            ].join(" ")}
          >
            <WorkCard work={work} />
          </div>
        ))}
      </div>
    </section>
  );
}