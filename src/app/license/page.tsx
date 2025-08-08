"use client";

import { DocsLayout } from "@/components/docs/layout";

export default function LicensePage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">License</h1>
          <p className="text-lg text-muted-foreground">
            MIT License - FormForge is open source and free to use.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>MIT License</h2>
          <p>Copyright (c) 2024 FormForge Contributors</p>

          <p>
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the &quot;Software&quot;), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
          </p>

          <p>
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
          </p>

          <p>
            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>

          <h2>Contributing</h2>
          <p>
            FormForge is an open source project and we welcome contributions
            from the community. Whether it&apos;s bug reports, feature requests, or
            code contributions, every bit helps make FormForge better for
            everyone.
          </p>

          <h2>Third-Party Licenses</h2>
          <p>
            FormForge uses several open source libraries. You can find the full
            list of dependencies and their licenses in the{" "}
            <code>package.json</code> file or by running
            <code>npm list</code> in your project directory.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}
