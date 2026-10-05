import mongoose from 'mongoose';
import Cv from '../../models/Cv.js';
import { AppError } from '../../utils/AppError.js';
import { sendSuccess } from '../../utils/apiResponse.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const adminCvController = {
  getAll: async (req, res, next) => {
    try {
      const cvList = await Cv.find().sort({ createdAt: -1 });
      return sendSuccess(res, 200, 'CV versions retrieved.', cvList);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { version, title, fileName, fileUrl, fileSize, isActive } = req.body;

      if (!version || !fileName || !fileUrl) {
        return next(new AppError('Version, file name, and file URL are required.', 400));
      }

      if (isActive) {
        // Set all others to inactive
        await Cv.updateMany({}, { isActive: false });
      }

      const cv = await Cv.create({
        version,
        title: title || 'Muhammad Aqil Khan - MERN Stack Developer Resume',
        fileName,
        fileUrl,
        fileSize: fileSize || '184 KB',
        isActive: !!isActive,
      });

      return sendSuccess(res, 201, 'CV version created.', cv);
    } catch (err) {
      next(err);
    }
  },

  setActive: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) return next(new AppError('Invalid CV ID.', 400));

      const cv = await Cv.findById(id);
      if (!cv) return next(new AppError('CV not found.', 404));

      // Deactivate all others
      await Cv.updateMany({}, { isActive: false });

      cv.isActive = true;
      await cv.save();

      return sendSuccess(res, 200, `CV version ${cv.version} is now the active portfolio resume.`, cv);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) return next(new AppError('Invalid CV ID.', 400));

      const cv = await Cv.findById(id);
      if (!cv) return next(new AppError('CV not found.', 404));

      if (cv.isActive) {
        const otherCv = await Cv.findOne({ _id: { $ne: id } });
        if (otherCv) {
          otherCv.isActive = true;
          await otherCv.save();
        }
      }

      await Cv.findByIdAndDelete(id);
      return sendSuccess(res, 200, 'CV record deleted.', { id });
    } catch (err) {
      next(err);
    }
  },
};

export default adminCvController;
