"use client";

import { Star } from "lucide-react";

const primary = [
  "Private journeys",
  "Crafted routes",
  "Zero logistics",
  "42 countries",
  "Cinematic trips",
  "Small groups",
  "Local hosts",
  "Effortless luxury",
];

const secondary = [
  "Patagonia",
  "Kyoto",
  "Lofoten",
  "Atacama",
  "Faroe",
  "Ladakh",
  "Namibia",
  "Amalfi",
  "Iceland",
  "Marrakech",
];

export function Marquee() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--bg-elev)]"
    >
      <div className="flex overflow-hidden py-4 sm:py-5">
        <div className="marquee-track flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
          {[...primary, ...primary, ...primary].map((w, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap sm:gap-14">
              <span className="font-display text-[22px] font-[300] tracking-tight text-[var(--ink)] sm:text-[28px] md:text-[36px]">
                {w}
              </span>
              <Star
                size={13}
                strokeWidth={1.25}
                className="text-[var(--accent)]"
              />
            </span>
          ))}
        </div>
      </div>
      <div className="flex overflow-hidden border-t border-[var(--line)] py-3 sm:py-3.5">
        <div className="marquee-track reverse flex shrink-0 items-center gap-8 pr-8 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--ink-muted)] sm:gap-12 sm:pr-12 sm:text-[12px]">
          {[...secondary, ...secondary, ...secondary].map((w, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap sm:gap-12">
              <span>{w}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
