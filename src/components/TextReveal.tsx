"use client";

import { useEffect, useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
}

export function TextReveal({
  text,
  className = "",
  as = "h2",
  delay = 0,
  stagger = 60,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLSpanElement>("[data-word] > span");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            spans.forEach((s, i) => {
              s.style.transitionDelay = `${delay + i * stagger}ms`;
              s.style.transform = "translateY(0) rotate(0deg)";
              s.style.opacity = "1";
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, stagger]);

  const words = text.split(" ");
  const inner = words.map((word, i) => (
    <span
      key={`${word}-${i}`}
      data-word
      className="inline-block overflow-hidden align-baseline pb-[0.15em] pr-[0.25em]"
    >
      <span
        className="inline-block will-change-transform"
        style={{
          transform: "translateY(110%) rotate(3deg)",
          opacity: 0,
          transition:
            "transform 1.1s cubic-bezier(0.2,0.7,0.2,1), opacity 1.1s cubic-bezier(0.2,0.7,0.2,1)",
        }}
      >
        {word}
      </span>
    </span>
  ));

  const commonProps = {
    ref,
    className,
  };

  switch (as) {
    case "h1":
      return <h1 {...commonProps}>{inner}</h1>;
    case "h2":
      return <h2 {...commonProps}>{inner}</h2>;
    case "h3":
      return <h3 {...commonProps}>{inner}</h3>;
    case "p":
      return <p {...commonProps}>{inner}</p>;
    case "span":
      return <span {...commonProps}>{inner}</span>;
    default:
      return <h2 {...commonProps}>{inner}</h2>;
  }
}
