"use client";

import { useEffect } from "react";

import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme, ThemeMode } from "./theme-provider";

export function ThemeToggle() {
  const { mode, setMode, accent, setAccent } = useTheme();

  useEffect(() => {
    // ensure CSS var exists on first mount
    document.documentElement.style.setProperty("--accent", accent);
  }, [accent]);

  const accents = ["#6366f1", "#22c55e", "#ef4444", "#f59e0b", "#06b6d4", "#a855f7"];

  const cycleMode = () => {
    const modes: ThemeMode[] = ["light", "dark", "funky"];
    const idx = modes.indexOf(mode);
    setMode(modes[(idx + 1) % modes.length]);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={cycleMode}
        className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="Cycle theme"
      >
        {mode === "light" && <Sun className="h-4 w-4" />}
        {mode === "dark" && <Moon className="h-4 w-4" />}
        {mode === "funky" && <Sparkles className="h-4 w-4" />}
        <span className="capitalize">{mode}</span>
      </button>
      <div className="flex items-center gap-1" role="group" aria-label="Accent colors">
        {accents.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setAccent(c)}
            className="h-5 w-5 rounded-full border hover:scale-105 transition-transform"
            style={{ backgroundColor: c, boxShadow: c === accent ? `0 0 0 2px var(--color-ring)` : undefined }}
            aria-label={`Set accent ${c}`}
          />
        ))}
      </div>
    </div>
  );
}
