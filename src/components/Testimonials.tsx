"use client";

import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

export function Testimonials() {
  return (
    <section
      id="journal"
      className="relative border-t border-[var(--line)] bg-[var(--bg)] py-24 sm:py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <div className="mb-12 md:mb-24">
          <Reveal>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-muted)]">
              07 — Guests
            </p>
          </Reveal>
          <TextReveal
            as="h2"
            text="Notes from the people we've taken out into the world."
            className="max-w-4xl font-display text-[clamp(28px,4.8vw,72px)] font-[300] leading-[1.02] tracking-[-0.02em] text-[var(--ink)]"
          />
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 md:gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 120}>
              <figure
                data-cursor
                className="group relative flex h-full flex-col justify-between gap-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--accent)]/60 sm:gap-10 sm:p-8 md:p-10"
              >
                <Quote
                  size={26}
                  strokeWidth={1.25}
                  className="text-[var(--accent)]"
                />
                <blockquote className="font-display text-[clamp(20px,2vw,30px)] font-[300] leading-[1.3] tracking-[-0.01em] text-[var(--ink)]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center justify-between border-t border-[var(--line)] pt-5 sm:pt-6">
                  <div>
                    <p className="text-[14px] font-medium text-[var(--ink)]">
                      {t.author}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                      {t.title}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                    0{i + 1} / 0{testimonials.length}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
