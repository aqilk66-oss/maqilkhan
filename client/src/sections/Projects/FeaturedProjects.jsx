import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '../../components/common';
import ProjectCard from '../../components/cards/ProjectCard';
import { VERIFIED_PROJECTS } from '../../data/projectsData';
import { usePortfolio } from '../../context/PortfolioContext';
import { animateProjectsHeader } from '../../animations/gsap/projectAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { FolderGit2, ArrowRight } from 'lucide-react';

export const FeaturedProjects = () => {
  const { projects } = usePortfolio();
  const headerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  // Use dynamic published & featured projects, falling back to VERIFIED_PROJECTS if database not yet populated
  const sourceProjects = projects && projects.length > 0 ? projects : VERIFIED_PROJECTS;
  const featuredProjects = sourceProjects
    .filter((p) => p.featured && p.published)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  useEffect(() => {
    if (prefersReduced) return;
    const anim = animateProjectsHeader(headerRef.current);
    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, [prefersReduced]);

  return (
    <section
      id="projects"
      aria-label="Featured Projects Showcase"
      className="py-20 md:py-32 bg-navy-950 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-electric-cyan/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <Container>
        {/* Editorial Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-20">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3.5 py-1 rounded-full mb-3.5 border border-electric-cyan/20">
            Selected Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Featured Projects & Production Systems.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Real-world applications showcasing modern full-stack architectures, interactive 
            frontend engineering, and modular database integrations.
          </p>
        </div>

        {/* Projects List with Alternating Compositions */}
        <div className="space-y-12 sm:space-y-16">
          {featuredProjects.map((project, idx) => (
            <ProjectCard
              key={project._id || project.id || project.slug || idx}
              project={project}
              index={idx}
              isReversed={idx % 2 === 1}
            />
          ))}
        </div>

        {/* Section Bottom CTA to All Projects */}
        <div className="mt-16 text-center">
          <NavLink
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-navy-900 border border-slate-700/80 text-white font-semibold text-sm hover:border-electric-cyan/50 hover:bg-navy-850 hover:text-electric-cyan transition-all duration-200 shadow-subtle group"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProjects;
