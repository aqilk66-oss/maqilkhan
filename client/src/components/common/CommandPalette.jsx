import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import { PERSONAL_INFO } from '../../constants';
import {
  Search,
  Home,
  User,
  FolderGit2,
  Wrench,
  GraduationCap,
  Briefcase,
  FileDown,
  Mail,
  Github,
  Linkedin,
  Sun,
  Moon,
  ExternalLink,
  ArrowRight,
  Sparkles,
  X,
} from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { projects = [], activeCv } = usePortfolio();
  const { isDark, toggleTheme } = useTheme();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Global keyboard shortcuts (Ctrl/Cmd + K & Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or toggle
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Base navigation and action items
  const baseCommands = [
    {
      id: 'nav-home',
      group: 'Navigation',
      label: 'Go to Home',
      keywords: 'home landing main hero',
      icon: Home,
      action: () => {
        navigate('/');
        onClose();
      },
    },
    {
      id: 'nav-about',
      group: 'Navigation',
      label: 'About Muhammad Aqil Khan',
      keywords: 'about biography background story trajectory',
      icon: User,
      action: () => {
        navigate('/about');
        onClose();
      },
    },
    {
      id: 'nav-projects',
      group: 'Navigation',
      label: 'Browse All Projects',
      keywords: 'projects portfolio work applications case studies',
      icon: FolderGit2,
      action: () => {
        navigate('/projects');
        onClose();
      },
    },
    {
      id: 'nav-skills',
      group: 'Navigation',
      label: 'Technical Skills & Competencies',
      keywords: 'skills tech stack react node express mongodb javascript',
      icon: Wrench,
      action: () => {
        navigate('/skills');
        onClose();
      },
    },
    {
      id: 'nav-experience',
      group: 'Navigation',
      label: 'Professional Journey & Milestones',
      keywords: 'experience trajectory career history timeline',
      icon: Briefcase,
      action: () => {
        navigate('/experience');
        onClose();
      },
    },
    {
      id: 'nav-education',
      group: 'Navigation',
      label: 'Education & Qualifications',
      keywords: 'education degree bs cs university college academics',
      icon: GraduationCap,
      action: () => {
        navigate('/education');
        onClose();
      },
    },
    {
      id: 'nav-contact',
      group: 'Navigation',
      label: 'Contact & Inquiries',
      keywords: 'contact message email hire collaboration reach out',
      icon: Mail,
      action: () => {
        navigate('/contact');
        onClose();
      },
    },
    {
      id: 'action-theme',
      group: 'Actions',
      label: isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      keywords: 'theme mode light dark toggle switch color',
      icon: isDark ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'action-resume',
      group: 'Actions',
      label: 'Download Resume (CV)',
      keywords: 'cv resume pdf download qualifications profile',
      icon: FileDown,
      action: () => {
        const url = activeCv?.fileUrl || '/Muhammad_Aqil_Khan_CV.pdf';
        window.open(url, '_blank');
        onClose();
      },
    },
    {
      id: 'social-github',
      group: 'Social & Code',
      label: 'Open GitHub Profile',
      keywords: 'github code repo repository oss open source',
      icon: Github,
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
    {
      id: 'social-linkedin',
      group: 'Social & Code',
      label: 'Connect on LinkedIn',
      keywords: 'linkedin network connection profile recruit',
      icon: Linkedin,
      action: () => {
        window.open(PERSONAL_INFO.linkedin, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
  ];

  // Dynamic published projects commands
  const projectCommands = projects
    .filter((p) => p.published)
    .map((p) => ({
      id: `project-${p.slug}`,
      group: 'Projects & Case Studies',
      label: p.title,
      description: p.summary || p.category,
      keywords: `project ${p.title} ${p.category} ${p.technologies?.join(' ') || ''}`,
      icon: FolderGit2,
      action: () => {
        navigate(`/projects/${p.slug}`);
        onClose();
      },
    }));

  const allCommands = [...baseCommands, ...projectCommands];

  // Filter commands by query
  const filteredCommands = allCommands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(q) ||
      cmd.group.toLowerCase().includes(q) ||
      cmd.keywords.toLowerCase().includes(q) ||
      cmd.description?.toLowerCase().includes(q)
    );
  });

  // Handle arrow key navigation and Enter selection
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-navy-950/80 backdrop-blur-sm transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-navy-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-200 text-slate-200"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-electric-cyan shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search projects... (e.g. 'resume', 'skills')"
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List View */}
        <div
          ref={resultsRef}
          className="max-h-[60vh] overflow-y-auto py-2 px-2 divide-y divide-slate-800/40"
        >
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-electric-cyan/15 text-white border border-electric-cyan/30'
                      : 'text-slate-300 hover:bg-navy-850 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg shrink-0 ${
                        isSelected ? 'bg-electric-cyan text-navy-950 font-bold' : 'bg-navy-950 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-semibold truncate">{cmd.label}</p>
                      {cmd.description && (
                        <p className="text-xs text-slate-400 truncate font-mono">{cmd.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-navy-950 text-slate-500 border border-slate-800">
                      {cmd.group}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-electric-cyan" />}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-400 text-sm">
              <p>No matching commands or projects found for "{query}".</p>
              <p className="text-xs text-slate-500 mt-1">Try searching "home", "resume", or a project name.</p>
            </div>
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2.5 bg-navy-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-navy-900 border border-slate-700 text-slate-300">↑</kbd>{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-navy-900 border border-slate-700 text-slate-300">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-navy-900 border border-slate-700 text-slate-300">↵</kbd> to select
            </span>
          </div>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-navy-900 border border-slate-700 text-slate-300">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
