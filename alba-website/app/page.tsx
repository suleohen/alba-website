import Hero from "@/components/home/Hero";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import IndexLinks from "@/components/home/IndexLinks";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
      <Hero />
      <FeaturedGrid />
      <IndexLinks />
      <div className="mt-16 md:mt-20 pb-16 text-xs text-black/50">
        © {new Date().getFullYear()} — All rights reserved.
      </div>
    </div>
  );
}