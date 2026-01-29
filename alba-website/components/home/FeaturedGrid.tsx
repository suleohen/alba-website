import Link from "next/link";
import { home } from "@/lib/content";

export default function FeaturedGrid() {
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
        {home.featured.map((item, i) => (
          <Link
            key={`${item.title}-${i}`}
            href={item.href}
            className={[
              "group col-span-12 rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur transition-all",
              "hover:-translate-y-[2px] hover:border-black/25 hover:shadow-sm",
              i === 0 ? "md:col-span-7" : "md:col-span-5",
            ].join(" ")}
          >
            {/* Cover placeholder */}
            <div className="relative overflow-hidden rounded-xl border border-black/10">
              <div className="aspect-[16/10] bg-white" />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(247,57,20,0.35) 1px, transparent 0)",
                  backgroundSize: "18px 18px",
                }}
              />
            </div>

            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium tracking-tight">{item.title}</p>
                <p className="mt-1 text-xs text-black/55">
                  {item.tag} · {item.year}
                </p>
              </div>

              <span className="text-[#F73914] opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}