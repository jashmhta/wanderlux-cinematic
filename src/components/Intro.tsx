"use client";

import { useEffect, useRef, useState } from "react";
import { TextReveal } from "./TextReveal";
import { Reveal } from "./Reveal";

export function Intro() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-6 sm:py-32 md:px-10 md:py-48">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
        <div>
          <Reveal>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-muted)] sm:mb-8">
              01 — The studio
            </p>
          </Reveal>
          <TextReveal
            as="h2"
            text="We don't sell trips. We compose them — slowly, privately, with obsessive attention to texture."
            className="font-display text-[clamp(28px,5vw,64px)] font-[300] leading-[1.02] tracking-[-0.015em] text-[var(--ink)]"
            stagger={40}
          />
        </div>

        <div className="flex flex-col justify-end gap-8 md:gap-10">
          <Reveal delay={150}>
            <p className="max-w-md text-[15px] leading-[1.7] text-[var(--ink-muted)] md:text-[16px]">
              Every Wanderlux journey begins with a conversation, not a
              catalogue. We pair each guest with a route designer who knows
              their region intimately — down to the chef&rsquo;s best Tuesday,
              the shepherd with the quietest land, the road that opens only at
              dawn.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-6 sm:gap-6 sm:pt-8">
              <Stat label="Countries" value={42} />
              <Stat label="Journeys / yr" value={210} />
              <Stat label="Guest rating" value={4.96} decimals={2} suffix="" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  decimals = 0,
  suffix = "",
}: {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            const duration = 1400;
            const start = performance.now();
            const step = (t: number) => {
              const p = Math.min((t - start) / duration, 1);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(value * eased);
              if (p < 1) requestAnimationFrame(step);
              else setDisplay(value);
            };
            requestAnimationFrame(step);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div className="flex flex-col">
      <span
        ref={ref}
        className="stat-num font-display text-[34px] font-[300] leading-none tracking-tight text-[var(--ink)] sm:text-[40px] md:text-[48px]"
      >
        {display.toFixed(decimals)}
        {suffix}
      </span>
      <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
        {label}
      </span>
    </div>
  );
}
