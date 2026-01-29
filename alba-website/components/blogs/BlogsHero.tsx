import Image from "next/image";
import { blog } from "@/lib/content";

export default function BlogsHero() {
  return (
    <section className="relative pt-16 md:pt-24">
      {/* Decorative background elements */}
      <div className="absolute -top-20 right-0 -z-10 h-96 w-96 rounded-full bg-[#1800ad]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 rounded-full bg-[#F73914]/5 blur-3xl" />

      <div className="grid grid-cols-12 gap-8 md:gap-12">
        {/* Left: Bold typographic statement */}
        <div className="col-span-12 md:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1800ad]" />
            <p className="text-xs tracking-[0.22em] text-black/60">JOURNAL</p>
          </div>

          {/* Hero typography - spray paint effect */}
          <div className="relative mt-8">
            <h1
              className="text-[clamp(4rem,15vw,10rem)] leading-[0.85] tracking-tighter text-[#1800ad]"
              style={{ fontFamily: "var(--font-spray)" }}
            >
              BLOG
              <br />
              YAZI-
              <br />
              LARIM
            </h1>
            
            {/* Decorative dot accent */}
            <div className="absolute -right-4 top-8 h-6 w-6 rounded-full bg-[#F73914]" />
            <div className="absolute -left-2 bottom-12 h-3 w-3 rounded-full bg-[#1800ad]/30" />
          </div>

          <div className="mt-10 space-y-4">
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              {blog.pageTitle}
            </h2>

            <p className="max-w-[60ch] text-base leading-relaxed text-black/70 md:text-lg">
              {blog.intro}
            </p>
          </div>

          {/* Stats or meta info */}
          <div className="mt-8 flex items-center gap-6 text-sm text-black/50">
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-black/20" />
              <span>Updated occasionally</span>
            </div>
          </div>
        </div>

        {/* Right: Editorial image block */}
        <div className="col-span-12 md:col-span-5">
          <div className="group relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-all duration-500 hover:shadow-lg">
            <div className="aspect-[4/5] md:aspect-[3/4]">
              {/* Image */}
              <Image
                src="/blogs/hero.jpg"
                alt="Blog editorial"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 35vw, 100vw"
                priority
              />

              {/* Dot texture overlay */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(24,0,173,0.15) 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating label */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
                <p className="text-xs tracking-[0.25em] text-white/90">
                  NOTES · EDITORIAL · STUDIO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}