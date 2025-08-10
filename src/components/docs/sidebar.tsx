"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  FileText,
  Code,

  BookOpen,
  Terminal,
  Heart,
  FileCode,
} from "lucide-react";
import Fuse, { type FuseResult, type FuseResultMatch } from "fuse.js";
import { Input } from "@/components/ui/input";

export interface SidebarItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Introduction",
    href: "/introduction",
    icon: BookOpen,
  },
  {
    title: "Getting Started",
    href: "/getting-started",
    icon: FileText,
  },
  {
    title: "Components",
    href: "/components",
    icon: Code,
    children: [
      { title: "InputField", href: "/components/input-field" },
      { title: "SelectField", href: "/components/select-field" },
      { title: "TextareaField", href: "/components/textarea-field" },
      { title: "CheckboxField", href: "/components/checkbox-field" },
      { title: "FormSection", href: "/components/form-section" },
      { title: "FormGrid", href: "/components/form-grid" },
      { title: "FormStepper", href: "/components/form-stepper" },
      { title: "AutocompleteField", href: "/components/autocomplete-field" },
      { title: "MultiSelectField", href: "/components/multi-select-field" },
      { title: "RepeatingFieldArray", href: "/components/repeating-field-array" },
      { title: "PasswordField", href: "/components/password-field" },
      { title: "SliderField", href: "/components/slider-field" },
      { title: "RichTextEditorField", href: "/components/rich-text-editor-field" },
      { title: "FormWizard", href: "/components/form-wizard" },
      { title: "NestedFormSection", href: "/components/nested-form-section" },
      { title: "ColorPickerField", href: "/components/color-picker-field" },
      { title: "SignatureField", href: "/components/signature-field" },
      { title: "FormButton", href: "/components/form-button" },
      { title: "RadioGroupField", href: "/components/radio-group-field" },
      { title: "SwitchField", href: "/components/switch-field" },
      { title: "DatePickerField", href: "/components/date-picker-field" },
      { title: "FileUploadField", href: "/components/file-upload-field" }
    ],
  },
  {
    title: "CLI",
    href: "/cli",
    icon: Terminal,
  },
  {
    title: "Philosophy",
    href: "/philosophy",
    icon: Heart,
  },
  {
    title: "License",
    href: "/license",
    icon: FileCode,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  type FlatItem = { title: string; href: string; parent?: string };
  const flatItems = React.useMemo<FlatItem[]>(() => {
    const out: FlatItem[] = [];
    for (const item of sidebarItems) {
      out.push({ title: item.title, href: item.href });
      if (item.children) {
        for (const c of item.children) out.push({ title: c.title, href: c.href, parent: item.title });
      }
    }
    return out;
  }, []);

  const fuse = React.useMemo(() => new Fuse(flatItems, {
    includeMatches: true,
    threshold: 0.35,
    ignoreLocation: true,
    keys: ["title", "parent"],
  }), [flatItems]);

  const [query, setQuery] = React.useState("");
  const results = React.useMemo<FuseResult<FlatItem>[]>(() => (query.trim().length > 0 ? fuse.search(query.trim()) : []), [fuse, query]);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const href = results[activeIndex]?.item.href;
      if (href) router.push(href);
    }
  };

  const highlight = (text: string, matches: readonly FuseResultMatch[] | undefined) => {
    if (!matches || matches.length === 0) return text;
    const indices = matches.flatMap((m) => (m.key === "title" ? m.indices : []));
    if (indices.length === 0) return text;
    const parts: React.ReactNode[] = [];
    let pos = 0;
    for (const [start, end] of indices) {
      if (start > pos) parts.push(<span key={pos + "-n"}>{text.slice(pos, start)}</span>);
      parts.push(
        <mark key={start + "-h"} className="rounded px-0.5 bg-accent/50 text-foreground">
          {text.slice(start, end + 1)}
        </mark>
      );
      pos = end + 1;
    }
    if (pos < text.length) parts.push(<span key={pos + "-t"}>{text.slice(pos)}</span>);
    return parts;
  };

  return (
    <div
      className={cn("flex h-full w-64 flex-col border-r bg-card", className)}
    >
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Code className="h-6 w-6" />
          <span className="font-semibold">FormForge</span>
        </Link>
      </div>

      <div className="p-3 border-b">
        <div className="relative">
          <Input
            placeholder="Search docs…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            className="h-9 pr-8 placeholder:italic"
            aria-autocomplete="list"
            aria-controls="sidebar-search-results"
          />
          {/* Search icon */}
          <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Sidebar Navigation">
        {query.trim().length > 0 ? (
          <ul id="sidebar-search-results" role="listbox" className="space-y-1">
            {results.map((r, idx) => (
              <li key={r.item.href} role="option" aria-selected={idx === activeIndex}>
                <Link
                  href={r.item.href}
                  className={cn(
                    "group flex items-center justify-between rounded-md px-2.5 py-2 text-sm transition-all duration-150",
                    idx === activeIndex ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <span className="truncate">{highlight(r.item.title, r.matches)}</span>
                  {r.item.parent && <span className="ml-2 text-xs text-muted-foreground">{r.item.parent}</span>}
                </Link>
              </li>
            ))}
            {results.length === 0 && (
              <li className="text-sm text-muted-foreground px-3 py-2">No results</li>
            )}
          </ul>
        ) : (
          sidebarItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "group flex items-center space-x-2 rounded-md px-2.5 py-2 text-sm font-medium transition-all duration-150 hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-gradient-to-r from-[var(--accent-soft)] to-transparent text-accent-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.title}</span>
            </Link>

            {item.children && pathname.startsWith(item.href) && (
              <div className="ml-4 mt-1.5 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "flex items-center space-x-2 rounded-md px-2.5 py-2 text-sm transition-all duration-150 hover:bg-accent hover:text-accent-foreground",
                      pathname === child.href
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-muted-foreground"
                    )}
                  >
                    <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-accent-foreground" />
                    <span>{child.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))
        )}
      </nav>
    </div>
  );
}
