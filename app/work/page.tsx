import Link from "next/link";
import WorksWall from "@/components/works/WorksWall";

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
      <header className="pt-10 md:pt-14">
        <p className="text-xs tracking-[0.22em] text-black/60">WORK</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
          Selected projects.
        </h1>
        <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-black/70 md:text-lg">
          A collection of brand, campaign, and editorial work. Click through for the full story.
        </p>
      </header>

      <WorksWall />

      <div className="mt-16 pb-16 text-xs text-black/50">
        Want to collaborate?{" "}
        <Link
          className="text-black underline decoration-black/20 underline-offset-4 hover:decoration-black/60"
          href="/contact"
        >
          Contact
        </Link>
        .
      </div>
    </div>
  );
}