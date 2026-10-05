import Profile from '../../models/Profile.js';
import Setting from '../../models/Setting.js';
import Message from '../../models/Message.js';
import { AppError } from '../../utils/AppError.js';
import { sendSuccess } from '../../utils/apiResponse.js';

export const adminProfileController = {
  getProfile: async (req, res, next) => {
    try {
      let profile = await Profile.findOne();
      if (!profile) {
        profile = await Profile.create({});
      }
      return sendSuccess(res, 200, 'Profile retrieved.', profile);
    } catch (err) {
      next(err);
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      let profile = await Profile.findOne();
      if (!profile) {
        profile = await Profile.create(req.body);
      } else {
        Object.assign(profile, req.body);
        await profile.save();
      }
      return sendSuccess(res, 200, 'Profile updated successfully.', profile);
    } catch (err) {
      next(err);
    }
  },
};

export const adminSettingsController = {
  getSettings: async (req, res, next) => {
    try {
      let settings = await Setting.findOne();
      if (!settings) {
        settings = await Setting.create({});
      }
      return sendSuccess(res, 200, 'Settings retrieved.', settings);
    } catch (err) {
      next(err);
    }
  },

  updateSettings: async (req, res, next) => {
    try {
      let settings = await Setting.findOne();
      if (!settings) {
        settings = await Setting.create(req.body);
      } else {
        Object.assign(settings, req.body);
        await settings.save();
      }
      return sendSuccess(res, 200, 'Settings updated successfully.', settings);
    } catch (err) {
      next(err);
    }
  },
};

export const adminMessageController = {
  getAll: async (req, res, next) => {
    try {
      const messages = await Message.find().sort({ createdAt: -1 });
      return sendSuccess(res, 200, 'Inquiries retrieved.', messages);
    } catch (err) {
      next(err);
    }
  },

  markRead: async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await Message.findById(id);
      if (!message) return next(new AppError('Message not found.', 404));

      message.isRead = !message.isRead;
      await message.save();

      return sendSuccess(res, 200, `Message marked as ${message.isRead ? 'read' : 'unread'}.`, message);
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await Message.findByIdAndDelete(id);
      if (!message) return next(new AppError('Message not found.', 404));

      return sendSuccess(res, 200, 'Message deleted.', { id });
    } catch (err) {
      next(err);
    }
  },
};
