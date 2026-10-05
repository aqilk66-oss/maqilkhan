import mongoose from 'mongoose';
import Skill from '../../models/Skill.js';
import { AppError } from '../../utils/AppError.js';
import { sendSuccess } from '../../utils/apiResponse.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const adminSkillController = {
  getAll: async (req, res, next) => {
    try {
      const skills = await Skill.find().sort({ category: 1, order: 1, name: 1 });
      return sendSuccess(res, 200, 'Skills retrieved.', skills);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { name, category, description, iconName, featured, order } = req.body;
      if (!name) {
        return next(new AppError('Skill name is required.', 400));
      }

      const skill = await Skill.create({
        name,
        category: category || 'Frontend',
        description: description || '',
        iconName: iconName || 'Code',
        featured: !!featured,
        order: Number(order) || 0,
      });

      return sendSuccess(res, 201, 'Skill created successfully.', skill);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return next(new AppError('Invalid skill ID.', 400));
      }

      const skill = await Skill.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!skill) {
        return next(new AppError('Skill not found.', 404));
      }

      return sendSuccess(res, 200, 'Skill updated successfully.', skill);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return next(new AppError('Invalid skill ID.', 400));
      }

      const skill = await Skill.findByIdAndDelete(id);
      if (!skill) {
        return next(new AppError('Skill not found.', 404));
      }

      return sendSuccess(res, 200, 'Skill deleted successfully.', { id });
    } catch (err) {
      next(err);
    }
  },
};

export default adminSkillController;
