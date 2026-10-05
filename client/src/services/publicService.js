import api from './api';

export const publicService = {
  // Profile (name, roles, bio, coordinates, socials)
  getProfile: () => api.get('/profile'),

  // Contact Info
  getContactInfo: () => api.get('/contact-info'),

  // Projects (published only, optional category or featured filter)
  getProjects: (params) => api.get('/projects', { params }),

  // Single Project by Slug
  getProjectBySlug: (slug) => api.get(`/projects/${slug}`),

  // Technical Skills (categorized, ordered)
  getSkills: () => api.get('/skills'),

  // Career Milestones / Experience
  getExperience: () => api.get('/experience'),

  // Academic Education
  getEducation: () => api.get('/education'),

  // Active Public Resume
  getActiveCv: () => api.get('/cv'),

  // Send Contact Message
  sendMessage: (data) => api.post('/messages', data),
};

export default publicService;
