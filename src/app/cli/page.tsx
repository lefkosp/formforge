"use client";

import { DocsLayout } from "@/components/docs/layout";

export default function CLIPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">CLI</h1>
          <p className="text-lg text-muted-foreground">
            Command-line tools for FormForge development and scaffolding.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>Installation</h2>
          <p>
            Install the FormForge CLI globally to access scaffolding and
            development tools:
          </p>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>npm install -g @formforge/cli</code>
          </pre>

          <h2>Commands</h2>

          <h3>Create a new form</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>formforge create form my-form</code>
          </pre>
          <p>
            This command creates a new form with the specified name and
            generates all necessary files including the form component,
            validation schema, and TypeScript types.
          </p>

          <h3>Generate form fields</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>formforge add field email --type email --required</code>
          </pre>
          <p>
            Add individual form fields to an existing form with specified
            validation rules.
          </p>

          <h3>Validate form schema</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>formforge validate schema</code>
          </pre>
          <p>Validate your Zod schema files for type safety and consistency.</p>

          <h2>Configuration</h2>
          <p>
            Create a <code>formforge.config.js</code> file in your project root
            to customize the CLI behavior:
          </p>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`module.exports = {
  componentsDir: './src/components/forms',
  schemasDir: './src/schemas',
  templatesDir: './templates',
  defaultTheme: 'tailwind',
  typescript: true,
}`}</code>
          </pre>

          <h2>Templates</h2>
          <p>
            The CLI supports custom templates for generating forms. Create your
            own templates in the <code>templates</code> directory to match your
            project's conventions.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}
