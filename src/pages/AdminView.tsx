import React, { useEffect, useState } from 'react';
import { Shield, Users, BookOpen, Plus, Trash2, Award, Zap, Flame, UserCheck, Database, Activity, Edit3 } from 'lucide-react';
import RippleButton from '../components/RippleButton';
import { useToast } from '../contexts/ToastContext';
import GlassCard from '../components/ui/GlassCard';
import StatTile from '../components/ui/StatTile';
import IconBadge from '../components/ui/IconBadge';
import Switch from '../components/ui/Switch';
import EmptyState from '../components/ui/EmptyState';
import { adminApi, pathsApi } from '../lib/apiClient';
import type { AdminStudent, LearningPath } from '../types/api';

interface StudentAccount {
  id: number;
  name: string;
  email: string;
  xp: number;
  streak: number;
  rank: string;
  status: 'active' | 'suspended';
}

const statusTone = {
  active: 'emerald',
  suspended: 'rose',
} as const;

function avatarColor(seed: string) {
  const palette = ['#f59e0b', '#38bdf8', '#10b981', '#8b5cf6', '#e11d48', '#fbbf24'];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}

export default function AdminView() {
  const { addToast } = useToast();

  const [studentAccounts, setStudentAccounts] = useState<StudentAccount[]>([]);
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [contestMode, setContestMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [users, allPaths] = await Promise.all([adminApi.users(), pathsApi.list()]);
        if (cancelled) return;
        setStudentAccounts(users as StudentAccount[]);
        setPaths(allPaths);
      } catch (err) {
        if (cancelled) return;
        addToast('Failed to load admin data: ' + (err instanceof Error ? err.message : 'unknown'), 'error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [addToast]);

  const handleGrantBonusXp = async (id: number, email: string) => {
    try {
      await adminApi.grantXp(id, 250);
      addToast(`Granted +250 Bonus XP to ${email}`, 'success');
      const refreshed = await adminApi.users();
      setStudentAccounts(refreshed as StudentAccount[]);
    } catch (err) {
      addToast('Grant failed: ' + (err instanceof Error ? err.message : 'unknown'), 'error');
    }
  };

  const handleResetStudentProgress = async (id: number, email: string) => {
    try {
      await adminApi.reset(id);
      addToast(`Reset learner progress for ${email}`, 'info');
      const refreshed = await adminApi.users();
      setStudentAccounts(refreshed as StudentAccount[]);
    } catch (err) {
      addToast('Reset failed: ' + (err instanceof Error ? err.message : 'unknown'), 'error');
    }
  };

  const handleAddPath = async () => {
    const title = 'New Multi-Discipline Path';
    const description = 'Admin-created learning path';
    try {
      await pathsApi.create({ title, description });
      addToast('New Learning Path Created by Admin Overseer', 'success');
      const refreshed = await pathsApi.list();
      setPaths(refreshed);
    } catch (err) {
      addToast('Create failed: ' + (err instanceof Error ? err.message : 'unknown'), 'error');
    }
  };

  const handleDeletePath = async (id: number, title: string) => {
    try {
      await pathsApi.delete(id);
      addToast(`Removed track: ${title}`, 'info');
      setPaths((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      addToast('Delete failed: ' + (err instanceof Error ? err.message : 'unknown'), 'error');
    }
  };

  const totalXpGranted = studentAccounts.reduce((s, a) => s + a.xp, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">

      {/* Admin Header */}
      <GlassCard variant="elevated" className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#f59e0b]/15 flex items-center justify-center ring-1 ring-[#f59e0b]/30">
              <Shield className="w-7 h-7 text-[#f59e0b]" aria-hidden="true" />
            </div>
            <div>
              <IconBadge tone="gold" size="sm" className="mb-1.5">
                <Zap className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" aria-hidden="true" />
                System Overseer
              </IconBadge>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                System Admin &amp; Student Management
              </h1>
              <p className="text-sm text-[var(--text-tertiary)]">
                Monitor student progress, grant XP, create curriculum tracks, and manage system status.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)]">
              <Flame className={`w-4 h-4 ${contestMode ? 'text-[#10b981]' : 'text-[var(--text-tertiary)]'}`} aria-hidden="true" />
              <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Contest Mode</span>
              <Switch
                checked={contestMode}
                onChange={(next) => {
                  setContestMode(next);
                  addToast(next ? 'Live Contest Mode Enabled' : 'Live Contest Mode Disabled', 'info');
                }}
                accent="emerald"
                size="sm"
                ariaLabel="Toggle live contest mode"
              />
            </div>
            <RippleButton onClick={handleAddPath} variant="gold" className="text-xs font-bold" icon={Plus}>
              Create Track
            </RippleButton>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatTile value={studentAccounts.length} label="Registered Students" icon={Users} accent="sky" compact />
          <StatTile value={paths.length} label="Curriculum Tracks" icon={BookOpen} accent="violet" compact />
          <StatTile value={totalXpGranted} label="Total XP Granted" icon={Award} accent="gold" compact />
          <StatTile value={contestMode ? 'ACTIVE' : 'IDLE'} label="System Status" icon={Activity} accent={contestMode ? 'emerald' : 'rose'} formatNumber={false} compact />
        </div>
      </GlassCard>

      {/* Student Accounts Management Table */}
      <GlassCard variant="elevated" className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#38bdf8]" aria-hidden="true" />
            Registered Student Accounts
            <span className="text-[var(--text-tertiary)] font-mono text-xs">({studentAccounts.length})</span>
          </h3>
          <IconBadge tone="emerald" size="sm">
            <Activity className="w-3 h-3" aria-hidden="true" />
            System Operational
          </IconBadge>
        </div>

        {loading ? (
          <div className="text-xs text-[var(--text-tertiary)] font-mono">Loading student accounts…</div>
        ) : studentAccounts.length === 0 ? (
          <EmptyState
            icon={Database}
            title="No student accounts loaded"
            body="Once students sign up and create accounts, they will appear here for management."
            accent="sky"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[var(--text-tertiary)] font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-2">Student</th>
                  <th className="py-3 px-2">Email</th>
                  <th className="py-3 px-2">Rank</th>
                  <th className="py-3 px-2 text-right">Streak</th>
                  <th className="py-3 px-2 text-right">Total XP</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-secondary)]">
                {studentAccounts.map((s) => {
                  const initial = s.name?.charAt(0)?.toUpperCase() ?? '?';
                  return (
                    <tr key={s.id} className="hover:bg-[var(--surface-1)] transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full bg-[var(--surface-2)] flex items-center justify-center font-bold text-sm"
                            style={{ color: avatarColor(s.email) }}
                            aria-hidden="true"
                          >
                            {initial}
                          </div>
                          <span className="font-semibold text-[var(--text-primary)]">{s.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-[var(--text-tertiary)]">{s.email}</td>
                      <td className="py-3 px-2 text-[#7dd3fc] font-semibold">{s.rank}</td>
                      <td className="py-3 px-2 text-right text-[#f59e0b] font-bold tabular-nums">{s.streak}d</td>
                      <td className="py-3 px-2 text-right text-[#10b981] font-extrabold tabular-nums">{s.xp.toLocaleString()} XP</td>
                      <td className="py-3 px-2">
                        <IconBadge tone={statusTone[s.status]} size="sm">
                          {s.status === 'active' ? <UserCheck className="w-3 h-3" aria-hidden="true" /> : null}
                          {s.status}
                        </IconBadge>
                      </td>
                      <td className="py-3 px-2 text-right space-x-1.5">
                        <button
                          onClick={() => handleGrantBonusXp(s.id, s.email)}
                          aria-label={`Grant 250 XP to ${s.name}`}
                          className="px-2.5 py-1.5 rounded-lg bg-[#f59e0b]/15 hover:bg-[#f59e0b] text-[#fbbf24] hover:text-black font-bold text-[10px] uppercase tracking-wider transition-colors border border-[#f59e0b]/30"
                        >
                          +250 XP
                        </button>
                        <button
                          onClick={() => handleResetStudentProgress(s.id, s.email)}
                          aria-label={`Reset progress for ${s.name}`}
                          className="px-2.5 py-1.5 rounded-lg bg-[#e11d48]/15 hover:bg-[#e11d48] text-[#fda4af] hover:text-white font-bold text-[10px] uppercase tracking-wider transition-colors border border-[#e11d48]/30"
                        >
                          Reset
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>

      {/* Curriculum Tracks Admin Grid */}
      <GlassCard variant="elevated" className="p-6 space-y-4">
        <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#f59e0b]" aria-hidden="true" />
          Curriculum Tracks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paths.map((p) => (
            <div
              key={p.id}
              className="group bg-[var(--surface-1)] border border-[var(--border-default)] p-5 rounded-2xl space-y-3 motion-card hover:border-[var(--border-strong)]"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug">{p.title}</h4>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    aria-label={`Edit ${p.title}`}
                    className="p-1.5 rounded-lg bg-white/5 text-[var(--text-tertiary)] hover:text-white hover:bg-white/10 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button
                    aria-label={`Delete ${p.title}`}
                    onClick={() => handleDeletePath(p.id, p.title)}
                    className="p-1.5 rounded-lg bg-[#e11d48]/10 text-[#fda4af] hover:bg-[#e11d48] hover:text-white transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] pt-2 border-t border-[var(--border-subtle)]">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#7dd3fc]" aria-hidden="true" />
                  <span className="font-mono tabular-nums">{p.students}</span> Enrolled
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#f59e0b]" aria-hidden="true" />
                  <span className="font-mono tabular-nums">{p.milestones}</span> Milestones
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
