"use client";

import { Camera, Send, Globe, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    setSubscribed(true);
    setEmail("");
    window.setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative border-t border-[var(--line)] bg-[var(--bg)] pb-10 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        {/* Giant brand wordmark */}
        <div className="relative mb-10 overflow-hidden sm:mb-16">
          <p className="select-none font-display text-[clamp(72px,20vw,280px)] font-[300] leading-[0.85] tracking-[-0.04em] text-[var(--ink)]">
            Wanderlux
          </p>
          <span className="absolute bottom-2 right-0 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)] sm:bottom-4 sm:text-[11px]">
            © 2025
          </span>
        </div>

        {/* Newsletter */}
        <form
          onSubmit={onSubmit}
          className="mb-12 flex flex-col gap-4 border-t border-[var(--line)] pt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6"
        >
          <div className="max-w-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-muted)]">
              Dispatch · No. 12
            </p>
            <p className="mt-3 font-display text-[24px] font-[300] leading-[1.1] tracking-tight text-[var(--ink)] sm:text-[28px]">
              Four dispatches a year, by post and pixel.
            </p>
          </div>

          <div className="flex w-full max-w-md items-center gap-2 border-b border-[var(--line)] py-3">
            <Mail size={15} className="text-[var(--ink-muted)]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@elsewhere.com"
              className="flex-1 bg-transparent text-[14px] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/70 focus:outline-none"
              aria-label="Email address"
            />
            <button
              type="submit"
              data-cursor
              className="group inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink)]"
              aria-label="Subscribe"
            >
              {subscribed ? "Thank you" : "Subscribe"}
              <ArrowRight
                size={12}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
            </button>
          </div>
        </form>

        <div className="grid grid-cols-2 gap-10 border-t border-[var(--line)] pt-10 sm:pt-12 md:grid-cols-4">
          <div className="col-span-2">
            <p className="max-w-sm text-[14px] leading-[1.7] text-[var(--ink-muted)]">
              A small studio of route-makers, hosts and photographers — designing
              private journeys across 42 countries since 2014.
            </p>
            <div className="mt-6 flex items-center gap-3 sm:mt-8">
              {[
                { icon: Camera, href: "#", label: "Instagram" },
                { icon: Send, href: "#", label: "Newsletter" },
                { icon: Globe, href: "#", label: "Website" },
                { icon: Mail, href: "mailto:hello@wanderlux.travel", label: "Email" },
              ].map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  data-cursor
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  aria-label={label}
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Studio"
            links={[
              ["About", "#"],
              ["Journal", "#journal"],
              ["Press", "#"],
              ["Careers", "#"],
            ]}
          />
          <FooterCol
            title="Journeys"
            links={[
              ["Private", "#packages"],
              ["Small group", "#"],
              ["Family", "#"],
              ["Seasonal", "#"],
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--line)] pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)] sm:mt-16 sm:flex-row sm:items-center sm:gap-4 sm:pt-8">
          <p>hello@wanderlux.travel · New York · Lisbon · Tokyo</p>
          <p>Made slowly, on purpose.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: Array<[string, string]>;
}) {
  return (
    <div>
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink-muted)] sm:mb-5">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              data-cursor
              className="link-underline text-[14px] text-[var(--ink-soft)]"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
