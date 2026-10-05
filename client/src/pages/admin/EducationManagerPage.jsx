import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { ToastNotification, ConfirmModal } from '../../components/admin/AdminModals';
import { Plus, Edit2, Trash2, GraduationCap } from 'lucide-react';

export const EducationManagerPage = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, title: '' });

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    degree: 'B.S. Computer Science',
    institution: 'Government Post Graduate College Charsadda',
    location: 'Charsadda, Pakistan',
    startYear: '2022',
    endYear: '2026',
    gradeOrStatus: 'In Progress',
    highlights: [],
    order: 0,
  });

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const res = await adminService.getEducation();
      setEducationList(res.data || []);
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to load education entries.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const resetForm = () => {
    setFormData({
      degree: '',
      institution: '',
      location: 'Charsadda, Pakistan',
      startYear: '',
      endYear: '',
      gradeOrStatus: '',
      highlights: [],
      order: 0,
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      degree: item.degree,
      institution: item.institution,
      location: item.location || '',
      startYear: item.startYear,
      endYear: item.endYear || '',
      gradeOrStatus: item.gradeOrStatus || '',
      highlights: item.highlights || [],
      order: item.order || 0,
    });
    setCurrentId(item._id);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await adminService.updateEducation(currentId, formData);
        setToast({ type: 'success', message: 'Education record updated.' });
      } else {
        await adminService.createEducation(formData);
        setToast({ type: 'success', message: 'Education record created.' });
      }
      resetForm();
      fetchEducation();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to save education record.' });
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteEducation(deleteModal.id);
      setToast({ type: 'success', message: `Record deleted.` });
      fetchEducation();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to delete record.' });
    } finally {
      setDeleteModal({ isOpen: false, id: null, title: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Academic Education</h2>
        <p className="text-sm text-slate-400">
          Manage degree credentials, academic institutions, and computer science foundations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 h-fit space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono">
              {isEditing ? 'Edit Academic Entry' : 'Add Academic Entry'}
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
              <label className="block text-xs font-mono text-slate-300 mb-1">Degree Title *</label>
              <input
                type="text"
                required
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="B.S. Computer Science"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Institution *</label>
              <input
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="Government Post Graduate College Charsadda"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Start Year *</label>
                <input
                  type="text"
                  required
                  value={formData.startYear}
                  onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                  placeholder="2022"
                  className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">End Year</label>
                <input
                  type="text"
                  value={formData.endYear}
                  onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                  placeholder="2026"
                  className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Status / Standing</label>
              <input
                type="text"
                value={formData.gradeOrStatus}
                onChange={(e) => setFormData({ ...formData, gradeOrStatus: e.target.value })}
                placeholder="e.g. In Progress / Completed"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-electric-cyan text-navy-950 font-semibold text-xs tracking-wide shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all"
            >
              {isEditing ? 'Update Entry' : 'Add Entry'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">Loading education records...</div>
          ) : educationList.length === 0 ? (
            <div className="bg-navy-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-sm">
              No education records found. Add your degree program.
            </div>
          ) : (
            educationList.map((edu) => (
              <div
                key={edu._id}
                className="bg-navy-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                    <p className="text-xs text-electric-cyan font-mono mt-0.5">{edu.institution}</p>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      {edu.startYear} – {edu.endYear} • {edu.gradeOrStatus}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(edu)}
                      className="p-1.5 text-slate-400 hover:text-white rounded"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, id: edu._id, title: edu.degree })}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Academic Entry?"
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

export default EducationManagerPage;
