import api from './api';

export const projectService = {
  // Public
  getPublishedProjects: async () => {
    return await api.get('/projects');
  },
  getProjectBySlug: async (slug) => {
    return await api.get(`/projects/${slug}`);
  },

  // Admin
  getAllProjectsAdmin: async () => {
    return await api.get('/admin/projects');
  },
  createProject: async (projectData) => {
    return await api.post('/projects', projectData);
  },
  updateProject: async (id, projectData) => {
    return await api.put(`/projects/${id}`, projectData);
  },
  deleteProject: async (id) => {
    return await api.delete(`/projects/${id}`);
  },
  togglePublish: async (id) => {
    return await api.patch(`/projects/${id}/publish`);
  },
};
