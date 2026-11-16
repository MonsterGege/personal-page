"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

interface MagneticLinkProps {
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
}

export default function MagneticLink({
  href,
  target,
  rel,
  className,
  children,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = clamp((e.clientX - (rect.left + rect.width / 2)) * 0.25, -8, 8);
    const dy = clamp((e.clientY - (rect.top + rect.height / 2)) * 0.25, -8, 8);
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <Link
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={`magnetic ${className ?? ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
}
