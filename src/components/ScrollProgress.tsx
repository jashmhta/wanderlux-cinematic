"use client";

import { useEffect, useRef, useState } from "react";

const CHAPTERS: Array<{ id: string; label: string }> = [
  { id: "__top", label: "Prologue" },
  { id: "destinations", label: "Destinations" },
  { id: "atlas", label: "Atlas" },
  { id: "packages", label: "Journeys" },
  { id: "experiences", label: "Moments" },
  { id: "journal", label: "Guests" },
  { id: "contact", label: "Begin" },
];

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [chapter, setChapter] = useState("Prologue");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const h = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const p = h > 0 ? (y / h) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${p}%`;

      // Chapter detection
      const anchor = y + window.innerHeight * 0.35;
      let current = CHAPTERS[0].label;
      for (let i = 1; i < CHAPTERS.length; i++) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + y;
        if (anchor >= top) current = CHAPTERS[i].label;
      }
      setChapter((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden>
        <div ref={barRef} className="scroll-progress-bar" />
      </div>
      <div className="chapter-label font-mono" aria-hidden>
        <span key={chapter}>{chapter}</span>
      </div>
    </>
  );
}
