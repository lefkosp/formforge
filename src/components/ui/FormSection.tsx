"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, children, className }) => {
  return (
    <section className={cn("rounded-md border border-border bg-background", className)}>
      <div className="px-4 py-3">
        <h3 className="text-sm font-medium">
          <span className="bg-gradient-to-r from-accent to-transparent bg-[length:100%_2px] bg-left-bottom bg-no-repeat pb-1">
            {title}
          </span>
        </h3>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="border-t">
        <div className="p-4 grid gap-6">{children}</div>
      </div>
    </section>
  );
};

export default FormSection;
