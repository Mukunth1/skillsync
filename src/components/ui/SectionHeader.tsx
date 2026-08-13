import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import IconBadge from './IconBadge';

/**
 * SectionHeader — Consistent eyebrow pill + title + optional description + trailing slot.
 * Used at the top of every major page for visual consistency.
 */

export interface SectionHeaderProps {
  /** Eyebrow text shown in the small pill above the title. */
  eyebrow?: string;
  /** Page title. */
  title: React.ReactNode;
  /** Description text below the title. */
  description?: React.ReactNode;
  /** Trailing slot — typically a search bar, filter, or CTA. */
  trailing?: React.ReactNode;
  /** Override the eyebrow icon. Defaults to Sparkles. */
  eyebrowIcon?: LucideIcon;
  /** Use gold gradient on the title for emphasis. */
  highlightTitle?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  trailing,
  eyebrowIcon: EyebrowIcon = Sparkles,
  highlightTitle = false,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="space-y-2">
        {eyebrow && (
          <IconBadge tone="gold" size="md">
            <EyebrowIcon className="w-3.5 h-3.5" aria-hidden="true" />
            {eyebrow}
          </IconBadge>
        )}
        <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${highlightTitle ? 'text-gradient-gold' : 'text-[var(--text-primary)]'}`}>
          {title}
        </h1>
        {description && (
          <p className="text-sm text-[var(--text-tertiary)] max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}
