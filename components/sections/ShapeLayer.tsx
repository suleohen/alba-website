"use client";

import { useState } from "react";

type ShapeBase = {
  id: number;
  type: "circle" | "rect";
};

type ShapeComputed = ShapeBase & {
  top: string;
  left: string;
  width: number;
  height: number;
  color: string;
  delay: number;
  rotation: number;
  opacity: number;
};

const SHAPES: ShapeBase[] = [
  // Circles
  { id: 1, type: "circle" },
  { id: 2, type: "circle" },
  { id: 3, type: "circle" },
  { id: 4, type: "circle" },



  // Rectangles
  { id: 5, type: "rect" },
  { id: 6, type: "rect" },
  { id: 7, type: "rect" },


];

const COLORS = ["#F73914", "#E0F714", "#F7148D", "#8D14F7", "#5141F7"];

// ✅ “Güzel duran” slotlar (istediğin gibi ekle/çıkar)
// Not: 15 shape var, burada 20+ slot bıraktım ki varyasyon fazla olsun
const POSITION_SLOTS: Array<{ top: string; left: string }> = [
  { top: "10%", left: "8%" },
  { top: "14%", left: "35%" },
  { top: "12%", left: "72%" },
  { top: "18%", left: "90%" },

  { top: "28%", left: "12%" },
  { top: "32%", left: "42%" },
  { top: "30%", left: "70%" },
  { top: "36%", left: "88%" },

  { top: "45%", left: "8%" },
  { top: "48%", left: "30%" },
  { top: "46%", left: "58%" },
  { top: "50%", left: "82%" },

  { top: "60%", left: "14%" },
  { top: "62%", left: "44%" },
  { top: "64%", left: "74%" },
  { top: "66%", left: "90%" },

  { top: "78%", left: "10%" },
  { top: "80%", left: "38%" },
  { top: "82%", left: "66%" },
  { top: "84%", left: "88%" },

  { top: "90%", left: "20%" },
  { top: "92%", left: "52%" },
];

// circle + rect boyut aralıkları (geniş)
const SIZE_RANGES = {
  circle: { min: 80, max: 220 },
  rect: {
    width: { min: 120, max: 420 },
    height: { min: 40, max: 180 },
  },
};

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

// Fisher–Yates shuffle (seed'li)
function shuffle<T>(arr: T[], r: () => number) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function computeShapes(): ShapeComputed[] {
  // ✅ Refresh’te değişsin diye seed’i Date.now() yaptık
  const r = mulberry32(Date.now());

  // ✅ Slotları karıştır → her refresh’te farklı dağılsın
  const shuffledSlots = shuffle(POSITION_SLOTS, r);

  return SHAPES.map((shape, index) => {
    // ✅ Aynı slot’a iki shape düşmesin diye sırayla alıyoruz
    // slot sayısı yetmezse döngüye girer (ama biz bol tuttuk)
    const slot = shuffledSlots[index % shuffledSlots.length];

    let width: number;
    let height: number;

    if (shape.type === "circle") {
      const size = randBetween(r, SIZE_RANGES.circle.min, SIZE_RANGES.circle.max);
      width = size;
      height = size;
    } else {
      width = randBetween(r, SIZE_RANGES.rect.width.min, SIZE_RANGES.rect.width.max);
      height = randBetween(r, SIZE_RANGES.rect.height.min, SIZE_RANGES.rect.height.max);

      // bazen yatay bazen dikey (daha doğal duruyor)
      if (r() > 0.5) [width, height] = [height, width];
    }

    return {
      ...shape,
      top: slot.top,
      left: slot.left,
      width,
      height,
      color: COLORS[randBetween(r, 0, COLORS.length - 1)],
      delay: randBetween(r, 0, 60) / 10,
      rotation: randBetween(r, -10, 10), // hafif rotation daha tatlı
      opacity: randBetween(r, 4, 12) / 100,
    };
  });
}

export default function ShapeLayer() {
  const [shapes] = useState<ShapeComputed[]>(computeShapes);

  const renderShape = (shape: ShapeComputed) => {
    const baseStyle = {
      backgroundColor: shape.color,
      opacity: shape.opacity,
    };

    if (shape.type === "circle") {
      return (
        <div
          className="h-full w-full rounded-full backdrop-blur-sm"
          style={baseStyle}
        />
      );
    }

    return (
      <div
        className="h-full w-full backdrop-blur-sm"
        style={{
          ...baseStyle,
          borderRadius: "14px",
        }}
      />
    );
  };

  return (
    <div className="absolute inset-0 z-0 bg-dots overflow-hidden">

      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute animate-float transition-all duration-700 ease-out hover:scale-110 hover:opacity-30"
          style={{
            top: shape.top,
            left: shape.left,
            width: shape.width,
            height: shape.height,
            animationDelay: `${shape.delay}s`,
            transform: `rotate(${shape.rotation}deg)`,
          }}
        >
          {renderShape(shape)}
        </div>
      ))}
    </div>
  );
}
