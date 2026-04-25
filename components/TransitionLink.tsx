'use client';

import * as React from 'react';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

// next/link wrapper that uses the View Transitions API where the
// browser supports it. The transition is a soft cross-fade defined
// in globals.css; non-supporting browsers fall through to a normal
// next/link navigation with no UI difference.
//
// Usage: drop-in replacement for <Link>. Same props, same behavior
// for external/target=_blank links — those skip the transition path.

type Props = LinkProps & {
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  'aria-label'?: string;
};

export function TransitionLink(props: Props) {
  const router = useRouter();
  const { href, target, onClick, ...rest } = props;

  const onClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (target === '_blank') return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (typeof href !== 'string') return;
    if (!('startViewTransition' in document)) return;

    e.preventDefault();
    type DocWithVT = Document & {
      startViewTransition: (cb: () => void | Promise<void>) => unknown;
    };
    (document as DocWithVT).startViewTransition(() => {
      router.push(href);
    });
  };

  return <Link href={href} target={target} {...rest} onClick={onClickHandler} />;
}
