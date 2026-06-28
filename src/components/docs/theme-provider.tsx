"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

export type ThemeMode = "light" | "dark" | "funky";

type ThemeContextValue = {
  mode: ThemeMode;
  accent: string; // hex color
  setMode: (mode: ThemeMode) => void;
  setAccent: (hex: string) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

const ACCENT_KEY = "ff_accent";
const MODE_KEY = "ff_theme_mode";

const FUNKY_OVERRIDES: Record<string, string> = {
  "--color-background": "#0b0b12",
  "--color-foreground": "#f6f7fb",
  "--color-card": "#11111a",
  "--color-card-foreground": "#f6f7fb",
  "--color-popover": "#11111a",
  "--color-popover-foreground": "#f6f7fb",
  "--color-primary": "#ff80bf",
  "--color-primary-foreground": "#140b14",
  "--color-secondary": "#1a1a26",
  "--color-secondary-foreground": "#e5e7ff",
  "--color-muted": "#232334",
  "--color-muted-foreground": "#a4a6c2",
  "--color-accent": "#7c3aed",
  "--color-accent-foreground": "#f6f7fb",
  "--color-destructive": "#ff4d4f",
  "--color-destructive-foreground": "#fff",
  "--color-border": "#2a2a3c",
  "--color-input": "#2a2a3c",
  "--color-ring": "#a78bfa",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = React.useState<ThemeMode>("light");
  const [accent, setAccentState] = React.useState<string>("#6366f1"); // indigo

  // Compute readable foreground for an accent color
  function getAccentForeground(hex: string): string {
    const toRgb = (h: string) => {
      let s = h.replace("#", "");
      if (s.length === 3) s = s.split("").map((c) => c + c).join("");
      const num = parseInt(s, 16);
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
      };
    };
    const { r, g, b } = toRgb(hex);
    const srgb = [r, g, b].map((v) => v / 255).map((v) =>
      v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    );
    const L = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    // Choose light/dark foreground for contrast
    return L > 0.55 ? "#0a0a0b" : "#fafafa";
  }
  function toRgba(hex: string, alpha: number): string {
    let s = hex.replace("#", "");
    if (s.length === 3) s = s.split("").map((c) => c + c).join("");
    const num = parseInt(s, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  React.useEffect(() => {
    try {
      const savedMode = (localStorage.getItem(MODE_KEY) as ThemeMode) || null;
      const savedAccent = localStorage.getItem(ACCENT_KEY);
      if (savedMode) setModeState(savedMode);
      if (savedAccent) setAccentState(savedAccent);
    } catch {}
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    const isDark = mode === "dark";
    root.classList.toggle("dark", isDark);
    root.setAttribute("data-theme", mode);

    // Reset funky overrides when leaving funky
    if (mode !== "funky") {
      Object.keys(FUNKY_OVERRIDES).forEach((k) => root.style.removeProperty(k));
    }
    if (mode === "funky") {
      Object.entries(FUNKY_OVERRIDES).forEach(([k, v]) =>
        root.style.setProperty(k, v)
      );
    }

    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch {}
  }, [mode]);

  React.useEffect(() => {
    const root = document.documentElement;
    // Dynamic accent variables (Tailwind reads --color-accent)
    const foreground = getAccentForeground(accent);
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--accent-foreground", foreground);
    root.style.setProperty("--accent-soft", toRgba(accent, 0.18));
    root.style.setProperty("--color-accent", accent);
    root.style.setProperty("--color-accent-foreground", foreground);
    root.style.setProperty("--color-accent-soft", toRgba(accent, 0.18));
    try {
      localStorage.setItem(ACCENT_KEY, accent);
    } catch {}
  }, [accent]);

  const setMode = (m: ThemeMode) => setModeState(m);
  const setAccent = (hex: string) => setAccentState(hex);

  const value: ThemeContextValue = { mode, accent, setMode, setAccent };

  return (
    <ThemeContext.Provider value={value}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${mode}-${accent}`}
          initial={{ opacity: 0.88, scale: 0.995 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.92, scale: 0.997 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{ minHeight: "100%" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
