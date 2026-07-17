"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { artworks } from "@/lib/content";

const ROTATIONS = [-3, 2, -1.5, 3, -2.5, 1.5];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

// A soft, blurred glow that trails the cursor — purely decorative, only on
// this page, and skipped entirely under prefers-reduced-motion.
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      el.style.opacity = "1";
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[380px] w-[380px] rounded-full opacity-0 blur-[90px] transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle, rgba(247,57,20,0.4), rgba(247,57,20,0.08) 60%, transparent 75%)",
      }}
    />
  );
}

export default function ArtworksGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();

  const selected = selectedIndex !== null ? artworks[selectedIndex] : null;

  const goNext = useCallback(() => {
    setDirection(1);
    setSelectedIndex((i) => (i === null ? i : (i + 1) % artworks.length));
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setSelectedIndex((i) =>
      i === null ? i : (i - 1 + artworks.length) % artworks.length
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, goNext, goPrev]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedIndex]);

  return (
    <>
      {!reducedMotion && <CursorGlow />}

      <div className="relative z-10 columns-2 gap-5 md:columns-3 lg:columns-4">
        {artworks.map((artwork, i) => {
          const rotation = ROTATIONS[i % ROTATIONS.length];

          return (
            <motion.button
              key={artwork.slug}
              type="button"
              aria-label={artwork.title}
              onClick={() => {
                setDirection(1);
                setSelectedIndex(i);
              }}
              className="group relative mb-5 block w-full overflow-hidden rounded-xl border border-black/10 bg-black/5"
              style={{ breakInside: "avoid" }}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 32, rotate: rotation }
              }
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: reducedMotion ? 0 : (i % 8) * 0.06,
                ease: "easeOut",
              }}
              whileHover={
                reducedMotion
                  ? undefined
                  : { scale: 1.03, rotate: rotation * 0.4 }
              }
            >
              <Image
                src={artwork.image}
                alt={artwork.title}
                width={artwork.width}
                height={artwork.height}
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />

              <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-[#F73914]" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p
                  className="font-display text-base italic text-white"
                  style={{ transform: `rotate(${rotation * 0.3}deg)` }}
                >
                  {artwork.title}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {selected && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xl text-white transition-colors hover:border-[#F73914] hover:bg-white/10"
          >
            ×
          </button>

          <button
            type="button"
            aria-label="Previous artwork"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-xl text-white transition-colors hover:border-[#F73914] hover:bg-white/10 md:left-6"
          >
            ←
          </button>

          <button
            type="button"
            aria-label="Next artwork"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-xl text-white transition-colors hover:border-[#F73914] hover:bg-white/10 md:right-6"
          >
            →
          </button>

          <div
            className="relative flex max-h-[85vh] max-w-[90vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={selected.slug}
                custom={direction}
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction * 50 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction * -50 }
                }
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl"
              >
                <Image
                  src={selected.image}
                  alt={selected.title}
                  width={selected.width}
                  height={selected.height}
                  className="max-h-[75vh] w-auto max-w-[90vw] object-contain"
                  sizes="90vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <p className="mt-4 text-center font-display text-lg italic text-white">
              {selected.title}
            </p>
            <p className="mt-1 text-center text-xs tracking-[0.15em] text-white/50">
              {selectedIndex! + 1} / {artworks.length}
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
