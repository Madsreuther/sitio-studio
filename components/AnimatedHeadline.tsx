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

  // Splits children into a flat list of tokens. Strings split on
  // whitespace into word/space tokens; element children become "group"
  // tokens whose own children are recursively token-split, so the
  // wrapper span (style + className) survives but spaces inside it
  // are still preserved as actual whitespace, not letter-eaten.
  const tokens = React.useMemo(() => splitChildren(children), [children]);

  if (reduce) {
    // Static fallback — preserve the original DOM shape.
    return <span className={className}>{children}</span>;
  }

  // Threaded letter index so the cross-token stagger reads as one wave,
  // not as separate per-token waves. Reset to 0 on each render.
  const counter = { i: 0 };
  return (
    <span className={className}>
      {tokens.map((tok, idx) => renderToken(tok, idx, counter))}
    </span>
  );
}

// ─── Render ─────────────────────────────────────────────────────────

function renderToken(tok: Token, key: number, counter: { i: number }): React.ReactNode {
  if (tok.type === 'space') {
    // Plain space — sits between word tokens (or sibling tokens) and
    // wears no styling so the browser's normal whitespace rules apply.
    return <React.Fragment key={`s-${key}`}>{' '}</React.Fragment>;
  }
  if (tok.type === 'word') {
    return (
      <span key={`w-${key}`} className="inline-block whitespace-nowrap">
        {tok.letters.map((ch) => {
          const i = counter.i++;
          return (
            <Letter key={`l-${i}`} index={i}>
              {ch}
            </Letter>
          );
        })}
      </span>
    );
  }
  // group — render the wrapper span with original style/className, then
  // walk its sub-tokens. Spaces inside the wrapper render as plain
  // whitespace; words become per-letter animated spans like everything
  // else. This is the bit the previous version got wrong: it was
  // splitting the group's text into individual chars (including spaces)
  // and wrapping every one in inline-block <Letter>, which made the
  // single-space children visually disappear.
  return (
    <span key={`g-${key}`} style={tok.style} className={tok.className}>
      {tok.tokens.map((sub, subIdx) => renderToken(sub, subIdx, counter))}
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

type LeafToken = { type: 'space' } | { type: 'word'; letters: string[] };

type Token =
  | LeafToken
  | { type: 'group'; tokens: LeafToken[]; style?: React.CSSProperties; className?: string };

function splitChildren(children: React.ReactNode): Token[] {
  const out: Token[] = [];
  React.Children.forEach(children, (child) => {
    if (child === null || child === undefined || typeof child === 'boolean') return;
    if (typeof child === 'string' || typeof child === 'number') {
      pushStringTokens(out, String(child));
      return;
    }
    if (React.isValidElement(child)) {
      const props = child.props as {
        children?: React.ReactNode;
        style?: React.CSSProperties;
        className?: string;
      };
      const text = innerText(props.children);
      // pushStringTokens only ever writes word/space tokens, so this
      // sub array is always LeafToken[] at runtime — the cast keeps
      // the function signature unified without lying about the data.
      const sub: Token[] = [];
      pushStringTokens(sub, text);
      out.push({
        type: 'group',
        tokens: sub as LeafToken[],
        style: props.style,
        className: props.className,
      });
    }
  });
  return out;
}

// Push word + space tokens onto `out` from a raw string. Repeated
// whitespace collapses to a single space token (matches the way
// browsers render contiguous whitespace anyway). The parameter type
// is intentionally Token[] (not LeafToken[]) so the same helper can
// write into either the top-level Token array or a group's leaf-only
// array — only word/space tokens are ever produced.
function pushStringTokens(out: Token[], s: string) {
  let buf = '';
  let pendingSpace = false;
  const flushWord = () => {
    if (buf.length > 0) {
      out.push({ type: 'word', letters: [...buf] });
      buf = '';
    }
  };
  for (const ch of s) {
    if (/\s/.test(ch)) {
      flushWord();
      pendingSpace = true;
    } else {
      if (pendingSpace) {
        out.push({ type: 'space' });
        pendingSpace = false;
      }
      buf += ch;
    }
  }
  flushWord();
  if (pendingSpace) out.push({ type: 'space' });
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
