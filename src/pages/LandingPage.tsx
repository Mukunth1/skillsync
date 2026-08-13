import React from 'react';
import Hero from '../components/landing/Hero';
import StatsBar from '../components/landing/StatsBar';
import Features from '../components/landing/Features';
import SkillPaths from '../components/landing/SkillPaths';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';
import CtaSection from '../components/landing/CtaSection';
import LandingFooter from '../components/landing/LandingFooter';

/**
 * LandingPage — 21st.dev-style public marketing page for Skill Sync.
 * Composes all landing sections. Rendered at "/" without the product Navbar.
 */
export default function LandingPage() {
  return (
    <div className="relative">
      <Hero />
      <StatsBar />
      <Features />
      <SkillPaths />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
