"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import CountUp from "@/components/CountUp";
import { IconArrowUpRight } from "@/components/Icons";
import MagneticLink from "@/components/MagneticLink";
import StoreMap from "@/components/StoreMap";
import Telemetry, { UptimeClock } from "@/components/Telemetry";
import { stats } from "@/data/content";

export default function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <section id="top" className="relative px-6 pt-32 pb-16 md:pt-40">
      <div className="max-w-6xl mx-auto relative">
        <motion.p
          {...rise(0.1)}
          className="font-mono text-xs uppercase tracking-widest text-sage"
        >
          {"// OPERATOR PROFILE — ONLINE "}
          <span className="animate-[blink_1.2s_steps(1)_infinite]" aria-hidden="true">
            ▮
          </span>
        </motion.p>

        <motion.h1
          {...rise(0.25)}
          className="font-display text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight mt-6"
        >
          George
          <br />
          <span className="text-amber">Schumy</span>
        </motion.h1>

        <motion.p
          {...rise(0.4)}
          className="mt-6 text-lg md:text-xl text-fg/80 leading-relaxed max-w-xl"
        >
          I make things that run at scale, mostly in Jakarta.
        </motion.p>
        <motion.p
          {...rise(0.45)}
          className="mt-3 text-muted leading-relaxed max-w-xl text-base"
        >
          I&apos;ve spent the last four years inside one of the biggest retail
          companies in Indonesia — migrating stores to the cloud, building data
          pipelines that move billions of rows, and keeping things running when
          the lights go out. Golang, Python, Kubernetes, and too much caffeine.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-8 items-start mt-12">
          <motion.div {...rise(0.5)} className="flex flex-col gap-8">
            <UptimeClock />

            <motion.div {...rise(0.7)} className="flex flex-wrap gap-4">
              <MagneticLink
                href="#contact"
                className="inline-flex items-center gap-2 bg-amber text-base px-7 py-3.5 font-mono text-sm uppercase tracking-wider hover:bg-phosphor transition-colors"
              >
                Get in touch
              </MagneticLink>
              <MagneticLink
                href="/cv.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-rule text-fg px-7 py-3.5 font-mono text-sm uppercase tracking-wider hover:border-amber transition-colors"
              >
                View CV <IconArrowUpRight className="w-4 h-4" />
              </MagneticLink>
            </motion.div>

            <div className="flex items-center gap-4">
              <Image
                src="/profile.jpeg"
                alt="George Schumy"
                width={224}
                height={224}
                loading="eager"
                fetchPriority="high"
                className="w-28 h-28 border border-rule object-cover grayscale-[30%]"
              />
              <div className="font-mono text-[10px] uppercase tracking-widest">
                <p className="text-phosphor">Fig. 01 — Operator</p>
                <p className="text-muted mt-1.5">Jakarta, ID · GMT+7</p>
                <p className="text-sage mt-1.5 inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage animate-[pulse-dot_2s_ease-in-out_infinite]" />
                  On call
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div {...rise(0.6)}>
            <StoreMap />
          </motion.div>
        </div>

        <motion.div {...rise(0.8)} className="mt-8">
          <Telemetry />
        </motion.div>

        <motion.div
          {...rise(0.9)}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 border border-rule bg-surface p-6 corner-ticks"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <CountUp
                target={stat.target}
                prefix={stat.prefix}
                suffix={stat.suffix}
                accent={stat.accent}
              />
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
