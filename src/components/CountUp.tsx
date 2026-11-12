"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CountUpProps {
  target: number;
  prefix: string;
  suffix: string;
  accent: string;
}

export default function CountUp({ target, prefix, suffix, accent }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);
  const startedRef = useRef(false);
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || startedRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        startedRef.current = true;
        io.disconnect();
        const start = performance.now();
        const duration = 1200;
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(target * eased));
          if (t < 1) rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
      },
      { rootMargin: "-60px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, target]);

  return (
    <span
      ref={ref}
      className="font-display text-3xl md:text-4xl font-bold tabular-nums"
      style={{ color: accent }}
    >
      {prefix}
      {(reduced ? target : value).toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
