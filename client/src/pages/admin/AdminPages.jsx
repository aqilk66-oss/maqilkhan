import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);

    try {
      await login({ email, password });
      navigate('/admin/dashboard');
    } catch (err) {
      setFormError(err.message || 'Invalid administrative credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-navy-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center text-electric-cyan mx-auto mb-4 shadow-glow-cyan">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin CMS Portal</h1>
          <p className="text-xs font-mono text-slate-400 mt-2">Muhammad Aqil Khan Portfolio Management</p>
        </div>

        {formError && (
          <div className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aqilk4992@gmail.com"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-electric-cyan transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-lg bg-electric-cyan text-navy-950 font-semibold shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const DashboardOverviewPage = () => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-2">CMS Overview Dashboard</h2>
    <p className="text-sm text-slate-400 mb-8">Manage published content, active CV version, and client inquiries.</p>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {['Total Projects', 'Published Projects', 'Technical Skills', 'Unread Inquiries'].map((card) => (
        <div key={card} className="bg-navy-900 border border-slate-800 rounded-xl p-6">
          <p className="text-xs font-mono uppercase text-slate-400">{card}</p>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
      ))}
    </div>
  </div>
);

export const AdminPlaceholderPage = ({ title, description }) => (
  <div>
    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
    <p className="text-sm text-slate-400 mb-8">{description}</p>
    <div className="bg-navy-900 border border-slate-800 rounded-xl p-8 text-slate-400 text-sm">
      Module ready for Stage 7 CMS CRUD implementation.
    </div>
  </div>
);
