"use client";

import { DocsLayout } from "@/components/docs/layout";
import Link from "next/link";
import { ArrowRight, Code } from "lucide-react";

const components = [
  {
    name: "InputField",
    description: "A form input field with validation and error handling.",
    href: "/components/input-field",
  },
  {
    name: "SelectField",
    description:
      "A select dropdown component with search and multi-select options.",
    href: "/components/select-field",
  },
  {
    name: "TextareaField",
    description: "A multi-line text input with character count and validation.",
    href: "/components/textarea-field",
  },
  {
    name: "CheckboxField",
    description: "A checkbox input with custom styling and validation.",
    href: "/components/checkbox-field",
  },
  {
    name: "FormSection",
    description: "A container component for grouping related form fields.",
    href: "/components/form-section",
  },
  {
    name: "FormGrid",
    description: "A responsive grid layout for organizing form fields.",
    href: "/components/form-grid",
  },
  {
    name: "FormStepper",
    description: "A multi-step form component with progress indication.",
    href: "/components/form-stepper",
  },
];

export default function ComponentsPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Components</h1>
          <p className="text-lg text-muted-foreground">
            Explore all available FormForge components and their configurations.
          </p>
        </div>

        {/* Description */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            FormForge provides a comprehensive set of form components designed
            for modern React applications. Each component is built with
            accessibility in mind and integrates seamlessly with React Hook Form
            and Zod validation.
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {components.map((component) => (
            <Link
              key={component.name}
              href={component.href}
              className="group rounded-lg border bg-card p-6 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <h3 className="font-semibold">{component.name}</h3>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {component.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Additional Info */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>Component Features</h2>
          <ul>
            <li>
              <strong>Type Safety:</strong> All components are fully typed with
              TypeScript
            </li>
            <li>
              <strong>Accessibility:</strong> Built-in ARIA attributes and
              keyboard navigation
            </li>
            <li>
              <strong>Validation:</strong> Integrated with Zod for schema
              validation
            </li>
            <li>
              <strong>Customization:</strong> Flexible theming with Tailwind CSS
            </li>
            <li>
              <strong>Performance:</strong> Optimized with React Hook Form
            </li>
          </ul>
        </div>
      </div>
    </DocsLayout>
  );
}
