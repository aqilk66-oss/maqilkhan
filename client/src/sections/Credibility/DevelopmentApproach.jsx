import React, { useEffect, useRef } from 'react';
import { Container } from '../../components/common';
import { DEVELOPMENT_APPROACH } from '../../data/credibilityData';
import { animateApproachFlow } from '../../animations/gsap/credibilityAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ArrowRight, Workflow, CheckCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const DevelopmentApproach = () => {
  const flowRef = useRef(null);
  const stepsRef = useRef([]);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const anim = animateApproachFlow(flowRef.current, stepsRef.current);
    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, [prefersReduced]);

  return (
    <section
      id="approach"
      aria-label="Development Approach & Methodology"
      className="py-20 md:py-28 bg-navy-900/30 border-t border-slate-800/80 relative overflow-hidden"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3.5 py-1 rounded-full mb-3.5 border border-electric-cyan/20">
            Engineering Methodology
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Structured 6-Phase Development Approach.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            A disciplined engineering process ensuring technical clarity, architectural consistency, 
            and scalable outcomes across every project phase.
          </p>
        </div>

        {/* 6 Steps Progression Grid */}
        <div ref={flowRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {DEVELOPMENT_APPROACH.map((step, idx) => (
            <div
              key={step.step}
              ref={(el) => (stepsRef.current[idx] = el)}
              className="p-8 rounded-2xl bg-navy-950/80 border border-slate-800/80 hover:border-electric-cyan/30 transition-all duration-300 relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-display font-extrabold text-electric-cyan/80 group-hover:text-electric-cyan transition-colors">
                  {step.step}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-900 text-slate-400 border border-slate-800 uppercase">
                  {step.focus}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-1.5">
                {step.name}
              </h3>
              <p className="text-xs font-mono text-emerald-400 mb-3">
                {step.summary}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed">
                {step.details}
              </p>
            </div>
          ))}
        </div>

        {/* High-Impact Structural Transition Bridge leading to Contact */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-slate-800 text-center max-w-4xl mx-auto shadow-elevated">
          <span className="text-xs font-mono uppercase tracking-widest text-electric-cyan mb-2 block">
            Direct Communication & Collaboration
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
            Have an Engineering Challenge or Full-Stack Opportunity?
          </h3>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
            I am available for MERN stack engineering roles, full-stack software development, and technical collaboration.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-cyan to-electric-blue text-navy-950 font-bold text-sm shadow-glow-cyan hover:brightness-110 transition-all"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>

            <NavLink
              to="/resume"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-navy-950 border border-slate-700 text-white font-semibold text-sm hover:border-electric-cyan/40 transition-all"
            >
              <span>Inspect Resume</span>
            </NavLink>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DevelopmentApproach;
