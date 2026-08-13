import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Flame, Trophy, Zap, Crown, Medal } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import IconBadge from './ui/IconBadge';
import EmptyState from './ui/EmptyState';
import type { LeaderboardEntry } from '../types/api';

interface LeaderboardUser {
  rank: number;
  name: string;
  email: string;
  xp: number;
  streak: number;
  badge: string;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  currentUserEmail?: string;
  currentUserXp?: number;
  currentUserStreak?: number;
  /** When provided, replaces the synthesized single-row table. */
  entries?: LeaderboardEntry[];
}

function avatarColor(seed: string) {
  const palette = ['#f59e0b', '#38bdf8', '#10b981', '#8b5cf6', '#e11d48', '#fbbf24'];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}

function getInitial(name: string) {
  return (name?.trim()?.[0] ?? '?').toUpperCase();
}

function podiumPalette(rank: number) {
  if (rank === 1) return { ring: 'ring-[#f59e0b]', text: 'text-[#fbbf24]', bar: 'from-[#fbbf24] to-[#f59e0b]', icon: Crown, label: 'Gold' };
  if (rank === 2) return { ring: 'ring-[#cbd5e1]', text: 'text-[#e2e8f0]', bar: 'from-[#e2e8f0] to-[#94a3b8]', icon: Medal, label: 'Silver' };
  if (rank === 3) return { ring: 'ring-[#ea8a3c]', text: 'text-[#fdba74]', bar: 'from-[#fdba74] to-[#ea8a3c]', icon: Medal, label: 'Bronze' };
  return null;
}

export default function LeaderboardTable({
  currentUserEmail = '',
  currentUserXp = 0,
  currentUserStreak = 0,
  entries,
}: LeaderboardProps) {
  const reduceMotion = useReducedMotion();
  const cleanEmail = currentUserEmail.trim().toLowerCase();
  const fallback: LeaderboardUser[] = cleanEmail
    ? [{
      rank: 1,
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      xp: currentUserXp,
      streak: currentUserStreak,
      badge: currentUserXp >= 3000 ? 'Master' : currentUserXp >= 1000 ? 'Specialist' : 'New Pathfinder',
      isCurrentUser: true,
    }]
    : [];

  const fromApi: LeaderboardUser[] = (entries ?? []).map((e) => ({
    rank: e.rank,
    name: e.name,
    email: e.email,
    xp: e.xp,
    streak: e.streak,
    badge: e.badge,
    isCurrentUser: e.isCurrentUser,
  }));

  const ranked = (fromApi.length > 0 ? fromApi : fallback)
    .slice()
    .sort((a, b) => b.xp - a.xp)
    .map((user, i) => ({ ...user, rank: i + 1 }));
  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-[var(--text-primary)] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#f59e0b]" aria-hidden="true" />
            Global Learner Leaderboard
          </h3>
          <p className="text-xs text-[var(--text-tertiary)]">
            Ranks will populate as learners create accounts and complete challenges.
          </p>
        </div>
        <IconBadge tone="gold" size="md">
          <Zap className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" aria-hidden="true" />
          Live Ranks
        </IconBadge>
      </div>

      {ranked.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="No learners ranked yet"
          body="Create an account and complete a challenge to become the first learner on the board."
          accent="gold"
        />
      ) : (
        <>
          {/* Podium for top 3 — inspired by 21st.dev's "Leaderboard Podium" (id 13057) */}
          {top3.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {/* Order visually: 2nd, 1st, 3rd for proper podium look */}
              {[1, 0, 2].map((reorderIdx) => {
                const user = top3[reorderIdx];
                if (!user) return <div key={reorderIdx} aria-hidden="true" />;
                const tone = podiumPalette(user.rank);
                const TierIcon = tone?.icon ?? Trophy;
                const heightClasses = user.rank === 1 ? 'sm:h-44 h-36' : 'sm:h-32 h-28';
                return (
                  <motion.div
                    key={user.email}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: reorderIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex flex-col items-center justify-end ${user.rank === 1 ? 'order-2' : user.rank === 2 ? 'order-1' : 'order-3'}`}
                  >
                    {/* Avatar */}
                    <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-2 ${tone?.ring} bg-[var(--surface-2)] flex items-center justify-center font-bold text-lg ${tone?.text}`}>
                      <span style={{ color: avatarColor(user.email) }}>{getInitial(user.name)}</span>
                      {user.rank === 1 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#f59e0b] flex items-center justify-center shadow-lg">
                          <TierIcon className="w-3 h-3 text-black" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-[var(--text-primary)] truncate max-w-full">{user.name}</div>
                    <div className="text-[11px] text-[var(--text-tertiary)] tabular-nums">{user.xp.toLocaleString()} XP</div>

                    {/* Pedestal */}
                    <div className={`mt-3 w-full ${heightClasses} rounded-t-2xl bg-gradient-to-b ${tone?.bar} flex items-start justify-center pt-3 shadow-[0_8px_24px_rgba(0,0,0,0.32)]`}>
                      <span className="text-2xl sm:text-3xl font-extrabold text-black/80 tabular-nums">#{user.rank}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Remaining rows in a tidy list */}
          {rest.length > 0 && (
            <GlassCard variant="elevated" className="p-0 overflow-hidden">
              <ul role="list" className="divide-y divide-[var(--border-subtle)]">
                {rest.map((user, i) => (
                  <motion.li
                    key={user.email}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-1)] transition-colors"
                  >
                    <span className="w-8 text-sm font-bold text-[var(--text-tertiary)] tabular-nums">#{user.rank}</span>
                    <div
                      className="w-9 h-9 rounded-full bg-[var(--surface-2)] flex items-center justify-center font-bold text-sm"
                      style={{ color: avatarColor(user.email) }}
                    >
                      {getInitial(user.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[var(--text-primary)] truncate flex items-center gap-2">
                        {user.name}
                        {user.isCurrentUser && (
                          <span className="px-1.5 py-0.5 rounded bg-[#f59e0b] text-black text-[9px] font-bold">YOU</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[var(--text-tertiary)]">{user.badge}</div>
                    </div>
                    <div className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#f59e0b] tabular-nums">
                      <Flame className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" aria-hidden="true" />
                      {user.streak}d
                    </div>
                    <div className="text-sm font-extrabold text-[#10b981] tabular-nums">{user.xp.toLocaleString()} XP</div>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>
          )}
        </>
      )}
    </div>
  );
}
