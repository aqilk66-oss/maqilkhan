import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import {
  FolderGit2,
  Code2,
  FileText,
  Mail,
  ArrowUpRight,
  RefreshCw,
  PlusCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const DashboardOverviewPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminService.getDashboardOverview();
      setData(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const counts = data?.counts || {
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    totalSkills: 0,
    totalExperiences: 0,
    totalEducation: 0,
    totalMedia: 0,
    unreadMessages: 0,
  };

  const statCards = [
    {
      title: 'Published Projects',
      value: counts.publishedProjects,
      subtext: `${counts.draftProjects} draft(s)`,
      icon: FolderGit2,
      link: '/admin/projects',
      color: 'text-cyan-400',
    },
    {
      title: 'Technical Skills',
      value: counts.totalSkills,
      subtext: 'Across 5 categories',
      icon: Code2,
      link: '/admin/skills',
      color: 'text-emerald-400',
    },
    {
      title: 'Active Resume',
      value: data?.activeCv ? data.activeCv.version : 'None',
      subtext: data?.activeCv ? data.activeCv.fileName : 'Upload CV',
      icon: FileText,
      link: '/admin/cv',
      color: 'text-indigo-400',
    },
    {
      title: 'Unread Inquiries',
      value: counts.unreadMessages,
      subtext: 'Recruiter & client messages',
      icon: Mail,
      link: '/admin/messages',
      color: counts.unreadMessages > 0 ? 'text-amber-400' : 'text-slate-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Portfolio CMS Overview</h2>
          <p className="text-sm text-slate-400">
            Real-time management summary for Muhammad Aqil Khan's personal portfolio.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOverview}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-navy-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            to="/admin/projects"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-electric-cyan text-navy-950 font-semibold text-xs tracking-wide shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manage Projects</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
          {error}
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="group block bg-navy-900 border border-slate-800 hover:border-electric-cyan/40 rounded-xl p-5 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{card.title}</span>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-3xl font-extrabold text-white mb-1 group-hover:text-electric-cyan transition-colors">
                {card.value}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{card.subtext}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-electric-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Launch & Recent Communications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 bg-navy-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Recent Inquiries
            </h3>
            <Link to="/admin/messages" className="text-xs text-electric-cyan hover:underline">
              View all messages
            </Link>
          </div>

          {loading ? (
            <div className="text-xs text-slate-500 font-mono py-8 text-center">Loading recent activity...</div>
          ) : data?.recentMessages && data.recentMessages.length > 0 ? (
            <div className="divide-y divide-slate-800/60">
              {data.recentMessages.map((msg) => (
                <div key={msg._id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white truncate">{msg.name}</span>
                      {!msg.isRead && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">{msg.subject || 'Portfolio Inquiry'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-mono text-slate-500">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              No recent inquiries. Public inquiries submitted via the Contact form will appear here.
            </div>
          )}
        </div>

        {/* System Summary */}
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
            System Status
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Database Connection</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" /> Connected
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Security Architecture</span>
              <span className="text-white font-mono">HttpOnly Cookies</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-800">
              <span className="text-slate-400">Active CV Status</span>
              <span className="text-electric-cyan font-mono">{data?.activeCv?.version || 'None'}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-400">Public Live URL</span>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="text-electric-cyan hover:underline font-mono flex items-center gap-1"
              >
                / <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
