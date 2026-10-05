import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { ToastNotification, ConfirmModal } from '../../components/admin/AdminModals';
import { Plus, Edit2, Trash2, Briefcase } from 'lucide-react';

export const ExperienceManagerPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, title: '' });

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    role: '',
    organization: '',
    location: '',
    type: 'Independent',
    startDate: '',
    endDate: 'Present',
    isCurrent: false,
    description: '',
    responsibilities: [],
    technologies: [],
    order: 0,
  });

  const [respInput, setRespInput] = useState('');
  const [techInput, setTechInput] = useState('');

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const res = await adminService.getExperience();
      setExperiences(res.data || []);
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to load experience records.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const resetForm = () => {
    setFormData({
      role: '',
      organization: '',
      location: '',
      type: 'Independent',
      startDate: '',
      endDate: 'Present',
      isCurrent: false,
      description: '',
      responsibilities: [],
      technologies: [],
      order: 0,
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      role: item.role,
      organization: item.organization,
      location: item.location || '',
      type: item.type || 'Independent',
      startDate: item.startDate,
      endDate: item.endDate || 'Present',
      isCurrent: !!item.isCurrent,
      description: item.description,
      responsibilities: item.responsibilities || [],
      technologies: item.technologies || [],
      order: item.order || 0,
    });
    setCurrentId(item._id);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await adminService.updateExperience(currentId, formData);
        setToast({ type: 'success', message: 'Experience record updated.' });
      } else {
        await adminService.createExperience(formData);
        setToast({ type: 'success', message: 'Experience record created.' });
      }
      resetForm();
      fetchExperience();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to save experience.' });
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteExperience(deleteModal.id);
      setToast({ type: 'success', message: `Experience "${deleteModal.title}" removed.` });
      fetchExperience();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to delete record.' });
    } finally {
      setDeleteModal({ isOpen: false, id: null, title: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Experience & Career History</h2>
        <p className="text-sm text-slate-400">
          Manage career engagements, client deliverables, and professional roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Form */}
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 h-fit space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono">
              {isEditing ? 'Edit Experience' : 'Add Experience'}
            </h3>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-slate-500 hover:text-white"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Role Title *</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. MERN Stack Developer"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Organization / Company *</label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Independent / Self-Employed"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Start Date *</label>
                <input
                  type="text"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  placeholder="2023"
                  className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">End Date</label>
                <input
                  type="text"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  placeholder="Present"
                  className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Overview Description *</label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Core focus areas and system engineering contributions..."
                className="w-full bg-navy-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-electric-cyan text-navy-950 font-semibold text-xs tracking-wide shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all"
            >
              {isEditing ? 'Update Experience' : 'Save Experience'}
            </button>
          </form>
        </div>

        {/* List of Experiences */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">Loading experiences...</div>
          ) : experiences.length === 0 ? (
            <div className="bg-navy-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-sm">
              No experience records added yet.
            </div>
          ) : (
            experiences.map((exp) => (
              <div
                key={exp._id}
                className="bg-navy-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h4 className="text-base font-bold text-white">{exp.role}</h4>
                    <p className="text-xs text-electric-cyan font-mono">
                      {exp.organization} • {exp.startDate} – {exp.endDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="p-1.5 text-slate-400 hover:text-white rounded"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, id: exp._id, title: exp.role })}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{exp.description}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Experience Entry?"
        message={`Delete record "${deleteModal.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null, title: '' })}
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

export default ExperienceManagerPage;
