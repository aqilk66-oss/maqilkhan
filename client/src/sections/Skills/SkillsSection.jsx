import React, { useState, useEffect, useRef } from 'react';
import { Container } from '../../components/common';
import { SKILL_CATEGORIES, VERIFIED_SKILLS } from '../../data/skillsData';
import { usePortfolio } from '../../context/PortfolioContext';
import { animateSkillsSection } from '../../animations/gsap/sectionAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { 
  Code2, 
  Server, 
  Database, 
  Wrench, 
  Cpu, 
  Sparkles, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const SkillsSection = () => {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const categoryNavRef = useRef(null);
  const cardsRef = useRef([]);
  const prefersReduced = useReducedMotion();

  // Normalize categories mapping
  const categoryMap = {
    'Frontend': ['Frontend', 'Frontend Development'],
    'Backend': ['Backend', 'Backend Development'],
    'Database': ['Database', 'Databases & Backend Services'],
    'Tools': ['Tools', 'Development Tools'],
    'Core Development': ['Core Development', 'Core Development Areas'],
  };

  // Derive available categories dynamically from API if present, or fallback
  const sourceSkills = skills && skills.length > 0 ? skills : VERIFIED_SKILLS;
  const categoriesList = ['Frontend', 'Backend', 'Database', 'Tools', 'Core Development'];

  // Category Icon Mapping
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend Development':
        return Code2;
      case 'Backend Development':
        return Server;
      case 'Databases & Backend Services':
        return Database;
      case 'Development Tools':
        return Wrench;
      case 'Core Development Areas':
        return Cpu;
      default:
        return Sparkles;
    }
  };

  // Filter skills by selected category
  const filteredSkills = sourceSkills.filter(
    (skill) =>
      skill.category === activeCategory ||
      (categoryMap[activeCategory] && categoryMap[activeCategory].includes(skill.category))
  );

  useEffect(() => {
    if (prefersReduced) return;

    const anim = animateSkillsSection(sectionRef.current, {
      headerRef: headerRef.current,
      categoryNavRef: categoryNavRef.current,
      cardsRef: cardsRef.current,
    });

    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, [prefersReduced]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-label="Technical Skills Matrix"
      className="py-20 md:py-28 bg-navy-900/40 border-t border-slate-800/80 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-electric-blue/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <Container>
        {/* Section Heading Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 md:mb-16">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3.5 py-1 rounded-full mb-3.5 border border-electric-cyan/20">
            Technical Competencies
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Structured Stack & Engineering Capabilities.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Categorized technical capabilities spanning client interfaces, server runtimes, 
            relational and document databases, and full-stack software integration.
          </p>
        </div>

        {/* Category Navigation */}
        <div
          ref={categoryNavRef}
          role="tablist"
          aria-label="Skill Categories"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar"
        >
          {categoriesList.map((category) => {
            const Icon = getCategoryIcon(category);
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-electric-cyan ${
                  isActive
                    ? 'bg-gradient-to-r from-electric-cyan to-electric-blue text-navy-950 shadow-glow-cyan font-bold scale-[1.02]'
                    : 'bg-navy-950/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-navy-850'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-navy-950' : 'text-electric-cyan'}`} />
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.name}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`p-5 sm:p-6 rounded-2xl bg-navy-950/80 border transition-all duration-300 hover:-translate-y-1 ${
                skill.isCapability
                  ? 'border-electric-cyan/30 hover:border-electric-cyan/60 bg-gradient-to-br from-navy-950 to-navy-900 shadow-sm'
                  : 'border-slate-800/80 hover:border-slate-700 hover:shadow-subtle'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-navy-900 border border-slate-800 flex items-center justify-center text-electric-cyan">
                    {skill.isCapability ? (
                      <Cpu className="w-4 h-4" />
                    ) : (
                      <Check className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                </div>

                {skill.isCore && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/30 uppercase">
                    Core
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {skill.description || skill.descriptor || 'Core competencies and architectural implementations.'}
              </p>
            </div>
          ))}
        </div>

        {/* Transition Bridge leading towards Projects */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1 block">
              Application In Practice
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
              Ready to examine these technologies applied in production?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore full-stack case studies including WeddingHub, RouteWise, and Atmosfera.
            </p>
          </div>

          <NavLink
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy-950 border border-electric-cyan/40 text-electric-cyan hover:bg-electric-cyan hover:text-navy-950 text-sm font-semibold transition-all duration-200 shrink-0 shadow-sm"
          >
            <span>Explore Featured Projects</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

      </Container>
    </section>
  );
};

export default SkillsSection;
