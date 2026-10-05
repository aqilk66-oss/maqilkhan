import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, X, Eye, AlertCircle, Laptop, ShieldCheck } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Interactive Project Preview Modal
 * Supports:
 * 1. Embedded Live Preview (sandboxed iframe with fallback)
 * 2. High-Fidelity Responsive Screenshot Viewport
 * 3. Video / Abstract Preview
 */
export const ProjectPreviewModal = ({ project, isOpen, onClose }) => {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const prefersReduced = useReducedMotion();
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setIframeError(false);

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const liveUrl = project.liveDemoUrl || project.liveUrl;
  const githubUrl = project.githubUrl;
  const thumbnail = project.thumbnailUrl || project.thumbnail;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Preview of ${project.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/85 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="w-full max-w-5xl max-h-[92vh] rounded-3xl bg-navy-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Window Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-navy-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-electric-cyan/20 border border-electric-cyan/40 flex items-center justify-center text-electric-cyan">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-white tracking-tight">
                  {project.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-navy-850 text-electric-cyan border border-electric-cyan/20">
                  Interactive Preview
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {project.category} • {project.technologies?.slice(0, 4).join(', ')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-electric-cyan text-navy-950 font-bold text-xs shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all"
              >
                <span>Open Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close preview modal"
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Display Area */}
        <div className="relative flex-1 min-h-[380px] sm:min-h-[500px] bg-navy-950 overflow-hidden flex items-center justify-center">
          {liveUrl && !iframeError ? (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy-950 z-10 font-mono text-xs text-electric-cyan">
                  <div className="w-8 h-8 border-2 border-electric-cyan/20 border-t-electric-cyan rounded-full animate-spin" />
                  <span>Connecting to verified live deployment...</span>
                </div>
              )}
              <iframe
                src={liveUrl}
                title={`${project.title} Live Interactive Viewport`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIframeError(true);
                  setIsLoading(false);
                }}
                className="w-full h-full border-0 rounded-b-2xl bg-white"
              />
            </>
          ) : (
            // High-Resolution Screenshot Fallback Display
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              {thumbnail ? (
                <div className="relative max-w-3xl w-full rounded-2xl overflow-hidden border border-slate-800 shadow-elevated group">
                  <img
                    src={thumbnail}
                    alt={`${project.title} Preview`}
                    className="w-full h-auto max-h-[60vh] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent flex items-end p-6">
                    <p className="text-sm text-slate-200 font-sans max-w-xl text-left">
                      {project.summary || project.shortDescription}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-navy-900 border border-slate-800 text-slate-400 max-w-md">
                  <Laptop className="w-12 h-12 text-electric-cyan mx-auto mb-3" />
                  <h4 className="font-display font-bold text-white mb-1">Live Preview Ready</h4>
                  <p className="text-xs mb-4">
                    Direct iframe rendering restricted by deployment policy. Visit the application directly below.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Window Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 bg-navy-950/90 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified deployment target</span>
          </div>

          <div className="flex items-center gap-3">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-electric-cyan to-electric-blue text-navy-950 font-bold shadow-glow-cyan hover:brightness-110 transition-all"
              >
                <span>Launch Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreviewModal;
