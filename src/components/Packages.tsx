"use client";

import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { packages } from "@/lib/data";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

export function Packages() {
  return (
    <section
      id="packages"
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--bg-elev)] py-24 sm:py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-muted)]">
                04 — Signature journeys
              </p>
            </Reveal>
            <TextReveal
              as="h2"
              text="Eight journeys we return to, season after season."
              className="max-w-4xl font-display text-[clamp(30px,5vw,76px)] font-[300] leading-[1.02] tracking-[-0.02em] text-[var(--ink)]"
            />
          </div>
          <Reveal delay={200}>
            <a
              href="#"
              data-cursor
              className="link-underline inline-flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink)]"
            >
              Full catalogue
              <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 md:gap-8 xl:grid-cols-4">
          {packages.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: (typeof packages)[number] }) {
  return (
    <article
      className="beam-card group flex h-full flex-col overflow-hidden"
      data-cursor
    >
      <div className="relative m-[1px] flex h-full flex-col overflow-hidden rounded-[21px] bg-[var(--surface)]">
        <div className="relative aspect-[5/6] w-full overflow-hidden">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur sm:left-4 sm:top-4 sm:text-[11px]">
            <Star size={10} fill="currentColor" strokeWidth={0} />
            {pkg.rating.toFixed(2)}
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-white sm:bottom-4 sm:left-4 sm:right-4">
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/75">
                {pkg.duration}
              </p>
              <h3 className="mt-1.5 font-display text-[22px] font-[300] leading-[1.05] tracking-tight sm:text-[26px]">
                {pkg.title}
              </h3>
            </div>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-transform duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black sm:h-10 sm:w-10">
              <ArrowUpRight size={15} />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:gap-6 sm:p-6">
          <div>
            <p className="text-[13px] text-[var(--ink-muted)]">{pkg.location}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
              {pkg.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[10.5px] text-[var(--ink-soft)] sm:text-[11px]"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-baseline justify-between border-t border-[var(--line)] pt-4 sm:pt-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
              From
            </span>
            <span className="font-display text-[20px] font-[300] tracking-tight text-[var(--ink)] sm:text-[22px]">
              {pkg.from}
              <span className="ml-1 font-mono text-[11px] tracking-[0.2em] text-[var(--ink-muted)]">
                / person
              </span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
