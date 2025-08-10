import * as React from "react";

export function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Very lightweight TSX highlighter for docs (not full-featured)
export function highlightTsx(code: string): string {
  const escaped = escapeHtml(code);

  // Order matters; apply spans for strings, keywords, JSX tags, types
  let html = escaped;

  // Comments (block first, then line)
  html = html.replace(
    /\/\*[\s\S]*?\*\//g,
    (m) => `<span class="text-muted-foreground/70">${m}</span>`
  );
  html = html.replace(
    /(\/\/.*?$)/gm,
    '<span class="text-muted-foreground/70">$1</span>'
  );

  // String literals (double, single, template)
  html = html.replace(
    /(\"[^\"\\]*(?:\\.[^\"\\]*)*\"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)/g,
    '<span class="text-emerald-400">$1</span>'
  );

  // Keywords
  html = html.replace(
    /\b(import|from|export|const|let|function|return|if|else|type|interface|as|extends|implements|new)\b/g,
    '<span class="text-indigo-400">$1</span>'
  );

  // JSX tags
  html = html.replace(
    /(&lt;<\/?)([A-Za-z][A-Za-z0-9_]*)/g,
    '$1<span class="text-rose-400">$2</span>'
  );

  // Types
  html = html.replace(
    /:\s*([A-Za-z_][A-Za-z0-9_<>\[\]\s?,]*)/g,
    ': <span class="text-sky-400">$1</span>'
  );

  // Props
  html = html.replace(
    /(&lt;[^&]*?\s)([A-Za-z_][A-Za-z0-9_-]*)(=)/g,
    '$1<span class="text-amber-400">$2</span>$3'
  );

  return html;
}

// Lightweight TSX tokenizer that returns React nodes (no innerHTML)
export function highlightTsxNodes(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];

  const push = (text: string, className?: string) => {
    if (!text) return;
    if (className) {
      nodes.push(
        React.createElement("span", { className, key: nodes.length }, text)
      );
    } else {
      nodes.push(text);
    }
  };

  const isWord = (c: string) => /[A-Za-z0-9_$]/.test(c);
  const keywords = new Set([
    "import",
    "from",
    "export",
    "const",
    "let",
    "function",
    "return",
    "if",
    "else",
    "type",
    "interface",
    "as",
    "extends",
    "implements",
    "new",
  ]);

  let i = 0;
  while (i < code.length) {
    const ch = code[i];
    const pair = code.slice(i, i + 2);

    // Block comment
    if (pair === "/*") {
      const end = code.indexOf("*/", i + 2);
      const segment = end !== -1 ? code.slice(i, end + 2) : code.slice(i);
      push(segment, "text-muted-foreground/70");
      i += segment.length;
      continue;
    }

    // Line comment
    if (pair === "//") {
      let end = code.indexOf("\n", i + 2);
      if (end === -1) end = code.length;
      const segment = code.slice(i, end);
      push(segment, "text-muted-foreground/70");
      i += segment.length;
      continue;
    }

    // Strings (", ', `)
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === "\\") {
          j += 2;
          continue;
        }
        if (code[j] === quote) {
          j += 1;
          break;
        }
        j += 1;
      }
      push(code.slice(i, j), "text-emerald-400");
      i = j;
      continue;
    }

    // JSX tag
    if (ch === "<") {
      let j = i + 1;
      while (j < code.length && code[j] !== ">") {
        if (code[j] === '"' || code[j] === "'" || code[j] === "`") {
          const q = code[j];
          j += 1;
          while (j < code.length) {
            if (code[j] === "\\") {
              j += 2;
              continue;
            }
            if (code[j] === q) {
              j += 1;
              break;
            }
            j += 1;
          }
          continue;
        }
        j += 1;
      }
      if (j < code.length && code[j] === ">") j += 1;

      const tagChunk = code.slice(i, j);

      // Emit sigil
      let k = 0;
      if (tagChunk.startsWith("</")) {
        push("</");
        k = 2;
      } else if (tagChunk.startsWith("<")) {
        push("<");
        k = 1;
      }

      // Tag name
      const tn = /^[A-Za-z][A-Za-z0-9_]*/.exec(tagChunk.slice(k));
      if (tn) {
        push(tn[0], "text-rose-400");
        k += tn[0].length;
      }

      // Attributes with basic highlighting
      while (k < tagChunk.length) {
        const rest = tagChunk.slice(k);
        const m = /^(\s+)([A-Za-z_][A-Za-z0-9_-]*)(=)?/.exec(rest);
        if (m) {
          push(m[1]);
          push(m[2], "text-amber-400");
          if (m[3]) push("=");
          k += m[0].length;
          continue;
        }
        push(tagChunk[k]);
        k += 1;
      }

      i += tagChunk.length;
      continue;
    }

    // Keywords
    if ((i === 0 || !isWord(code[i - 1])) && isWord(ch)) {
      let j = i + 1;
      while (j < code.length && isWord(code[j])) j += 1;
      const word = code.slice(i, j);
      if (keywords.has(word)) push(word, "text-indigo-400");
      else push(word);
      i = j;
      continue;
    }

    // Fallback
    push(ch);
    i += 1;
  }

  return nodes;
}

// Lightweight Zod/schema tokenizer → React nodes
// Highlights: comments, strings, numbers, keywords, z/zod, member calls (x.y)
export function highlightZodNodes(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];

  const push = (text: string, className?: string) => {
    if (!text) return;
    if (className) {
      nodes.push(
        React.createElement("span", { className, key: nodes.length }, text)
      );
    } else {
      nodes.push(text);
    }
  };

  const isWord = (c: string) => /[A-Za-z0-9_$]/.test(c);
  const isIdentStart = (c: string) => /[A-Za-z_$]/.test(c);
  const keywords = new Set([
    "import",
    "from",
    "export",
    "const",
    "let",
    "type",
    "interface",
    "as",
    "extends",
    "implements",
    "infer",
    "typeof",
    "return",
    "new",
  ]);

  let i = 0;
  while (i < code.length) {
    const ch = code[i];
    const pair = code.slice(i, i + 2);

    // Block comment
    if (pair === "/*") {
      const end = code.indexOf("*/", i + 2);
      const segment = end !== -1 ? code.slice(i, end + 2) : code.slice(i);
      push(segment, "text-muted-foreground/70");
      i += segment.length;
      continue;
    }

    // Line comment
    if (pair === "//") {
      let end = code.indexOf("\n", i + 2);
      if (end === -1) end = code.length;
      const segment = code.slice(i, end);
      push(segment, "text-muted-foreground/70");
      i += segment.length;
      continue;
    }

    // Strings (", ', `)
    if (ch === '"' || ch === "'" || ch === "`") {
      const q = ch;
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === "\\") {
          j += 2;
          continue;
        }
        if (code[j] === q) {
          j += 1;
          break;
        }
        j += 1;
      }
      push(code.slice(i, j), "text-emerald-400");
      i = j;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(ch)) {
      let j = i + 1;
      while (j < code.length && /[0-9_]/.test(code[j])) j += 1;
      if (code[j] === ".") {
        j += 1;
        while (j < code.length && /[0-9_]/.test(code[j])) j += 1;
      }
      push(code.slice(i, j), "text-sky-400");
      i = j;
      continue;
    }

    // Identifiers and member chains
    if (isIdentStart(ch)) {
      let j = i + 1;
      while (j < code.length && isWord(code[j])) j += 1;
      const word = code.slice(i, j);

      const lookahead = code.slice(j).match(/^\s*:/);
      const isMember = i > 0 && code[i - 1] === ".";

      if (!isMember && (word === "z" || word === "zod")) {
        push(word, "text-rose-400");
      } else if (isMember) {
        push(word, "text-amber-400"); // member function/property
      } else if (keywords.has(word)) {
        push(word, "text-indigo-400");
      } else if (lookahead) {
        push(word, "text-amber-400"); // likely object key
      } else {
        push(word);
      }
      i = j;
      continue;
    }

    // Dots and other single chars
    push(ch);
    i += 1;
  }

  return nodes;
}
