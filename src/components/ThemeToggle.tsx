"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`group relative inline-flex h-10 w-[72px] items-center rounded-full border border-[var(--line)] bg-[var(--surface)]/70 p-1 backdrop-blur transition-colors hover:border-[var(--accent)]/60 ${className}`}
    >
      <span
        suppressHydrationWarning
        className="absolute top-1 left-1 h-8 w-8 rounded-full bg-[var(--ink)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]"
        style={{
          transform: mounted && isDark ? "translateX(32px)" : "translateX(0px)",
        }}
      />
      <span
        suppressHydrationWarning
        className="relative z-10 flex h-8 w-8 items-center justify-center text-[var(--bg)]"
      >
        {mounted && !isDark && <Sun size={16} strokeWidth={1.75} />}
      </span>
      <span
        suppressHydrationWarning
        className="relative z-10 flex h-8 w-8 items-center justify-center text-[var(--bg)]"
      >
        {mounted && isDark && <Moon size={16} strokeWidth={1.75} />}
      </span>
    </button>
  );
}
