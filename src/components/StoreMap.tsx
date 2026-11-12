import { networkArcs, storeNodes } from "@/data/content";

const islands = [
  "M70 96 L108 78 L150 118 L186 168 L216 226 L232 268 L206 282 L172 244 L132 196 L96 148 L64 118 Z",
  "M238 292 L300 286 L360 292 L420 300 L436 312 L376 316 L310 310 L252 306 Z",
  "M300 96 L352 78 L400 96 L416 140 L396 190 L352 210 L316 188 L292 144 Z",
  "M470 100 L492 92 L500 130 L530 118 L544 132 L512 152 L500 190 L520 226 L504 238 L484 196 L470 220 L456 210 L472 164 L462 132 Z",
  "M640 150 L692 132 L740 148 L768 186 L756 232 L716 252 L676 236 L648 196 Z",
];

const smallIslands: [number, number][] = [
  [452, 318], [486, 322], [524, 326], [560, 330],
  [568, 180], [588, 214], [576, 248],
];

const labels: [string, number, number][] = [
  ["SUMATRA", 92, 70],
  ["KALIMANTAN", 312, 70],
  ["SULAWESI", 508, 86],
  ["JAVA", 316, 342],
  ["PAPUA", 688, 128],
];

export default function StoreMap() {
  return (
    <div className="border border-rule bg-surface corner-ticks">
      <div className="flex items-center justify-between px-4 py-3 border-b border-rule">
        <span className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
          Store Network — ID Region
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          15,000+ nodes
        </span>
      </div>

      <svg
        viewBox="0 0 800 420"
        role="img"
        aria-label="Stylized map of the Indonesian store network with Jakarta hub"
        className="w-full h-auto block"
      >
        {islands.map((d) => (
          <path
            key={d}
            d={d}
            fill="var(--surface-2)"
            stroke="var(--rule)"
            strokeWidth="1"
          />
        ))}
        {smallIslands.map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="4"
            fill="var(--surface-2)"
            stroke="var(--rule)"
            strokeWidth="1"
          />
        ))}
        {labels.map(([text, x, y]) => (
          <text
            key={text}
            x={x}
            y={y}
            fill="var(--muted)"
            fontSize="9"
            fontFamily="var(--font-geist-mono), monospace"
            letterSpacing="2"
            className="map-label"
          >
            {text}
          </text>
        ))}

        {networkArcs.map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="var(--amber)"
            strokeWidth="1"
            opacity="0.5"
            className="arc-flow map-anim"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}

        {storeNodes.map(([cx, cy], i) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="2.2"
            fill="var(--sage)"
            opacity="0.9"
            className="node-pulse map-anim animate-[pulse-dot_3s_ease-in-out_infinite]"
            style={{ animationDelay: `${(i % 9) * 0.35}s` }}
          />
        ))}

        <circle
          cx="262"
          cy="298"
          r="10"
          fill="none"
          stroke="var(--amber)"
          className="radar-ring map-anim"
        />
        <circle
          cx="262"
          cy="298"
          r="10"
          fill="none"
          stroke="var(--amber)"
          className="radar-ring map-anim"
          style={{ animationDelay: "1.5s" }}
        />
        <circle cx="262" cy="298" r="4" fill="var(--amber)" />
        <text
          x="272"
          y="290"
          fill="var(--amber)"
          fontSize="9"
          fontFamily="var(--font-geist-mono), monospace"
          letterSpacing="1.5"
          className="map-label"
        >
          JKT-HUB
        </text>
      </svg>

      <div className="flex items-center justify-between px-4 py-2.5 border-t border-rule">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
          Stylized · Not to scale
        </span>
        <span className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" /> Hub
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" /> Store
          </span>
        </span>
      </div>
    </div>
  );
}
