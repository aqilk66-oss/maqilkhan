import { Router } from 'express';
import { protectAdmin } from '../middleware/authMiddleware.js';
import adminDashboardController from '../controllers/admin/adminDashboardController.js';
import adminProjectController from '../controllers/admin/adminProjectController.js';
import adminSkillController from '../controllers/admin/adminSkillController.js';
import adminTimelineController from '../controllers/admin/adminTimelineController.js';
import adminCvController from '../controllers/admin/adminCvController.js';
import adminMediaController from '../controllers/admin/adminMediaController.js';
import {
  adminProfileController,
  adminSettingsController,
  adminMessageController,
} from '../controllers/admin/adminMiscControllers.js';

const router = Router();

// Protect ALL admin routes with protectAdmin middleware
router.use(protectAdmin);

// Dashboard
router.get('/dashboard', adminDashboardController.getOverview);

// Profile
router.get('/profile', adminProfileController.getProfile);
router.put('/profile', adminProfileController.updateProfile);

// Projects
router.get('/projects', adminProjectController.getAll);
router.post('/projects', adminProjectController.create);
router.get('/projects/:id', adminProjectController.getById);
router.put('/projects/:id', adminProjectController.update);
router.delete('/projects/:id', adminProjectController.delete);
router.patch('/projects/:id/toggle-publish', adminProjectController.togglePublish);

// Skills
router.get('/skills', adminSkillController.getAll);
router.post('/skills', adminSkillController.create);
router.put('/skills/:id', adminSkillController.update);
router.delete('/skills/:id', adminSkillController.delete);

// Experience
router.get('/experience', adminTimelineController.getAllExperience);
router.post('/experience', adminTimelineController.createExperience);
router.put('/experience/:id', adminTimelineController.updateExperience);
router.delete('/experience/:id', adminTimelineController.deleteExperience);

// Education
router.get('/education', adminTimelineController.getAllEducation);
router.post('/education', adminTimelineController.createEducation);
router.put('/education/:id', adminTimelineController.updateEducation);
router.delete('/education/:id', adminTimelineController.deleteEducation);

// CV
router.get('/cv', adminCvController.getAll);
router.post('/cv', adminCvController.create);
router.patch('/cv/:id/active', adminCvController.setActive);
router.delete('/cv/:id', adminCvController.delete);

// Media
router.get('/media', adminMediaController.getAll);
router.post('/media', adminMediaController.create);
router.delete('/media/:id', adminMediaController.delete);

// Messages
router.get('/messages', adminMessageController.getAll);
router.patch('/messages/:id/read', adminMessageController.markRead);
router.delete('/messages/:id', adminMessageController.delete);

// Settings
router.get('/settings', adminSettingsController.getSettings);
router.put('/settings', adminSettingsController.updateSettings);

export default router;
