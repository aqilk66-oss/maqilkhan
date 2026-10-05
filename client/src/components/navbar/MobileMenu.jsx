import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS, PERSONAL_INFO } from '../../constants';
import { gsap } from '../../animations/gsap/gsapConfig';
import { X, ArrowUpRight, FileDown, Github, Linkedin, Mail } from 'lucide-react';

export const MobileMenu = ({ isOpen, onClose, onOpenCommandPalette }) => {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll while open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Keydown escape to close
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // GSAP entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      tl.fromTo(
        panelRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' },
        '-=0.2'
      );

      tl.fromTo(
        linksRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power3.out' },
        '-=0.15'
      );
    });

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      ctx.revert();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex justify-end"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="w-full max-w-sm bg-navy-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-electric-cyan/20 border border-electric-cyan/40 flex items-center justify-center font-display font-bold text-electric-cyan text-sm">
              AK
            </div>
            <span className="font-display font-bold text-sm text-white">AQIL KHAN</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-electric-cyan transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="py-8 flex flex-col space-y-4">
          <NavLink
            to="/"
            onClick={onClose}
            ref={(el) => (linksRef.current[0] = el)}
            className={({ isActive }) =>
              `font-display text-2xl font-bold tracking-tight transition-colors ${
                isActive ? 'text-electric-cyan pl-2 border-l-2 border-electric-cyan' : 'text-slate-300 hover:text-white'
              }`
            }
          >
            Home
          </NavLink>
          {NAV_LINKS.map((link, idx) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              ref={(el) => (linksRef.current[idx + 1] = el)}
              className={({ isActive }) =>
                `font-display text-2xl font-bold tracking-tight transition-colors ${
                  isActive ? 'text-electric-cyan pl-2 border-l-2 border-electric-cyan' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions & Socials */}
        <div className="pt-6 border-t border-slate-800/80 space-y-3">
          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-navy-950 border border-slate-800 text-slate-200 hover:border-slate-700 text-sm font-mono"
            >
              <span>Quick Search / Commands</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-navy-900 border border-slate-700 text-electric-cyan">⌘K</span>
            </button>
          )}

          <NavLink
            to="/resume"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-electric-cyan to-electric-blue text-navy-950 font-semibold shadow-glow-cyan text-sm focus:outline-none focus:ring-2 focus:ring-electric-cyan"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Resume</span>
          </NavLink>

          <div className="flex items-center justify-around text-slate-400 pt-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub profile"
              className="p-2 hover:text-electric-cyan transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              className="p-2 hover:text-electric-cyan transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Send Email"
              className="p-2 hover:text-electric-cyan transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
