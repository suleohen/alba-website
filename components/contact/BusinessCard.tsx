"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";

const CARD_INFO = {
  name: "Cansu Albayrak",
  title: "Graphic Designer — Milan",
  email: "228411c@gmail.com",
  linkedin: "linkedin.com/in/cansu-albayrak",
  behance: "behance.net/cansualbayrak3",
};

// The card face is a CSS container, so text sizes scale with the card's own
// rendered width (clamp(min, preferred-in-cqw, max)) instead of overflowing
// when the card is squeezed into a narrow column.
const containerStyle: React.CSSProperties = { containerType: "inline-size" };

function Wordmark() {
  return (
    <span
      className="inline-flex items-center font-display font-bold lowercase tracking-tight"
      style={{ fontSize: "clamp(0.85rem, 4.5cqw, 1.125rem)" }}
    >
      <span className="relative mr-1 inline-block h-[1.1em] w-[1.1em] shrink-0 align-middle">
        <Image
          src="/logo/logo-mark.png"
          alt=""
          fill
          className="object-contain mix-blend-multiply"
          sizes="24px"
        />
      </span>
      albastudio
      <span className="ml-0.5 text-[#F73914]">●</span>
    </span>
  );
}

function CardFace({ variant }: { variant: "front" | "back" }) {
  if (variant === "front") {
    return (
      <div
        style={containerStyle}
        className="flex h-full w-full flex-col justify-between rounded-2xl border border-black/10 bg-white"
      >
        <div style={{ padding: "clamp(1.5rem, 5cqw, 2rem)" }}>
          <Wordmark />
        </div>
        <div style={{ padding: "0 clamp(1.5rem, 5cqw, 2rem)" }}>
          <p
            className="font-display tracking-tight text-black"
            style={{
              fontSize: "clamp(1rem, 6.5cqw, 1.5rem)",
              lineHeight: 1.4,
            }}
          >
            {CARD_INFO.name}
          </p>
          <p
            className="text-black/60"
            style={{ fontSize: "clamp(0.7rem, 3.2cqw, 0.9rem)", lineHeight: 1.4 }}
          >
            {CARD_INFO.title}
          </p>
        </div>
        <div style={{ padding: "clamp(1.5rem, 5cqw, 2rem)" }}>
          <div className="h-1 w-10 rounded-full bg-[#F73914]" />
        </div>
      </div>
    );
  }

  return (
    <div
      style={containerStyle}
      className="flex h-full w-full flex-col justify-between rounded-2xl border border-black/10 bg-black text-white"
    >
      <p
        className="tracking-[0.2em] text-[#F73914]"
        style={{
          padding: "clamp(1.5rem, 5cqw, 2rem) clamp(1.5rem, 5cqw, 2rem) 0",
          fontSize: "clamp(0.6rem, 2.6cqw, 0.75rem)",
        }}
      >
        CONTACT
      </p>
      <div
        style={{
          padding: "0 clamp(1.5rem, 5cqw, 2rem)",
          fontSize: "clamp(0.7rem, 3.2cqw, 0.9rem)",
          lineHeight: 1.4,
        }}
        className="space-y-1"
      >
        <p className="truncate">{CARD_INFO.email}</p>
        <p className="truncate">{CARD_INFO.linkedin}</p>
        <p className="truncate">{CARD_INFO.behance}</p>
      </div>
      <p
        className="font-display italic text-white/60"
        style={{
          padding: "0 clamp(1.5rem, 5cqw, 2rem) clamp(1.5rem, 5cqw, 2rem)",
          fontSize: "clamp(0.7rem, 3.2cqw, 0.9rem)",
          lineHeight: 1.4,
        }}
      >
        {CARD_INFO.name}
      </p>
    </div>
  );
}

export default function BusinessCard() {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [downloading, setDownloading] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (flipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  function toggleFlip() {
    setFlipped((v) => !v);
  }

  async function handleDownload() {
    if (!exportRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: null,
        scale: 3,
      });
      const link = document.createElement("a");
      link.download = "cansu-albayrak-business-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div
        role="button"
        tabIndex={0}
        aria-label="Flip business card"
        className="w-full max-w-[420px] cursor-pointer select-none outline-none"
        style={{ perspective: "1200px" }}
        onClick={toggleFlip}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleFlip();
          }
        }}
      >
        <div
          className="relative aspect-[1.75/1] w-full shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped
              ? "rotateY(180deg)"
              : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backfaceVisibility: "hidden" }}
          >
            <CardFace variant="front" />
          </div>
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <CardFace variant="back" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-black/40">Tap the card to flip</p>

      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="mt-6 inline-flex items-center justify-center rounded-full border border-black/15 px-5 py-2.5 text-sm transition-colors hover:border-black disabled:opacity-50"
      >
        {downloading ? "Preparing…" : "Download as image"}
      </button>

      {/* Hidden, un-transformed copy used only for the PNG export so the
          card's 3D flip/tilt state never affects the captured image. Fixed
          pixel size so the exported PNG is consistent regardless of the
          live card's current (viewport-relative) rendered size. */}
      <div className="pointer-events-none fixed left-[-9999px] top-0 h-[240px] w-[420px]">
        <div ref={exportRef} className="h-full w-full">
          <CardFace variant="front" />
        </div>
      </div>
    </div>
  );
}
