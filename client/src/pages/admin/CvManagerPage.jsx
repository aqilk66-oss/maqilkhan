import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { ToastNotification, ConfirmModal } from '../../components/admin/AdminModals';
import { FileText, CheckCircle, Upload, Trash2, ExternalLink } from 'lucide-react';

export const CvManagerPage = () => {
  const [cvList, setCvList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, version: '' });

  const [formData, setFormData] = useState({
    version: 'v1.1',
    title: 'Muhammad Aqil Khan - MERN Stack Developer Resume',
    fileName: 'Muhammad_Aqil_Khan_CV.pdf',
    fileUrl: '/Muhammad_Aqil_Khan_CV.pdf',
    fileSize: '184 KB',
    isActive: true,
  });

  const fetchCvs = async () => {
    try {
      setLoading(true);
      const res = await adminService.getCvs();
      setCvList(res.data || []);
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to load CV records.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCvs();
  }, []);

  const handleSetActive = async (id) => {
    try {
      const res = await adminService.setActiveCv(id);
      setToast({ type: 'success', message: res.message || 'Active CV updated.' });
      fetchCvs();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to activate CV.' });
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await adminService.createCv(formData);
      setToast({ type: 'success', message: 'New CV version registered successfully.' });
      fetchCvs();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to add CV.' });
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteCv(deleteModal.id);
      setToast({ type: 'success', message: `CV version ${deleteModal.version} deleted.` });
      fetchCvs();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to delete CV.' });
    } finally {
      setDeleteModal({ isOpen: false, id: null, version: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">CV / Resume Versioning</h2>
        <p className="text-sm text-slate-400">
          Manage resume versions and designate which document serves the public "Download CV" button.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Register CV Form */}
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 h-fit space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
            <Upload className="w-4 h-4 text-electric-cyan" /> Register CV Version
          </h3>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Version Identifier *</label>
              <input
                type="text"
                required
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="e.g. v1.1 or 2026-Q1"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">File Name *</label>
              <input
                type="text"
                required
                value={formData.fileName}
                onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                placeholder="Muhammad_Aqil_Khan_CV.pdf"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Relative or CDN File URL *</label>
              <input
                type="text"
                required
                value={formData.fileUrl}
                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                placeholder="/Muhammad_Aqil_Khan_CV.pdf"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Document Size</label>
              <input
                type="text"
                value={formData.fileSize}
                onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                placeholder="184 KB"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isActiveCv"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded bg-navy-950 border-slate-700 text-electric-cyan focus:ring-0"
              />
              <label htmlFor="isActiveCv" className="text-xs font-mono text-slate-300">
                Immediately set as Active Public Resume
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-electric-cyan text-navy-950 font-semibold text-xs tracking-wide shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all"
            >
              Add CV Version
            </button>
          </form>
        </div>

        {/* Existing CV Versions */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">Loading CV records...</div>
          ) : cvList.length === 0 ? (
            <div className="bg-navy-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-sm">
              No CV records registered yet.
            </div>
          ) : (
            cvList.map((cv) => (
              <div
                key={cv._id}
                className={`bg-navy-900 border rounded-xl p-5 transition-all ${
                  cv.isActive
                    ? 'border-electric-cyan/40 bg-electric-cyan/[0.02]'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-navy-950 border border-slate-800 text-electric-cyan mt-1">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{cv.version}</span>
                        {cv.isActive && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <CheckCircle className="w-3 h-3" /> ACTIVE RESUME
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-1 font-mono">{cv.fileName}</p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Size: {cv.fileSize} • Uploaded: {new Date(cv.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={cv.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-400 hover:text-white rounded"
                      title="Preview Document"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    {!cv.isActive && (
                      <button
                        onClick={() => handleSetActive(cv._id)}
                        className="px-2.5 py-1 rounded bg-electric-cyan/10 hover:bg-electric-cyan text-electric-cyan hover:text-navy-950 border border-electric-cyan/30 text-xs font-mono transition-colors"
                      >
                        Set Active
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, id: cv._id, version: cv.version })}
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
        title="Delete Resume Record?"
        message={`Delete CV version ${deleteModal.version}?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false, id: null, version: '' })}
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

export default CvManagerPage;
