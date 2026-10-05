import React, { useEffect, useRef } from 'react';
import { Container } from '../../components/common';
import { VERIFIED_CAPABILITIES } from '../../data/credibilityData';
import { animateCapabilitiesGrid } from '../../animations/gsap/credibilityAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Cpu, CheckCircle2, Layers, ArrowUpRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const CapabilitiesSection = () => {
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const anim = animateCapabilitiesGrid(gridRef.current, cardsRef.current);
    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, [prefersReduced]);

  return (
    <section
      id="services"
      aria-label="What I Build & Capabilities"
      className="py-20 md:py-28 bg-navy-950 border-t border-slate-800/80 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-electric-cyan/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3.5 py-1 rounded-full mb-3.5 border border-electric-cyan/20">
            What I Build
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Practical Capabilities & Engineering Deliverables.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Translating core computer science and MERN stack technologies into dependable, 
            accessible web software solutions.
          </p>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {VERIFIED_CAPABILITIES.map((cap, idx) => (
            <div
              key={cap.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="p-8 rounded-3xl bg-navy-900/50 border border-slate-800/80 hover:border-slate-700/80 hover:bg-navy-900/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Number / Title */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono font-bold text-electric-cyan">
                    {cap.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-navy-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-electric-cyan group-hover:border-electric-cyan/40 transition-colors">
                    <Cpu className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-1.5 group-hover:text-electric-cyan transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs font-mono text-electric-cyan/80 mb-4">
                  {cap.tagline}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {cap.description}
                </p>

                {/* Concrete Deliverables Checklist */}
                <ul className="space-y-2 mb-6 pt-4 border-t border-slate-800/80">
                  {cap.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Tag Group */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {cap.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-navy-950 border border-slate-800 text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CapabilitiesSection;
