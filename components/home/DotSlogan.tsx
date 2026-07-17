"use client";

import { useEffect, useRef, useState } from "react";

const VIEW_W = 900;
const VIEW_H = 330;
const DOT_SPACING = 8;
const DOT_RADIUS = 2.6;
const INFLUENCE = 60;
const EASE = 0.16;
const WORDS = ["DESIGN", "STRATEGY", "DIRECTION"];

// A palette that only ever shows up in this one block — deliberately
// louder than the rest of the site's white/black + single-accent system.
const BURST = ["#E63946", "#F4C430", "#F4A6C6", "#1D3461", "#F77F00"];

type DotPoint = { x: number; y: number; color: string };

function buildDots(): DotPoint[] {
  if (typeof document === "undefined") return [];

  const probe = document.createElement("canvas").getContext("2d");
  if (!probe) return [];

  const maxWidth = VIEW_W * 0.92;
  probe.textBaseline = "middle";
  probe.textAlign = "center";
  let fontSize = (VIEW_H / WORDS.length) * 0.68;
  while (fontSize > 14) {
    probe.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`;
    const widest = Math.max(...WORDS.map((w) => probe.measureText(w).width));
    if (widest <= maxWidth) break;
    fontSize -= 2;
  }

  const canvas = document.createElement("canvas");
  canvas.width = VIEW_W;
  canvas.height = VIEW_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  ctx.fillStyle = "#000";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`;

  const lineHeight = VIEW_H / WORDS.length;
  WORDS.forEach((word, i) => {
    ctx.fillText(word, VIEW_W / 2, lineHeight * i + lineHeight / 2);
  });

  const { data } = ctx.getImageData(0, 0, VIEW_W, VIEW_H);
  const dots: DotPoint[] = [];
  for (let y = DOT_SPACING / 2; y < VIEW_H; y += DOT_SPACING) {
    for (let x = DOT_SPACING / 2; x < VIEW_W; x += DOT_SPACING) {
      const idx = (Math.floor(y) * VIEW_W + Math.floor(x)) * 4;
      if (data[idx + 3] > 128) {
        dots.push({ x, y, color: BURST[Math.floor(Math.random() * BURST.length)] });
      }
    }
  }
  return dots;
}

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

export default function DotSlogan() {
  const svgRef = useRef<SVGSVGElement>(null);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const offsetsRef = useRef<{ ox: number; oy: number }[]>([]);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const [dots, setDots] = useState<DotPoint[]>([]);

  useEffect(() => {
    const built = buildDots();
    setDots(built);
    offsetsRef.current = built.map(() => ({ ox: 0, oy: 0 }));
  }, []);

  useEffect(() => {
    if (reducedMotion || dots.length === 0) return;
    const svg = svgRef.current;
    if (!svg) return;

    function localFromClient(clientX: number, clientY: number) {
      const rect = svg!.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * VIEW_W,
        y: ((clientY - rect.top) / rect.height) * VIEW_H,
      };
    }

    function wake() {
      if (!runningRef.current) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function onMove(e: PointerEvent) {
      pointerRef.current = localFromClient(e.clientX, e.clientY);
      wake();
    }

    function onLeave() {
      pointerRef.current = null;
      wake();
    }

    function tick() {
      let anyActive = pointerRef.current !== null;
      const pointer = pointerRef.current;
      const offsets = offsetsRef.current;

      dots.forEach((dot, i) => {
        let targetOx = 0;
        let targetOy = 0;

        if (pointer) {
          const dx = dot.x - pointer.x;
          const dy = dot.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < INFLUENCE) {
            const t = 1 - dist / INFLUENCE;
            // Deterministic-but-varied scatter direction per dot, derived from
            // its own position so it stays stable across frames.
            const angle = (dot.x * 12.9898 + dot.y * 78.233) % (Math.PI * 2);
            targetOx = Math.cos(angle) * 11 * t;
            targetOy = Math.sin(angle) * 11 * t;
          }
        }

        const o = offsets[i];
        o.ox += (targetOx - o.ox) * EASE;
        o.oy += (targetOy - o.oy) * EASE;
        if (Math.abs(o.ox) > 0.05 || Math.abs(o.oy) > 0.05) anyActive = true;

        const el = circleRefs.current[i];
        if (el) el.style.transform = `translate(${o.ox}px, ${o.oy}px)`;
      });

      if (anyActive) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        runningRef.current = false;
        rafRef.current = null;
      }
    }

    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerleave", onLeave);
    return () => {
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerleave", onLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
    };
  }, [dots, reducedMotion]);

  return (
    <div className="relative z-10 my-6 md:my-8">
      <span className="sr-only">Design · Strategy · Direction</span>
      <div className="mx-auto w-full">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="h-auto w-full"
          role="img"
          aria-hidden="true"
        >
          {dots.map((dot, i) => (
            <circle
              key={i}
              ref={(el) => {
                circleRefs.current[i] = el;
              }}
              cx={dot.x}
              cy={dot.y}
              r={DOT_RADIUS}
              fill={dot.color}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
