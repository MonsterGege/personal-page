import type { CSSProperties, ReactNode } from "react";
import Reveal from "@/components/Reveal";

const ACCENTS = {
  amber: "#e8a838",
  sage: "#58b894",
  burnt: "#e06a45",
  info: "#4f8ff7",
} as const;

interface SectionProps {
  id: string;
  index: number;
  title: string;
  accent: keyof typeof ACCENTS;
  note?: string;
  children: ReactNode;
}

export default function Section({
  id,
  index,
  title,
  accent,
  note,
  children,
}: SectionProps) {
  const num = String(index).padStart(2, "0");
  return (
    <section
      id={id}
      className="px-6 py-24 relative"
      style={{ "--acc": ACCENTS[accent] } as CSSProperties}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-12">
            <span className="font-mono text-sm" style={{ color: "var(--acc)" }}>
              {num}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-fg">
              {title}
            </h2>
            <div
              className="flex-1 h-px"
              style={{
                background: "linear-gradient(90deg, var(--acc), transparent)",
              }}
            />
            {note && (
              <span className="hidden md:inline font-mono text-xs uppercase tracking-widest text-muted">
                {note}
              </span>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
