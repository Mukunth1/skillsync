import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * AnimatedBar — Horizontal progress bar with gradient fill, label, and percent badge.
 * Inspired by 21st.dev's "Animated Progress Card" (id 7793) and "8-bit Game Progress" (id 13950).
 *
 * Use for: skill tracks on dashboard, level bars on path view, leaderboard XP bars.
 */

export interface AnimatedBarProps {
  label: string;
  /** 0–100 percent. */
  percent: number;
  /** Tailwind gradient class for the fill, e.g. "from-[#f59e0b] to-[#d97706]". */
  gradient?: string;
  /** Optional caption shown under the label (e.g. "12 of 20 levels"). */
  caption?: string;
  /** Right-side badge (typically XP earned or level number). */
  trailing?: React.ReactNode;
  /** Render bar at smaller height. Defaults to false (12px). */
  compact?: boolean;
  /** Animate fill width on mount. Defaults to true. */
  animate?: boolean;
}

export default function AnimatedBar({
  label,
  percent,
  gradient = 'from-[#f59e0b] to-[#d97706]',
  caption,
  trailing,
  compact = false,
  animate = true,
}: AnimatedBarProps) {
  const reduceMotion = useReducedMotion();
  const safe = Math.max(0, Math.min(100, percent));
  const [width, setWidth] = useState(reduceMotion || !animate ? safe : 0);

  useEffect(() => {
    if (!animate || reduceMotion) {
      setWidth(safe);
      return;
    }
    const t = setTimeout(() => setWidth(safe), 60);
    return () => clearTimeout(t);
  }, [safe, animate, reduceMotion]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm font-medium">
        <span className="text-[var(--text-primary)] truncate">{label}</span>
        <span className="inline-flex items-center gap-2 shrink-0">
          {trailing}
          <span className="text-[#f59e0b] font-bold tabular-nums">{safe}%</span>
        </span>
      </div>

      {caption && (
        <div className="text-xs text-[var(--text-tertiary)]">{caption}</div>
      )}

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safe}
        aria-label={label}
        className={`relative w-full rounded-full overflow-hidden bg-white/[0.04] border border-[var(--border-subtle)] ${compact ? 'h-2' : 'h-3'}`}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} relative overflow-hidden`}
          initial={false}
          animate={{ width: `${width}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle shine sweep across the bar */}
          <div
            className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/30 to-transparent"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </div>
  );
}
