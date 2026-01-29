"use client";

import { useState } from "react";

type ShapeBase = {
  id: number;
  top: string;
  left: string;
  type: "circle" | "rect";
};

type ShapeComputed = ShapeBase & {
  size: number;
  color: string;
  delay: number;
  filled: boolean;
};

const SHAPES: ShapeBase[] = [
  { id: 1, top: "10%", left: "6%", type: "circle" },
  { id: 2, top: "28%", left: "78%", type: "rect" },
  { id: 3, top: "60%", left: "10%", type: "rect" },
  { id: 4, top: "72%", left: "68%", type: "circle" },
  { id: 5, top: "42%", left: "46%", type: "circle" },
  { id: 6, top: "18%", left: "50%", type: "rect" },
  { id: 7, top: "85%", left: "30%", type: "circle" },
];

const COLORS = ["#F73914", "#E0F714", "#F7148D", "#8D14F7", "#5141F7"];

// deterministic PRNG (Math.random yok)
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randBetween(r: () => number, min: number, max: number) {
  return Math.floor(r() * (max - min + 1)) + min;
}

function getSessionSeed(key: string, fallback: number) {
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return Number(existing) || fallback;
    const next = String(Date.now() % 1000000);
    sessionStorage.setItem(key, next);
    return Number(next) || fallback;
  } catch {
    return fallback;
  }
}

function computeShapes(): ShapeComputed[] {
  const seed = getSessionSeed("alba-shape-seed", 1337);
  const r = mulberry32(seed);

  return SHAPES.map((shape) => {
    const size = randBetween(r, 28, 56);
    const color = COLORS[randBetween(r, 0, COLORS.length - 1)];
    const delay = randBetween(r, 0, 30) / 10;
    const filled = randBetween(r, 1, 100) <= 30; // %30 filled

    return { ...shape, size, color, delay, filled };
  });
}

export default function ShapeLayer() {
  const [shapes] = useState<ShapeComputed[]>(computeShapes);

  return (
    <div className="absolute inset-0 z-0 bg-white">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute animate-float transition-transform duration-700 ease-out hover:rotate-12 hover:scale-125 hover:opacity-0"
          style={{
            top: shape.top,
            left: shape.left,
            width: shape.size,
            height: shape.size,
            animationDelay: `${shape.delay}s`,
          }}
        >
          <div
            className={`h-full w-full ${
              shape.type === "circle" ? "rounded-full" : ""
            }`}
            style={{
              border: `2px solid ${shape.color}`,
              backgroundColor: shape.filled ? `${shape.color}22` : "transparent",
            }}
          />
        </div>
      ))}
    </div>
  );
}