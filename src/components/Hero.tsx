import Image from "next/image";
import CountUp from "@/components/CountUp";
import { IconArrowUpRight } from "@/components/Icons";
import InViewGate from "@/components/InViewGate";
import MagneticLink from "@/components/MagneticLink";
import StoreMap from "@/components/StoreMap";
import Telemetry, { UptimeClock } from "@/components/Telemetry";
import { stats } from "@/data/content";

const boot = (delay: number, className = "") => ({
  className: `boot ${className}`,
  style: { animationDelay: `${delay}s` },
});

export default function Hero() {
  return (
    <section id="top" className="relative px-6 pt-32 pb-16 md:pt-40">
      <div className="max-w-6xl mx-auto relative">
        <p {...boot(0.05, "font-mono text-xs uppercase tracking-widest text-sage")}>
          {"// OPERATOR PROFILE — ONLINE "}
          <span className="animate-[blink_1.2s_steps(1)_infinite]" aria-hidden="true">
            ▮
          </span>
        </p>

        <h1
          {...boot(
            0.15,
            "font-display text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight mt-6"
          )}
        >
          George
          <br />
          <span className="text-amber">Schumy</span>
        </h1>

        <p {...boot(0.25, "mt-6 text-lg md:text-xl text-fg/80 leading-relaxed max-w-xl")}>
          I make things that run at scale, mostly in Jakarta.
        </p>
        <p {...boot(0.3, "mt-3 text-muted leading-relaxed max-w-xl text-base")}>
          I&apos;ve spent the last four years inside one of the biggest retail
          companies in Indonesia — migrating stores to the cloud, building data
          pipelines that move billions of rows, and keeping things running when
          the lights go out. Golang, Python, Kubernetes, and too much caffeine.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 items-start mt-12">
          <div {...boot(0.4, "flex flex-col gap-8")}>
            <UptimeClock />

            <div className="flex flex-wrap gap-4">
              <MagneticLink
                href="#contact"
                className="inline-flex items-center gap-2 bg-amber text-base px-7 py-3.5 font-mono text-sm uppercase tracking-wider hover:bg-phosphor transition-colors"
              >
                Get in touch
              </MagneticLink>
              <MagneticLink
                href="/cv"
                className="inline-flex items-center gap-2 border border-rule text-fg px-7 py-3.5 font-mono text-sm uppercase tracking-wider hover:border-amber transition-colors"
              >
                View CV <IconArrowUpRight className="w-4 h-4" />
              </MagneticLink>
            </div>

            <div className="flex items-center gap-4">
              <Image
                src="/profile.jpeg"
                alt="George Schumy"
                width={224}
                height={224}
                sizes="112px"
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
          </div>

          <div {...boot(0.45)}>
            <InViewGate>
              <StoreMap />
            </InViewGate>
          </div>
        </div>

        <div {...boot(0.55, "mt-8")}>
          <Telemetry />
        </div>

        <div
          {...boot(
            0.65,
            "grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 border border-rule bg-surface p-6 corner-ticks"
          )}
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
        </div>
      </div>
    </section>
  );
}
