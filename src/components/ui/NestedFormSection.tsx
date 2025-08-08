"use client";

import * as React from "react";
import { Label } from "./label";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NestedFormSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  nested?: boolean;
  className?: string;
}

const NestedFormSection: React.FC<NestedFormSectionProps> = ({ title, children, defaultOpen = true, nested = false, className }) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className={cn("rounded-md border", nested && "ml-4", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-2 transition-all duration-200 ease-in-out hover:bg-accent/20"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")}/>
          <Label className="cursor-pointer">{title}</Label>
        </div>
        <span className="text-sm text-muted-foreground">{open ? "Hide" : "Show"}</span>
      </button>
      {open && <div className="border-t p-3 space-y-3">{children}</div>}
    </div>
  );
};

export default NestedFormSection;
