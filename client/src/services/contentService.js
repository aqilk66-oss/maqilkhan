import api from './api';

export const profileService = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
};

export const skillService = {
  getSkills: () => api.get('/skills'),
  createSkill: (data) => api.post('/skills', data),
  updateSkill: (id, data) => api.put(`/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/skills/${id}`),
};

export const experienceService = {
  getExperience: () => api.get('/experience'),
  createExperience: (data) => api.post('/experience', data),
  updateExperience: (id, data) => api.put(`/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/experience/${id}`),
};

export const educationService = {
  getEducation: () => api.get('/education'),
  createEducation: (data) => api.post('/education', data),
  updateEducation: (id, data) => api.put(`/education/${id}`, data),
  deleteEducation: (id) => api.delete(`/education/${id}`),
};

export const cvService = {
  getActiveCv: () => api.get('/cv'),
  getAllCvs: () => api.get('/admin/cv'),
  uploadCv: (formData) => api.post('/cv', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  activateCv: (id) => api.patch(`/cv/${id}/activate`),
  deleteCv: (id) => api.delete(`/cv/${id}`),
};

export const mediaService = {
  getMedia: () => api.get('/media'),
  uploadMedia: (formData) => api.post('/media', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteMedia: (id) => api.delete(`/media/${id}`),
};

export const messageService = {
  sendMessage: (data) => api.post('/messages', data),
  getMessages: () => api.get('/messages'),
  markRead: (id) => api.patch(`/messages/${id}/read`),
  deleteMessage: (id) => api.delete(`/messages/${id}`),
};
