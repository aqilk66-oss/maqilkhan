import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/cors.js';
import { config } from './config/env.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { AppError } from './utils/AppError.js';
import apiRouter from './routes/index.js';

const app = express();

// Security Headers
app.use(helmet());

// Cross-Origin Resource Sharing
app.use(cors(corsOptions));

// Global Rate Limiting
app.use('/api', globalLimiter);

// Body Parsing & Cookie Parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser(config.cookie.secret));

// Data Sanitization against NoSQL Query Injection
app.use(mongoSanitize());

// Versioned API Routes (/api/v1)
app.use('/api/v1', apiRouter);

// Root Welcome Route
app.get('/', (req, res) => {
  res.json({
    name: 'Muhammad Aqil Khan — Portfolio API',
    role: 'MERN Stack Developer / Full-Stack Web Developer',
    version: '1.0.0',
    documentation: '/api/v1/health'
  });
});

// 404 Route Catch-All
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find endpoint ${req.originalUrl} on this server`, 404));
});

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
