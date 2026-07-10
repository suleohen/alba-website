import Image from "next/image";
import type { WorkItem } from "@/lib/content";

export default function WorkCard({
  work,
  size = "md",
}: {
  work: WorkItem;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:scale-[1.02]"
      role="img"
      aria-label={`${work.title} (${work.year})`}
    >
      {/* Image with natural aspect ratio */}
      <div className="relative w-full bg-neutral-100">
        <Image
          src={work.cover}
          alt={work.title}
          width={1200}
          height={800}
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            size === "lg"
              ? "(min-width: 768px) 60vw, 100vw"
              : size === "md"
              ? "(min-width: 768px) 40vw, 100vw"
              : "(min-width: 768px) 35vw, 100vw"
          }
          priority={size === "lg"}
          style={{ display: "block" }}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Dot texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(247,57,20,0.25) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Hover overlay (title + year) */}
      <div className="pointer-events-none absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="w-full">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <p className="text-lg font-medium tracking-tight text-white">
                {work.title}
              </p>
              <p className="mt-1 text-sm text-white/70">{work.year}</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F73914]">
              <span className="text-lg text-white">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}