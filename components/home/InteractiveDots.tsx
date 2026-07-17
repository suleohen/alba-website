"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { palette } from "@/lib/content";

// Pages with their own flat/gradient background opt out of the sitewide dot
// canvas so it doesn't clash with denser editorial layouts.
const DISABLED_ROUTES = ["/", "/about", "/contact", "/writing"];

const DOT_SPACING = 22;
const BASE_RADIUS = 1.2;
const MAX_RADIUS = 3.4;
const INFLUENCE_RADIUS = 140;
const EASE = 0.12;
const SETTLE_EPSILON = 0.01;
const BASE_RGB = { r: 0, g: 0, b: 0 };

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

// Each dot eases toward a color of its own from the brand palette instead of
// a single fixed hue, so the field reads as playful/multicolor up close.
const PALETTE_RGB = [
  palette.accent,
  palette.lime,
  palette.pink,
  palette.purple,
  palette.blue,
].map(hexToRgb);

type Dot = {
  x: number;
  y: number;
  radius: number;
  mix: number;
  color: { r: number; g: number; b: number };
};

function mixColor(dot: Dot, t: number) {
  const r = Math.round(BASE_RGB.r + (dot.color.r - BASE_RGB.r) * t);
  const g = Math.round(BASE_RGB.g + (dot.color.g - BASE_RGB.g) * t);
  const b = Math.round(BASE_RGB.b + (dot.color.b - BASE_RGB.b) * t);
  const alpha = 0.15 + 0.45 * t;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function InteractiveDots({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const pathname = usePathname();
  const disabled = DISABLED_ROUTES.includes(pathname);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (disabled) {
      // Leave the canvas blank (it's transparent by default) instead of
      // unmounting it, so the sitewide layer doesn't remount on every
      // route change — it just stops drawing on opted-out pages.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function buildDots(width: number, height: number) {
      const dots: Dot[] = [];
      for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
        for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
          const color =
            PALETTE_RGB[Math.floor(Math.random() * PALETTE_RGB.length)];
          dots.push({ x, y, radius: BASE_RADIUS, mix: 0, color });
        }
      }
      dotsRef.current = dots;
    }

    // Canvas is a fixed, viewport-covering layer, so it must be sized to the
    // viewport rather than any scrollable parent (whose height can be much
    // larger than what's ever visible on screen).
    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots(width, height);
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx!.fillStyle = "rgba(0, 0, 0, 0.2)";
      for (const dot of dotsRef.current) {
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, BASE_RADIUS, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    resize();

    if (prefersReducedMotion) {
      drawStatic();
      const onResizeStatic = () => {
        resize();
        drawStatic();
      };
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    function setPointerFromClient(clientX: number, clientY: number) {
      pointerRef.current = { x: clientX, y: clientY };
      wake();
    }

    function onMouseMove(e: MouseEvent) {
      setPointerFromClient(e.clientX, e.clientY);
    }
    function onTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      if (touch) setPointerFromClient(touch.clientX, touch.clientY);
    }
    function onPointerLeave() {
      pointerRef.current = null;
      wake();
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", resize);
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    function tick() {
      let anyActive = pointerRef.current !== null;

      if (!document.hidden) {
        ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
        const pointer = pointerRef.current;

        for (const dot of dotsRef.current) {
          let targetRadius = BASE_RADIUS;
          let targetMix = 0;

          if (pointer) {
            const dx = dot.x - pointer.x;
            const dy = dot.y - pointer.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < INFLUENCE_RADIUS) {
              const t = 1 - dist / INFLUENCE_RADIUS;
              targetRadius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * t;
              targetMix = t;
            }
          }

          dot.radius += (targetRadius - dot.radius) * EASE;
          dot.mix += (targetMix - dot.mix) * EASE;

          if (
            Math.abs(dot.radius - BASE_RADIUS) > SETTLE_EPSILON ||
            Math.abs(dot.mix) > SETTLE_EPSILON
          ) {
            anyActive = true;
          }

          ctx!.beginPath();
          ctx!.fillStyle = mixColor(dot, dot.mix);
          ctx!.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      if (anyActive) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Nothing left to animate (pointer gone, dots settled): stop the
        // loop instead of redrawing an unchanged frame forever.
        runningRef.current = false;
        rafRef.current = null;
      }
    }

    function wake() {
      if (!runningRef.current) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    wake();

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [disabled]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "pointer-events-none absolute inset-0 z-0"}
    />
  );
}
