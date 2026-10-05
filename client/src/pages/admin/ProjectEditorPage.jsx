import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import { ToastNotification } from '../../components/admin/AdminModals';
import { ArrowLeft, Save, ExternalLink, Plus, Trash2 } from 'lucide-react';

export const ProjectEditorPage = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Full-Stack',
    summary: '',
    description: '',
    technologies: [],
    features: [],
    architectureNotes: '',
    githubUrl: '',
    liveDemoUrl: '',
    thumbnailUrl: '',
    featured: false,
    published: true,
    order: 0,
  });

  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const fetchProject = async () => {
        try {
          setLoading(true);
          const res = await adminService.getProjectById(id);
          if (res.data) {
            setFormData(res.data);
          }
        } catch (err) {
          setToast({ type: 'error', message: err.message || 'Failed to load project details.' });
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    if (!formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
    }
    setTechInput('');
  };

  const handleRemoveTech = (index) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, featureInput.trim()],
    }));
    setFeatureInput('');
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (isEditing) {
        await adminService.updateProject(id, formData);
        setToast({ type: 'success', message: 'Project updated successfully.' });
      } else {
        const res = await adminService.createProject(formData);
        setToast({ type: 'success', message: 'Project created successfully.' });
        navigate(`/admin/projects/${res.data._id}/edit`);
      }
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Failed to save project.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400 font-mono text-sm py-12 text-center">Loading project data...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        {isEditing && formData.slug && (
          <a
            href={`/projects/${formData.slug}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-electric-cyan hover:underline font-mono"
          >
            <span>Preview live page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isEditing ? `Edit "${formData.title}"` : 'Create New Project'}
        </h2>
        <p className="text-sm text-slate-400">
          Define technical case study details, architecture highlights, and source repositories.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Basic Project Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Project Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Full-Stack E-Commerce Platform"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Slug (Auto-generated if left empty)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e-commerce-platform"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
              >
                <option value="Full-Stack">Full-Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend & API">Backend & API</option>
                <option value="Database & Tooling">Database & Tooling</option>
                <option value="System Design">System Design</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Order Priority</label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Short Summary * (Max 300 characters for card views)
            </label>
            <textarea
              name="summary"
              rows={2}
              required
              maxLength={300}
              value={formData.summary}
              onChange={handleChange}
              placeholder="Concise overview of what this application does..."
              className="w-full bg-navy-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-electric-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Full Technical Description *
            </label>
            <textarea
              name="description"
              rows={5}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="In-depth explanation of system goals, architectural decisions, and outcomes..."
              className="w-full bg-navy-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-electric-cyan"
            />
          </div>
        </div>

        {/* Technologies & Features */}
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Technologies & Key Capabilities
          </h3>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Technologies Used</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                placeholder="e.g. React, Node.js, MongoDB, Redux"
                className="flex-1 bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-mono transition-colors"
              >
                Add Tech
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(idx)}
                    className="hover:text-rose-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Key Features / Modules</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="e.g. JWT-based role authentication with refresh tokens"
                className="flex-1 bg-navy-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-electric-cyan"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-mono transition-colors"
              >
                Add Feature
              </button>
            </div>
            <ul className="space-y-1.5">
              {formData.features?.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-navy-950 border border-slate-800/80 text-xs text-slate-300"
                >
                  <span>• {feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* URLs & Media */}
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Links & Media
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">GitHub Repository URL</label>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/aqilk66-oss/project-repo"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Live Demo URL</label>
              <input
                type="url"
                name="liveDemoUrl"
                value={formData.liveDemoUrl}
                onChange={handleChange}
                placeholder="https://demo-app.example.com"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-slate-300 mb-1">Thumbnail Image URL</label>
              <input
                type="text"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/... or /images/projects/thumb.webp"
                className="w-full bg-navy-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-electric-cyan"
              />
            </div>
          </div>
        </div>

        {/* Visibility Controls */}
        <div className="bg-navy-900 border border-slate-800 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={!!formData.published}
                onChange={handleChange}
                className="rounded bg-navy-950 border-slate-700 text-electric-cyan focus:ring-0"
              />
              <span className="text-sm font-medium text-white">Publish on Public Portfolio</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={!!formData.featured}
                onChange={handleChange}
                className="rounded bg-navy-950 border-slate-700 text-electric-cyan focus:ring-0"
              />
              <span className="text-sm font-medium text-white">Feature in Homepage Showcase</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-electric-cyan text-navy-950 font-semibold text-sm shadow-glow-cyan hover:bg-electric-blue hover:text-white transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Project'}</span>
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

export default ProjectEditorPage;
