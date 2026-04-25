'use client';

import * as React from 'react';

// Letter-by-letter reveal for the hero headline. Each letter animates
// from opacity 0 + a small y offset to its final position on a stagger,
// and on hover its `font-variation-settings` weight pops from the
// resting state to bolder for ~250ms before relaxing back. Subtle by
// design — the goal is "type breathing", not "type performing".
//
// Variable weight only works on Fraunces (loaded with axis 'opsz' +
// 'SOFT' but Fraunces also exposes 'wght'); we apply it via the
// browser-native CSS variable + variation settings.
//
// Skipped on prefers-reduced-motion: letters render statically.

type Props = {
  children: string | React.ReactNode;
  className?: string;
};

export function AnimatedHeadline({ children, className = '' }: Props) {
  const [reduce, setReduce] = React.useState(true);

  React.useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Convert React children into a flat array of nodes that we can split
  // on whitespace. Each top-level child is rendered as a span, with
  // string fragments split into individual letters. Non-string nodes
  // (e.g. <span> inside the headline) keep their structure but their
  // text contents become per-letter spans too.
  const tokens = React.useMemo(() => {
    return splitChildren(children);
  }, [children]);

  if (reduce) {
    // Static fallback — preserve the original DOM shape.
    return <span className={className}>{children}</span>;
  }

  let letterIndex = 0;
  return (
    <span className={className}>
      {tokens.map((tok, i) => {
        if (tok.type === 'space') return <span key={`s-${i}`}>{' '}</span>;
        if (tok.type === 'word') {
          // Render a non-breaking word so the per-letter spans
          // don't break across the line in the middle of a word.
          return (
            <span key={`w-${i}`} className="inline-block whitespace-nowrap">
              {tok.letters.map((ch) => {
                const idx = letterIndex++;
                return (
                  <Letter key={`l-${idx}`} index={idx}>
                    {ch}
                  </Letter>
                );
              })}
            </span>
          );
        }
        // Wrapped in a span (e.g. earth-colored fragment) — render the
        // wrapper, recurse on its children with their own letter spans.
        return (
          <span key={`g-${i}`} style={tok.style} className={tok.className}>
            {tok.letters.map((ch) => {
              const idx = letterIndex++;
              return (
                <Letter key={`l-${idx}`} index={idx}>
                  {ch}
                </Letter>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

function Letter({ index, children }: { index: number; children: string }) {
  return (
    <span
      className="sitio-letter inline-block"
      style={{
        animationDelay: `${index * 28}ms`,
      }}
    >
      {children}
    </span>
  );
}

// ─── Children splitter ──────────────────────────────────────────────
// Handles a small subset of React children:
//   - plain strings      → split on whitespace into word-tokens
//   - <span style className>text</span>  → "group" token, letters split
// Anything else falls back to passthrough as a word-token whose first
// letter is the whole thing (so we don't crash on unexpected input).

type Token =
  | { type: 'space' }
  | { type: 'word'; letters: string[] }
  | { type: 'group'; letters: string[]; style?: React.CSSProperties; className?: string };

function splitChildren(children: React.ReactNode): Token[] {
  const out: Token[] = [];
  React.Children.forEach(children, (child) => {
    if (child === null || child === undefined || typeof child === 'boolean') return;
    if (typeof child === 'string' || typeof child === 'number') {
      pushString(out, String(child));
      return;
    }
    if (React.isValidElement(child)) {
      const props = child.props as { children?: React.ReactNode; style?: React.CSSProperties; className?: string };
      const inner = props.children;
      const text = innerText(inner);
      out.push({
        type: 'group',
        letters: [...text],
        style: props.style,
        className: props.className,
      });
      return;
    }
  });
  return out;
}

function pushString(out: Token[], s: string) {
  let buf = '';
  const flush = () => {
    if (buf.length > 0) {
      out.push({ type: 'word', letters: [...buf] });
      buf = '';
    }
  };
  for (const ch of s) {
    if (/\s/.test(ch)) {
      flush();
      out.push({ type: 'space' });
    } else {
      buf += ch;
    }
  }
  flush();
}

function innerText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(innerText).join('');
  if (React.isValidElement(node)) {
    return innerText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}
