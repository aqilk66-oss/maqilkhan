import { Router } from 'express';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Cv from '../models/Cv.js';
import Profile from '../models/Profile.js';
import { sendSuccess } from '../utils/apiResponse.js';
import { AppError } from '../utils/AppError.js';

const router = Router();

// GET /api/v1/profile (public)
router.get('/profile', async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = {
        fullName: 'Muhammad Aqil Khan',
        primaryRole: 'MERN Stack Developer / Full-Stack Web Developer',
        location: 'Charsadda, Pakistan',
        email: 'aqilk4992@gmail.com',
        whatsapp: '+92 342 5730066',
        github: 'https://github.com/aqilk66-oss',
        linkedin: 'https://www.linkedin.com/in/muhammad-aqil-khan-a20a87428/',
        bio: 'Full-Stack Developer focused on high-performance MERN architecture.',
      };
    }
    return sendSuccess(res, 200, 'Public profile retrieved.', profile);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/projects (public - only published)
router.get('/projects', async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const query = { published: true };

    if (category && category !== 'All') {
      query.category = category;
    }
    if (featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    return sendSuccess(res, 200, 'Public projects retrieved.', projects);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/projects/:slug (public)
router.get('/projects/:slug', async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, published: true });
    if (!project) {
      return next(new AppError('Project not found or not published.', 404));
    }
    return sendSuccess(res, 200, 'Project retrieved.', project);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/skills (public)
router.get('/skills', async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1, name: 1 });
    return sendSuccess(res, 200, 'Public skills retrieved.', skills);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/experience (public)
router.get('/experience', async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    return sendSuccess(res, 200, 'Public experience retrieved.', experiences);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/education (public)
router.get('/education', async (req, res, next) => {
  try {
    const education = await Education.find().sort({ order: 1, startYear: -1 });
    return sendSuccess(res, 200, 'Public education retrieved.', education);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/contact-info (public alias for profile contact attributes)
router.get('/contact-info', async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    const contactInfo = {
      fullName: profile?.fullName || 'Muhammad Aqil Khan',
      location: profile?.location || 'Charsadda, Pakistan',
      email: profile?.email || 'aqilk4992@gmail.com',
      whatsapp: profile?.whatsapp || '+92 342 5730066',
      github: profile?.github || 'https://github.com/aqilk66-oss',
      linkedin: profile?.linkedin || 'https://www.linkedin.com/in/muhammad-aqil-khan-a20a87428/',
    };
    return sendSuccess(res, 200, 'Public contact info retrieved.', contactInfo);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/cv (public - active resume alias)
router.get('/cv', async (req, res, next) => {
  try {
    let cv = await Cv.findOne({ isActive: true });
    if (!cv) {
      cv = {
        version: 'v1.0',
        title: 'Muhammad Aqil Khan - Resume',
        fileName: 'Muhammad_Aqil_Khan_CV.pdf',
        fileUrl: '/Muhammad_Aqil_Khan_CV.pdf',
        fileSize: '184 KB',
        isActive: true,
      };
    }
    return sendSuccess(res, 200, 'Active resume retrieved.', cv);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/cv/active (public)
router.get('/cv/active', async (req, res, next) => {
  try {
    let cv = await Cv.findOne({ isActive: true });
    if (!cv) {
      cv = {
        version: 'v1.0',
        title: 'Muhammad Aqil Khan - Resume',
        fileName: 'Muhammad_Aqil_Khan_CV.pdf',
        fileUrl: '/Muhammad_Aqil_Khan_CV.pdf',
        fileSize: '184 KB',
        isActive: true,
      };
    }
    return sendSuccess(res, 200, 'Active resume retrieved.', cv);
  } catch (err) {
    next(err);
  }
});

export default router;
