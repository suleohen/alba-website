import Hero from "@/components/home/Hero";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import IndexLinks from "@/components/home/IndexLinks";
import ShapeLayer from "@/components/sections/ShapeLayer";

export default function HomePage() {
  return (
    <>
      {/* ✅ SADECE HOME'DA SHAPES */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <ShapeLayer />
      </div>

      {/* Home content */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <Hero />
        <FeaturedGrid />
        <IndexLinks />
        <div className="mt-16 md:mt-20 pb-16 text-xs text-black/50">
          © {new Date().getFullYear()} — All rights reserved.
        </div>
      </div>
    </>
  );
}
