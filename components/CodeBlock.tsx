'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node)) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

function parseLanguageFromClass(className: unknown): string | null {
  if (!className) return null;
  const classes = Array.isArray(className)
    ? className
    : typeof className === 'string'
      ? className.split(/\s+/)
      : [];

  for (const cls of classes) {
    if (typeof cls === 'string') {
      const match = /(?:language|lang)-([a-zA-Z0-9_+#.-]+)/i.exec(cls);
      if (match && match[1]) {
        return match[1];
      }
    }
  }
  return null;
}

function getLanguage(node: any, children: React.ReactNode, preProps: Record<string, any>): string {
  // 1. Check direct pre props
  const fromPreClass = parseLanguageFromClass(preProps.className);
  if (fromPreClass) return fromPreClass;

  // 2. Check HAST node from ReactMarkdown
  if (node) {
    const fromHastPre = parseLanguageFromClass(node.properties?.className);
    if (fromHastPre) return fromHastPre;

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        if (child && child.type === 'element' && (child.tagName === 'code' || child.tagName === 'pre')) {
          const fromChild = parseLanguageFromClass(child.properties?.className);
          if (fromChild) return fromChild;
          if (child.properties?.['data-language']) {
            return String(child.properties['data-language']);
          }
          if (child.properties?.['data-lang']) {
            return String(child.properties['data-lang']);
          }
        }
      }
    }
  }

  // 3. Check React children (handles array, single element, or nested nodes)
  const findInReactChildren = (c: React.ReactNode): string | null => {
    if (!c) return null;
    if (Array.isArray(c)) {
      for (const item of c) {
        const res = findInReactChildren(item);
        if (res) return res;
      }
      return null;
    }
    if (React.isValidElement(c)) {
      const props = c.props as Record<string, any>;
      const fromClass = parseLanguageFromClass(props?.className);
      if (fromClass) return fromClass;

      if (props?.['data-language']) return String(props['data-language']);
      if (props?.['data-lang']) return String(props['data-lang']);

      if (props?.node) {
        const fromNode = getLanguage(props.node, null, {});
        if (fromNode !== 'text') return fromNode;
      }
      if (props?.children) {
        const res = findInReactChildren(props.children);
        if (res) return res;
      }
    }
    return null;
  };

  const fromChildren = findInReactChildren(children);
  if (fromChildren) return fromChildren;

  return 'text';
}

function formatLanguageName(lang: string): string {
  const clean = lang.trim().toLowerCase();
  const knownMap: Record<string, string> = {
    tsx: 'TSX',
    jsx: 'JSX',
    ts: 'TypeScript',
    typescript: 'TypeScript',
    js: 'JavaScript',
    javascript: 'JavaScript',
    json: 'JSON',
    cmd: 'CMD',
    bash: 'Bash',
    sh: 'Shell',
    shell: 'Shell',
    zsh: 'Zsh',
    powershell: 'PowerShell',
    ps1: 'PowerShell',
    bat: 'Batch',
    batch: 'Batch',
    rust: 'Rust',
    rs: 'Rust',
    python: 'Python',
    py: 'Python',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    sass: 'Sass',
    less: 'Less',
    sql: 'SQL',
    toml: 'TOML',
    yaml: 'YAML',
    yml: 'YAML',
    md: 'Markdown',
    mdx: 'MDX',
    markdown: 'Markdown',
    cpp: 'C++',
    'c++': 'C++',
    c: 'C',
    csharp: 'C#',
    'c#': 'C#',
    cs: 'C#',
    go: 'Go',
    golang: 'Go',
    java: 'Java',
    kotlin: 'Kotlin',
    kt: 'Kotlin',
    swift: 'Swift',
    php: 'PHP',
    ruby: 'Ruby',
    rb: 'Ruby',
    dockerfile: 'Dockerfile',
    docker: 'Docker',
    makefile: 'Makefile',
    diff: 'Diff',
    edl: 'EDL',
    graphql: 'GraphQL',
    gql: 'GraphQL',
    vue: 'Vue',
    svelte: 'Svelte',
    text: 'Text',
    plaintext: 'Text',
    txt: 'Text',
  };

  if (knownMap[clean]) {
    return knownMap[clean];
  }

  return clean.length <= 4 ? clean.toUpperCase() : clean.charAt(0).toUpperCase() + clean.slice(1);
}

export interface CodeBlockProps extends React.ComponentPropsWithoutRef<'pre'> {
  node?: any;
}

export default function CodeBlock({
  children,
  node,
  ...props
}: CodeBlockProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const rawLanguage = getLanguage(node, children, props);
  const displayLanguage = formatLanguageName(rawLanguage);

  const handleCopy = async () => {
    const rawText = extractText(children).replace(/\n$/, '');
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(rawText);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = rawText;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code block:', err);
    }
  };

  return (
    <div className="code-block-container my-6 border border-dashed border-neutral-400 dark:border-neutral-600 font-mono-ink text-xs sm:text-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-dashed border-neutral-400 dark:border-neutral-600 bg-neutral-100/50 dark:bg-neutral-900/50 select-none">
        <span className="font-mono-ink text-xs tracking-wider opacity-60 uppercase">
          {displayLanguage}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied code' : 'Copy code to clipboard'}
          title={copied ? 'Copied!' : 'Copy code'}
          className="inline-flex items-center gap-1.5 font-mono-ink text-xs opacity-70 hover:opacity-100 transition-opacity cursor-pointer py-0.5 px-1 -mr-1"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              <span className="text-[11px] text-green-600 dark:text-green-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre {...props} className="p-3.5 sm:p-4 overflow-x-auto bg-transparent border-0 m-0 text-inherit">
        {children}
      </pre>
    </div>
  );
}
