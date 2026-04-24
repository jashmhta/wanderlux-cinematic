"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { TextReveal } from "./TextReveal";
import { Reveal } from "./Reveal";

const videoSrc =
  "https://videos.pexels.com/video-files/4763824/4763824-uhd_3840_2160_24fps.mp4";
const poster =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80";

export function VideoFeature() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const frame = el.querySelector<HTMLDivElement>("[data-video-frame]");
    let raf = 0;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const progress = Math.min(Math.max((vh - rect.top) / total, 0), 1);
      if (frame) {
        // Responsive width: narrower on mobile so margins breathe, wider desktop
        const minW = window.innerWidth < 640 ? 92 : window.innerWidth < 1024 ? 84 : 70;
        const width = minW + progress * (100 - minW);
        const radius = 28 - progress * 20;
        frame.style.width = `${width}%`;
        frame.style.borderRadius = `${radius}px`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--bg-elev)] py-20 sm:py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-muted)]">
                06 — The film
              </p>
            </Reveal>
            <TextReveal
              as="h2"
              text="A year on the road, captured in one reel."
              className="max-w-3xl font-display text-[clamp(28px,4.8vw,70px)] font-[300] leading-[1.02] tracking-[-0.02em] text-[var(--ink)]"
            />
          </div>
          <Reveal delay={200}>
            <p className="max-w-sm text-[14px] leading-[1.7] text-[var(--ink-muted)] md:text-[15px]">
              Shot across eleven countries by our in-house director of
              photography. No models, no actors — just our guests, our hosts,
              and our routes.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="flex justify-center px-4 sm:px-0">
        <div
          data-video-frame
          data-cursor
          className="relative aspect-video w-[92%] overflow-hidden rounded-[24px] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] transition-[width,border-radius] duration-200 will-change-[width] sm:w-[84%] md:w-[70%]"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="pointer-events-none inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-md transition-transform duration-500 hover:scale-110 sm:h-20 sm:w-20 md:h-24 md:w-24">
              <Play size={18} strokeWidth={1.5} fill="currentColor" />
            </span>
          </button>
          <div className="pointer-events-none absolute bottom-4 left-5 right-5 flex items-end justify-between text-white sm:bottom-5 sm:left-6 sm:right-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
              Wanderlux · 2025
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
              02:14
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
