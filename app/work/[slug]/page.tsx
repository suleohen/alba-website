import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { works, type WorkItem } from "@/lib/content";
import WorkCard from "@/components/works/WorkCard";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

function getRelatedWorks(current: WorkItem, count = 4): WorkItem[] {
  const currentIndex = works.findIndex((w) => w.slug === current.slug);
  const others = works.filter((w) => w.slug !== current.slug);
  // Rotate the list starting just after the current project so "related"
  // picks stay stable and vary project to project instead of always
  // showing the same first few items.
  const rotated = [
    ...others.slice(currentIndex),
    ...others.slice(0, currentIndex),
  ];
  return rotated.slice(0, count);
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);

  if (!work) {
    notFound();
  }

  const related = getRelatedWorks(work);

  return (
    <div className="mx-auto w-full max-w-[900px] px-6 md:px-10">
      <div className="pt-10 md:pt-14">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm text-black/60 transition-colors hover:text-black"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          <span>Back to Work</span>
        </Link>
      </div>

      <header className="mt-10 border-b border-black/10 pb-10">
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          {work.title}
        </h1>

        <p className="mt-4 text-sm text-black/50">
          {work.meta
            ? `${work.meta.date} · ${work.meta.type} · ${work.meta.note}`
            : work.subtitle
            ? `${work.year} · ${work.subtitle}`
            : work.year}
        </p>
      </header>

      <article className="mt-12 pb-20">
        {work.content && work.content.length > 0 ? (
          <div className="space-y-10">
            {work.content.map((block, i) =>
              block.type === "image" ? (
                <div
                  key={i}
                  className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black/10"
                >
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 900px) 900px, 100vw"
                    priority={i === 0}
                  />
                </div>
              ) : (
                <p
                  key={i}
                  className="mx-auto max-w-[65ch] text-base leading-relaxed text-black/80 md:text-lg"
                >
                  {block.content}
                </p>
              )
            )}
          </div>
        ) : (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black/10">
            <Image
              src={work.cover}
              alt={work.title}
              fill
              className="object-cover"
              sizes="(min-width: 900px) 900px, 100vw"
              priority
            />
          </div>
        )}
      </article>

      {related.length > 0 && (
        <div className="border-t border-black/10 pb-20 pt-12">
          <p className="text-xs tracking-[0.22em] text-black/60">
            YOU MAY ALSO LIKE
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((w) => (
              <Link key={w.slug} href={`/work/${w.slug}`} className="block">
                <WorkCard work={w} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
