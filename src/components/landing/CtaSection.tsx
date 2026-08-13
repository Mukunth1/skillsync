import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import IconBadge from '../ui/IconBadge';

export default function CtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="cta" className="scroll-anchor py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate overflow-hidden rounded-3xl border border-[var(--border-strong)] p-8 sm:p-12 lg:p-16 text-center"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.22), transparent 55%), linear-gradient(135deg, rgba(15,23,21,0.98), rgba(10,15,14,0.95))',
            boxShadow: '0 0 60px rgba(245,158,11,0.15), 0 24px 64px rgba(0,0,0,0.4)',
          }}
        >
          <div className="hero-orb hero-orb--gold absolute -right-20 -top-24 -z-10 opacity-40" aria-hidden="true" />
          <div className="hero-orb hero-orb--blue absolute -bottom-28 -left-16 -z-10 opacity-30" aria-hidden="true" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <IconBadge tone="gold" size="md" className="mx-auto">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Free forever · No credit card
            </IconBadge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] text-balance">
              Start your learning journey{' '}
              <span className="text-gradient-gold">today.</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-tertiary)] max-w-lg mx-auto">
              Create a free account, pick your first skill trail, and earn XP within minutes.
              Join 12,500+ learners already climbing the ranks.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-bold text-sm shadow-[0_0_28px_rgba(245,158,11,0.4)] hover:brightness-110 active:scale-[0.97] transition"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[var(--surface-1)] text-[var(--text-primary)] font-semibold text-sm border border-[var(--border-default)] hover:bg-[var(--surface-2)] transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
