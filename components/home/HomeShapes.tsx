"use client";

import { useEffect, useState } from "react";

// The same one-off "burst" palette used by DotSlogan — never used outside
// the Home page, deliberately louder than the rest of the site.
const BURST = ["#E63946", "#F4C430", "#F4A6C6", "#1D3461", "#F77F00"];

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

type ShapeConfig = {
  kind: "circle" | "square" | "rect";
  top: string;
  left: string;
  size: number;
  color: string;
  behavior: "rotate" | "fade" | "scale";
  floatDelay: number | null;
};

// Spread thinly across the full height of the Home page (0%-98%) so shapes
// surface gradually as the page is scrolled, rather than clustering at top.
const SHAPES: ShapeConfig[] = [
  { kind: "circle", top: "2%", left: "6%", size: 38, color: BURST[0], behavior: "fade", floatDelay: 0 },
  { kind: "square", top: "8%", left: "90%", size: 28, color: BURST[1], behavior: "rotate", floatDelay: null },
  { kind: "rect", top: "20%", left: "3%", size: 40, color: BURST[2], behavior: "scale", floatDelay: 1.4 },
  { kind: "circle", top: "27%", left: "94%", size: 24, color: BURST[3], behavior: "rotate", floatDelay: null },
  { kind: "square", top: "37%", left: "8%", size: 30, color: BURST[4], behavior: "fade", floatDelay: 2.1 },
  { kind: "rect", top: "45%", left: "91%", size: 38, color: BURST[0], behavior: "scale", floatDelay: null },
  { kind: "circle", top: "55%", left: "4%", size: 28, color: BURST[1], behavior: "rotate", floatDelay: 0.8 },
  { kind: "square", top: "63%", left: "93%", size: 24, color: BURST[2], behavior: "fade", floatDelay: null },
  { kind: "rect", top: "72%", left: "6%", size: 34, color: BURST[3], behavior: "scale", floatDelay: 1.8 },
  { kind: "circle", top: "80%", left: "90%", size: 30, color: BURST[4], behavior: "rotate", floatDelay: null },
  { kind: "square", top: "88%", left: "11%", size: 22, color: BURST[0], behavior: "fade", floatDelay: 2.4 },
  { kind: "rect", top: "95%", left: "82%", size: 28, color: BURST[1], behavior: "scale", floatDelay: null },
];

function shiftColor(current: string) {
  const idx = BURST.indexOf(current);
  return BURST[(idx + 1) % BURST.length];
}

function Shape({ config, reducedMotion }: { config: ShapeConfig; reducedMotion: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pos, setPos] = useState({ top: config.top, left: config.left });
  const [rotation, setRotation] = useState(0);
  const [color, setColor] = useState(config.color);

  function trigger() {
    if (reducedMotion) return;
    setHovered(true);
    if (config.behavior === "rotate") {
      setRotation((r) => r + 35 + Math.random() * 45);
      setColor((c) => shiftColor(c));
    } else if (config.behavior === "fade") {
      setHidden(true);
      setTimeout(() => {
        setPos({
          top: `${Math.random() * 96}%`,
          left: `${2 + Math.random() * 90}%`,
        });
        setHidden(false);
      }, 900);
    }
  }

  const radiusClass =
    config.kind === "circle" ? "rounded-full" : config.kind === "square" ? "rounded-lg" : "rounded-2xl";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-auto absolute ${
        !reducedMotion && config.floatDelay !== null ? "animate-float" : ""
      } transition-all duration-700 ease-out ${radiusClass}`}
      style={{
        top: pos.top,
        left: pos.left,
        width: config.kind === "rect" ? config.size * 1.6 : config.size,
        height: config.size,
        backgroundColor: color,
        opacity: hidden ? 0 : hovered ? 0.75 : 0.32,
        transform: `rotate(${rotation}deg) scale(${hovered && config.behavior === "scale" ? 1.3 : 1})`,
        animationDelay: config.floatDelay !== null ? `${config.floatDelay}s` : undefined,
      }}
      onMouseEnter={trigger}
      onTouchStart={trigger}
      onMouseLeave={() => setHovered(false)}
    />
  );
}

// A decorative shape layer stretched across the full height of the Home
// page (see app/page.tsx, which gives it a `relative` ancestor sized by the
// page's own normal-flow content). Sits behind every section: later
// siblings paint over it in normal stacking order, so it never needs to
// fight real content for legibility.
export default function HomeShapes() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {SHAPES.map((shape, i) => (
        <Shape key={i} config={shape} reducedMotion={reducedMotion} />
      ))}
    </div>
  );
}
