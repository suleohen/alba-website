import WorksWall from "@/components/works/WorksWall";

export default function WorksPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
      <header className="pt-10 md:pt-14">
        <p className="text-xs tracking-[0.22em] text-black/60">WORKS</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight md:text-5xl">
          Gallery wall of selected pieces.
        </h1>
        <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-black/70 md:text-lg">
          Hover to reveal title & year. No clicks—just a quiet, curated wall.
        </p>
      </header>

      <WorksWall />

      <div className="mt-16 pb-16 text-xs text-black/50">
        Want to collaborate?{" "}
        <a
          className="text-black underline decoration-black/20 underline-offset-4 hover:decoration-black/60"
          href="/contact"
        >
          Contact
        </a>
        .
      </div>
    </div>
  );
}