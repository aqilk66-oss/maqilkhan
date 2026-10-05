import React, { useEffect, useRef } from 'react';
import { Container } from '../../components/common';
import { usePortfolio } from '../../context/PortfolioContext';
import { VERIFIED_PROFILE } from '../../data/skillsData';
import { animateAboutSection } from '../../animations/gsap/sectionAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { User, Code2, MapPin, GraduationCap, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';

export const AboutSection = () => {
  const { profile } = usePortfolio();
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const textRefs = useRef([]);
  const visualRef = useRef(null);
  const factsRefs = useRef([]);
  const prefersReduced = useReducedMotion();

  const activeProfile = profile || VERIFIED_PROFILE;

  useEffect(() => {
    if (prefersReduced) return;

    const anim = animateAboutSection(sectionRef.current, {
      labelRef: labelRef.current,
      headingRef: headingRef.current,
      textRefs: textRefs.current,
      visualRef: visualRef.current,
      factsRefs: factsRefs.current,
    });

    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, [prefersReduced]);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About Muhammad Aqil Khan"
      className="py-20 md:py-28 bg-navy-950 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-electric-cyan/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Visual Profile Presentation & Editorial Badge (5 Cols) */}
          <div ref={visualRef} className="lg:col-span-5 flex flex-col space-y-6">
            <div className="relative rounded-3xl bg-gradient-to-b from-navy-900 via-navy-850 to-navy-900 border border-slate-800 p-5 sm:p-7 shadow-elevated overflow-hidden group">
              {/* Corner decorative light beam */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-electric-cyan/10 rounded-full blur-2xl group-hover:bg-electric-cyan/20 transition-all duration-500 pointer-events-none" />

              {/* Developer Workspace Photograph (Image 1) */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/11] mb-6 bg-navy-950 border border-slate-800/80 shadow-md">
                <img
                  src={activeProfile.avatarUrl || '/images/personal/image-1-workspace.jpg'}
                  alt="Muhammad Aqil Khan coding full-stack applications at developer workspace"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Workspace & System Engineering</span>
                  </span>
                  <span className="text-electric-cyan">Charsadda, PK</span>
                </div>
              </div>

              <div className="space-y-1.5 mb-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                    {activeProfile.fullName}
                  </h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20">
                    B.S. CS 2022–2026
                  </span>
                </div>
                <p className="text-xs font-mono text-electric-cyan font-medium">
                  {activeProfile.primaryRole}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{activeProfile.location}</span>
                </div>
              </div>

              {/* Code Snippet Signature */}
              <div className="rounded-xl bg-navy-950/90 border border-slate-800/80 p-3.5 font-mono text-[11px] text-slate-300 space-y-1 overflow-x-auto">
                <div className="text-slate-500">// Engineering Profile</div>
                <div><span className="text-electric-blue">const</span> engineer = {'{'}</div>
                <div className="pl-4">name: <span className="text-emerald-400">"{activeProfile.fullName}"</span>,</div>
                <div className="pl-4">discipline: <span className="text-emerald-400">"MERN Stack"</span>,</div>
                <div className="pl-4">degree: <span className="text-emerald-400">"B.S. CS (2022–2026)"</span>,</div>
                <div className="pl-4">status: <span className="text-electric-cyan">"Ready for Impact"</span></div>
                <div>{'}'};</div>
              </div>
            </div>

            {/* Credibility Status Card */}
            <div className="p-4 rounded-2xl bg-navy-900/50 border border-slate-800/70 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-slate-300">
                Verified portfolio identity with direct CMS management architecture.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Trajectory & Quick Facts (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow Label */}
            <span
              ref={labelRef}
              className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3.5 py-1 rounded-full mb-4 border border-electric-cyan/20"
            >
              Engineering Trajectory
            </span>

            {/* Section Heading */}
            <h2
              ref={headingRef}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6"
            >
              Disciplined Full-Stack Engineering with a Focus on Modern Web Architecture.
            </h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-slate-300 text-base leading-relaxed mb-8">
              {VERIFIED_PROFILE.aboutTrajectory.map((para, idx) => (
                <p
                  key={idx}
                  ref={(el) => (textRefs.current[idx] = el)}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Quick Facts Grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
              {VERIFIED_PROFILE.quickFacts.map((fact, idx) => (
                <div
                  key={fact.label}
                  ref={(el) => (factsRefs.current[idx] = el)}
                  className="p-4 rounded-xl bg-navy-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
                    {fact.label}
                  </p>
                  <p className="text-sm font-bold text-white mb-0.5">
                    {fact.value}
                  </p>
                  <p className="text-[11px] font-mono text-electric-cyan">
                    {fact.sub}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
