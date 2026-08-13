import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Compass, Code2, Trophy, Sparkles, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import IconBadge from '../ui/IconBadge';

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

const STEPS: Step[] = [
  {
    number: '01',
    icon: Compass,
    title: 'Choose your trail',
    description: 'Pick from Python, Java, C++, Web Dev, SQL, Aptitude, or Engineering. Each path has progressive milestones.',
    accent: 'from-[#f59e0b] to-[#d97706]',
  },
  {
    number: '02',
    icon: Code2,
    title: 'Practice & earn XP',
    description: 'Solve daily problems in the polyglot terminal. Complete quizzes, clear milestones, and keep your streak alive.',
    accent: 'from-[#38bdf8] to-[#0284c7]',
  },
  {
    number: '03',
    icon: Trophy,
    title: 'Rank up & compete',
    description: 'Climb from New Pathfinder to Grandmaster. Battle peers on the weekly leaderboard and showcase your rank.',
    accent: 'from-[#e11d48] to-[#be123c]',
  },
];

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="scroll-anchor py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <IconBadge tone="gold" size="md" className="mx-auto">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            How It Works
          </IconBadge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Three steps to mastery
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-tertiary)]">
            No fluff. Pick a path, practice daily, climb the ranks.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-16 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-[#f59e0b]/40 via-[#38bdf8]/40 to-[#e11d48]/40"
            aria-hidden="true"
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center text-center gap-4"
              >
                {/* Numbered icon */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.accent} p-0.5 shadow-lg`}>
                    <div className="w-full h-full rounded-[14px] bg-[#0a0f0e] flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--surface-2)] border border-[var(--border-default)] flex items-center justify-center text-[10px] font-bold font-mono text-[#f59e0b]">
                    {step.number}
                  </span>
                </div>

                <div className="space-y-2 max-w-xs">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">{step.description}</p>
                </div>

                {i < STEPS.length - 1 && (
                  <ArrowRight
                    className="md:hidden w-5 h-5 text-[var(--text-muted)] mt-1"
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
