'use client';

import * as React from 'react';

// Subtle background tint shifts based on the visitor's local hour.
// Updates the --color-cream CSS variable by ~5% on mount; never animated
// after, never touches anything else. Hour bands match the brief.

const TINTS = {
  // [hex of cream replacement] — derived around the base #F5F1EB so the
  // shift is felt, not seen. Each is within ~5% of the base.
  morning: '#F6EFE3',  // cream lean
  midday: '#F5F1EB',   // base / neutral
  afternoon: '#F2EFE6', // hint of sage cool
  evening: '#F4ECDD',  // warmer earth
  night: '#F2EBDA',    // deepest cream
} as const;

function bandForHour(h: number): keyof typeof TINTS {
  if (h >= 6 && h < 11) return 'morning';
  if (h >= 11 && h < 15) return 'midday';
  if (h >= 15 && h < 18) return 'afternoon';
  if (h >= 18 && h < 22) return 'evening';
  return 'night';
}

export function TimeOfDayTint() {
  React.useEffect(() => {
    const apply = () => {
      const band = bandForHour(new Date().getHours());
      document.documentElement.style.setProperty('--color-cream', TINTS[band]);
      document.documentElement.dataset.timeBand = band;
    };
    apply();
    // Re-apply hourly so tabs left open across a band boundary update.
    const id = setInterval(apply, 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return null;
}
