import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * StatTile — Animated KPI card with count-up number + label + icon + delta indicator.
 * Inspired by 21st.dev's "Glowing Card" (id 5328), "8-bit Stats Dashboard" (id 13218),
 * and "Animated Dashboard Card" (id 7324).
 */

export type StatTileAccent = 'gold' | 'sky' | 'emerald' | 'rose' | 'violet';

export interface StatTileProps {
  /** Big numeric value. Strings (e.g. "1,234") render with locale separators. */
  value: number | string;
  /** Label below the value. */
  label: string;
  /** Lucide icon shown top-left. */
  icon: LucideIcon;
  /** Optional secondary caption (e.g. "Last 7 days"). */
  caption?: string;
  /** Color accent for the icon glow and border on hover. */
  accent?: StatTileAccent;
  /** Delta indicator: positive shows green up arrow, negative red down, 0 neutral. */
  delta?: number;
  /** Format the value with thousand separators. Defaults to true for numbers. */
  formatNumber?: boolean;
  /** Animate the value count-up on mount. Defaults to true. */
  animate?: boolean;
  /** Compact mode uses smaller text + tighter padding. */
  compact?: boolean;
}

const accentClasses: Record<StatTileAccent, { text: string; bg: string; ring: string }> = {
  gold:    { text: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/15', ring: 'group-hover:ring-[#f59e0b]/40' },
  sky:     { text: 'text-[#38bdf8]', bg: 'bg-[#38bdf8]/15', ring: 'group-hover:ring-[#38bdf8]/40' },
  emerald: { text: 'text-[#10b981]', bg: 'bg-[#10b981]/15', ring: 'group-hover:ring-[#10b981]/40' },
  rose:    { text: 'text-[#e11d48]', bg: 'bg-[#e11d48]/15', ring: 'group-hover:ring-[#e11d48]/40' },
  violet:  { text: 'text-[#8b5cf6]', bg: 'bg-[#8b5cf6]/15', ring: 'group-hover:ring-[#8b5cf6]/40' },
};

function useCountUp(target: number, duration = 900) {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || target === 0) {
      setCurrent(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduceMotion]);

  return current;
}

export default function StatTile({
  value,
  label,
  icon: Icon,
  caption,
  accent = 'gold',
  delta,
  formatNumber = true,
  animate = true,
  compact = false,
}: StatTileProps) {
  const reduceMotion = useReducedMotion();
  const accentTone = accentClasses[accent];
  const isNumeric = typeof value === 'number';
  const numericValue = isNumeric ? (value as number) : Number(String(value).replace(/,/g, '')) || 0;

  // Always call the hook (Rules of Hooks) — fall back to target when not animating.
  const animatedValue = useCountUp(numericValue);
  const displayed = animate && isNumeric && !reduceMotion ? animatedValue : numericValue;

  const formatted = !isNumeric
    ? value
    : formatNumber
      ? displayed.toLocaleString()
      : String(displayed);

  // Resolve delta display components
  const hasDelta = typeof delta === 'number';
  const DeltaIcon = hasDelta ? (delta! > 0 ? TrendingUp : delta! < 0 ? TrendingDown : Minus) : null;
  const deltaColor = hasDelta
    ? (delta! > 0 ? 'text-[#10b981]' : delta! < 0 ? 'text-[#e11d48]' : 'text-[#94a3b8]')
    : '';

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl bg-[var(--surface-1)] border border-[var(--border-default)] backdrop-blur-md
        hover:border-[var(--border-strong)] transition-colors duration-200
        ring-1 ring-transparent ${accentTone.ring}
        ${compact ? 'p-3.5' : 'p-4 sm:p-5'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`flex items-center justify-center rounded-xl ${accentTone.bg} ${compact ? 'w-9 h-9' : 'w-11 h-11'}`}>
          <Icon className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} ${accentTone.text}`} aria-hidden="true" />
        </div>
        {DeltaIcon && hasDelta && (
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold tabular-nums ${deltaColor}`}>
            <DeltaIcon className="w-3 h-3" aria-hidden="true" />
            {delta! > 0 ? '+' : ''}{delta}
          </span>
        )}
      </div>

      <div className={`mt-3 ${compact ? 'text-2xl' : 'text-3xl'} font-extrabold tracking-tight text-[var(--text-primary)] tabular-nums`}>
        {formatted}
      </div>

      <div className={`mt-1 ${compact ? 'text-xs' : 'text-sm'} font-medium text-[var(--text-tertiary)]`}>
        {label}
      </div>

      {caption && (
        <div className="mt-1 text-[11px] text-[var(--text-muted)]">
          {caption}
        </div>
      )}
    </motion.div>
  );
}