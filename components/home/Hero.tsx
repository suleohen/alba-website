import Link from "next/link";
import { home, site } from "@/lib/content";
import DotSlogan from "./DotSlogan";

export default function Hero() {
  const { eyebrow, headline, subline, ctas } = home.hero;

  return (
    <section className="relative pt-10 md:pt-14">
      <div className="relative z-10 mb-8 md:mb-12">
        <h2 className="text-5xl font-medium tracking-wide md:text-7xl">
          {site.name.toUpperCase()}
        </h2>
        <p className="mt-2 text-sm italic text-black/50">
          by {site.founder}
        </p>
      </div>

      <DotSlogan />

      <div className="relative z-10 mt-8 md:mt-12">
        <p className="text-xs tracking-[0.22em] text-black/60">{eyebrow}</p>

        <h1 className="mt-4 max-w-[16ch] text-4xl font-medium tracking-tight md:text-6xl">
          {headline}
        </h1>

        <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-black/70 md:text-lg">
          {subline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href={ctas[0].href}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#F73914]"
          >
            {ctas[0].label}
            <span className="transition-transform group-hover:translate-x-0.5">
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
    </section>
  );
}