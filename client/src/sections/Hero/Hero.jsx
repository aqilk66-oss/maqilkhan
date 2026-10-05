import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '../../components/common';
import SocialLinks from '../../components/common/SocialLinks';
import MagneticButton from '../../components/common/MagneticButton';
import { PERSONAL_INFO } from '../../constants';
import { usePortfolio } from '../../context/PortfolioContext';
import { PERSONAL_PHOTOS } from '../../data/skillsData';
import { gsap } from '../../animations/gsap/gsapConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ArrowRight, ChevronDown, Sparkles, FolderGit2, Send, Terminal, Code2 } from 'lucide-react';

export const Hero = () => {
  const { profile } = usePortfolio();
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const socialsRef = useRef(null);
  const heroImageContainerRef = useRef(null);
  const heroImageRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const heroPhotoSrc = profile?.heroPhotoUrl || PERSONAL_PHOTOS.hero.src;
  const heroPhotoAlt = PERSONAL_PHOTOS.hero.alt;

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Primary Hero Image entrance (Image 2)
      tl.fromTo(
        heroImageContainerRef.current,
        { opacity: 0, scale: 0.94, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform,opacity' }
      );

      // Eyebrow tag
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'all' },
        '-=0.8'
      );

      // Title & Role
      tl.fromTo(
        [titleRef.current, roleRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', clearProps: 'all' },
        '-=0.4'
      );

      // Description
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'all' },
        '-=0.3'
      );

      // CTAs & Socials
      tl.fromTo(
        [ctaRef.current, socialsRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', clearProps: 'all' },
        '-=0.2'
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out', clearProps: 'all' },
        '-=0.1'
      );
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={heroRef}
      aria-label="Introduction"
      className="relative min-h-[calc(100svh-5rem)] flex items-center justify-center overflow-hidden py-12 lg:py-6"
    >
      {/* Background ambient lighting gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-electric-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Textual Hierarchy & Brand Positioning (7 Cols Desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Eyebrow */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-slate-800 text-xs font-mono mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">Available for Opportunities</span>
              <span className="text-slate-600">•</span>
              <span className="text-electric-cyan font-medium">B.S. CS 2022–2026</span>
            </div>

            {/* Principal Name Title */}
            <h1
              ref={titleRef}
              className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-3"
            >
              {profile?.fullName ? (
                profile.fullName
              ) : (
                <>
                  Muhammad <br className="hidden sm:block" />
                  <span className="text-slate-100">Aqil Khan</span>
                </>
              )}
            </h1>

            {/* Professional Role Positioning */}
            <div ref={roleRef} className="mb-6">
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-electric-cyan via-electric-blue to-cyan-200 bg-clip-text text-transparent">
                {profile?.primaryRole || 'MERN Stack Developer'}
              </span>
              <span className="text-slate-500 font-display text-xl sm:text-2xl font-normal ml-2">
                / {profile?.secondaryRole || 'Full-Stack Web Developer'}
              </span>
            </div>

            {/* Positioning Statement */}
            <p
              ref={descRef}
              className="max-w-xl text-base sm:text-lg text-slate-400 mb-8 leading-relaxed"
            >
              {profile?.bio ||
                'Architecting secure, high-performance web applications with Node.js, Express, MongoDB, and dynamic React interfaces. Focused on responsive engineering, clean REST APIs, and modern interaction design.'}
            </p>

            {/* Action Buttons Group */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto"
            >
              <MagneticButton strength={0.3}>
                <NavLink
                  to="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-electric-cyan to-electric-blue text-navy-950 font-bold text-sm shadow-glow-cyan hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-electric-cyan"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>View My Projects</span>
                </NavLink>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <NavLink
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-navy-900 border border-slate-700/80 text-white font-semibold text-sm hover:border-electric-cyan/50 hover:bg-navy-850 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <Send className="w-4 h-4" />
                  <span>Contact Me</span>
                </NavLink>
              </MagneticButton>
            </div>

            {/* Social Channels Strip */}
            <div ref={socialsRef} className="flex items-center gap-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                Connect:
              </span>
              <SocialLinks />
            </div>
          </div>

          {/* Right Column: Primary Hero Photograph (Image 2) Editorial Composition (5 Cols Desktop) */}
          <div
            ref={heroImageContainerRef}
            className="lg:col-span-5 w-full flex items-center justify-center relative select-none"
          >
            {/* Ambient decorative glow behind image */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-electric-cyan/20 via-electric-blue/15 to-transparent rounded-3xl blur-2xl opacity-70 pointer-events-none" />

            {/* Editorial Portrait Container with Layered Card Styling */}
            <div className="relative w-full max-w-[420px] lg:max-w-none rounded-3xl bg-navy-900/80 border border-slate-800/90 p-3 sm:p-4 shadow-elevated overflow-hidden group">
              {/* Internal Accent Header Line */}
              <div className="flex items-center justify-between px-3 py-2 mb-2 border-b border-slate-800/60 font-mono text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-slate-400 ml-1">aqil_khan.dev</span>
                </div>
                <div className="flex items-center gap-1.5 text-electric-cyan">
                  <Code2 className="w-3.5 h-3.5" />
                  <span className="text-[10px]">MERN_STACK</span>
                </div>
              </div>

              {/* The Actual Uploaded Image 2 with Authentic Aspect Ratio */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3.1] bg-navy-950 border border-slate-800/80 shadow-inner">
                <img
                  ref={heroImageRef}
                  src={heroPhotoSrc}
                  alt={heroPhotoAlt}
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-full object-cover object-top sm:object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />

                {/* Subtle soft gradient scrim along bottom edge for text protection */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Floating Technical Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-navy-950/80 backdrop-blur-md border border-slate-700/60 shadow-lg pointer-events-none">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-medium text-slate-200">
                      Muhammad Aqil Khan
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-electric-cyan px-2 py-0.5 rounded bg-electric-cyan/10 border border-electric-cyan/20">
                    Full-Stack Dev
                  </span>
                </div>
              </div>

              {/* Subtle Bottom Metadata */}
              <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
                  <span>Charsadda, Pakistan</span>
                </span>
                <span className="text-slate-400">B.S. CS 2022–2026</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Subtle Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-slate-500 hover:text-electric-cyan transition-colors pointer-events-none"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">SCROLL</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
