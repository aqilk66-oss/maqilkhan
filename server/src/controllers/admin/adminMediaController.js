import mongoose from 'mongoose';
import Media from '../../models/Media.js';
import { AppError } from '../../utils/AppError.js';
import { sendSuccess } from '../../utils/apiResponse.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const adminMediaController = {
  getAll: async (req, res, next) => {
    try {
      const media = await Media.find().sort({ createdAt: -1 });
      return sendSuccess(res, 200, 'Media library items retrieved.', media);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { title, url, type, size, format, tags } = req.body;
      if (!title || !url) {
        return next(new AppError('Media title and URL are required.', 400));
      }

      const item = await Media.create({
        title,
        url,
        type: type || 'image',
        size: size || 'N/A',
        format: format || 'webp',
        tags: Array.isArray(tags) ? tags : [],
      });

      return sendSuccess(res, 201, 'Media asset added to library.', item);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) return next(new AppError('Invalid media ID.', 400));

      const item = await Media.findByIdAndDelete(id);
      if (!item) return next(new AppError('Media asset not found.', 404));

      return sendSuccess(res, 200, 'Media item deleted.', { id });
    } catch (err) {
      next(err);
    }
  },
};

export default adminMediaController;
