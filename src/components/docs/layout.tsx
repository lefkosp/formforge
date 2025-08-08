"use client";

import { Sidebar } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold">Documentation</h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-4xl p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
