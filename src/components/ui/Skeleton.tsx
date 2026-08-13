import React from 'react';

/**
 * Skeleton — Shimmer placeholder for loading content (leaderboard rows, cards).
 * Respects prefers-reduced-motion via the .animate-shimmer keyframe in index.css.
 */

export interface SkeletonProps {
  /** Tailwind class controlling width (e.g. "w-full", "w-32"). */
  widthClass?: string;
  /** Tailwind class controlling height (e.g. "h-4", "h-12"). */
  heightClass?: string;
  /** Tailwind radius class. */
  radiusClass?: string;
  className?: string;
  /** Accessible label for screen readers. */
  label?: string;
}

export default function Skeleton({
  widthClass = 'w-full',
  heightClass = 'h-4',
  radiusClass = 'rounded-md',
  className = '',
  label = 'Loading content',
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`animate-shimmer ${widthClass} ${heightClass} ${radiusClass} ${className}`}
    />
  );
}
