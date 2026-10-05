import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { ToastNotification, ConfirmModal } from '../../components/admin/AdminModals';
import { Image, Plus, Trash2, Copy, Check, ExternalLink } from 'lucide-react';

export const MediaLibraryPage = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, title: '' });

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'image',
    size: '120 KB',
    format: 'webp',
  });

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await adminService.getMedia();
      setMediaList(res.data || []);
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to load media.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await adminService.createMedia(formData);
      setToast({ type: 'success', message: 'Asset added to media library.' });
      setFormData({ title: '', url: '', type: 'image', size: '120 KB', format: 'webp' });
      fetchMedia();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to add media.' });
    }
  };

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteMedia(deleteModal.id);
      setToast({ type: 'success', message: 'Media asset deleted.' });
      fetchMedia();
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to delete asset.' });
    } finally {
      setDeleteModal({ isOpen: false, id: null, title: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Media & Asset Library</h2>
        <p className="text-sm text-slate-400">
          Catalog and manage verified visual media and illustrations for projects and profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Media Item */}
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 h-fit space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono">
            Register Media Asset
          </h3>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Asset Label / Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. MERN Project Dashboard Screenshot"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Asset URL *</label>
              <input
                type="text"
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://images.unsplash.com/... or /images/..."
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
                >
                  <option value="image">Image</option>
                  <option value="document">Document</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Format</label>
                <input
                  type="text"
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                  placeholder="webp, png, svg"
                  className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-electric-cyan text-navy-950 font-semibold text-xs tracking-wide shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all"
            >
              Add to Library
            </button>
          </form>
        </div>

        {/* Media Grid */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">Loading library...</div>
          ) : mediaList.length === 0 ? (
            <div className="bg-navy-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-sm">
              No media registered yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mediaList.map((item) => (
                <div
                  key={item._id}
                  className="bg-navy-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-700 transition-colors"
                >
                  <div className="h-32 bg-navy-950 overflow-hidden relative flex items-center justify-center border-b border-slate-800">
                    {item.type === 'image' && item.url ? (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <Image className="w-8 h-8 text-slate-600" />
                    )}
                  </div>
                  <div className="p-3.5 space-y-2">
                    <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{item.format.toUpperCase()}</span>
                      <span>{item.size}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                      <button
                        onClick={() => handleCopyUrl(item.url, item._id)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-electric-cyan"
                      >
                        {copiedId === item._id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy URL
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, id: item._id, title: item.title })}
                        className="p-1 text-slate-500 hover:text-rose-400 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Media Asset?"
        message={`Remove "${deleteModal.title}" from media catalog?`}
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

export default MediaLibraryPage;
