"use client";

import { Sidebar } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";

interface DocsLayoutProps {
  children: React.ReactNode;
}

import { ThemeProvider } from "./theme-provider";
import { motion, AnimatePresence } from "framer-motion";

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-14 items-center justify-between border-b px-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold bg-gradient-to-r from-[var(--accent)] via-primary to-[var(--accent)] bg-clip-text text-transparent">Documentation</h1>
            </div>
            <ThemeToggle />
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={typeof window !== "undefined" ? location.pathname : "static"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <div className="mx-auto max-w-4xl p-6">{children}</div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
