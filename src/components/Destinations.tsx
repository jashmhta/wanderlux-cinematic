"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { destinations } from "@/lib/data";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

export function Destinations() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLLIElement>("[data-dest]"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = items.indexOf(entry.target as HTMLLIElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { threshold: [0.6, 0.75, 0.9] },
    );
    items.forEach((i) => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="destinations"
      className="relative border-t border-[var(--line)] bg-[var(--bg)]"
    >
      <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-6 sm:pt-28 md:px-10 md:pt-40">
        <Reveal>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-muted)]">
            02 — Destinations
          </p>
        </Reveal>
        <TextReveal
          as="h2"
          text="Ten corners of the map we know by heart."
          className="font-display text-[clamp(30px,5vw,80px)] font-[300] leading-[1.02] tracking-[-0.02em] text-[var(--ink)]"
        />
      </div>

      {/* Sticky split layout: image pinned left, scrollable list right */}
      <div className="mx-auto mt-12 grid max-w-[1400px] gap-8 px-5 sm:mt-16 sm:px-6 md:mt-20 md:grid-cols-[1.1fr_1fr] md:gap-10 md:px-10">
        <div className="sticky top-24 hidden h-[78vh] self-start overflow-hidden rounded-2xl bg-[var(--bg-elev)] md:block">
          {destinations.map((d, i) => (
            <div
              key={d.slug}
              className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "scale(1)" : "scale(1.06)",
              }}
            >
              <Image
                src={d.image}
                alt={d.name}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between text-white">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
                    {d.region} · {d.country}
                  </p>
                  <p className="mt-3 max-w-sm font-display text-[20px] font-[300] leading-[1.15] md:text-[22px]">
                    {d.tagline}
                  </p>
                </div>
                <div className="text-right font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                  <p>{d.lat}</p>
                  <p>{d.lng}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ul ref={listRef} className="flex flex-col">
          {destinations.map((d, i) => (
            <li
              key={d.slug}
              data-dest
              data-cursor
              onMouseEnter={() => setActive(i)}
              className={`group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-b border-[var(--line)] py-7 transition-colors sm:gap-6 md:py-10 ${
                active === i ? "text-[var(--ink)]" : "text-[var(--ink-muted)]"
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3
                  className={`font-display text-[clamp(28px,4.2vw,60px)] font-[300] leading-[1] tracking-[-0.015em] transition-transform duration-700 ${
                    active === i ? "translate-x-2 sm:translate-x-3" : "translate-x-0"
                  }`}
                >
                  {d.name}
                </h3>
                <p className="mt-3 text-[13px] text-[var(--ink-muted)] md:hidden">
                  {d.country} · {d.tagline}
                </p>
                {/* Mobile image */}
                <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-xl md:hidden">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.24em] text-white/80">
                    {d.lat} · {d.lng}
                  </span>
                </div>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] md:block">
                {d.country}
              </span>
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-[var(--accent)] transition-transform duration-700 ${
                  active === i ? "scale-y-100" : "scale-y-0"
                }`}
                style={{ transformOrigin: "top" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
