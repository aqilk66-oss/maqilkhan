import mongoose from 'mongoose';
import Experience from '../../models/Experience.js';
import Education from '../../models/Education.js';
import { AppError } from '../../utils/AppError.js';
import { sendSuccess } from '../../utils/apiResponse.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const adminTimelineController = {
  // Experience
  getAllExperience: async (req, res, next) => {
    try {
      const list = await Experience.find().sort({ order: 1, createdAt: -1 });
      return sendSuccess(res, 200, 'Experience items retrieved.', list);
    } catch (err) {
      next(err);
    }
  },

  createExperience: async (req, res, next) => {
    try {
      const item = await Experience.create(req.body);
      return sendSuccess(res, 201, 'Experience record created.', item);
    } catch (err) {
      next(err);
    }
  },

  updateExperience: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) return next(new AppError('Invalid ID.', 400));

      const item = await Experience.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!item) return next(new AppError('Experience item not found.', 404));

      return sendSuccess(res, 200, 'Experience record updated.', item);
    } catch (err) {
      next(err);
    }
  },

  deleteExperience: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) return next(new AppError('Invalid ID.', 400));

      const item = await Experience.findByIdAndDelete(id);
      if (!item) return next(new AppError('Experience item not found.', 404));

      return sendSuccess(res, 200, 'Experience record deleted.', { id });
    } catch (err) {
      next(err);
    }
  },

  // Education
  getAllEducation: async (req, res, next) => {
    try {
      const list = await Education.find().sort({ order: 1, startYear: -1 });
      return sendSuccess(res, 200, 'Education items retrieved.', list);
    } catch (err) {
      next(err);
    }
  },

  createEducation: async (req, res, next) => {
    try {
      const item = await Education.create(req.body);
      return sendSuccess(res, 201, 'Education record created.', item);
    } catch (err) {
      next(err);
    }
  },

  updateEducation: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) return next(new AppError('Invalid ID.', 400));

      const item = await Education.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!item) return next(new AppError('Education item not found.', 404));

      return sendSuccess(res, 200, 'Education record updated.', item);
    } catch (err) {
      next(err);
    }
  },

  deleteEducation: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) return next(new AppError('Invalid ID.', 400));

      const item = await Education.findByIdAndDelete(id);
      if (!item) return next(new AppError('Education item not found.', 404));

      return sendSuccess(res, 200, 'Education record deleted.', { id });
    } catch (err) {
      next(err);
    }
  },
};

export default adminTimelineController;
