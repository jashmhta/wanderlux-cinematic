"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { moments } from "@/lib/data";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

export function Moments() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Lazily play videos only when they come into view to save bandwidth
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const vids = Array.from(el.querySelectorAll<HTMLVideoElement>("video"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.3 },
    );
    vids.forEach((v) => obs.observe(v));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative border-t border-[var(--line)] bg-[var(--bg)] py-24 sm:py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-muted)]">
                05 — Moments
              </p>
            </Reveal>
            <TextReveal
              as="h2"
              text="A year on the road, held in seven frames."
              className="max-w-4xl font-display text-[clamp(28px,5vw,76px)] font-[300] leading-[1.02] tracking-[-0.02em] text-[var(--ink)]"
            />
          </div>
          <Reveal delay={180}>
            <p className="max-w-sm text-[14px] leading-[1.7] text-[var(--ink-muted)] md:text-[15px]">
              Shot on our own journeys. No models, no stylists — just the light
              and the road.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-12 md:gap-5">
          {moments.map((m, i) => (
            <figure
              key={m.label}
              data-cursor
              className={`group relative overflow-hidden rounded-xl bg-[var(--bg-elev)] md:rounded-2xl ${
                m.span ?? "md:col-span-4"
              }`}
            >
              <div
                className={`relative ${m.aspect ?? "aspect-[4/5]"} w-full overflow-hidden`}
              >
                {m.media.type === "video" ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.05]"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={m.media.poster}
                    src={m.media.src}
                  />
                ) : (
                  <Image
                    src={m.media.src}
                    alt={m.caption}
                    fill
                    sizes="(min-width: 768px) 40vw, 50vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.05]"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                {m.media.type === "video" && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/90 backdrop-blur sm:right-4 sm:top-4">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-red-400/70" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-red-400" />
                    </span>
                    Live
                  </span>
                )}
              </div>
              <figcaption className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-white sm:bottom-5 sm:left-5 sm:right-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/75">
                    {m.label}
                  </p>
                  <p className="mt-1 font-display text-[16px] font-[300] leading-[1.15] sm:text-[20px]">
                    {m.caption}
                  </p>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">
                  0{i + 1}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
