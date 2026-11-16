import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import { IconArrowUp, IconDownload, IconMap } from "@/components/Icons";
import {
  contacts,
  cvSummary,
  education,
  experiences,
  skills,
} from "@/data/content";

export const metadata: Metadata = {
  title: "CV — George Schumy",
  description:
    "ATS-ready curriculum vitae of George Schumy — Backend Engineer & SRE. View online or download the PDF.",
};

function DocSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-amber border-b border-rule pb-2 mb-4">
        {label}
      </h2>
      {children}
    </section>
  );
}

export default function CvPage() {
  return (
    <>
      <Nav />
      <main className="relative z-10 px-6 pt-32 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="boot">
            <p className="font-mono text-xs uppercase tracking-widest text-phosphor">
              {"// Curriculum Vitae — ATS Ready"}
            </p>
            <div className="flex flex-wrap items-end justify-between gap-6 mt-4">
              <div>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-fg">
                  George Schumy
                </h1>
                <p className="font-mono text-sm uppercase tracking-widest text-amber mt-3">
                  Backend Engineer &amp; SRE
                </p>
              </div>
              <a
                href="/cv.pdf"
                download="George-Schumy-Onsent-CV.pdf"
                className="inline-flex items-center gap-2 bg-amber text-base px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-phosphor transition-colors"
              >
                Download PDF <IconDownload className="w-4 h-4" />
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-6 font-mono text-xs text-muted">
              {contacts.map((contact) => {
                const Icon = IconMap[contact.icon];
                const inner = (
                  <>
                    <Icon className="w-3.5 h-3.5 text-amber" />
                    {contact.value}
                  </>
                );
                return (
                  <li key={contact.label}>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target={contact.external ? "_blank" : undefined}
                        rel={contact.external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 hover:text-fg transition-colors"
                      >
                        {inner}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        {inner}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-10 border border-rule bg-surface corner-ticks scanlines boot">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span>cv.pdf — preview</span>
              <span className="hidden sm:inline">
                A4 / Letter · 1 page · selectable text
              </span>
              <span className="inline-flex items-center gap-1.5 text-sage">
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-[pulse-dot_2s_ease-in-out_infinite]" />
                ATS ready
              </span>
            </div>

            <div className="p-6 md:p-10 space-y-8">
              <DocSection label="Summary">
                <p className="text-sm leading-relaxed text-fg/80">
                  {cvSummary}
                </p>
              </DocSection>

              <DocSection label="Skills">
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <p key={skill.title} className="text-sm text-muted">
                      <span className="text-fg font-medium">
                        {skill.title}:
                      </span>{" "}
                      {skill.items.join(", ")}
                    </p>
                  ))}
                </div>
              </DocSection>

              <DocSection label="Experience">
                <div className="space-y-8">
                  {experiences.map((exp) => (
                    <div key={exp.period}>
                      <h3 className="font-display text-lg font-bold text-fg">
                        {exp.title}
                      </h3>
                      <p className="font-mono text-xs text-burnt mt-1">
                        {exp.company} · {exp.period}
                      </p>
                      <ul className="mt-3 space-y-2">
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
                  ))}
                </div>
              </DocSection>

              <DocSection label="Education">
                <h3 className="font-display text-lg font-bold text-fg">
                  {education.university}
                </h3>
                <p className="text-sm text-info mt-1">{education.degree}</p>
                <p className="font-mono text-xs uppercase tracking-widest text-muted mt-2">
                  {education.graduated} · GPA {education.gpa} /{" "}
                  {education.gpaMax}
                </p>
              </DocSection>
            </div>
          </div>

          <p className="font-mono text-xs text-muted mt-6">
            Need it for an application? Grab the{" "}
            <a
              href="/cv.pdf"
              download="George-Schumy-Onsent-CV.pdf"
              className="text-amber hover:text-phosphor transition-colors"
            >
              ATS-ready PDF
            </a>{" "}
            — single column, embedded text, prints on A4 and Letter.
          </p>
        </div>
      </main>

      <footer className="relative z-10 border-t border-rule px-6 py-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-4 items-center">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} GEORGE SCHUMY — SET IN SPACE GROTESK
            &amp; GEIST
          </p>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 text-muted hover:text-amber transition-colors"
          >
            Return to site <IconArrowUp className="w-3.5 h-3.5" />
          </Link>
        </div>
      </footer>
    </>
  );
}
