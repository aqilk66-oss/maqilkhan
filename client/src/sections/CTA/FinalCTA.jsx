import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '../../components/common';
import MagneticButton from '../../components/common/MagneticButton';
import { gsap } from '../../animations/gsap/gsapConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { PERSONAL_PHOTOS } from '../../data/skillsData';
import { ArrowRight, Sparkles, Send, FileDown } from 'lucide-react';

export const FinalCTA = () => {
  const ctaRef = useRef(null);
  const contentRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ctaRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={ctaRef}
      aria-label="Call to Action"
      className="py-24 md:py-36 bg-navy-950 relative overflow-hidden text-center"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-electric-cyan/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-electric-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-navy-900 via-navy-850 to-navy-950 border border-slate-800 p-8 sm:p-14 shadow-elevated relative overflow-hidden"
        >
          {/* Subtle top border illumination */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-electric-cyan/60 to-transparent" />

          {/* Personal Identity Badge with Image 4 */}
          <div className="inline-flex items-center gap-3.5 px-4 py-2 rounded-full bg-navy-950/80 border border-slate-800 mb-6 shadow-inner">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-electric-cyan/40 bg-navy-900 shrink-0">
              <img
                src={PERSONAL_PHOTOS.contact.src}
                alt={PERSONAL_PHOTOS.contact.alt}
                width="72"
                height="72"
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-left pr-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-electric-cyan block font-semibold leading-none">
                Direct Collaboration
              </span>
              <span className="text-xs text-slate-300 font-medium leading-none mt-1 inline-block">
                Muhammad Aqil Khan • MERN Developer
              </span>
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Ready to Engineer High-Impact <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-electric-cyan via-electric-blue to-cyan-200 bg-clip-text text-transparent">
              Web Systems Together?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you are building a full-stack MERN application, expanding an engineering team, 
            or seeking modern API solutions, my line is open for discussion.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton strength={0.3}>
              <NavLink
                to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-electric-cyan to-electric-blue text-navy-950 font-bold text-sm shadow-glow-cyan hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                <span>Start a Conversation</span>
              </NavLink>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <NavLink
                to="/resume"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-navy-950 border border-slate-700/80 text-white font-semibold text-sm hover:border-electric-cyan/40 hover:bg-navy-900 transition-all duration-200"
              >
                <FileDown className="w-4 h-4" />
                <span>Inspect Resume</span>
              </NavLink>
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FinalCTA;
