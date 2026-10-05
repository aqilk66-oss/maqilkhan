import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, FolderGit2, Eye } from 'lucide-react';
import { animateProjectCard } from '../../animations/gsap/projectAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import ProjectPreviewModal from './ProjectPreviewModal';

export const ProjectCard = ({ project, index, isReversed = false }) => {
  const cardRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    const anim = animateProjectCard(cardRef.current);
    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, [prefersReduced]);

  const projectNumber = String(index + 1).padStart(2, '0');

  return (
    <article
      ref={cardRef}
      aria-label={`Project: ${project.title}`}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-3xl bg-navy-900/50 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 relative group overflow-hidden ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Background ambient corner beam */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-electric-cyan/[0.02] rounded-full blur-3xl pointer-events-none group-hover:bg-electric-cyan/[0.05] transition-colors" />

      {/* Visual / Screenshot Column (7 cols desktop) */}
      <div
        className={`lg:col-span-7 relative overflow-hidden rounded-2xl border border-slate-800 bg-navy-950 shadow-elevated ${
          isReversed ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <NavLink
          to={`/projects/${project.slug}`}
          className="block aspect-[16/10] overflow-hidden group/image relative cursor-pointer"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={project.thumbnailUrl || project.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
            }}
            className="w-full h-full object-cover object-center group-hover/image:scale-105 transition-transform duration-500 ease-out"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-60 group-hover/image:opacity-40 transition-opacity duration-300" />
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-navy-950/80 text-electric-cyan border border-slate-700 backdrop-blur-md">
              {project.category}
            </span>
          </div>
        </NavLink>
      </div>

      {/* Textual Narrative & Metadata Column (5 cols desktop) */}
      <div
        className={`lg:col-span-5 flex flex-col items-start ${
          isReversed ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        {/* Project Number / Category */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono font-bold text-electric-cyan tracking-wider">
            PROJECT {projectNumber}
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-mono text-slate-400">
            {project.category}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-electric-cyan transition-colors">
          <NavLink to={`/projects/${project.slug}`}>
            {project.title}
          </NavLink>
        </h3>

        {/* Short Description */}
        <p className="text-sm sm:text-base text-slate-300 mb-5 leading-relaxed">
          {project.summary || project.shortDescription}
        </p>

        {/* Key Features Highlights */}
        {project.features && project.features.length > 0 && (
          <ul className="space-y-1.5 mb-6 text-xs text-slate-400">
            {project.features.slice(0, 2).map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan mt-1.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technologies List */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-navy-950 border border-slate-800 text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Interactive Preview Trigger */}
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            aria-label={`Open interactive preview for ${project.title}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-navy-950 border border-slate-700/80 text-electric-cyan hover:border-electric-cyan hover:bg-electric-cyan/10 text-xs font-semibold transition-all duration-200"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          {(project.liveDemoUrl || project.liveUrl) && (
            <a
              href={project.liveDemoUrl || project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit live demo for ${project.title}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-electric-cyan text-navy-950 font-bold text-xs shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all duration-200"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Inspect source code for ${project.title} on GitHub`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-950 border border-slate-700 text-slate-200 hover:text-white hover:border-electric-cyan/40 text-xs font-semibold transition-all duration-200"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View Code</span>
            </a>
          )}

          <NavLink
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-electric-cyan px-2 py-2 transition-colors ml-auto sm:ml-0"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </div>

      {/* Interactive Project Preview Modal */}
      <ProjectPreviewModal
        project={project}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </article>
  );
};

export default ProjectCard;
