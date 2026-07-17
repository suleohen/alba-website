import { palette } from "@/lib/content";

const COLORS = [
  palette.accent,
  palette.pink,
  palette.blue,
  palette.lime,
  palette.purple,
];

function hash(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * Deterministic gradient + geometric dot/line placeholder, used wherever a
 * real cover image isn't available yet (Writing posts, Future Projects).
 * Same `seed` always renders the same tile, cycling through the brand's
 * accent palette so the abstract art stays on-brand rather than random.
 */
export default function PlaceholderThumb({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  const h = hash(seed);
  const c1 = COLORS[h % COLORS.length];
  const c2 = COLORS[(h >> 3) % COLORS.length];
  const angle = 20 + (h % 140);

  const dots = Array.from({ length: 4 }, (_, i) => {
    const dh = hash(`${seed}-${i}`);
    return {
      cx: 10 + (dh % 80),
      cy: 10 + ((dh >> 4) % 80),
      r: 3 + ((dh >> 8) % 10),
      color: COLORS[(dh >> 12) % COLORS.length],
    };
  });

  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(${angle}deg, ${c1}26, ${c2}33)`,
        backgroundColor: "#fafafa",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1={(h % 100)}
          x2="100"
          y2={((h >> 6) % 100)}
          stroke="#00000014"
          strokeWidth="0.5"
        />
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill={d.color}
            opacity={0.35}
          />
        ))}
      </svg>
    </div>
  );
}
