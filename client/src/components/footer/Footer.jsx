import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '../common';
import SocialLinks from '../common/SocialLinks';
import { PERSONAL_INFO, NAV_LINKS } from '../../constants';
import { FileDown, ArrowUpRight, Terminal } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-navy-950 py-16 text-slate-400 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800/60">
          
          {/* Col 1: Brand & Professional Title (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <NavLink to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-electric-cyan to-electric-blue flex items-center justify-center font-display font-extrabold text-navy-950 text-sm shadow-glow-cyan">
                AK
              </div>
              <span className="font-display font-bold text-lg text-white group-hover:text-electric-cyan transition-colors">
                MUHAMMAD AQIL KHAN
              </span>
            </NavLink>

            <p className="text-xs font-mono text-electric-cyan font-medium">
              {PERSONAL_INFO.primaryRole}
            </p>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Engineering scalable full-stack web applications, modern APIs, and responsive interfaces with the MERN stack.
            </p>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold block mb-2">
              Navigation
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="hover:text-electric-cyan transition-colors">
                  Home
                </NavLink>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className="hover:text-electric-cyan transition-colors">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Actions & Resume (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold block mb-2">
              Curriculum Vitae & Channels
            </span>

            <NavLink
              to="/resume"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric-cyan to-electric-blue text-navy-950 font-bold text-xs shadow-glow-cyan hover:brightness-110 transition-all"
            >
              <FileDown className="w-4 h-4" />
              <span>Inspect & Download Resume</span>
            </NavLink>

            <div className="pt-2">
              <SocialLinks iconSize="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Muhammad Aqil Khan. All rights reserved.</p>
          <p>Charsadda, Pakistan • Built with React, Vite, Node.js, Express & MongoDB</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
