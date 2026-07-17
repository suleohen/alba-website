import Hero from "@/components/home/Hero";
import HomeShapes from "@/components/home/HomeShapes";
import FeaturedGrid from "@/components/home/FeaturedGrid";

export default function HomePage() {
  return (
    <>
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, #ffffff 0%, #fbfbfb 55%, #f4f4f4 100%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <HomeShapes />
        <Hero />
        <FeaturedGrid />
        <div className="mt-20 border-t border-black/10 pb-16 pt-8 text-center text-xs text-black/50 md:mt-24">
          © {new Date().getFullYear()} — All rights reserved.
        </div>
      </div>
    </>
  );
}
