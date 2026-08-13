import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * GlassCard — Semi-transparent surface with subtle gradient border + optional hover lift.
 * Inspired by 21st.dev's "Glass Shine Card" (id 7717).
 *
 * The 1px gradient border is rendered via a `::before` pseudo-element with masked
 * padding so the gradient hugs the rounded corners crisply.
 */

export type GlassCardVariant = 'default' | 'elevated' | 'subtle';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual emphasis. `elevated` adds shadow + stronger border; `subtle` is flat. */
  variant?: GlassCardVariant;
  /** Show the gold-rose-sky gradient border on top of the regular border. */
  gradientBorder?: boolean;
  /** Lift the card on hover (Y -4px, gold glow). Use for interactive cards. */
  interactive?: boolean;
  /** Apply entrance animation (fade + slide). */
  delay?: number;
  /** Render as a different element (e.g. `Link`). Receives all forwarded props. */
  as?: keyof React.JSX.IntrinsicElements;
}

const variantClasses: Record<GlassCardVariant, string> = {
  default: 'bg-[var(--surface-1)] border border-[var(--border-default)]',
  elevated: 'bg-[var(--surface-2)] border border-[var(--border-default)] shadow-[var(--shadow-card)]',
  subtle: 'bg-[var(--surface-1)] border border-[var(--border-subtle)]',
};

export default function GlassCard({
  variant = 'default',
  gradientBorder = false,
  interactive = false,
  delay = 0,
  as: Component = 'div',
  className = '',
  children,
  ...rest
}: GlassCardProps) {
  const reduceMotion = useReducedMotion();

  const baseClasses = `relative rounded-2xl backdrop-blur-md ${variantClasses[variant]}`;
  const interactiveClasses = interactive
    ? 'motion-card cursor-pointer hover:border-[var(--border-strong)]'
    : '';
  const gradientClasses = gradientBorder ? 'gradient-border' : '';

  // When `as` is something other than 'div', we don't get framer-motion's animation,
  // but the static version still works. For our use cases (Link, button), we keep
  // it simple and let parent components handle transitions.
  if (Component !== 'div' || reduceMotion) {
    const Comp = Component as React.ElementType;
    return (
      <Comp className={`${baseClasses} ${interactiveClasses} ${gradientClasses} ${className}`} {...rest}>
        {children}
      </Comp>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`${baseClasses} ${interactiveClasses} ${gradientClasses} ${className}`}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
