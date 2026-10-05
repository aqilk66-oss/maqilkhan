import mongoose from 'mongoose';
import { config } from './env.js';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log('⚡ MongoDB already connected (cached).');
    return;
  }

  if (!config.mongoUri) {
    console.error('❌ MONGODB_URI is missing in environment variables.');
    throw new Error('MONGODB_URI environment variable is required.');
  }

  try {
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // In dev, we log clearly so the server can still run in standalone test mode if local mongo is off
    if (config.env === 'production') {
      process.exit(1);
    }
  }
};
