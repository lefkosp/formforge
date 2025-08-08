"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  FileText,
  Code,
  Settings,
  BookOpen,
  Terminal,
  Heart,
  FileCode,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Introduction",
    href: "/",
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

      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.title}</span>
            </Link>

            {item.children && pathname.startsWith(item.href) && (
              <div className="ml-6 mt-2 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === child.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <ChevronRight className="h-3 w-3" />
                    <span>{child.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
