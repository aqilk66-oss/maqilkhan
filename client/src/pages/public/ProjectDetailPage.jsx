import React, { useEffect, useRef, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { Container } from '../../components/common';
import SEO from '../../components/common/SEO';
import ProjectGallery from '../../components/cards/ProjectGallery';
import { VERIFIED_PROJECTS } from '../../data/projectsData';
import { usePortfolio } from '../../context/PortfolioContext';
import publicService from '../../services/publicService';
import { animateProjectDetail } from '../../animations/gsap/projectAnimations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ExternalLink, Github, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { projects } = usePortfolio();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const metaRef = useRef(null);
  const contentRef = useRef(null);
  const galleryRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Resolve project by slug from API with graceful fallback to cached context or VERIFIED_PROJECTS
  useEffect(() => {
    let isMounted = true;
    const loadProject = async () => {
      try {
        setLoading(true);
        // Try fetching single project directly from public API
        const res = await publicService.getProjectBySlug(slug);
        if (isMounted && res.data) {
          setProject(res.data);
          return;
        }
      } catch (err) {
        console.warn(`[PORTFOLIO] /projects/${slug} API resolution fallback:`, err.message);
      }

      // Fallback from portfolio context or static data
      const sourceList = projects && projects.length > 0 ? projects : VERIFIED_PROJECTS;
      const found = sourceList.find(
        (p) => p.slug?.toLowerCase() === slug?.toLowerCase() && p.published
      );
      if (isMounted) {
        setProject(found || null);
      }
    };

    loadProject().finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [slug, projects]);

  // Determine chronological next project for seamless traversal
  const sourceProjects = projects && projects.length > 0 ? projects : VERIFIED_PROJECTS;
  const publishedProjects = sourceProjects
    .filter((p) => p.published)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const currentIndex = publishedProjects.findIndex(
    (p) => p.slug?.toLowerCase() === slug?.toLowerCase()
  );
  const nextProject =
    currentIndex !== -1 && currentIndex < publishedProjects.length - 1
      ? publishedProjects[currentIndex + 1]
      : publishedProjects[0]; // Loops cleanly to first project

  useEffect(() => {
    window.scrollTo(0, 0);

    if (prefersReduced || !project) return;

    const anim = animateProjectDetail(containerRef.current, {
      heroRef: heroRef.current,
      metaRef: metaRef.current,
      contentRef: contentRef.current,
      galleryRef: galleryRef.current,
    });

    return () => {
      if (anim && anim.kill) anim.kill();
    };
  }, [slug, project, prefersReduced]);

  if (loading) {
    return (
      <div className="py-24 bg-navy-950 min-h-screen text-slate-100 flex items-center justify-center font-mono text-sm text-slate-400">
        <div className="w-8 h-8 border-2 border-electric-cyan/20 border-t-electric-cyan rounded-full animate-spin mr-3" />
        Loading project case study...
      </div>
    );
  }

  // Project Not Found State
  if (!project) {
    return (
      <div className="py-24 bg-navy-950 min-h-screen text-slate-100 flex items-center justify-center">
        <SEO
          title="Project Not Found | Muhammad Aqil Khan"
          description="The requested project case study could not be resolved or is not published."
          noIndex={true}
        />
        <Container className="text-center max-w-lg">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-3">Project Not Found</h1>
          <p className="text-slate-400 text-sm mb-8">
            The project case study requested ({slug}) could not be resolved or is currently unpublished.
          </p>
          <NavLink
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-cyan text-navy-950 font-bold text-sm shadow-glow-cyan"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Projects Index</span>
          </NavLink>
        </Container>
      </div>
    );
  }

  const liveLink = project.liveDemoUrl || project.liveUrl;
  const githubLink = project.githubUrl;
  const thumbnail = project.thumbnailUrl || project.thumbnail;
  const galleryImages =
    project.gallery && project.gallery.length > 0 ? project.gallery : thumbnail ? [thumbnail] : [];

  const projectStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description || project.shortDescription || project.summary,
    applicationCategory: project.category || 'WebApplication',
    operatingSystem: 'Web Browser',
    url: liveLink || `https://aqilkhan.dev/projects/${project.slug}`,
    author: {
      '@type': 'Person',
      name: 'Muhammad Aqil Khan',
    },
  };

  return (
    <article ref={containerRef} className="py-16 md:py-24 bg-navy-950 min-h-screen">
      <SEO
        title={`${project.title} — Case Study | Muhammad Aqil Khan`}
        description={project.summary || project.shortDescription || `Technical case study and architecture breakdown for ${project.title} by Muhammad Aqil Khan.`}
        canonicalUrl={`https://aqilkhan.dev/projects/${project.slug}`}
        ogImage={thumbnail}
        structuredData={projectStructuredData}
      />
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <NavLink
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-electric-cyan transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </NavLink>
        </div>

        {/* Case Study Hero Heading */}
        <div ref={heroRef} className="max-w-4xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/30">
              {project.category}
            </span>
            {project.order !== undefined && (
              <span className="text-xs font-mono text-slate-500">Order: #{project.order}</span>
            )}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed">
            {project.description || project.fullDescription || project.summary || project.shortDescription}
          </p>
        </div>

        {/* Action Buttons & Links Row */}
        {(liveLink || githubLink) && (
          <div className="flex flex-wrap items-center gap-4 mb-16 pb-8 border-b border-slate-800">
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live demo for ${project.title}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-electric-cyan text-navy-950 font-bold text-sm shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all"
              >
                <span>Live Demonstration</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View repository on GitHub`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy-900 border border-slate-700 text-white font-semibold text-sm hover:border-electric-cyan/50 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Inspect Source Code</span>
              </a>
            )}
          </div>
        )}

        {/* 2-Column Editorial Grid: Visual Gallery (Left 7 cols) & Deep Architecture (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Gallery Viewport */}
          <div ref={galleryRef} className="lg:col-span-7">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
              Interface Gallery & Visual Telemetry
            </h2>
            <ProjectGallery images={galleryImages} projectTitle={project.title} />
          </div>

          {/* Technical Specifications */}
          <div ref={contentRef} className="lg:col-span-5 space-y-8">
            {/* Metadata Summary Card */}
            <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-4">
              <h3 className="font-display font-bold text-lg text-white">Technical Specifications</h3>
              <div>
                <p className="text-xs font-mono uppercase text-slate-500 mb-2">Technologies Used</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies?.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-navy-950 border border-slate-800 text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture Notes / Problem / Solution conditional rendering */}
            {(project.architectureNotes || project.problem) && (
              <div className="p-6 rounded-2xl bg-navy-900/40 border border-slate-800 space-y-2">
                <h4 className="font-display font-semibold text-sm text-electric-cyan uppercase tracking-wider">
                  Architecture & Context
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.architectureNotes || project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-6 rounded-2xl bg-navy-900/40 border border-slate-800 space-y-2">
                <h4 className="font-display font-semibold text-sm text-emerald-400 uppercase tracking-wider">
                  Engineering Solution
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">{project.solution}</p>
              </div>
            )}

            {/* Core Features Checklist */}
            {project.features && project.features.length > 0 && (
              <div className="p-6 rounded-2xl bg-navy-900/60 border border-slate-800 space-y-3">
                <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">
                  Key Feature Deliverables
                </h4>
                <ul className="space-y-2.5">
                  {project.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-electric-cyan shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Next Project Footer Bar */}
        {nextProject && (
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1 block">
                Next Case Study
              </span>
              <h3 className="font-display text-2xl font-bold text-white">{nextProject.title}</h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {nextProject.category} • {nextProject.technologies?.slice(0, 3).join(', ')}
              </p>
            </div>

            <NavLink
              to={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-electric-cyan text-navy-950 font-bold text-sm shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all shrink-0"
            >
              <span>View Next Project</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        )}
      </Container>
    </article>
  );
};

export default ProjectDetailPage;
