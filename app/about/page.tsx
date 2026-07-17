import Image from "next/image";
import Link from "next/link";
import { about } from "@/lib/content";

const socialIcon: Record<string, string> = {
  Behance: "Bē",
  LinkedIn: "in",
  Email: "@",
};

export default function AboutPage() {
  return (
    <>
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, #ffffff 0%, #fbfbfb 55%, #f4f4f4 100%)",
        }}
      />
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <header className="pt-10 md:pt-14">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-black/10 sm:h-28 sm:w-28">
            <Image
              src={about.portrait}
              alt="Cansu Albayrak"
              fill
              className="object-cover"
              sizes="112px"
              priority
            />
          </div>
          <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
            {about.heading}
          </h1>
        </div>
      </header>

      <div className="mt-10 h-px w-full bg-black/10" />

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div className="space-y-6 text-base leading-relaxed text-black/80 md:text-lg">
          {about.introLeft.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="space-y-6 text-base leading-relaxed text-black/80 md:text-lg">
          {about.introRight.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="text-black/60">{about.closing}</p>
          <Link
            href={about.cta.href}
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-tight"
          >
            {about.cta.label}
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Volunteer highlight strip */}
      <div className="mt-16 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4 md:gap-6">
        {about.volunteerGallery.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[3/4] overflow-hidden rounded-xl border border-black/10"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
          </div>
        ))}
      </div>

      {/* Volunteer Work */}
      <section className="mt-20 md:mt-24">
        <p className="text-xs tracking-[0.22em] text-black/60">
          VOLUNTEER WORK
        </p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
          Volunteer Work
        </h2>

        <div className="mt-10 divide-y divide-black/10">
          {about.volunteer.map((v) => (
            <div
              key={v.org}
              className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[160px_1fr] md:gap-10"
            >
              <div className="relative h-24 w-24 shrink-0 md:h-28 md:w-28">
                <Image
                  src={v.logo}
                  alt={`${v.org} logo`}
                  fill
                  className="object-contain"
                  sizes="112px"
                />
              </div>
              <div>
                <p className="text-lg font-medium tracking-tight">
                  {v.org}
                  <span className="ml-3 text-sm font-normal text-black/50">
                    {v.period}
                  </span>
                </p>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-black/70 md:text-base">
                  {v.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My Skills */}
      <section className="mt-20 md:mt-24">
        <p className="text-xs tracking-[0.22em] text-black/60">MY SKILLS</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">
          My Skills
        </h2>

        <div className="relative mt-10 aspect-[1400/840] w-full max-w-3xl overflow-hidden rounded-2xl border border-black/10 bg-white">
          <Image
            src={about.skillsToolsImage}
            alt="Tools: Photoshop, Illustrator, Premiere Pro, After Effects, CapCut, Figma, Gemini, Kling AI, Visual Studio Code, PubCoder"
            fill
            className="object-contain"
            sizes="(min-width: 768px) 700px, 100vw"
          />
        </div>

        <h3 className="mt-16 text-2xl font-medium tracking-tight md:text-3xl">
          Academic Studies
        </h3>

        <div className="mt-8 divide-y divide-black/10">
          {about.skills.map((s) => (
            <div
              key={s.title}
              className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[280px_1fr] md:gap-10"
            >
              <p className="text-base font-medium tracking-tight">
                {s.title}
              </p>
              <div className="space-y-3 text-sm leading-relaxed text-black/70 md:text-base">
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}

          <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[280px_1fr] md:gap-10">
            <p className="text-base font-medium tracking-tight">
              Additional Coursework
            </p>
            <ul className="space-y-2 text-sm text-black/70 md:text-base">
              {about.additionalCoursework.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closing CTA + social */}
      <div className="mt-20 flex flex-col items-center gap-6 border-t border-black/10 pb-20 pt-14 md:mt-24">
        <Link
          href={about.cta.href}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#F73914]"
        >
          {about.cta.label}
        </Link>

        <div className="flex items-center gap-4">
          {about.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-sm text-black/70 transition-colors hover:border-black hover:text-black"
            >
              {socialIcon[s.label] ?? s.label[0]}
            </a>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}
