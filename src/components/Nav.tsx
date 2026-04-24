"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#destinations", label: "Destinations" },
  { href: "#atlas", label: "Atlas" },
  { href: "#packages", label: "Journeys" },
  { href: "#experiences", label: "Moments" },
  { href: "#journal", label: "Journal" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5 md:py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
          <Link
            href="/"
            className="flex items-baseline gap-2"
            aria-label="Wanderlux home"
            data-cursor
          >
            <span className="font-display text-[20px] leading-none tracking-tight md:text-[22px]">
              Wanderlux
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] sm:inline">
              est. 2014
            </span>
          </Link>

          <nav
            className={`hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--surface)]/60 px-2 py-1.5 backdrop-blur-xl transition-colors lg:flex ${
              scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.06)]" : ""
            }`}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor
                className="rounded-full px-4 py-1.5 text-[13px] text-[var(--ink-soft)] transition-colors hover:bg-[var(--bg-elev)] hover:text-[var(--ink)]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              data-cursor
              className="hidden h-10 items-center rounded-full bg-[var(--ink)] px-5 text-[13px] font-medium text-[var(--bg)] transition-opacity hover:opacity-90 md:inline-flex"
            >
              Plan a journey
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)]/60 text-[var(--ink)] backdrop-blur transition-colors hover:border-[var(--accent)]/60 lg:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile/tablet menu */}
      <div
        className={`menu-overlay ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-28 md:px-10">
          <nav className="flex flex-1 flex-col justify-center gap-2">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="menu-link group flex items-baseline justify-between border-b border-[var(--line)] py-5"
                style={{ transitionDelay: `${open ? 180 + i * 70 : 0}ms` }}
                data-cursor
              >
                <span className="font-display text-[clamp(40px,9vw,88px)] font-[300] leading-[0.95] tracking-[-0.02em] text-[var(--ink)] transition-transform duration-700 group-hover:translate-x-3">
                  {l.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-muted)]">
                  0{i + 1}
                </span>
              </a>
            ))}
          </nav>
          <div
            className="menu-link mt-8 flex flex-col justify-between gap-4 border-t border-[var(--line)] pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)] sm:flex-row"
            style={{ transitionDelay: `${open ? 180 + links.length * 70 : 0}ms` }}
          >
            <span>hello@wanderlux.travel</span>
            <span>New York · Lisbon · Tokyo</span>
          </div>
        </div>
      </div>
    </>
  );
}
