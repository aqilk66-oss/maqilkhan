import { Router } from 'express';
import { sendSuccess } from '../utils/apiResponse.js';
import authRoutes from './authRoutes.js';
import adminRoutes from './adminRoutes.js';
import publicRoutes from './publicRoutes.js';
import messageRoutes from './messageRoutes.js';

const router = Router();

// Health Check
router.get('/health', (req, res) => {
  return sendSuccess(res, 200, 'Aqil Khan Portfolio API is operational', {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    system: 'Muhammad Aqil Khan — MERN Portfolio Platform',
  });
});

// Auth Routes (/api/v1/auth)
router.use('/auth', authRoutes);

// Public Content Routes: accessible both as /api/v1/public/* and directly /api/v1/*
router.use('/public', publicRoutes);
router.use('/', publicRoutes);
router.use('/messages', messageRoutes);

// Admin CMS Routes (/api/v1/admin)
router.use('/admin', adminRoutes);

export default router;
