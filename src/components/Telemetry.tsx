"use client";

import { useEffect, useRef, useState } from "react";
import { logLines, uptimeEpoch, type LogLine } from "@/data/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const LEVEL_COLOR: Record<LogLine["level"], string> = {
  OK: "text-success",
  INFO: "text-info",
  WARN: "text-warning",
};

function formatElapsed(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${days}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function UptimeClock() {
  const [elapsed, setElapsed] = useState<number | null>(null);

  useEffect(() => {
    const epoch = new Date(uptimeEpoch).getTime();
    const tick = () => setElapsed(Date.now() - epoch);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-baseline gap-3 font-mono">
      <span className="text-[10px] uppercase tracking-widest text-muted">
        Days on call
      </span>
      <span className="text-sm text-phosphor tabular-nums">
        {elapsed === null ? "————d --:--:--" : formatElapsed(elapsed)}
      </span>
    </div>
  );
}

interface Entry {
  id: number;
  time: string;
  level: LogLine["level"];
  msg: string;
}

export default function Telemetry() {
  const reduced = usePrefersReducedMotion();
  const [entries, setEntries] = useState<Entry[]>(() =>
    logLines.slice(0, 7).map((line, i) => ({ id: i, time: "—", ...line }))
  );
  const cursorRef = useRef(7);
  const idRef = useRef(7);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      if (document.visibilityState === "hidden") return;
      const line = logLines[cursorRef.current % logLines.length];
      cursorRef.current += 1;
      const entry: Entry = {
        id: idRef.current,
        time: new Date().toLocaleTimeString("en-GB"),
        ...line,
      };
      idRef.current += 1;
      setEntries((prev) => [...prev.slice(-6), entry]);
    }, 2200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="border border-rule bg-surface scanlines corner-ticks p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-phosphor">
          Live feed — operations log
        </span>
        <span
          className="text-phosphor animate-[blink_1.2s_steps(1)_infinite]"
          aria-hidden="true"
        >
          ▮
        </span>
      </div>
      <div className="h-44 overflow-hidden flex flex-col justify-end gap-1.5">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="log-enter flex items-baseline gap-2 font-mono text-xs"
          >
            <span className="text-muted shrink-0 tabular-nums">{entry.time}</span>
            <span className={`shrink-0 w-12 ${LEVEL_COLOR[entry.level]}`}>
              [{entry.level}]
            </span>
            <span className="text-fg/80 truncate">{entry.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
