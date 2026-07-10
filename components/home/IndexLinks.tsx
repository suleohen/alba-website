import Link from "next/link";
import { home } from "@/lib/content";

export default function IndexLinks() {
  return (
    <section className="mt-16 md:mt-20">
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {home.indexLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group col-span-12 rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur transition-all hover:-translate-y-[2px] hover:border-black/25 hover:shadow-sm md:col-span-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium tracking-tight">
                  {item.label}
                  {item.comingSoon ? (
                    <span className="ml-2 rounded-full border border-black/10 px-2 py-0.5 text-[11px] text-black/60">
                      Coming soon
                    </span>
                  ) : null}
                </p>
                <p className="mt-2 text-sm text-black/60">{item.desc}</p>
              </div>

              <span className="mt-1 text-[#F73914] opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </div>

            <div className="mt-4 h-px w-full bg-black/10" />

            <p className="mt-3 text-xs text-black/50">
              Open <span className="text-[#F73914]">•</span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}