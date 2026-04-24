"use client";

import { useEffect, useState } from "react";

const LABEL = "Wanderlux";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let p = 0;
    const tick = () => {
      p += Math.random() * 10 + 4;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        window.setTimeout(() => setHidden(true), 420);
        return;
      }
      setProgress(Math.floor(p));
      window.setTimeout(tick, 70 + Math.random() * 90);
    };
    tick();
  }, []);

  useEffect(() => {
    if (hidden) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  return (
    <div
      className={`loader ${hidden ? "loader-out" : ""}`}
      aria-hidden={hidden}
      role="status"
    >
      <div className="loader-inner">
        <div className="loader-label">
          {LABEL.split("").map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              style={{ animationDelay: `${120 + i * 55}ms` }}
            >
              {ch}
            </span>
          ))}
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="loader-track">
            <div
              className="loader-track-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="loader-meta">
            <span>Composing journey</span>
            <span className="stat-num">
              {progress.toString().padStart(3, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
