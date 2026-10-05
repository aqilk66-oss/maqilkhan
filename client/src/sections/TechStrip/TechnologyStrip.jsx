import React, { useRef, useEffect } from 'react';
import { Container } from '../../components/common';
import { SIGNATURE_TECH_STACK } from '../../data/skillsData';
import { animateTechStrip } from '../../animations/gsap/sectionAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Layers } from 'lucide-react';

export const TechnologyStrip = () => {
  const stripRef = useRef(null);
  const itemsRef = useRef([]);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const ctx = animateTechStrip(stripRef.current, itemsRef.current);
    return () => {
      if (ctx && ctx.kill) ctx.kill();
    };
  }, [prefersReduced]);

  return (
    <div
      ref={stripRef}
      aria-label="Core Technology Signature"
      className="w-full bg-navy-900/60 border-y border-slate-800/80 py-6 md:py-8 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Background subtle light accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-cyan/[0.03] to-transparent pointer-events-none" />

      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Label Indicator */}
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-slate-400 shrink-0">
            <Layers className="w-4 h-4 text-electric-cyan" />
            <span className="font-semibold text-slate-300">Signature Stack</span>
            <span className="hidden md:inline text-slate-600">•</span>
          </div>

          {/* Technology Badges Row / Horizontal Track */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {SIGNATURE_TECH_STACK.map((tech, idx) => (
              <div
                key={tech.name}
                ref={(el) => (itemsRef.current[idx] = el)}
                className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-navy-950/80 border border-slate-800 hover:border-electric-cyan/40 hover:bg-navy-850 transition-all duration-200 cursor-default"
              >
                {/* Status Dot indicator */}
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-electric-cyan transition-colors" />

                <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {tech.name}
                </span>

                <span className="text-[10px] font-mono text-slate-500 group-hover:text-electric-cyan/80 transition-colors">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TechnologyStrip;
