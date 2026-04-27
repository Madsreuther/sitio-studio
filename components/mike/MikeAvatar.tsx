'use client';

import * as React from 'react';
import { cn } from './cn';

// Mike Support avatar. Two colorways:
//   variant='admin'    — tech-cyan + green accent (warmth)
//   variant='customer' — cream + earth accent to match the
//                        sitiostudio.com / customer-editor look
//
// Friendly geometric face with a headset; states are idle /
// typing / learning / alert. Magenta + cyan are Sara/Johnny;
// green keeps Mike distinct.

export type MikeState = 'idle' | 'typing' | 'learning' | 'alert';
export type MikeVariant = 'admin' | 'customer';

const STATE_CLASS: Record<MikeState, string> = {
  idle: 'mike-state-idle',
  typing: 'mike-state-typing',
  learning: 'mike-state-learning',
  alert: 'mike-state-alert',
};

export function MikeAvatar({
  size = 32,
  state = 'idle',
  variant = 'admin',
  className,
}: {
  size?: number;
  state?: MikeState;
  variant?: MikeVariant;
  className?: string;
}) {
  const palette =
    variant === 'admin'
      ? { shellTop: '#0a1118', shellBot: '#000', stroke: '#00d4ff', accent: '#7AE582', eye: '#7AE582' }
      : { shellTop: '#FFF8EE', shellBot: '#F5EDD9', stroke: '#A57C52', accent: '#7C8A6E', eye: '#3C3830' };
  const shellId = `mike-shell-${variant}`;
  const glowId = `mike-glow-${variant}`;
  return (
    <span
      className={cn('mike-avatar inline-flex shrink-0', STATE_CLASS[state], className)}
      style={{ width: size, height: size }}
      data-state={state}
      data-variant={variant}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <linearGradient id={shellId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.shellTop} />
            <stop offset="100%" stopColor={palette.shellBot} />
          </linearGradient>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.accent} stopOpacity="1" />
            <stop offset="60%" stopColor={palette.accent} stopOpacity="0.55" />
            <stop offset="100%" stopColor={palette.accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* circular head */}
        <circle
          cx="32"
          cy="34"
          r="22"
          fill={`url(#${shellId})`}
          stroke={palette.stroke}
          strokeOpacity="0.8"
          strokeWidth="1.6"
          className="mike-shell"
        />

        {/* headset arc (the key Mike-iconography element) */}
        <path
          d="M 14 28 Q 14 14 32 14 Q 50 14 50 28"
          stroke={palette.stroke}
          strokeOpacity="0.85"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* earpads */}
        <rect x="10" y="26" width="6" height="10" rx="2" fill={palette.stroke} fillOpacity="0.85" />
        <rect x="48" y="26" width="6" height="10" rx="2" fill={palette.stroke} fillOpacity="0.85" />
        {/* mic boom */}
        <path
          d="M 14 36 Q 18 44 26 46"
          stroke={palette.stroke}
          strokeOpacity="0.7"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="26" cy="46" r="1.6" fill={palette.accent} className="mike-mic-tip" />

        {/* eyes + smile */}
        <circle cx="24" cy="34" r="2.2" fill={palette.eye} />
        <circle cx="40" cy="34" r="2.2" fill={palette.eye} />
        <path
          d="M 24 42 Q 32 47 40 42"
          stroke={palette.eye}
          strokeOpacity="0.75"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* typing: three-dot bubble — only when state=typing */}
        <g className="mike-typing-bubble">
          <rect x="46" y="6" width="14" height="9" rx="4" fill={palette.accent} fillOpacity="0.18" stroke={palette.accent} strokeWidth="1" />
          <circle cx="50" cy="10.5" r="1" fill={palette.accent} className="mike-typing-dot mike-typing-dot-1" />
          <circle cx="53" cy="10.5" r="1" fill={palette.accent} className="mike-typing-dot mike-typing-dot-2" />
          <circle cx="56" cy="10.5" r="1" fill={palette.accent} className="mike-typing-dot mike-typing-dot-3" />
        </g>

        {/* learning ring */}
        <circle
          cx="32"
          cy="34"
          r="26"
          fill="none"
          stroke={palette.accent}
          strokeOpacity="0.6"
          strokeWidth="1.2"
          className="mike-learning-pulse"
        />

        {/* alert tick */}
        <circle cx="51" cy="14" r="4" fill="#ff5577" className="mike-alert-tick" />
      </svg>
    </span>
  );
}

export function MikeAvatarStyles() {
  return (
    <style>{`
      .mike-avatar { line-height: 0; }
      .mike-typing-bubble { display: none; }
      .mike-learning-pulse { display: none; }
      .mike-alert-tick { display: none; }

      .mike-state-typing .mike-typing-bubble { display: block; }
      .mike-state-typing .mike-typing-dot {
        animation: mike-typing-dot 1.1s ease-in-out infinite;
        transform-origin: center;
      }
      .mike-state-typing .mike-typing-dot-2 { animation-delay: 0.18s; }
      .mike-state-typing .mike-typing-dot-3 { animation-delay: 0.36s; }
      @keyframes mike-typing-dot {
        0%, 60%, 100% { opacity: 0.35; transform: translateY(0); }
        30%           { opacity: 1;    transform: translateY(-1px); }
      }

      .mike-state-learning .mike-learning-pulse {
        display: block;
        transform-origin: 32px 34px;
        animation: mike-learning 2.6s ease-out infinite;
      }
      @keyframes mike-learning {
        0%   { transform: scale(0.7); opacity: 0.6; }
        100% { transform: scale(1.3); opacity: 0;   }
      }

      .mike-state-alert .mike-alert-tick {
        display: block;
        animation: mike-tick 1.4s ease-in-out infinite;
      }
      @keyframes mike-tick {
        0%, 100% { opacity: 0.9; }
        50%      { opacity: 0.4; }
      }
      .mike-state-alert .mike-shell {
        filter: drop-shadow(0 0 6px rgba(255, 85, 119, 0.5));
      }

      @media (prefers-reduced-motion: reduce) {
        .mike-typing-dot, .mike-learning-pulse, .mike-alert-tick {
          animation: none !important;
        }
      }
    `}</style>
  );
}
