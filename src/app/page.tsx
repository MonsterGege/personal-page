import ContactGrid from "@/components/ContactGrid";
import Hero from "@/components/Hero";
import { IconArrowUp, IconMap } from "@/components/Icons";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { about, education, experiences, skills } from "@/data/content";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative z-10">
        <Hero />

        <Section id="about" index={1} title="About" accent="amber" note="Operator Notes">
          <div className="grid md:grid-cols-[2fr_1fr] gap-10">
            <div className="space-y-6">
              {about.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-lg leading-relaxed text-fg/80">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15}>
              <aside className="md:sticky md:top-28 self-start border border-rule bg-surface p-5 font-mono text-xs space-y-3 text-muted corner-ticks">
                <p className="uppercase tracking-widest text-phosphor mb-4">
                  Operator summary
                </p>
                <p>
                  <span className="text-amber">BASE</span> → Jakarta, Indonesia
                </p>
                <p>
                  <span className="text-amber">FOCUS</span> → Backend / Cloud /
                  SRE
                </p>
                <p>
                  <span className="text-amber">STACK</span> → Golang · Python ·
                  K8s
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-amber">STATUS</span> →
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-sage animate-[pulse-dot_2s_ease-in-out_infinite]" />
                  Open to interesting problems
                </p>
              </aside>
            </Reveal>
          </div>
        </Section>

        <Section id="work" index={2} title="What I Work With" accent="sage" note="System Modules">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skill, i) => {
              const Icon = IconMap[skill.icon];
              return (
                <Reveal key={skill.title} delay={i * 0.06} className="h-full">
                  <div className="group border border-rule bg-surface p-6 h-full corner-ticks transition-all duration-300 hover:border-sage/60 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(88,184,148,0.08)]">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-9 h-9 border border-sage/40 text-sage flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <h3 className="font-mono text-sm uppercase tracking-wider text-fg flex-1">
                        {skill.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-sage shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage animate-[pulse-dot_2.5s_ease-in-out_infinite]" />
                        Active
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {skill.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-muted flex items-start gap-2"
                        >
                          <span className="text-sage font-mono mt-px">+</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Section>

        <Section id="experience" index={3} title="Experience" accent="burnt" note="Changelog">
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-rule" />
            <div className="space-y-10">
              {experiences.map((exp, i) => (
                <Reveal key={exp.period} delay={i * 0.1}>
                  <div className="pl-8 relative">
                    <span className="absolute left-0 top-2 w-[15px] h-[15px] border-2 border-burnt bg-base rounded-full animate-[pulse-dot_3s_ease-in-out_infinite]" />
                    <span className="font-mono text-[11px] uppercase tracking-widest border border-rule bg-surface-2 text-muted px-2.5 py-1 inline-block">
                      {exp.version}
                    </span>
                    <h3 className="font-display text-xl font-bold text-fg mt-3">
                      {exp.title}
                    </h3>
                    <p className="text-burnt font-medium text-sm mt-1">
                      {exp.company} · {exp.period}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {exp.points.map((point) => (
                        <li
                          key={point}
                          className="text-sm text-muted leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-burnt font-mono">&gt;</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        <Section id="education" index={4} title="Education" accent="info" note="Certification">
          <Reveal>
            <div className="border border-rule bg-surface p-8 corner-ticks flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-fg">
                  {education.university}
                </h3>
                <p className="text-info mt-1">{education.degree}</p>
              </div>
              <div className="flex md:flex-col items-center md:items-end gap-4">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  {education.graduated}
                </p>
                <span className="inline-block border-2 border-info text-info font-mono px-4 py-2 rotate-[2deg] font-bold">
                  GPA {education.gpa} / {education.gpaMax}
                </span>
              </div>
            </div>
          </Reveal>
        </Section>

        <Section id="contact" index={5} title="Let's Connect" accent="amber" note="Channels">
          <Reveal>
            <p className="text-fg/80 text-lg mb-10 max-w-lg">
              If something here caught your eye, or you just want to talk shop
              — I&apos;m usually around.
            </p>
          </Reveal>
          <ContactGrid />
        </Section>
      </main>

      <footer className="relative z-10 border-t border-rule px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-4 items-center">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} GEORGE SCHUMY — SET IN SPACE GROTESK
            &amp; GEIST
          </p>
          <p className="font-mono text-xs text-muted">
            END OF TRANSMISSION{" "}
            <span className="text-phosphor animate-[blink_1.2s_steps(1)_infinite]" aria-hidden="true">
              ▮
            </span>
          </p>
          <a
            href="#top"
            className="font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 text-muted hover:text-amber transition-colors"
          >
            Return to top <IconArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>
    </>
  );
}
