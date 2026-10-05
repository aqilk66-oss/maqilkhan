import api from './api';

export const adminService = {
  // Dashboard
  getDashboardOverview: () => api.get('/admin/dashboard'),

  // Profile
  getProfile: () => api.get('/admin/profile'),
  updateProfile: (data) => api.put('/admin/profile', data),

  // Projects
  getProjects: (params) => api.get('/admin/projects', { params }),
  getProjectById: (id) => api.get(`/admin/projects/${id}`),
  createProject: (data) => api.post('/admin/projects', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),
  toggleProjectPublish: (id) => api.patch(`/admin/projects/${id}/toggle-publish`),

  // Skills
  getSkills: () => api.get('/admin/skills'),
  createSkill: (data) => api.post('/admin/skills', data),
  updateSkill: (id, data) => api.put(`/admin/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/admin/skills/${id}`),

  // Experience
  getExperience: () => api.get('/admin/experience'),
  createExperience: (data) => api.post('/admin/experience', data),
  updateExperience: (id, data) => api.put(`/admin/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/admin/experience/${id}`),

  // Education
  getEducation: () => api.get('/admin/education'),
  createEducation: (data) => api.post('/admin/education', data),
  updateEducation: (id, data) => api.put(`/admin/education/${id}`, data),
  deleteEducation: (id) => api.delete(`/admin/education/${id}`),

  // CV
  getCvs: () => api.get('/admin/cv'),
  createCv: (data) => api.post('/admin/cv', data),
  setActiveCv: (id) => api.patch(`/admin/cv/${id}/active`),
  deleteCv: (id) => api.delete(`/admin/cv/${id}`),

  // Media
  getMedia: () => api.get('/admin/media'),
  createMedia: (data) => api.post('/admin/media', data),
  deleteMedia: (id) => api.delete(`/admin/media/${id}`),

  // Messages
  getMessages: () => api.get('/admin/messages'),
  toggleMessageRead: (id) => api.patch(`/admin/messages/${id}/read`),
  deleteMessage: (id) => api.delete(`/admin/messages/${id}`),

  // Settings
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (data) => api.put('/admin/settings', data),
};

export default adminService;
