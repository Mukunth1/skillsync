import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap, Trophy, Target, ArrowRight, BookOpen, CheckCircle2, ChevronRight, Award, Flame, Sparkles, Code2, Lock } from 'lucide-react';
import ProgressRing from '../components/ProgressRing';
import ActivityHeatmap from '../components/ActivityHeatmap';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from '../components/ui/GlassCard';
import GlowCard from '../components/ui/GlowCard';
import StatTile from '../components/ui/StatTile';
import AnimatedBar from '../components/ui/AnimatedBar';
import IconBadge from '../components/ui/IconBadge';
import EmptyState from '../components/ui/EmptyState';
import { getDailyTask } from '../data/tasks';

const skillsProgress = [
  { id: 1, name: 'Python 3.12 DSA', color: 'from-[#38bdf8] to-[#0284c7]' },
  { id: 2, name: 'Fullstack Vector Motion', color: 'from-[#f59e0b] to-[#d97706]' },
  { id: 3, name: 'Java Enterprise OOP', color: 'from-[#10b981] to-[#059669]' },
  { id: 4, name: 'C / C++ Pointers & STL', color: 'from-[#e11d48] to-[#be123c]' },
];

export default function Dashboard() {
  const { user, userStats } = useAuth();
  const reduceMotion = useReducedMotion();
  const dailyTask = useMemo(() => getDailyTask(), []);

  const xp = userStats?.xp || 0;
  const streak = userStats?.streak ?? 0;
  const rank = userStats?.rank || 'New Pathfinder';
  const completedCount = userStats?.completedMilestones?.length ?? 0;

  const enter = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.48, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Welcome Hero Banner */}
      <motion.section {...enter(0)}>
        <div className="hero-panel relative isolate overflow-hidden rounded-3xl border border-[var(--border-default)] p-8 shadow-2xl">
          <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
          <div className="hero-orb hero-orb--gold absolute -right-20 -top-24 -z-10" aria-hidden="true" />
          <div className="hero-orb hero-orb--blue absolute -bottom-28 left-[36%] -z-10" aria-hidden="true" />
          <div className="hero-scan absolute inset-x-0 top-0 -z-10 h-px" aria-hidden="true" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <IconBadge tone="gold" size="md">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Adaptive Multi-Discipline Dashboard
              </IconBadge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight text-balance">
                Welcome, <span className="text-gradient-gold">{user?.fullName || user?.email?.split('@')[0] || 'Learner'}</span>!
              </h1>
              <p className="text-sm text-[var(--text-tertiary)] max-w-xl">
                Start your learning journey by completing your first problem. Your progress, streak, and rank will appear here as you advance.
              </p>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="hero-metrics flex items-center gap-6 bg-[#0a0f0e]/80 p-4 rounded-2xl border border-[var(--border-default)] backdrop-blur-md"
            >
              <ProgressRing percent={Math.min(100, Math.round((xp / 4000) * 100))} size={110} title="Overall Mastery" />
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                  <Trophy className="w-4 h-4 text-[#f59e0b]" aria-hidden="true" /> Total XP: <span className="text-[var(--text-primary)] font-bold tabular-nums">{xp.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                  <Target className="w-4 h-4 text-[#38bdf8]" aria-hidden="true" /> Rank: <span className="text-[var(--text-primary)] font-bold">{rank}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* KPI Strip */}
      <motion.div {...enter(0.06)} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatTile value={xp} label="Total XP" icon={Zap} accent="gold" caption="Earned across all tracks" />
        <StatTile value={streak} label="Day Streak" icon={Flame} accent="rose" caption="Keep it burning" />
        <StatTile value={rank} label="Current Rank" icon={Trophy} accent="sky" formatNumber={false} caption={`Next: ${xp < 500 ? '500 XP' : xp < 1500 ? '1500 XP' : xp < 3000 ? '3000 XP' : '—'}`} />
        <StatTile value={completedCount} label="Milestones Cleared" icon={CheckCircle2} accent="emerald" caption="Across all disciplines" />
      </motion.div>

      {/* Activity Heatmap Grid */}
      <motion.div {...enter(0.08)}>
        <ActivityHeatmap />
      </motion.div>

      {/* Bento Grid: Problem of the Day + Active Disciplines */}
      <motion.div {...enter(0.14)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Daily Problem Card */}
        <GlowCard accent="gold" className="lg:col-span-1">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <IconBadge tone="rose" size="md" filled>
                <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                Problem of the Day
              </IconBadge>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                dailyTask.difficulty === 'Easy' ? 'bg-[#10b981]/15 text-[#6ee7b7] border-[#10b981]/35' :
                dailyTask.difficulty === 'Medium' ? 'bg-[#f59e0b]/15 text-[#fbbf24] border-[#f59e0b]/35' :
                'bg-[#e11d48]/15 text-[#fda4af] border-[#e11d48]/35'
              }`}>
                {dailyTask.difficulty}
              </span>
            </div>

            <h2 className="text-xl font-bold text-[var(--text-primary)]">{dailyTask.title}</h2>
            <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
              {dailyTask.instructions}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-[var(--text-tertiary)]">Languages:</span>
              {Object.entries(dailyTask.starter_code || {}).filter(([, code]) => code).slice(0, 4).map(([lang]) => (
                <span key={lang} className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-[var(--surface-1)] border border-[var(--border-default)] text-[#7dd3fc]">
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </span>
              ))}
            </div>

            <Link
              to="/tasks"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110 active:scale-[0.98] transition"
            >
              <Code2 className="w-4 h-4" aria-hidden="true" />
              Launch Polyglot Terminal
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </GlowCard>

        {/* Skill Tracks Progress */}
        <GlassCard variant="elevated" className="lg:col-span-2 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#f59e0b]" aria-hidden="true" />
              Active Disciplines
            </h3>
            <Link to="/skills" className="text-xs text-[#f59e0b] hover:underline flex items-center gap-1">
              Explore All Skills <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="space-y-5">
            {skillsProgress.map((skill) => (
              <AnimatedBar
                key={skill.id}
                label={skill.name}
                percent={0}
                gradient={skill.color}
                caption="Begin track to populate progress"
                trailing={
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">
                    <Lock className="w-3 h-3 inline-block mr-1" aria-hidden="true" />
                    Locked
                  </span>
                }
              />
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Recent Milestones */}
      <motion.section {...enter(0.2)}>
        <GlassCard variant="elevated" className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#f59e0b]" aria-hidden="true" />
            Recent Milestone Activity
          </h3>

          <EmptyState
            icon={Award}
            title="No milestones completed yet"
            body="Complete your first challenge to start building your activity history."
            accent="gold"
            action={
              <Link to="/skills" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110 transition">
                Browse Skill Tracks <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            }
          />
        </GlassCard>
      </motion.section>
    </div>
  );
}
