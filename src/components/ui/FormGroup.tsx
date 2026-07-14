"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormGroupProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Default vertical spacing between items inside the group */
  spacing?: "none" | "sm" | "md" | "lg";
  /** Optional border and background to visually separate the group */
  variant?: "plain" | "card" | "bordered";
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

const spacingClassMap: Record<NonNullable<FormGroupProps["spacing"]>, string> = {
  none: "space-y-0",
  sm: "space-y-3",
  md: "space-y-4",
  lg: "space-y-6",
};

const variantClassMap: Record<NonNullable<FormGroupProps["variant"]>, string> = {
  plain: "",
  bordered: "rounded-md border border-border bg-background",
  card: "rounded-md border border-border bg-background shadow-sm",
};

const FormGroup: React.FC<FormGroupProps> = ({
  children,
  title,
  description,
  spacing = "md",
  variant = "plain",
  className,
  headerClassName,
  contentClassName,
}) => {
  return (
    <section className={cn(variantClassMap[variant], className)}>
      {(title || description) && (
        <div className={cn("px-4 py-3", headerClassName)}>
          {title && (
            <h3 className="text-sm font-medium">
              <span className="bg-gradient-to-r from-accent to-transparent bg-[length:100%_2px] bg-left-bottom bg-no-repeat pb-1">
                {title}
              </span>
            </h3>
          )}
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className={cn(title || description ? "border-t" : undefined)}>
        <div className={cn("p-4", spacingClassMap[spacing], contentClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default FormGroup;