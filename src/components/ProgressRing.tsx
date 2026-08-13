import React, { useState, useEffect, useId } from 'react';
import { useReducedMotion } from 'framer-motion';

interface ProgressRingProps {
  percent?: number;
  size?: number;
  strokeWidth?: number;
  title?: string;
  /** Optional gradient end color. Defaults to gold→rose. */
  toColor?: string;
  /** Optional gradient start color. */
  fromColor?: string;
  /** Stable ID for the gradient. Auto-generated if omitted. */
  gradientId?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ProgressRing({
  percent = 0,
  size = 120,
  strokeWidth = 10,
  title = '',
  fromColor = '#f59e0b',
  toColor = '#e11d48',
  gradientId,
}: ProgressRingProps) {
  const autoId = useId();
  const ringId = gradientId ?? `ring-${autoId}`;

  const rawPercent = isNaN(Number(percent)) ? 0 : Number(percent);
  const targetPercent = Math.max(0, Math.min(100, Math.round(rawPercent)));
  const reduceMotion = useReducedMotion();

  const [currentPercent, setCurrentPercent] = useState(reduceMotion ? targetPercent : 0);

  useEffect(() => {
    if (reduceMotion) {
      setCurrentPercent(targetPercent);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setCurrentPercent(Math.round(targetPercent * easeOutCubic(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetPercent, reduceMotion]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeCurrent = isNaN(currentPercent) ? 0 : currentPercent;
  const strokeDashoffset = circumference - (safeCurrent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative inline-flex items-center justify-center"
        style={{ width: size, height: size }}
        role="progressbar"
        aria-valuenow={safeCurrent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={title || 'Progress'}
      >
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
            stroke={`url(#${ringId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={isNaN(strokeDashoffset) ? 0 : strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
          <defs>
            <linearGradient id={ringId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={fromColor} />
              <stop offset="100%" stopColor={toColor} />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)] tabular-nums">
            {safeCurrent}%
          </span>
        </div>
      </div>
      {title && (
        <span className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
          {title}
        </span>
      )}
    </div>
  );
}
