import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Switch — Animated on/off toggle. Used for navbar noise toggle, admin contest mode.
 * Accessible: role="switch", aria-checked, keyboard support (Space toggles).
 */

export interface SwitchProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  /** Visual label for the active state ("On", "Active"). */
  onLabel?: string;
  offLabel?: string;
  /** Show text label next to the switch. */
  showLabels?: boolean;
  /** Accessible label for screen readers (overrides on/off labels). */
  ariaLabel?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  accent?: 'gold' | 'emerald' | 'sky';
}

const sizeMap = {
  sm: { track: 'w-9 h-5', thumb: 'w-4 h-4', translate: 16 },
  md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 20 },
} as const;

const accentMap = {
  gold:    'bg-[#f59e0b]',
  emerald: 'bg-[#10b981]',
  sky:     'bg-[#38bdf8]',
} as const;

export default function Switch({
  checked,
  onChange,
  onLabel = 'On',
  offLabel = 'Off',
  showLabels = false,
  ariaLabel,
  disabled = false,
  size = 'md',
  accent = 'gold',
}: SwitchProps) {
  const reduceMotion = useReducedMotion();
  const s = sizeMap[size];
  const handleClick = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel ?? `${checked ? onLabel : offLabel}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleClick();
        }
      }}
      disabled={disabled}
      className={`relative inline-flex items-center gap-2 rounded-full transition-colors duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`relative ${s.track} rounded-full transition-colors duration-200
        ${checked ? accentMap[accent] : 'bg-white/[0.08] border border-[var(--border-default)]'}`}
      >
        <motion.span
          className={`absolute top-1/2 -translate-y-1/2 left-0.5 ${s.thumb} rounded-full bg-white shadow-sm`}
          initial={false}
          animate={{ x: checked ? s.translate : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </span>
      {showLabels && (
        <span className="text-xs font-semibold text-[var(--text-secondary)] tabular-nums">
          {checked ? onLabel : offLabel}
        </span>
      )}
    </button>
  );
}
