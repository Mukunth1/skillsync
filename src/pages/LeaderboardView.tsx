import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import LeaderboardTable from '../components/LeaderboardTable';
import GlassCard from '../components/ui/GlassCard';
import StatTile from '../components/ui/StatTile';
import IconBadge from '../components/ui/IconBadge';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { leaderboardApi } from '../lib/apiClient';
import type { LeaderboardEntry } from '../types/api';

type Range = 'weekly' | 'monthly' | 'all-time';

export default function LeaderboardView() {
  const { user, userStats } = useAuth();
  const { addToast } = useToast();
  const [range, setRange] = useState<Range>('all-time');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    leaderboardApi
      .get(range)
      .then((res) => {
        if (cancelled) return;
        setEntries(res.entries);
      })
      .catch((err) => {
        if (cancelled) return;
        addToast(
          'Failed to load leaderboard: ' + (err instanceof Error ? err.message : 'unknown'),
          'error',
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [range, addToast]);

  const ranges: { key: Range; label: string }[] = [
    { key: 'weekly', label: 'This Week' },
    { key: 'monthly', label: 'This Month' },
    { key: 'all-time', label: 'All Time' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Hero with rank chip + filter tabs */}
      <GlassCard variant="elevated" className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <IconBadge tone="gold" size="md">
              <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
              Global Rankings
            </IconBadge>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Leaderboard &amp; Rankings
            </h1>
            <p className="text-sm text-[var(--text-tertiary)] max-w-xl">
              Compete with top learners across software, aptitude, and engineering tracks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] p-1 flex">
              {ranges.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRange(r.key)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    range === r.key
                      ? 'bg-[#f59e0b] text-black shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                      : 'text-[var(--text-tertiary)] hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Personal rank tiles */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          <StatTile value={userStats?.rank ?? 'New Pathfinder'} label="Your Rank" icon={Trophy} accent="gold" compact />
          <StatTile value={userStats?.xp ?? 0} label="Total XP" icon={Trophy} accent="sky" compact />
          <StatTile value={userStats?.streak ?? 0} label="Day Streak" icon={Trophy} accent="emerald" compact />
          <StatTile value={userStats?.completedMilestones?.length ?? 0} label="Milestones Cleared" icon={Trophy} accent="violet" compact />
        </motion.div>
      </GlassCard>

      {/* Leaderboard */}
      {loading ? (
        <div className="text-xs text-[var(--text-tertiary)] font-mono">Loading leaderboard…</div>
      ) : (
        <LeaderboardTable
          currentUserEmail={user?.email}
          currentUserXp={userStats?.xp || 0}
          currentUserStreak={userStats?.streak ?? 0}
          entries={entries}
        />
      )}
    </div>
  );
}
