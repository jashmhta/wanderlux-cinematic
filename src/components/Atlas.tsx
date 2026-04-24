"use client";

import Image from "next/image";
import { useState } from "react";
import { destinations } from "@/lib/data";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

export function Atlas() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="atlas"
      className="relative border-t border-[var(--line)] bg-[var(--bg)] py-24 sm:py-32 md:py-44"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-muted)]">
                03 — Atlas
              </p>
            </Reveal>
            <TextReveal
              as="h2"
              text="Ten corners of the map. One studio."
              className="max-w-4xl font-display text-[clamp(30px,5vw,76px)] font-[300] leading-[1.02] tracking-[-0.02em] text-[var(--ink)]"
            />
          </div>
          <Reveal delay={200}>
            <p className="max-w-sm text-[14px] leading-[1.7] text-[var(--ink-muted)] md:text-[15px]">
              We only open journeys in places our route designers know by
              footprint — every season, every dawn, every quiet road.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={i * 60}>
              <article
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                data-cursor
                className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-[var(--bg-elev)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <Image
                  src={d.image}
                  alt={d.name}
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.08]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div
                  className={`pointer-events-none absolute inset-0 bg-[var(--accent)]/0 transition-colors duration-500 ${
                    active === i ? "bg-[var(--accent)]/10" : ""
                  }`}
                />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 text-white/80 sm:p-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em]">
                    {d.lat}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em]">
                    {d.lng}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/70">
                    0{i + 1} · {d.region}
                  </p>
                  <h3 className="mt-1.5 font-display text-[20px] font-[300] leading-[1.05] tracking-tight sm:text-[24px]">
                    {d.name}
                  </h3>
                  <p
                    className={`mt-2 max-w-[28ch] text-[12px] leading-[1.4] text-white/85 transition-[max-height,opacity,margin] duration-700 ${
                      active === i
                        ? "max-h-20 opacity-100"
                        : "max-h-0 opacity-0"
                    } overflow-hidden sm:mt-2`}
                  >
                    {d.tagline}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)] sm:mt-16">
            …and thirty-two more, on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
