"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconArrowUpRight, IconDownload, IconMenu, IconX } from "@/components/Icons";
import { navItems } from "@/data/content";

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prefix = pathname === "/" ? "" : "/";
  const onCv = pathname === "/cv";

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = progressRef.current;
      if (el) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        el.style.transform = `scaleX(${p})`;
      }
      const band = window.innerHeight * 0.35;
      let current = "";
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= band) {
          current = item.id;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-base/85 backdrop-blur-md border-b border-rule">
      <div
        ref={progressRef}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber to-sage origin-left scale-x-0"
      />
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <a
            href={`${prefix}#top`}
            className="font-mono text-sm font-bold tracking-tight text-fg whitespace-nowrap"
          >
            G.SCHUMY<span className="text-muted font-normal"> / OPS</span>
          </a>
          <span className="hidden lg:inline-flex items-center gap-1.5 border border-sage/30 bg-sage/10 text-sage font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-sage animate-[pulse-dot_2s_ease-in-out_infinite]" />
            All systems nominal
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
          {navItems.map((item, i) => (
            <a
              key={item.id}
              href={`${prefix}#${item.id}`}
              data-active={active === item.id}
              className={`relative font-mono text-xs uppercase tracking-widest py-1 ${
                active === item.id ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              <span className="text-amber mr-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
              <span className="nav-underline" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {onCv ? (
            <a
              href="/cv.pdf"
              download="George-Schumy-Onsent-CV.pdf"
              className="hidden sm:inline-flex items-center gap-1 bg-amber text-base px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-phosphor transition-colors"
            >
              Download PDF <IconDownload className="w-3.5 h-3.5" />
            </a>
          ) : (
            <Link
              href="/cv"
              className="hidden sm:inline-flex items-center gap-1 bg-amber text-base px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-phosphor transition-colors"
            >
              Resume <IconArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          )}
          <button
            type="button"
            className="md:hidden w-9 h-9 flex items-center justify-center border border-rule text-fg hover:border-amber transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <IconX className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        className={`menu-panel md:hidden bg-surface ${open ? "menu-open" : ""}`}
        inert={!open}
        aria-hidden={!open}
      >
        <div>
          <div
            className="px-6 py-4 flex flex-col border-t border-rule"
            onClick={() => setOpen(false)}
          >
            {navItems.map((item, i) => (
              <a
                key={item.id}
                href={`${prefix}#${item.id}`}
                className={`py-3 font-mono text-sm uppercase tracking-widest border-b border-rule last:border-b-0 ${
                  active === item.id ? "text-fg" : "text-muted"
                }`}
              >
                <span className="text-amber mr-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            ))}
            {onCv ? (
              <a
                href="/cv.pdf"
                download="George-Schumy-Onsent-CV.pdf"
                className="mt-4 bg-amber text-base px-4 py-3 font-mono text-xs uppercase tracking-wider text-center inline-flex items-center justify-center gap-1"
              >
                Download PDF <IconDownload className="w-3.5 h-3.5" />
              </a>
            ) : (
              <Link
                href="/cv"
                className="mt-4 bg-amber text-base px-4 py-3 font-mono text-xs uppercase tracking-wider text-center inline-flex items-center justify-center gap-1"
              >
                Resume <IconArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
