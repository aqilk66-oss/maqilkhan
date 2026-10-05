import { Router } from 'express';
import { submitMessage } from '../controllers/messageController.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Public visitor message endpoint with IP rate limiting (5 per hour)
router.post('/', contactLimiter, submitMessage);

export default router;
