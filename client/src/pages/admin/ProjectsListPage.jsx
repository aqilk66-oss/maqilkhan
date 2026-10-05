import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import { ToastNotification, ConfirmModal } from '../../components/admin/AdminModals';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  ExternalLink,
  Star,
  RefreshCw,
} from 'lucide-react';

export const ProjectsListPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, projectId: null, projectTitle: '' });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await adminService.getProjects({
        search: search || undefined,
        category: categoryFilter !== 'All' ? categoryFilter : undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });
      setProjects(res.data || []);
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to fetch projects.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [categoryFilter, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await adminService.toggleProjectPublish(id);
      setToast({ type: 'success', message: res.message || 'Status updated.' });
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, published: res.data.published } : p))
      );
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to update status.' });
    }
  };

  const confirmDelete = (project) => {
    setDeleteModal({
      isOpen: true,
      projectId: project._id,
      projectTitle: project.title,
    });
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteProject(deleteModal.projectId);
      setToast({ type: 'success', message: `Project "${deleteModal.projectTitle}" deleted successfully.` });
      setProjects((prev) => prev.filter((p) => p._id !== deleteModal.projectId));
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to delete project.' });
    } finally {
      setDeleteModal({ isOpen: false, projectId: null, projectTitle: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Projects Management</h2>
          <p className="text-sm text-slate-400">
            Create, edit, publish, or preview portfolio technical case studies.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchProjects}
            className="p-2 rounded-lg bg-navy-900 border border-slate-800 text-slate-300 hover:text-white"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-electric-cyan text-navy-950 font-semibold text-xs tracking-wide shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-navy-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search projects or technologies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-navy-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-electric-cyan"
            >
              <option value="All">All Categories</option>
              <option value="Full-Stack">Full-Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend & API">Backend & API</option>
              <option value="Database & Tooling">Database & Tooling</option>
              <option value="System Design">System Design</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-navy-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-electric-cyan"
            >
              <option value="all">All</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
              <option value="featured">Featured</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-navy-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-slate-400 text-sm">No projects match the selected criteria.</p>
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center gap-1.5 text-xs text-electric-cyan hover:underline font-mono"
            >
              <Plus className="w-3.5 h-3.5" /> Create your first project
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400 bg-navy-950/50">
                  <th className="py-3 px-4">Title & Slug</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Technologies</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {projects.map((item) => (
                  <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white max-w-xs">
                      <div className="truncate font-semibold">{item.title}</div>
                      <div className="text-[11px] font-mono text-slate-500 truncate">/{item.slug}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {item.featured ? (
                        <span className="flex items-center gap-1 text-amber-400 font-mono text-[11px]">
                          <Star className="w-3 h-3 fill-amber-400" /> Yes
                        </span>
                      ) : (
                        <span className="text-slate-500 font-mono text-[11px]">No</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(item._id)}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                          item.published
                            ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {item.published ? (
                          <>
                            <CheckCircle className="w-3 h-3" /> Published
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate font-mono text-[11px]">
                      {item.technologies?.slice(0, 3).join(', ')}
                      {item.technologies?.length > 3 ? '...' : ''}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <a
                        href={`/projects/${item.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex p-1.5 text-slate-400 hover:text-electric-cyan rounded transition-colors"
                        title="Preview public project page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <Link
                        to={`/admin/projects/${item._id}/edit`}
                        className="inline-flex p-1.5 text-slate-400 hover:text-white rounded transition-colors"
                        title="Edit project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => confirmDelete(item)}
                        className="inline-flex p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Project?"
        message={`Are you sure you want to permanently delete "${deleteModal.projectTitle}"? This will remove it from MongoDB and the public website.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false, projectId: null, projectTitle: '' })}
      />

      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ProjectsListPage;
