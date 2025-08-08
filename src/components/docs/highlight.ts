export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Very lightweight TSX highlighter for docs (not full-featured)
export function highlightTsx(code: string): string {
  const escaped = escapeHtml(code);

  // Order matters; apply spans for strings, keywords, JSX tags, types
  let html = escaped;

  // String literals
  html = html.replace(/(&quot;[^&]*?&quot;|'[^']*?')/g, '<span class="text-emerald-500">$1</span>');

  // Keywords
  html = html.replace(/\b(import|from|export|const|let|function|return|if|else|type|interface|as|extends|implements|new)\b/g, '<span class="text-indigo-400">$1</span>');

  // JSX tags
  html = html.replace(/(&lt;\/?)([A-Za-z][A-Za-z0-9_]*)/g, '$1<span class="text-rose-400">$2</span>');

  // Types
  html = html.replace(/:\s*([A-Za-z_][A-Za-z0-9_<>\[\]\s?,]*)/g, ': <span class="text-sky-400">$1</span>');

  // Props
  html = html.replace(/([A-Za-z_][A-Za-z0-9_-]*)(=)/g, '<span class="text-amber-400">$1</span>$2');

  // Comments
  html = html.replace(/(\/\/.*?$)/gm, '<span class="text-muted-foreground/70">$1</span>');

  return html;
}
