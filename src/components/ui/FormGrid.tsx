"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FormGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const FormGrid: React.FC<FormGridProps> = ({ children, columns = 2, className }) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }[columns];

  return (
    <div className={cn("grid gap-6", gridCols, className)}>{children}</div>
  );
};

export default FormGrid;
