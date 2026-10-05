import React from 'react';
import { Container } from '../../components/common';
import SEO from '../../components/common/SEO';
import EducationSection from '../../sections/Credibility/EducationSection';

export const EducationPage = () => {
  return (
    <div className="py-16 md:py-24 bg-navy-950 min-h-screen">
      <SEO
        title="Education & Academic Qualifications | Muhammad Aqil Khan"
        description="Formal computer science education: B.S. Computer Science (2022–2026), GPGC Charsadda. Algorithms, database systems, and full-stack software development."
        canonicalUrl="https://aqilkhan.dev/education"
      />
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl mb-8">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3.5 py-1 rounded-full mb-3.5 border border-electric-cyan/20">
            Formal Qualifications
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            Education & Computer Science Foundation.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Academic achievements, core computing disciplines, and theoretical foundations 
            underpinning full-stack software development.
          </p>
        </div>

        {/* Education Section Component */}
        <EducationSection />
      </Container>
    </div>
  );
};

export default EducationPage;
