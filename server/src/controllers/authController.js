import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import Admin from '../models/Admin.js';
import { AppError } from '../utils/AppError.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const authController = {
  // POST /api/v1/auth/login
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new AppError('Please provide both email and password.', 400));
      }

      // Check user exists (need passwordHash explicitly as select: false)
      const admin = await Admin.findOne({ email: email.toLowerCase(), isActive: true }).select('+passwordHash');
      if (!admin) {
        return next(new AppError('Invalid email or password.', 401));
      }

      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return next(new AppError('Invalid email or password.', 401));
      }

      // Generate JWT
      const token = jwt.sign(
        { id: admin._id, email: admin.email, role: admin.role, tokenVersion: admin.tokenVersion },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      // Set HttpOnly Cookie
      const cookieOptions = {
        httpOnly: true,
        secure: config.env === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      };
      res.cookie('admin_token', token, cookieOptions);

      // Update lastLogin
      admin.lastLoginAt = new Date();
      await admin.save();

      return sendSuccess(res, 200, 'Authentication successful.', {
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          lastLoginAt: admin.lastLoginAt,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/v1/auth/logout
  logout: async (req, res) => {
    res.clearCookie('admin_token', {
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'lax',
    });
    return sendSuccess(res, 200, 'Successfully logged out.');
  },

  // GET /api/v1/auth/me
  getMe: async (req, res, next) => {
    try {
      const admin = await Admin.findById(req.admin.id);
      if (!admin || !admin.isActive) {
        return next(new AppError('Administrator session is invalid or disabled.', 401));
      }

      return sendSuccess(res, 200, 'Current session active.', {
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          lastLoginAt: admin.lastLoginAt,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};

export default authController;
