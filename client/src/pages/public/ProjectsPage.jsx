import React, { useState } from 'react';
import { Container } from '../../components/common';
import SEO from '../../components/common/SEO';
import ProjectCard from '../../components/cards/ProjectCard';
import { VERIFIED_PROJECTS, PROJECT_CATEGORIES } from '../../data/projectsData';
import { usePortfolio } from '../../context/PortfolioContext';

export const ProjectsPage = () => {
  const { projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Use dynamic projects if available, otherwise fallback
  const sourceProjects = projects && projects.length > 0 ? projects : VERIFIED_PROJECTS;

  // Filter only published projects and sort by backend priority order
  const publishedProjects = sourceProjects
    .filter((p) => p.published)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Apply category filter if not "All"
  const displayedProjects =
    selectedCategory === 'All'
      ? publishedProjects
      : publishedProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-16 md:py-24 bg-navy-950 min-h-screen">
      <SEO
        title="Projects & Production Case Studies | Muhammad Aqil Khan"
        description="Explore production web applications and full-stack software built by Muhammad Aqil Khan, including Atmosfera, NexCart, and MERN platform architectures."
        canonicalUrl="https://aqilkhan.dev/projects"
      />
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-electric-cyan bg-electric-cyan/10 px-3.5 py-1 rounded-full mb-3.5 border border-electric-cyan/20">
            Portfolio Index
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            Selected Work & Production Systems.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            A comprehensive index of web applications, interfaces, and full-stack solutions 
            engineered with the MERN stack, vanilla web technologies, and modern architectures.
          </p>
        </div>

        {/* Category Filter Controls */}
        <div
          role="tablist"
          aria-label="Filter Projects by Category"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-electric-cyan ${
                  isActive
                    ? 'bg-electric-cyan text-navy-950 font-bold shadow-glow-cyan'
                    : 'bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Listing */}
        {displayedProjects.length > 0 ? (
          <div className="space-y-12">
            {displayedProjects.map((project, idx) => (
              <ProjectCard
                key={project._id || project.id || project.slug}
                project={project}
                index={idx}
                isReversed={idx % 2 === 1}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-navy-900/50 border border-slate-800 text-slate-400">
            <p>No published projects found for this category.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProjectsPage;
