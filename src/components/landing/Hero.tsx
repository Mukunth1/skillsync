import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Flame, Trophy, Code2 } from 'lucide-react';
import IconBadge from '../ui/IconBadge';
import ProgressRing from '../ProgressRing';
import AnimatedBar from '../ui/AnimatedBar';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const enter = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative isolate overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      {/* Background orbs */}
      <div className="hero-orb hero-orb--gold absolute -right-32 -top-20 -z-10" aria-hidden="true" />
      <div className="hero-orb hero-orb--blue absolute -bottom-40 left-[20%] -z-10" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy column */}
          <div className="space-y-6 text-center lg:text-left">
            <motion.div {...enter(0)}>
              <IconBadge tone="gold" size="md">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Adaptive Multi-Discipline Learning
              </IconBadge>
            </motion.div>

            <motion.h1
              {...enter(0.08)}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1] text-balance"
            >
              Master code, aptitude, and engineering —{' '}
              <span className="text-gradient-gold">one trail at a time.</span>
            </motion.h1>

            <motion.p
              {...enter(0.14)}
              className="text-base sm:text-lg text-[var(--text-tertiary)] max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Join thousands of learners building streaks, earning XP, and unlocking new ranks across
              Python, Java, C++, SQL, Web Dev, and engineering disciplines.
            </motion.p>

            <motion.div
              {...enter(0.2)}
              className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-bold text-sm shadow-[0_0_28px_rgba(245,158,11,0.35)] hover:brightness-110 active:scale-[0.97] transition"
              >
                Start Learning Free
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/skills"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[var(--surface-1)] text-[var(--text-primary)] font-semibold text-sm border border-[var(--border-default)] hover:bg-[var(--surface-2)] hover:border-[var(--border-strong)] transition"
              >
                <BookOpen className="w-4 h-4 text-[#f59e0b]" aria-hidden="true" />
                Explore Skill Paths
              </Link>
            </motion.div>

            {/* Social proof chips */}
            <motion.div
              {...enter(0.26)}
              className="flex flex-wrap items-center gap-3 justify-center lg:justify-start pt-2"
            >
              {['Python', 'Java', 'C++', 'SQL', 'React', 'Aptitude'].map((lang) => (
                <span
                  key={lang}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-[var(--surface-1)] border border-[var(--border-default)] text-[#7dd3fc]"
                >
                  {lang}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Product preview mock */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 32, scale: reduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="hero-panel relative isolate overflow-hidden rounded-3xl border border-[var(--border-default)] p-5 sm:p-6 shadow-2xl">
              <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true" />
              <div className="hero-scan absolute inset-x-0 top-0 -z-10 h-px" aria-hidden="true" />

              {/* Fake window chrome */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48]/80" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80" aria-hidden="true" />
                <span className="ml-2 text-[11px] font-mono text-[var(--text-muted)]">skillsync.app/dashboard</span>
              </div>

              {/* KPI row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="rounded-xl bg-[#0a0f0e]/70 border border-[var(--border-default)] p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">
                    <Flame className="w-3 h-3 text-[#e11d48]" aria-hidden="true" />
                    Streak
                  </div>
                  <div className="text-xl font-extrabold text-[var(--text-primary)] tabular-nums">12d</div>
                </div>
                <div className="rounded-xl bg-[#0a0f0e]/70 border border-[var(--border-default)] p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">
                    <Trophy className="w-3 h-3 text-[#f59e0b]" aria-hidden="true" />
                    Rank
                  </div>
                  <div className="text-sm font-extrabold text-[var(--text-primary)] leading-tight pt-0.5">Master</div>
                </div>
                <div className="rounded-xl bg-[#0a0f0e]/70 border border-[var(--border-default)] p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">
                    <Code2 className="w-3 h-3 text-[#38bdf8]" aria-hidden="true" />
                    XP
                  </div>
                  <div className="text-xl font-extrabold text-[var(--text-primary)] tabular-nums">2.4k</div>
                </div>
              </div>

              {/* Progress + code block */}
              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 items-center">
                <div className="flex justify-center">
                  <ProgressRing percent={68} size={100} strokeWidth={9} title="Mastery" gradientId="hero-ring" />
                </div>
                <div className="space-y-3">
                  <AnimatedBar
                    label="Python DSA"
                    percent={78}
                    gradient="from-[#38bdf8] to-[#0284c7]"
                    compact
                  />
                  <AnimatedBar
                    label="Java OOP"
                    percent={54}
                    gradient="from-[#e11d48] to-[#be123c]"
                    compact
                  />
                  <AnimatedBar
                    label="C++ STL"
                    percent={41}
                    gradient="from-[#10b981] to-[#059669]"
                    compact
                  />
                </div>
              </div>

              {/* Fake code snippet */}
              <div className="mt-5 rounded-xl bg-[#060b0a] border border-[var(--border-subtle)] p-3.5 font-mono text-[11px] leading-relaxed overflow-hidden">
                <div className="text-[var(--text-muted)]">
                  <span className="text-[#8b5cf6]">def</span>{' '}
                  <span className="text-[#38bdf8]">two_sum</span>
                  <span className="text-[var(--text-secondary)]">(nums, target):</span>
                </div>
                <div className="text-[var(--text-muted)] pl-4">
                  <span className="text-[#8b5cf6]">seen</span>
                  <span className="text-[var(--text-secondary)]"> = {'{}'}</span>
                </div>
                <div className="text-[var(--text-muted)] pl-4">
                  <span className="text-[#8b5cf6]">for</span>
                  <span className="text-[var(--text-secondary)]"> i, n </span>
                  <span className="text-[#8b5cf6]">in</span>
                  <span className="text-[var(--text-secondary)]"> enumerate(nums):</span>
                </div>
                <div className="text-[var(--text-muted)] pl-8">
                  <span className="text-[#10b981]"># +120 XP · streak preserved</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-3 -right-2 sm:right-4 animate-badgeFloat">
              <IconBadge tone="gold" size="md" filled>
                <Flame className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" aria-hidden="true" />
                12-day streak live
              </IconBadge>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
