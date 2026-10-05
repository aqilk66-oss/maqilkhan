import app from './app.js';
import { config } from './config/env.js';
import { connectDB } from './config/db.js';

const startServer = async () => {
  // Initialize Database Connection
  try {
    await connectDB();
  } catch (err) {
    console.warn('⚠️ Server proceeding with fallback handling: Database offline.');
  }

  // Start HTTP Server
  const server = app.listen(config.port, () => {
    console.log(`🚀 Portfolio API running in [${config.env}] mode on port ${config.port}`);
    console.log(`👉 Health check URL: http://localhost:${config.port}/api/v1/health`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const fallbackPort = Number(config.port) + 1;
      console.warn(`⚠️ Port ${config.port} is busy. Trying fallback port ${fallbackPort}...`);
      server.listen(fallbackPort, () => {
        console.log(`🚀 Portfolio API running in [${config.env}] mode on fallback port ${fallbackPort}`);
      });
    } else {
      console.error('Server error:', err);
    }
  });

  // Handle Unhandled Promise Rejections gracefully
  process.on('unhandledRejection', (err) => {
    console.error('💥 UNHANDLED REJECTION!:', err.name, err.message);
  });

  // Handle Uncaught Exceptions
  process.on('uncaughtException', (err) => {
    console.error('💥 UNCAUGHT EXCEPTION!:', err.name, err.message);
  });
};

startServer();
