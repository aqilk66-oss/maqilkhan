import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

export const protectAdmin = async (req, res, next) => {
  let token;

  // Check HttpOnly Cookie first, then fallback to Authorization Bearer header
  if (req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Authentication required. Access denied.', 401));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);

    // Verify role is super_admin
    if (decoded.role !== 'super_admin') {
      return next(new AppError('Forbidden. Administrative rights required.', 403));
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return next(new AppError('Session invalid or expired. Please sign in.', 401));
  }
};
