import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * GlowCard — Hero/featured variant with breathing gold border animation.
 * Inspired by 21st.dev's "Glowing Card" (id 5328).
 *
 * Use for: welcome panels, problem-of-the-day, leaderboard podium top, login card.
 */

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Glow color: gold (default), sky, or rose. */
  accent?: 'gold' | 'sky' | 'rose';
  /** Disable the breathing animation but keep the glow shadow. */
  staticGlow?: boolean;
}

const accentMap = {
  gold: { from: '#f59e0b', to: '#e11d48', shadow: '0 0 32px rgba(245, 158, 11, 0.28)' },
  sky: { from: '#38bdf8', to: '#6366f1', shadow: '0 0 32px rgba(56, 189, 248, 0.28)' },
  rose: { from: '#e11d48', to: '#f59e0b', shadow: '0 0 32px rgba(225, 29, 72, 0.28)' },
} as const;

export default function GlowCard({
  accent = 'gold',
  staticGlow = false,
  className = '',
  children,
  ...rest
}: GlowCardProps) {
  const reduceMotion = useReducedMotion();
  const tone = accentMap[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl bg-[var(--surface-2)] border border-[var(--border-default)] backdrop-blur-md overflow-hidden ${className}`}
      style={{ boxShadow: tone.shadow }}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {/* Animated gradient border */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl ${staticGlow || reduceMotion ? '' : 'animate-breathingGlow'}`}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-60"
          style={{
            background: `linear-gradient(135deg, ${tone.from}40, transparent 40%, transparent 60%, ${tone.to}40)`,
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
