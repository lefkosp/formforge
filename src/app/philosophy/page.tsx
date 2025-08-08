"use client";

import { DocsLayout } from "@/components/docs/layout";

export default function PhilosophyPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Philosophy</h1>
          <p className="text-lg text-muted-foreground">
            The design principles and philosophy behind FormForge.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>Developer Experience First</h2>
          <p>
            FormForge is built with developers in mind. We believe that the best
            user experiences start with excellent developer experiences. Every
            component is designed to be intuitive, well-documented, and easy to
            customize.
          </p>

          <h2>Type Safety by Default</h2>
          <p>
            In a world where JavaScript can be unpredictable, FormForge embraces
            TypeScript and Zod to provide end-to-end type safety. Your form
            data, validation rules, and component props are all fully typed,
            catching errors at compile time rather than runtime.
          </p>

          <h2>Accessibility as a Foundation</h2>
          <p>
            Accessibility isn&apos;t an afterthought—it&apos;s built into every component
            from the ground up. FormForge components include proper ARIA
            attributes, keyboard navigation, and semantic HTML to ensure your
            forms work for everyone.
          </p>

          <h2>Performance Through Simplicity</h2>
          <p>
            By leveraging React Hook Form&apos;s optimized rendering and minimal
            re-renders, FormForge provides excellent performance out of the box.
            No unnecessary complexity, just fast, efficient forms.
          </p>

          <h2>Flexibility Without Compromise</h2>
          <p>
            While FormForge provides sensible defaults, it doesn&apos;t lock you into
            a rigid structure. Every component can be customized to match your
            design system, and the underlying libraries (React Hook Form, Zod)
            are always accessible when you need more control.
          </p>

          <h2>Composition Over Configuration</h2>
          <p>
            FormForge components are designed to work together seamlessly, but
            they&apos;re also composable. Mix and match components, extend them, or
            build your own—the architecture supports it all.
          </p>

          <h2>Documentation as Code</h2>
          <p>
            Every component includes comprehensive documentation, live examples,
            and TypeScript definitions. The documentation you&apos;re reading right
            now is generated from the same code that powers your forms.
          </p>

          <h2>Community Driven</h2>
          <p>
            FormForge is open source and community-driven. We believe in
            transparency, collaboration, and building tools that solve real
            problems for real developers.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}
