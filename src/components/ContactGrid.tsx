"use client";

import { useEffect, useRef, useState } from "react";
import { contacts, type Contact } from "@/data/content";
import { IconArrowUpRight, IconCheck, IconCopy, IconMap } from "@/components/Icons";
import Reveal from "@/components/Reveal";

interface CardProps {
  contact: Contact;
  copied: boolean;
  onCopy: (text: string) => void;
}

function Card({ contact, copied, onCopy }: CardProps) {
  const Icon = IconMap[contact.icon];
  const base =
    "border border-rule bg-surface p-6 h-full corner-ticks hover:border-amber/60 transition-colors";

  const body = (
    <>
      <Icon className="w-5 h-5 text-amber" />
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted mt-3">
        {contact.label}
      </p>
      <p className="text-sm font-medium break-all mt-1 text-fg">
        {contact.value}
      </p>
    </>
  );

  if (contact.copy) {
    return (
      <div className={base}>
        {body}
        <button
          type="button"
          aria-label="Copy email address"
          onClick={() => onCopy(contact.value)}
          className={`mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest border px-2.5 py-1.5 transition-colors ${
            copied
              ? "border-success text-success"
              : "border-rule text-muted hover:border-amber hover:text-fg"
          }`}
        >
          {copied ? (
            <>
              <IconCheck className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <IconCopy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
    );
  }

  if (contact.href && contact.external) {
    return (
      <a
        href={contact.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block ${base}`}
      >
        {body}
        <span className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-info transition-colors">
          Open <IconArrowUpRight className="w-3 h-3" />
        </span>
      </a>
    );
  }

  if (contact.href) {
    return (
      <a href={contact.href} className={`block ${base}`}>
        {body}
      </a>
    );
  }

  return <div className={base}>{body}</div>;
}

export default function ContactGrid() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    setCopiedValue(text);
    timerRef.current = setTimeout(() => setCopiedValue(null), 2000);
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {contacts.map((contact, i) => (
        <Reveal key={contact.label} delay={i * 0.06} className="h-full">
          <Card
            contact={contact}
            copied={copiedValue === contact.value}
            onCopy={handleCopy}
          />
        </Reveal>
      ))}
    </div>
  );
}
