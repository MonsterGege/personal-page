"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FloatingElement, Reveal, TiltCard } from "@/components/Motion3D";
import { MeshGradientBackground, ParticleBackground } from "@/components/Background";

const NAV_ITEMS = ["About", "Skills", "Projects", "Experience", "Education", "Contact"];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = NAV_ITEMS.map((item) =>
        document.getElementById(item.toLowerCase())
      );
      let current = "";
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="flex flex-col min-h-screen star-grid noise-overlay relative">
      {/* ─── Badass Background Layers ─── */}
      <ParticleBackground />
      <MeshGradientBackground />

      {/* ═══════════ HEADER ═══════════ */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl bg-background/70 shadow-lg shadow-accent-cyan/5"
            : "backdrop-blur-md bg-transparent"
        }`}
      >
        {/* Gradient bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl font-bold gradient-text tracking-tight">
              {"<GS />"}
            </span>
            {/* Logo glow */}
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-accent-cyan/20 to-accent-violet/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? "text-accent-cyan"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {/* Active background pill */}
                  {activeSection === item.toLowerCase() && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </a>
              </motion.li>
            ))}
            {/* CTA button */}
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="ml-4"
            >
              <motion.a
                href="/cv.png"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 text-accent-cyan hover:border-accent-cyan/60 hover:shadow-lg hover:shadow-accent-cyan/10 transition-all duration-300"
              >
                Resume ↗
              </motion.a>
            </motion.li>
          </ul>

          {/* Mobile Hamburger */}
          <motion.button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="block h-0.5 w-full bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden backdrop-blur-2xl bg-background/90 border-t border-card-border"
            >
              <div className="px-6 py-6 flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === item.toLowerCase()
                        ? "text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20"
                        : "text-muted hover:text-foreground hover:bg-card-bg"
                    }`}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.a
                  href="/cv.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05 }}
                  className="mt-2 px-4 py-3 rounded-lg text-sm font-medium text-center bg-gradient-to-r from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 text-accent-cyan"
                >
                  Resume ↗
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10"
        >
          {/* Left — Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-accent-cyan font-mono text-sm mb-4 tracking-wider"
            >
              &#47;&#47; Hi! I&apos;m
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-5xl md:text-7xl font-bold mb-2 leading-tight"
            >
              <span className="gradient-text">George</span>
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-foreground"
            >
              Schumy
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-gradient-to-r from-accent-cyan to-transparent" />
              <span className="text-xl text-muted font-light tracking-wide">
                Backend Engineer, Cloud Developer & SRE
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="text-muted leading-relaxed max-w-lg mb-10 text-base"
            >
              4+ years crafting scalable microservices, cloud-native data pipelines,
              and distributed systems with Golang, Python & GCP. Experienced in SRE
              practices, Kubernetes (GKE), and infrastructure reliability. I build the
              backend that powers enterprise-scale applications — serving 15,000+ stores.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-violet text-background font-semibold shadow-lg shadow-accent-cyan/25 hover:shadow-accent-cyan/40 transition-shadow"
              >
                Get in Touch
              </motion.a>
              <motion.a
                href="/cv.png"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-xl border border-card-border text-foreground hover:border-accent-cyan/50 hover:shadow-lg hover:shadow-accent-cyan/10 transition-all"
              >
                View CV ↗
              </motion.a>
            </motion.div>
          </div>

          {/* Right — 3D Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="flex justify-center relative"
          >
            {/* Floating tech tags */}
            <FloatingElement delay={0} duration={8} y={20} className="absolute -top-8 -left-4 z-20">
              <div className="glass-card px-4 py-2 text-xs font-mono text-accent-cyan shadow-lg shadow-accent-cyan/20">
                Golang
              </div>
            </FloatingElement>
            <FloatingElement delay={2} duration={7} y={15} className="absolute top-12 -right-6 z-20">
              <div className="glass-card px-4 py-2 text-xs font-mono text-accent-violet shadow-lg shadow-accent-violet/20">
                Python
              </div>
            </FloatingElement>
            <FloatingElement delay={4} duration={9} y={18} className="absolute -bottom-4 left-8 z-20">
              <div className="glass-card px-4 py-2 text-xs font-mono text-accent-pink shadow-lg shadow-accent-pink/20">
                GCP
              </div>
            </FloatingElement>
            <FloatingElement delay={3} duration={6} y={12} className="absolute top-[60%] -right-10 z-20">
              <div className="glass-card px-4 py-2 text-xs font-mono text-accent-emerald shadow-lg shadow-accent-emerald/20">
                Docker
              </div>
            </FloatingElement>
            <FloatingElement delay={5} duration={7.5} y={14} className="absolute top-[40%] -left-10 z-20">
              <div className="glass-card px-4 py-2 text-xs font-mono text-foreground shadow-lg shadow-foreground/10">
                Kubernetes
              </div>
            </FloatingElement>

            {/* Main image container */}
            <div className="relative w-72 h-72 md:w-[22rem] md:h-[22rem]">
              {/* Outer glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent-cyan/20 via-accent-violet/15 to-accent-pink/20 blur-3xl animate-pulse" />
              {/* Ring glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-accent-cyan via-accent-violet to-accent-pink opacity-60 blur-sm" />
              {/* Card */}
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-accent-cyan via-accent-violet to-accent-pink p-[2px] shadow-2xl shadow-accent-violet/30">
                <div className="w-full h-full rounded-3xl bg-background overflow-hidden">
                  <Image
                    src="/profile.jpeg"
                    alt="George Schumy"
                    width={400}
                    height={400}
                    className="object-cover object-center w-full h-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted/30 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="section-divider max-w-6xl mx-auto mb-20" />
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">About Me</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full mb-12" />
          </Reveal>
          <Reveal delay={0.2}>
            <TiltCard className="p-8 md:p-12">
              <p className="text-muted leading-relaxed text-lg md:text-xl">
                Backend Engineer, Cloud Developer & Site Reliability Engineer specializing in{" "}
                <span className="text-accent-cyan">Golang</span>,{" "}
                <span className="text-accent-violet">Python</span>, and{" "}
                <span className="text-accent-pink">Google Cloud Platform</span>.
                Strong background in system migration, API design (REST), and
                database optimization (PostgreSQL). Experienced in SRE practices
                including incident management, SLI/SLO monitoring, and infrastructure
                reliability. Skilled in Kubernetes (GKE), CI/CD
                automation (Jenkins), and containerized deployments.
              </p>
              <p className="text-muted leading-relaxed text-lg md:text-xl mt-6">
                Adept at applying OOP, data structures, and algorithms to deliver
                high-performance solutions. Currently based in{" "}
                <span className="text-foreground">Jakarta, Indonesia</span>.
              </p>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ SKILLS ═══════════ */}
      <section id="skills" className="py-32 px-6 relative z-10">
        <div className="section-divider max-w-6xl mx-auto mb-20" />
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Tech Stack</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full mb-12" />
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <Reveal key={skill.title} delay={i * 0.1}>
                <TiltCard className="p-6 h-full" glowColor={skill.glow}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{skill.icon}</span>
                    <h3 className="text-lg font-semibold text-foreground">
                      {skill.title}
                    </h3>
                  </div>
                  <ul className="space-y-2.5">
                    {skill.items.map((item) => (
                      <li
                        key={item}
                        className="text-muted text-sm flex items-start gap-2.5"
                      >
                        <span className="text-accent-cyan text-xs mt-1.5">◆</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="section-divider max-w-6xl mx-auto mb-20" />
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Projects</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full mb-12" />
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <TiltCard className="p-8 md:p-10" glowColor="rgba(6, 182, 212, 0.15)">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      My Pocket
                    </h3>
                    <p className="text-accent-cyan font-medium">
                      Personal Finance Manager
                    </p>
                  </div>
                  <a
                    href="https://my-pocket.schum.web.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-accent-cyan/15 to-accent-violet/15 border border-accent-cyan/30 text-accent-cyan hover:border-accent-cyan/60 hover:shadow-lg hover:shadow-accent-cyan/10 transition-all whitespace-nowrap"
                  >
                    Live Demo ↗
                  </a>
                </div>
                <p className="text-muted leading-relaxed mb-6">
                  A full-stack personal finance tracking application to manage expenses, income, and budgets.
                  Built with modern web technologies and deployed on a self-managed cloud server with Nginx reverse proxy and SSL.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Supabase", "Nginx", "PM2", "Certbot SSL"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </TiltCard>
            </Reveal>

            <Reveal delay={0.2}>
              <TiltCard className="p-8 md:p-10" glowColor="rgba(139, 92, 246, 0.15)">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      PT. Trisons Niaga Pratama
                    </h3>
                    <p className="text-accent-violet font-medium">
                      Maritime Company Website
                    </p>
                  </div>
                  <a
                    href="https://trisons.schum.web.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-accent-violet/15 to-accent-pink/15 border border-accent-violet/30 text-accent-violet hover:border-accent-violet/60 hover:shadow-lg hover:shadow-accent-violet/10 transition-all whitespace-nowrap"
                  >
                    Live Site ↗
                  </a>
                </div>
                <p className="text-muted leading-relaxed mb-6">
                  A company profile website for PT. Trisons Niaga Pratama — a maritime shipping company
                  specializing in cargo transhipment, inter-island long towing, and coal transport brokerage
                  across the Indonesian archipelago.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Responsive Design", "Company Profile", "Maritime"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-accent-violet/10 border border-accent-violet/20 text-accent-violet"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <section id="experience" className="py-32 px-6 relative z-10">
        <div className="section-divider max-w-6xl mx-auto mb-20" />
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Experience</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full mb-12" />
          </Reveal>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan via-accent-violet to-transparent" />

            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <Reveal key={i} delay={i * 0.2} direction="left">
                  <div className="relative pl-8 md:pl-20">
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-8 top-6 w-3 h-3 -translate-x-[5px] rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet shadow-lg shadow-accent-cyan/50" />

                    <TiltCard className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            {exp.title}
                          </h3>
                          <p className="text-accent-cyan font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-muted bg-card-bg px-3 py-1.5 rounded-full border border-card-border whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {exp.points.map((point, j) => (
                          <li
                            key={j}
                            className="text-muted text-sm leading-relaxed flex items-start gap-2.5"
                          >
                            <span className="text-accent-violet text-xs mt-1.5">▸</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </TiltCard>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ EDUCATION ═══════════ */}
      <section id="education" className="py-32 px-6 relative z-10">
        <div className="section-divider max-w-6xl mx-auto mb-20" />
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Education</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full mb-12" />
          </Reveal>

          <Reveal delay={0.2}>
            <TiltCard className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Universitas Kristen Satya Wacana
                  </h3>
                  <p className="text-accent-cyan text-lg">
                    Bachelor of Information Engineering
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-muted font-mono text-sm">Graduated 2022</p>
                  <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-cyan/10 to-accent-violet/10 border border-accent-cyan/20">
                    <span className="text-accent-cyan font-bold text-lg">
                      3.96
                    </span>
                    <span className="text-muted text-sm">/ 4.00</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="section-divider max-w-6xl mx-auto mb-20" />
        <div className="max-w-6xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Let&apos;s Connect</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full mb-6 mx-auto" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted text-lg mb-16 max-w-lg mx-auto">
              Open to new opportunities. Let&apos;s build something great together.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {contacts.map((contact, i) => (
              <Reveal key={contact.label} delay={0.1 + i * 0.15} direction="scale">
                <ContactItem {...contact} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-card-border relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="gradient-text font-medium">George Schumy</span>.
            Crafted with Next.js & Framer Motion.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ─── Contact Card Component ─── */
function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <TiltCard className="p-6 text-center h-full">
      <div className="text-4xl mb-4">{icon}</div>
      <p className="text-xs uppercase tracking-wider text-muted mb-2">
        {label}
      </p>
      <p className="text-foreground font-medium text-sm">{value}</p>
    </TiltCard>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {inner}
      </a>
    );
  }
  return inner;
}

/* ─── Data ─── */
const skills = [
  {
    title: "Languages & Frameworks",
    icon: "⚡",
    glow: "rgba(6, 182, 212, 0.15)",
    items: ["Golang (Echo)", "Python (FastAPI, Flask)", "TypeScript (Next.js)", "RESTful APIs & HTTP"],
  },
  {
    title: "Cloud & Infra",
    icon: "☁️",
    glow: "rgba(139, 92, 246, 0.15)",
    items: [
      "Google Cloud Platform",
      "Cloud Run, Cloud SQL, Pub/Sub",
      "Compute Engine, Load Balancing",
      "Kubernetes (GKE)",
      "Secret Manager, Docker, Linux",
    ],
  },
  {
    title: "Databases & Data",
    icon: "🗄️",
    glow: "rgba(236, 72, 153, 0.12)",
    items: ["PostgreSQL", "Redis", "Parquet Data Processing", "Pub/Sub Messaging"],
  },
  {
    title: "DevOps & CI/CD",
    icon: "🔄",
    glow: "rgba(6, 182, 212, 0.15)",
    items: [
      "Jenkins Pipelines",
      "Docker Containers",
      "Automated Deployments",
      "Zero-downtime Releases",
    ],
  },
  {
    title: "SRE & Reliability",
    icon: "🛡️",
    glow: "rgba(16, 185, 129, 0.15)",
    items: [
      "Incident Management & On-Call",
      "SLI/SLO Monitoring",
      "Capacity Planning",
      "Observability: Logging, Metrics, Tracing",
    ],
  },
  {
    title: "Other",
    icon: "🧠",
    glow: "rgba(139, 92, 246, 0.15)",
    items: [
      "OOP & Design Patterns",
      "DSA (Data Structures & Algorithms)",
      "System Design & Architecture",
      "Agile, Cross-functional Collaboration",
    ],
  },
];

const experiences = [
  {
    title: "Backend Engineer, Cloud Developer & SRE",
    company: "PT. Sumber Alfaria Trijaya",
    period: "Jul 2022 — Present",
    points: [
      "Spearheaded cloud migration of 70%+ Alfamart stores (≈15,000+ stores) from legacy to cloud-native infrastructure — cutting downtime by 30% and boosting transaction throughput by 25%.",
      "Architected high-performance Golang microservices for Parquet-based data pipelines, managing large-scale database operations and ETL workflows.",
      "Built a master transfer system to migrate data from warehouse to stores at start-of-day and collect transaction/inventory data from stores back to warehouse at end-of-day, ensuring data consistency across ≈15,000+ stores.",
      "Deployed containerized services to Cloud Run, Compute Engine, and GKE with Load Balancing, integrated with Cloud SQL, Pub/Sub, and Secret Manager.",
      "Engineered automated CI/CD pipelines with Jenkins for zero-downtime deployments across multiple environments.",
      "Maintained site reliability — defined SLIs/SLOs, managed incident response, conducted post-mortems, and implemented observability stack (logging, metrics, tracing).",
      "Collaborated with frontend teams on design system development, improving cross-functional delivery speed.",
    ],
  },
  {
    title: "Fullstack Developer Intern (IT Business Solution)",
    company: "PT. Sumber Alfaria Trijaya",
    period: "Sep 2021 — Jul 2022",
    points: [
      "Developed a Python fingerprint authentication library (NitgenBSP) enabling biometric verification across multi-platform POS systems.",
      "Built an automated cloud file sync client with intelligent retry/back-off and checksum verification — ensuring data integrity at scale.",
      "Optimized transaction history reporting system, reducing query latency by 20% through query profiling and index tuning.",
      "Contributed to a Store Information System for master stock management, improving inventory accuracy and operational reliability.",
    ],
  },
];

const contacts = [
  {
    icon: "📧",
    label: "Email",
    value: "georgeonsent10@gmail.com",
    href: "mailto:georgeonsent10@gmail.com",
  },
  {
    icon: "📱",
    label: "Phone",
    value: "+628170250994",
    href: "tel:+628170250994",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Tanjung Priok, Jakarta Utara",
  },
  {
    icon: "🌐",
    label: "Website",
    value: "schum.web.id",
    href: "https://schum.web.id",
  },
  {
    icon: "💻",
    label: "GitHub",
    value: "github.com/MonsterGege",
    href: "https://github.com/MonsterGege",
  },
];
