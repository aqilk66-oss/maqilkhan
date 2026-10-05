import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { ToastNotification, ConfirmModal } from '../../components/admin/AdminModals';
import { Plus, Edit2, Trash2, Code2, Star } from 'lucide-react';

export const SkillsManagerPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    description: '',
    iconName: 'Code',
    featured: false,
    order: 0,
  });

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await adminService.getSkills();
      setSkills(res.data || []);
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to load skills.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Frontend',
      description: '',
      iconName: 'Code',
      featured: false,
      order: 0,
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      description: item.description || '',
      iconName: item.iconName || 'Code',
      featured: !!item.featured,
      order: item.order || 0,
    });
    setCurrentId(item._id);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await adminService.updateSkill(currentId, formData);
        setToast({ type: 'success', message: 'Skill updated successfully.' });
      } else {
        await adminService.createSkill(formData);
        setToast({ type: 'success', message: 'Skill created successfully.' });
      }
      resetForm();
      fetchSkills();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to save skill.' });
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteSkill(deleteModal.id);
      setToast({ type: 'success', message: `Skill "${deleteModal.name}" deleted.` });
      fetchSkills();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to delete skill.' });
    } finally {
      setDeleteModal({ isOpen: false, id: null, name: '' });
    }
  };

  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Core Development'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Skills Competencies</h2>
        <p className="text-sm text-slate-400">
          Manage verified technical proficiencies, frameworks, and developer toolsets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Form */}
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 h-fit space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono">
              {isEditing ? 'Edit Skill' : 'Add New Skill'}
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
              <label className="block text-xs font-mono text-slate-300 mb-1">Skill Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. React.js, Express, MongoDB"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Short Description / Notes</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="SPA, hooks, context, state flow"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Order Priority</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>
              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded bg-navy-950 border-slate-700 text-electric-cyan focus:ring-0"
                  />
                  <span className="text-xs font-mono text-slate-300">Highlight</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-electric-cyan text-navy-950 font-semibold text-xs tracking-wide shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all"
            >
              {isEditing ? 'Update Skill' : 'Add Skill'}
            </button>
          </form>
        </div>

        {/* Categorized List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">Loading skill catalog...</div>
          ) : skills.length === 0 ? (
            <div className="bg-navy-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-sm">
              No skills added yet. Add your first technology above.
            </div>
          ) : (
            categories.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              if (catSkills.length === 0) return null;

              return (
                <div key={cat} className="bg-navy-900 border border-slate-800 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold border-b border-slate-800 pb-2 flex items-center justify-between">
                    <span>{cat}</span>
                    <span className="text-slate-500">{catSkills.length}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {catSkills.map((s) => (
                      <div
                        key={s._id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-navy-950 border border-slate-800/80 text-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5 font-medium text-white truncate">
                            <span>{s.name}</span>
                            {s.featured && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                          </div>
                          {s.description && (
                            <p className="text-[11px] text-slate-400 truncate">{s.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleEdit(s)}
                            className="p-1 text-slate-400 hover:text-white rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteModal({ isOpen: true, id: s._id, name: s.name })}
                            className="p-1 text-slate-400 hover:text-rose-400 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Skill?"
        message={`Delete "${deleteModal.name}" from technical competencies?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null, name: '' })}
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

export default SkillsManagerPage;
