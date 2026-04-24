"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

export function CTA() {
  const btnRef = useRef<HTMLAnchorElement | null>(null);

  // Magnetic hover effect on the primary CTA button
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      if (!mq.matches) return;
    }
    const strength = 0.35;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "translate3d(0, 0, 0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--bg-elev)] py-24 sm:py-32 md:py-48"
    >
      {/* Rotating light behind CTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0 30%, rgb(var(--glow) / 0.35) 50%, transparent 70%)",
          filter: "blur(60px)",
          animation: "cta-spin 18s linear infinite",
          opacity: 0.8,
        }}
      />
      {/* Second slower counter-rotation */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "conic-gradient(from 180deg, transparent 0 40%, rgb(var(--glow) / 0.22) 55%, transparent 75%)",
          filter: "blur(80px)",
          animation: "cta-spin 32s linear infinite reverse",
          opacity: 0.7,
        }}
      />
      <style>{`
        @keyframes cta-spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-10 px-5 text-center sm:gap-14 sm:px-6 md:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-muted)]">
            08 — Begin
          </p>
        </Reveal>

        <TextReveal
          as="h2"
          text="Tell us where you've always wanted to go."
          className="max-w-5xl font-display text-[clamp(36px,7vw,120px)] font-[300] leading-[0.98] tracking-[-0.025em] text-[var(--ink)]"
          stagger={70}
        />

        <Reveal delay={400}>
          <p className="max-w-xl text-[15px] leading-[1.7] text-[var(--ink-muted)] md:text-[16px]">
            Send us a note. A route designer will reply within 24 hours with a
            rough sketch of what your journey could look like — no obligation,
            no pressure.
          </p>
        </Reveal>

        <Reveal delay={500}>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              ref={btnRef}
              href="mailto:hello@wanderlux.travel"
              data-cursor
              className="magnetic group inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-7 py-3.5 text-[14px] font-medium text-[var(--bg)] sm:px-8 sm:py-4"
            >
              Start a conversation
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 group-hover:rotate-45"
              />
            </a>
            <a
              href="tel:+1-000-000-0000"
              data-cursor
              className="link-underline text-[14px] text-[var(--ink-soft)]"
            >
              or call +1 (000) 000-0000
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
