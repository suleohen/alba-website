import { futureProjects, futureProjectsClosing } from "@/lib/content";
import PlaceholderThumb from "@/components/ui/PlaceholderThumb";

export default function FutureProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
      <header className="pt-10 md:pt-14">
        <p className="text-xs tracking-[0.22em] text-black/60">
          FUTURE PROJECTS
        </p>
        <h1 className="mt-4 font-display text-3xl italic tracking-tight md:text-5xl">
          Ideas in development.
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-black/70 md:text-lg">
          A concept board for work that hasn&apos;t fully taken shape yet.
        </p>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {futureProjects.map((project) => (
          <div key={project.number} className="border-t border-black/15 pt-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm text-black/40">
                {project.number}
              </span>
            </div>

            <PlaceholderThumb
              seed={project.title}
              className="mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/10"
            />

            <h2 className="mt-5 font-display text-2xl italic tracking-tight md:text-3xl">
              {project.title}
            </h2>
            <p className="mt-3 max-w-[45ch] text-sm leading-relaxed text-black/65 md:text-base">
              {project.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 border-t border-black/15 pb-20 pt-10 md:mt-24">
        <p className="mx-auto max-w-[60ch] text-center text-sm leading-relaxed text-black/55 md:text-base">
          {futureProjectsClosing}
        </p>
      </div>
    </div>
  );
}
