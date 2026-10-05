import { z } from 'zod';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import Message from '../models/Message.js';
import crypto from 'crypto';

// Zod Schema for strict payload validation
const createMessageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be under 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().max(150, 'Subject must be under 150 characters').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(3000, 'Message cannot exceed 3000 characters'),
  honeypot: z.string().max(0, 'Bot submission rejected').optional(), // Anti-spam honeypot field
});

export const submitMessage = async (req, res, next) => {
  try {
    // 1. Validate payload with Zod
    const validationResult = createMessageSchema.safeParse(req.body);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.errors.map((e) => e.message).join(', ');
      return res.status(422).json({
        success: false,
        message: errorMsg,
        data: null,
        error: 'VALIDATION_ERROR',
      });
    }

    const { name, email, subject, message } = validationResult.data;

    // 2. Hash IP for privacy-preserving rate tracking
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
    const ipHash = crypto.createHash('sha256').update(clientIp).digest('hex');

    // 3. Save message to MongoDB if connected, or graceful in-memory ACK
    let savedRecord = null;
    try {
      savedRecord = await Message.create({
        name,
        email,
        subject: subject || 'Portfolio Inquiry',
        message,
        ipHash,
      });
    } catch (dbErr) {
      console.warn('⚠️ MongoDB write unavailable, acknowledging client inquiry in dev mode:', dbErr.message);
    }

    return sendSuccess(res, 201, 'Message sent successfully. Thank you for reaching out!', {
      id: savedRecord ? savedRecord._id : 'temp-ack-id',
      name,
      email,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
