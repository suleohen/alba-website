import Link from "next/link";
import WorkCard from "@/components/works/WorkCard";
import { works } from "@/lib/content";

export default function WorksWall() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
      {works.map((work) => (
        <Link key={work.slug} href={`/work/${work.slug}`} className="block">
          <WorkCard work={work} />
        </Link>
      ))}
    </div>
  );
}
