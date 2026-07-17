import ArtworksGallery from "@/components/artworks/ArtworksGallery";

export default function ArtworksPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
      <header className="pt-10 md:pt-14">
        <p
          className="inline-block text-xs tracking-[0.22em] text-[#F73914]"
          style={{ transform: "rotate(-2deg)" }}
        >
          ARTWORKS
        </p>
        <h1 className="mt-4 font-display text-3xl italic tracking-tight md:text-5xl">
          Small studies, one at a time.
        </h1>
        <p className="mt-6 max-w-[70ch] text-base leading-relaxed text-black/70 md:text-lg">
          Click a piece to look closer.
        </p>
      </header>

      <div className="mt-10 pb-20">
        <ArtworksGallery />
      </div>
    </div>
  );
}
