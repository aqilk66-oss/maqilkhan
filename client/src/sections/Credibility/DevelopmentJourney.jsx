import React, { useEffect, useRef } from 'react';
import { Container } from '../../components/common';
import { VERIFIED_JOURNEY } from '../../data/credibilityData';
import { PERSONAL_PHOTOS } from '../../data/skillsData';
import { usePortfolio } from '../../context/PortfolioContext';
import { animateJourneyTimeline } from '../../animations/gsap/credibilityAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Compass, Calendar, Code, CheckCircle, Terminal, GraduationCap } from 'lucide-react';

export const DevelopmentJourney = () => {
  const { experience } = usePortfolio();
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const prefersReduced = useReducedMotion();

  // Map dynamic experience records if populated, otherwise use structured development journey milestones
  const timelineItems = experience && experience.length > 0
    ? experience.map((exp, idx) => ({
        id: exp._id || idx,
        period: `${exp.startDate} — ${exp.endDate || 'Present'}`,
        type: exp.type || 'Professional Milestone',
        title: exp.role,
        subtitle: exp.organization,
        description: exp.description,
        technologies: exp.technologies && exp.technologies.length > 0 ? exp.technologies : ['MERN Stack', 'REST APIs', 'React'],
      }))
    : VERIFIED_JOURNEY;

  useEffect(() => {
    if (prefersReduced) return;
    const anim = animateJourneyTimeline(containerRef.current, itemsRef.current);
    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, [prefersReduced]);

  return (
    <section
      id="journey"
      aria-label="Development Journey"
      className="py-20 md:py-28 bg-navy-950 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-electric-cyan/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <Container>
        {/* Section Header with Academic Profile Aside */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-8">
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3.5 py-1 rounded-full mb-3.5 border border-electric-cyan/20">
              Evolution & Direction
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Development Journey & Academic Evolution.
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              From formal computer science theory to modern full-stack web engineering, 
              connecting core algorithms with production MERN architectures.
            </p>
          </div>

          {/* Academic / Personal Milestone Badge with Image 3 */}
          <div className="lg:col-span-4">
            <div className="relative p-3.5 rounded-2xl bg-navy-900/80 border border-slate-800/90 shadow-elevated flex items-center gap-4 group">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-700/80 bg-navy-950">
                <img
                  src={PERSONAL_PHOTOS.journey.src}
                  alt={PERSONAL_PHOTOS.journey.alt}
                  width="180"
                  height="180"
                  loading="lazy"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-electric-cyan flex items-center gap-1.5 mb-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  B.S. CS Undergrad
                </span>
                <p className="text-sm font-semibold text-white truncate">Muhammad Aqil Khan</p>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                  Rigorous theoretical foundations bridging into high-throughput web applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Timeline Structure */}
        <div ref={containerRef} className="relative pl-6 sm:pl-10 space-y-12 max-w-4xl">
          {/* Vertical Connecting Track Line */}
          <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-electric-cyan via-electric-blue to-slate-800" />

          {timelineItems.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => (itemsRef.current[idx] = el)}
              className="relative group"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full bg-navy-950 border-2 border-electric-cyan flex items-center justify-center shadow-glow-cyan">
                <span className="w-2 h-2 rounded-full bg-electric-cyan group-hover:scale-125 transition-transform" />
              </div>

              {/* Timeline Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-navy-900/60 border border-slate-800/80 hover:border-slate-700/80 hover:bg-navy-900/80 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-electric-cyan px-2.5 py-1 rounded bg-electric-cyan/10 border border-electric-cyan/20">
                      {item.period}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    Milestone {idx + 1} of {timelineItems.length}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-electric-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-4">
                  {item.subtitle}
                </p>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-5">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-navy-950 border border-slate-800 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DevelopmentJourney;
