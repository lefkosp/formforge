"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface FormRowProps {
  children: React.ReactNode;
  label?: React.ReactNode;
  htmlFor?: string;
  description?: React.ReactNode;
  required?: boolean;
  /**
   * Layout of the row.
   * - "stack": label above control at all breakpoints
   * - "inline": label left, control right on md+, stack on small screens
   */
  layout?: "stack" | "inline";
  /** Align items for inline layout at md+ */
  align?: "start" | "center";
  /** Optional classNames */
  className?: string;
  labelClassName?: string;
  controlClassName?: string;
}

const FormRow: React.FC<FormRowProps> = ({
  children,
  label,
  htmlFor,
  description,
  required,
  layout = "inline",
  align = "start",
  className,
  labelClassName,
  controlClassName,
}) => {
  const isInline = layout === "inline";

  return (
    <div
      className={cn(
        "w-full",
        // Base vertical spacing between label/control/description when stacked
        !isInline && "space-y-1.5",
        // Grid only applies at md+ when inline
        isInline && "md:grid md:grid-cols-12 md:gap-4",
        // Alignment for inline variant
        isInline && (align === "center" ? "md:items-center" : "md:items-start"),
        className
      )}
    >
      {label && (
        <div className={cn(isInline ? "md:col-span-4" : undefined)}>
          <Label htmlFor={htmlFor} className={cn("form-label", labelClassName)}>
            {label}
            {required && <span className="text-destructive ml-0.5" aria-hidden>*</span>}
          </Label>
        </div>
      )}

      <div
        className={cn(
          isInline && (label ? "md:col-span-8" : "md:col-span-12"),
          controlClassName
        )}
      >
        {children}
        {description && (
          <p className={cn("mt-1 text-xs text-muted-foreground")}>{description}</p>
        )}
      </div>
    </div>
  );
};

export default FormRow;