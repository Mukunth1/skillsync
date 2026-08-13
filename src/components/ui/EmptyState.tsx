import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';

/**
 * EmptyState — Reusable zero-data illustration + headline + body + optional CTA.
 * Used when leaderboard has no users, dashboard has no milestones, etc.
 */

export interface EmptyStateProps {
  /** Title — what the user is looking at. */
  title: string;
  /** Body — what to do next, framed as helpful guidance. */
  body?: string;
  /** Lucide icon. Defaults to Inbox. */
  icon?: LucideIcon;
  /** Optional CTA — usually a RippleButton or Link. */
  action?: React.ReactNode;
  /** Accent color for icon glow. */
  accent?: 'gold' | 'sky' | 'emerald';
}

const accentMap = {
  gold:    { text: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/12', ring: 'ring-[#f59e0b]/20' },
  sky:     { text: 'text-[#38bdf8]', bg: 'bg-[#38bdf8]/12', ring: 'ring-[#38bdf8]/20' },
  emerald: { text: 'text-[#10b981]', bg: 'bg-[#10b981]/12', ring: 'ring-[#10b981]/20' },
} as const;

export default function EmptyState({
  title,
  body,
  icon: Icon = Inbox,
  action,
  accent = 'gold',
}: EmptyStateProps) {
  const tone = accentMap[accent];
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-10 rounded-2xl border border-dashed border-[var(--border-default)] bg-[var(--surface-1)]">
      <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${tone.bg} ring-1 ${tone.ring} mb-4`}>
        <Icon className={`w-7 h-7 ${tone.text}`} aria-hidden="true" />
      </div>
      <h3 className="text-base font-bold text-[var(--text-primary)]">{title}</h3>
      {body && (
        <p className="mt-1.5 text-sm text-[var(--text-tertiary)] max-w-sm">{body}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
