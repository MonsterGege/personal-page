"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface InViewGateProps {
  children: ReactNode;
  className?: string;
}

export default function InViewGate({ children, className }: InViewGateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setLive(entry.isIntersecting);
      },
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${live ? "is-live" : ""} ${className ?? ""}`}>
      {children}
    </div>
  );
}
