import Link from "next/link";
import { home } from "@/lib/content";

export default function Hero() {
  const { eyebrow, headline, subline, ctas } = home.hero;

  return (
    <section className="pt-10 md:pt-14">
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-8">
          <p className="text-xs tracking-[0.22em] text-black/60">{eyebrow}</p>

          <h1 className="mt-4 text-4xl font-medium tracking-tight md:text-6xl">
            {headline}
          </h1>

          <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-black/70 md:text-lg">
            {subline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={ctas[0].href}
              className="group inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-2.5 text-sm transition-all hover:-translate-y-[1px] hover:border-black/30 hover:shadow-sm"
            >
              {ctas[0].label}
              <span className="ml-2 text-[#F73914] opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </Link>

            <Link
              href={ctas[1].href}
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm text-black/70 transition-colors hover:text-black"
            >
              {ctas[1].label}
            </Link>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          {/* Minimal side panel / “gallery label” */}
          <div className="rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur">
            <p className="text-xs tracking-[0.22em] text-black/50">FOCUS</p>
            <ul className="mt-4 space-y-2 text-sm text-black/70">
              <li className="flex items-center justify-between">
                <span>Strategy</span>
                <span className="text-[#F73914]">•</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Identity</span>
                <span className="text-[#F73914]">•</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Photography</span>
                <span className="text-[#F73914]">•</span>
              </li>
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-black/50">
              Clean systems, calm layouts, sharp details. No extra noise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}