import React from 'react';
import { Container } from '../../components/common';
import SEO from '../../components/common/SEO';
import DevelopmentJourney from '../../sections/Credibility/DevelopmentJourney';

export const ExperiencePage = () => {
  return (
    <div className="py-16 md:py-24 bg-navy-950 min-h-screen">
      <SEO
        title="Professional Experience & Journey | Muhammad Aqil Khan"
        description="Chronological milestones and development trajectory of Muhammad Aqil Khan, MERN Stack Developer."
        canonicalUrl="https://aqilkhan.dev/experience"
      />
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl mb-8">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3.5 py-1 rounded-full mb-3.5 border border-electric-cyan/20">
            Professional Trajectory
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            Development Journey & Experience.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            A chronological timeline documenting academic milestones, MERN full-stack specialization, 
            and modern web software achievements.
          </p>
        </div>

        {/* Development Journey Component */}
        <DevelopmentJourney />
      </Container>
    </div>
  );
};

export default ExperiencePage;
