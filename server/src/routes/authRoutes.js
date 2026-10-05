import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', protectAdmin, authController.getMe);

export default router;
