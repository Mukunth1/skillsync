import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { Users, Zap, Target, BookOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { skills } from '../../data/skills';

interface Stat {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
  accent: string;
}

const STATS: Stat[] = [
  { icon: Users, value: 12500, suffix: '+', label: 'Active Learners', accent: 'text-[#38bdf8]' },
  { icon: Zap, value: 4.2, suffix: 'M', label: 'XP Earned', accent: 'text-[#f59e0b]' },
  { icon: Target, value: 89000, suffix: '+', label: 'Milestones Cleared', accent: 'text-[#10b981]' },
  { icon: BookOpen, value: skills.length, suffix: '', label: 'Skill Tracks', accent: 'text-[#e11d48]' },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const isFloat = !Number.isInteger(target);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      setValue(isFloat ? Math.round(current * 10) / 10 : Math.round(current));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduceMotion]);

  return value;
}

function StatItem({ stat, index, active }: { stat: Stat; index: number; active: boolean }) {
  const reduceMotion = useReducedMotion();
  const count = useCountUp(stat.value, active);
  const Icon = stat.icon;

  const display =
    stat.value >= 1000 && Number.isInteger(stat.value)
      ? count.toLocaleString()
      : String(count);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      animate={active ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center gap-2 px-4 py-2"
    >
      <div className={`w-10 h-10 rounded-xl bg-[var(--surface-1)] border border-[var(--border-default)] flex items-center justify-center ${stat.accent}`}>
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tabular-nums tracking-tight">
        {display}
        <span className={stat.accent}>{stat.suffix}</span>
      </div>
      <div className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-10 sm:py-14" ref={ref} aria-label="Platform statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-1)] backdrop-blur-md px-4 py-8 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
            {STATS.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} index={i} active={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
