import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aqil_portfolio',
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback_development_secret_do_not_use_in_prod',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  cookie: {
    secret: process.env.COOKIE_SECRET || 'fallback_cookie_secret',
  },
  cors: {
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  },
  adminSeed: {
    email: process.env.ADMIN_INIT_EMAIL || 'aqilk4992@gmail.com',
    password: process.env.ADMIN_INIT_PASSWORD || 'ChangeMe123!',
  },
};
