import React from 'react';
import type { LucideIcon } from 'lucide-react';

export type IconBadgeTone = 'gold' | 'sky' | 'emerald' | 'rose' | 'violet' | 'slate' | 'outline';

export interface IconBadgeProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  tone?: IconBadgeTone;
  filled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const toneMap: Record<IconBadgeTone, string> = {
  gold:    'bg-[#f59e0b]/12 text-[#fbbf24] border-[#f59e0b]/35',
  sky:     'bg-[#38bdf8]/12 text-[#7dd3fc] border-[#38bdf8]/35',
  emerald: 'bg-[#10b981]/12 text-[#6ee7b7] border-[#10b981]/35',
  rose:    'bg-[#e11d48]/12 text-[#fda4af] border-[#e11d48]/35',
  violet:  'bg-[#8b5cf6]/12 text-[#c4b5fd] border-[#8b5cf6]/35',
  slate:   'bg-white/[0.04] text-[var(--text-secondary)] border-[var(--border-default)]',
  outline: 'bg-transparent text-[var(--text-secondary)] border-[var(--border-default)]',
};

const sizeMap = {
  sm: 'px-2 py-0.5 text-[10px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
} as const;

const iconSizeMap = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
} as const;

export default function IconBadge({
  children,
  icon: Icon,
  tone = 'slate',
  filled = false,
  size = 'md',
  className = '',
}: IconBadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-semibold uppercase tracking-wider rounded-full border whitespace-nowrap ${toneMap[tone]} ${sizeMap[size]} ${className}`}
    >
      {Icon && (
        <Icon
          className={`${iconSizeMap[size]} ${filled ? 'fill-current' : ''}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
