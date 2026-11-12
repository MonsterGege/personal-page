"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { IconArrowUpRight, IconMenu, IconX } from "@/components/Icons";
import { navItems } from "@/data/content";

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
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
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber to-sage origin-left"
      />
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <a
            href="#top"
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
              href={`#${item.id}`}
              className={`relative font-mono text-xs uppercase tracking-widest py-1 ${
                active === item.id ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              <span className="text-amber mr-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.label}
              {active === item.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-px h-[2px] bg-amber"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/cv.png"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 bg-amber text-base px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-phosphor transition-colors"
          >
            Resume <IconArrowUpRight className="w-3.5 h-3.5" />
          </a>
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-rule bg-surface"
            onClick={() => setOpen(false)}
          >
            <div className="px-6 py-4 flex flex-col">
              {navItems.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
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
              <a
                href="/cv.png"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-amber text-base px-4 py-3 font-mono text-xs uppercase tracking-wider text-center inline-flex items-center justify-center gap-1"
              >
                Resume <IconArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
