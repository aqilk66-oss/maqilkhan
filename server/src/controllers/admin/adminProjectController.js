import mongoose from 'mongoose';
import slugify from 'slugify';
import Project from '../../models/Project.js';
import { AppError } from '../../utils/AppError.js';
import { sendSuccess } from '../../utils/apiResponse.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const adminProjectController = {
  // GET /api/v1/admin/projects
  getAll: async (req, res, next) => {
    try {
      const { search, category, status } = req.query;
      const query = {};

      if (category && category !== 'All') {
        query.category = category;
      }

      if (status === 'published') {
        query.published = true;
      } else if (status === 'draft') {
        query.published = false;
      } else if (status === 'featured') {
        query.featured = true;
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { summary: { $regex: search, $options: 'i' } },
          { technologies: { $in: [new RegExp(search, 'i')] } },
        ];
      }

      const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
      return sendSuccess(res, 200, 'Projects retrieved successfully.', projects);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/v1/admin/projects/:id
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return next(new AppError('Invalid project ID format.', 400));
      }

      const project = await Project.findById(id);
      if (!project) {
        return next(new AppError('Project not found.', 404));
      }

      return sendSuccess(res, 200, 'Project retrieved.', project);
    } catch (err) {
      next(err);
    }
  },

  // POST /api/v1/admin/projects
  create: async (req, res, next) => {
    try {
      const { title, summary, description, category, technologies, features, githubUrl, liveDemoUrl, thumbnailUrl, gallery, featured, published, order } = req.body;

      if (!title || !summary || !description) {
        return next(new AppError('Title, summary, and description are required.', 400));
      }

      let slug = req.body.slug
        ? slugify(req.body.slug, { lower: true, strict: true, trim: true })
        : slugify(title, { lower: true, strict: true, trim: true });

      // Check slug uniqueness
      const existing = await Project.findOne({ slug });
      if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }

      const project = await Project.create({
        title,
        slug,
        category: category || 'Full-Stack',
        summary,
        description,
        technologies: Array.isArray(technologies) ? technologies : [],
        features: Array.isArray(features) ? features : [],
        githubUrl: githubUrl || '',
        liveDemoUrl: liveDemoUrl || '',
        thumbnailUrl: thumbnailUrl || '',
        gallery: Array.isArray(gallery) ? gallery : [],
        featured: !!featured,
        published: published !== undefined ? published : true,
        order: Number(order) || 0,
      });

      return sendSuccess(res, 201, 'Project created successfully.', project);
    } catch (err) {
      next(err);
    }
  },

  // PUT /api/v1/admin/projects/:id
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return next(new AppError('Invalid project ID format.', 400));
      }

      const project = await Project.findById(id);
      if (!project) {
        return next(new AppError('Project not found.', 404));
      }

      const fields = [
        'title',
        'category',
        'summary',
        'description',
        'technologies',
        'features',
        'architectureNotes',
        'githubUrl',
        'liveDemoUrl',
        'thumbnailUrl',
        'gallery',
        'featured',
        'published',
        'order',
      ];

      fields.forEach((field) => {
        if (req.body[field] !== undefined) {
          project[field] = req.body[field];
        }
      });

      if (req.body.slug && req.body.slug !== project.slug) {
        const candidateSlug = slugify(req.body.slug, { lower: true, strict: true, trim: true });
        const slugExists = await Project.findOne({ slug: candidateSlug, _id: { $ne: id } });
        if (slugExists) {
          return next(new AppError('A project with this slug already exists.', 400));
        }
        project.slug = candidateSlug;
      }

      await project.save();
      return sendSuccess(res, 200, 'Project updated successfully.', project);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/v1/admin/projects/:id
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return next(new AppError('Invalid project ID format.', 400));
      }

      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        return next(new AppError('Project not found.', 404));
      }

      return sendSuccess(res, 200, 'Project deleted successfully.', { id });
    } catch (err) {
      next(err);
    }
  },

  // PATCH /api/v1/admin/projects/:id/toggle-publish
  togglePublish: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return next(new AppError('Invalid project ID format.', 400));
      }

      const project = await Project.findById(id);
      if (!project) {
        return next(new AppError('Project not found.', 404));
      }

      project.published = !project.published;
      await project.save();

      return sendSuccess(
        res,
        200,
        `Project ${project.published ? 'published' : 'moved to drafts'}.`,
        project
      );
    } catch (err) {
      next(err);
    }
  },
};

export default adminProjectController;
