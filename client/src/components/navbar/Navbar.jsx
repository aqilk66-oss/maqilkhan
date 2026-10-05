import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS, PERSONAL_INFO } from '../../constants';
import { Container } from '../common';
import ThemeSwitcher from '../common/ThemeSwitcher';
import CommandPalette from '../common/CommandPalette';
import MobileMenu from './MobileMenu';
import { Menu, FileDown, ArrowUpRight, Search, Command } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-subtle py-3.5'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Brand Mark */}
          <NavLink
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-electric-cyan rounded-lg p-1"
            aria-label="Muhammad Aqil Khan - Home"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-electric-cyan to-electric-blue flex items-center justify-center text-navy-950 font-display font-extrabold text-sm shadow-glow-cyan group-hover:scale-105 transition-transform duration-300">
              AK
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-electric-cyan transition-colors">
                AQIL KHAN
              </span>
              <span className="block text-[10px] font-mono text-slate-400">
                Full-Stack Dev
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-navy-900/60 border border-slate-800/60 rounded-full px-4 py-1.5 backdrop-blur-md">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 relative ${
                  isActive
                    ? 'text-white bg-slate-800/80 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              Home
            </NavLink>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 relative ${
                    isActive
                      ? 'text-electric-cyan bg-electric-cyan/10 border border-electric-cyan/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Group */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Command Palette Trigger */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              type="button"
              aria-label="Open Command Palette (Ctrl+K)"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 text-xs font-mono transition-all"
            >
              <Search className="w-3.5 h-3.5 text-electric-cyan" />
              <span className="hidden md:inline">Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-navy-950 border border-slate-700 text-[10px] text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle Button */}
            <ThemeSwitcher />

            <NavLink
              to="/resume"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-950 bg-gradient-to-r from-electric-cyan to-electric-blue px-3.5 py-2 rounded-lg shadow-glow-cyan hover:brightness-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-electric-cyan"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </NavLink>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub"
              className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-electric-cyan px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Right Controls Group */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              type="button"
              aria-label="Search or Open Command Palette"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Search className="w-4 h-4 text-electric-cyan" />
            </button>
            <ThemeSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-electric-cyan transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </Container>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Command Palette Overlay */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </>
  );
};

export default Navbar;
