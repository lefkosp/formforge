"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
}

interface FormStepperProps {
  steps: Step[];
  active: number;
  className?: string;
}

const FormStepper: React.FC<FormStepperProps> = ({ steps, active, className }) => {
  return (
    <ol className={cn("flex items-center gap-3", className)}>
      {steps.map((step, i) => {
        const isActive = i === active;
        const isCompleted = i < active;
        return (
          <li key={step.title} className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex size-6 items-center justify-center rounded-full border border-border text-xs transition-all duration-200",
                isCompleted && "bg-accent text-accent-foreground",
                isActive && "scale-105 bg-accent text-accent-foreground shadow shadow-accent/40 animate-step-active"
              )}
            >
              {i + 1}
            </span>
            <span className={cn("text-xs text-muted-foreground", isActive && "text-foreground font-medium")}>{step.title}</span>
            {i < steps.length - 1 && (
              <span className="mx-1 h-px w-7 bg-border" />
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default FormStepper;
