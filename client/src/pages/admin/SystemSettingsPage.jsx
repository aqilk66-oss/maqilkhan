import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { ToastNotification } from '../../components/admin/AdminModals';
import { Settings, Save, ShieldAlert, Globe } from 'lucide-react';

export const SystemSettingsPage = () => {
  const [settings, setSettings] = useState({
    siteTitle: 'Muhammad Aqil Khan | MERN Stack Developer Portfolio',
    metaDescription:
      'Portfolio of Muhammad Aqil Khan — MERN Stack Developer specializing in React, Node.js, Express, and MongoDB web applications.',
    contactEmail: 'aqilk4992@gmail.com',
    maintenanceMode: false,
    allowInquiries: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await adminService.getSettings();
      if (res.data) {
        setSettings(res.data);
      }
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to load settings.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await adminService.updateSettings(settings);
      setToast({ type: 'success', message: 'System settings saved successfully.' });
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to update settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400 font-mono text-sm py-12 text-center">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">System & Site Settings</h2>
        <p className="text-sm text-slate-400">
          Configure global metadata, search engine descriptions, and communication availability.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
            <Globe className="w-4 h-4 text-electric-cyan" /> SEO & Public Meta
          </h3>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Global Site Title</label>
            <input
              type="text"
              name="siteTitle"
              value={settings.siteTitle}
              onChange={handleChange}
              className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Default Meta Description</label>
            <textarea
              name="metaDescription"
              rows={3}
              value={settings.metaDescription}
              onChange={handleChange}
              className="w-full bg-navy-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-electric-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Administrative Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleChange}
              className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
            />
          </div>
        </div>

        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" /> Operational Controls
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="allowInquiries"
                checked={!!settings.allowInquiries}
                onChange={handleChange}
                className="rounded bg-navy-950 border-slate-700 text-electric-cyan focus:ring-0"
              />
              <span className="text-sm text-slate-200">
                Accept new contact form messages from public visitors
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={!!settings.maintenanceMode}
                onChange={handleChange}
                className="rounded bg-navy-950 border-slate-700 text-rose-500 focus:ring-0"
              />
              <span className="text-sm text-slate-200">
                Enable Maintenance Mode banner on portfolio
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-electric-cyan text-navy-950 font-semibold text-sm shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>

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

export default SystemSettingsPage;
