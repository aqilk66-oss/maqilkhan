import React, { useEffect, useRef } from 'react';
import { Container } from '../../components/common';
import { VERIFIED_EDUCATION } from '../../data/credibilityData';
import { usePortfolio } from '../../context/PortfolioContext';
import { animateEducationSection } from '../../animations/gsap/credibilityAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GraduationCap, Calendar, MapPin, BookOpen, CheckCircle2 } from 'lucide-react';

export const EducationSection = () => {
  const { education } = usePortfolio();
  const cardRef = useRef(null);
  const prefersReduced = useReducedMotion();

  // Use dynamic first education entry or fallback to VERIFIED_EDUCATION
  const dynamicEdu = education && education.length > 0 ? education[0] : null;
  const edu = dynamicEdu
    ? {
        degree: dynamicEdu.degree,
        institution: dynamicEdu.institution,
        location: dynamicEdu.location || 'Charsadda, Pakistan',
        startDate: dynamicEdu.startYear || '2022',
        endDate: dynamicEdu.endYear || '2026',
        status: dynamicEdu.gradeOrStatus || 'In Progress',
        description: 'Comprehensive computational foundation in software engineering principles, algorithms, distributed systems, and modern web application development.',
        coreAreas: dynamicEdu.highlights && dynamicEdu.highlights.length > 0
          ? dynamicEdu.highlights
          : VERIFIED_EDUCATION[0].coreAreas,
      }
    : VERIFIED_EDUCATION[0];

  useEffect(() => {
    if (prefersReduced) return;
    const anim = animateEducationSection(cardRef.current);
    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, [prefersReduced]);

  return (
    <section
      id="education"
      aria-label="Academic Education"
      className="py-20 md:py-28 bg-navy-900/40 border-t border-slate-800/80 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-electric-blue/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3.5 py-1 rounded-full mb-3.5 border border-electric-cyan/20">
            Academic Foundation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Formal Computer Science Education.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            A solid computational foundation anchoring practical full-stack web engineering, 
            data structures, and scalable software systems.
          </p>
        </div>

        {/* Education Editorial Card */}
        <div
          ref={cardRef}
          className="p-8 sm:p-10 rounded-3xl bg-navy-950/80 border border-slate-800/80 shadow-elevated relative overflow-hidden group"
        >
          {/* Subtle corner glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-electric-cyan/5 rounded-full blur-2xl group-hover:bg-electric-cyan/10 transition-colors pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Degree & Institutional Identity (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-electric-cyan/20 to-electric-blue/20 border border-electric-cyan/40 flex items-center justify-center text-electric-cyan shadow-glow-cyan">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-semibold text-emerald-400 block">
                    {edu.status}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {edu.degree}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                <span className="text-slate-300 font-semibold">{edu.institution}</span>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{edu.startDate} — {edu.endDate}</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{edu.location}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2">
                {edu.description}
              </p>
            </div>

            {/* Right Column: Key Academic Coursework & Disciplines (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4 text-electric-cyan" />
                <span>Core Academic Curriculum</span>
              </div>

              <ul className="space-y-2">
                {edu.coreAreas.map((area) => (
                  <li key={area} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EducationSection;
