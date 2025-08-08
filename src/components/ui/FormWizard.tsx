"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface WizardStep {
  id: string;
  title: string;
  fields: string[]; // field names included in this step
}

interface FormWizardProps {
  steps: WizardStep[];
  children: (currentStep: WizardStep, stepIndex: number) => React.ReactNode;
  className?: string;
}

const FormWizard: React.FC<FormWizardProps> = ({ steps, children, className }) => {
  const { trigger } = useFormContext();
  const [index, setIndex] = React.useState(0);

  const current = steps[index];

  const onNext = async () => {
    const ok = await trigger(current.fields as unknown as string[]);
    if (!ok) return;
    setIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const onPrev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2 text-sm">
        {steps.map((s, i) => (
          <div key={s.id} className={cn("flex-1 h-2 rounded", i <= index ? "bg-primary" : "bg-muted")} />
        ))}
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Step {index + 1} of {steps.length}: {current.title}</h3>
        {children(current, index)}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev} disabled={index === 0}>Back</Button>
        {index < steps.length - 1 ? (
          <Button type="button" onClick={onNext}>Next</Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </div>
    </div>
  );
};

export default FormWizard;
