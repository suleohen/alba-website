import Image from "next/image";
import type { WorkItem } from "@/lib/content";

export default function WorkCard({ work }: { work: WorkItem }) {
  return (
    <div className="group">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/10 bg-black/5">
        <Image
          src={work.cover}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
      </div>

      <div className="mt-4">
        <p className="text-base font-medium tracking-tight transition-colors group-hover:text-[#F73914]">
          {work.title}
        </p>
        {work.subtitle && (
          <p className="mt-1 text-sm text-black/55">{work.subtitle}</p>
        )}
      </div>
    </div>
  );
}
