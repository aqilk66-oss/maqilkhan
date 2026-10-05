import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Code2,
  Briefcase,
  GraduationCap,
  FileText,
  Image,
  Mail,
  Settings,
  LogOut,
  ShieldCheck,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

const iconMap = {
  Dashboard: LayoutDashboard,
  Profile: User,
  Projects: FolderGit2,
  Skills: Code2,
  Experience: Briefcase,
  Education: GraduationCap,
  'Resume / CV': FileText,
  'Media Library': Image,
  Messages: Mail,
  Settings: Settings,
};

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Profile', path: '/admin/profile' },
  { label: 'Projects', path: '/admin/projects' },
  { label: 'Skills', path: '/admin/skills' },
  { label: 'Experience', path: '/admin/experience' },
  { label: 'Education', path: '/admin/education' },
  { label: 'Resume / CV', path: '/admin/cv' },
  { label: 'Media Library', path: '/admin/media' },
  { label: 'Messages', path: '/admin/messages' },
  { label: 'Settings', path: '/admin/settings' },
];

export const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // Find page title from path
  const currentNav = navItems.find((item) => item.path === location.pathname) || {
    label: 'Admin Control Panel',
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden h-16 bg-navy-900 border-b border-slate-800 px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-electric-cyan/20 border border-electric-cyan/40 flex items-center justify-center text-electric-cyan">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm text-white">Portfolio CMS</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar (Desktop and Mobile Drawer) */}
      <aside
        className={`${
          mobileMenuOpen ? 'block fixed inset-0 z-50 bg-navy-950' : 'hidden'
        } md:flex md:static w-full md:w-64 bg-navy-900 border-r border-slate-800/80 flex-col shrink-0`}
      >
        <div className="h-16 hidden md:flex items-center gap-2.5 px-6 border-b border-slate-800">
          <div className="w-8 h-8 rounded bg-electric-cyan/20 border border-electric-cyan/40 flex items-center justify-center text-electric-cyan shadow-glow-cyan">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm text-white">Portfolio CMS</span>
            <span className="block text-[10px] font-mono text-emerald-400">super_admin</span>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="p-4 flex items-center justify-between border-b border-slate-800 md:hidden">
            <span className="text-xs font-mono text-slate-400 uppercase">Navigation</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = iconMap[item.label] || LayoutDashboard;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs font-mono text-slate-400 hover:text-electric-cyan transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-navy-900/60 backdrop-blur border-b border-slate-800 px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider hidden sm:inline">
              Module:
            </span>
            <h1 className="text-sm font-semibold text-white tracking-wide">{currentNav.label}</h1>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Authenticated:{' '}
            <span className="text-white font-medium">{admin?.email || 'aqilk4992@gmail.com'}</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
