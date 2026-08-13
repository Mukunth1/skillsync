import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * ProgressArc — Single SVG ring with gradient stroke and animated fill.
 * Inspired by 21st.dev's "Financial Score Cards" (id 5409) and existing ProgressRing.
 *
 * Drop-in replacement for the older ProgressRing component on stat tiles.
 */

export interface ProgressArcProps {
  /** Target percent 0–100. */
  percent: number;
  /** Ring diameter in px. */
  size?: number;
  /** Stroke width in px. */
  strokeWidth?: number;
  /** Center label — typically the percent number, but can be a React node. */
  centerLabel?: React.ReactNode;
  /** Caption under the ring. */
  caption?: string;
  /** Gradient start color. */
  from?: string;
  /** Gradient end color. */
  to?: string;
  /** Animate count-up. Defaults to true. */
  animate?: boolean;
  /** Stable ID so multiple instances on the same page don't share gradients. */
  gradientId?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ProgressArc({
  percent,
  size = 120,
  strokeWidth = 10,
  centerLabel,
  caption,
  from = '#f59e0b',
  to = '#e11d48',
  animate = true,
  gradientId = 'arc-gradient',
}: ProgressArcProps) {
  const reduceMotion = useReducedMotion();
  const safeTarget = Math.max(0, Math.min(100, Math.round(percent)));
  const [displayed, setDisplayed] = useState(reduceMotion ? safeTarget : 0);

  useEffect(() => {
    if (!animate || reduceMotion) {
      setDisplayed(safeTarget);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplayed(Math.round(safeTarget * easeOutCubic(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [safeTarget, animate, reduceMotion]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayed / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90" aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel ?? (
            <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)] tabular-nums">
              {displayed}%
            </span>
          )}
        </div>
      </div>
      {caption && (
        <span className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
          {caption}
        </span>
      )}
    </div>
  );
}
