import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { ToastNotification } from '../../components/admin/AdminModals';
import { User, Mail, Phone, MapPin, Github, Linkedin, Save, Globe } from 'lucide-react';

export const ProfileManagerPage = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    primaryRole: '',
    secondaryRole: '',
    location: '',
    email: '',
    whatsapp: '',
    github: '',
    linkedin: '',
    bio: '',
    availableForHire: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await adminService.getProfile();
      if (res.data) {
        setProfile(res.data);
      }
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to load profile' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await adminService.updateProfile(profile);
      setToast({ type: 'success', message: 'Profile details updated and synchronized with public site.' });
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to save changes.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400 font-mono text-sm py-12 text-center">Loading developer profile...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Developer Profile & Bio</h2>
        <p className="text-sm text-slate-400">
          Update your public identity, roles, and verified channels across the portfolio.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Identity */}
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <User className="w-4 h-4 text-electric-cyan" /> Core Identity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Full Legal / Display Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={profile.fullName || ''}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  name="location"
                  value={profile.location || ''}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Primary Role Title</label>
              <input
                type="text"
                name="primaryRole"
                required
                value={profile.primaryRole || ''}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Secondary Role Title</label>
              <input
                type="text"
                name="secondaryRole"
                value={profile.secondaryRole || ''}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Professional Bio</label>
            <textarea
              name="bio"
              rows={4}
              value={profile.bio || ''}
              onChange={handleChange}
              className="w-full bg-navy-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-electric-cyan"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="availableForHire"
              name="availableForHire"
              checked={!!profile.availableForHire}
              onChange={handleChange}
              className="rounded bg-navy-950 border-slate-700 text-electric-cyan focus:ring-0"
            />
            <label htmlFor="availableForHire" className="text-xs font-mono text-slate-300">
              Display "Available for Opportunities / Freelance" badge publicly
            </label>
          </div>
        </div>

        {/* Channels & Coordinates */}
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Globe className="w-4 h-4 text-electric-cyan" /> Verified Contact & Socials
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Public Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  name="email"
                  value={profile.email || ''}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">WhatsApp / Phone</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  name="whatsapp"
                  value={profile.whatsapp || ''}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">GitHub Profile URL</label>
              <div className="relative">
                <Github className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="url"
                  name="github"
                  value={profile.github || ''}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">LinkedIn Profile URL</label>
              <div className="relative">
                <Linkedin className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="url"
                  name="linkedin"
                  value={profile.linkedin || ''}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-electric-cyan text-navy-950 font-semibold text-sm shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
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

export default ProfileManagerPage;
