import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import { config } from '../config/env.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    console.log('[SEED] Connecting to MongoDB...');
    await mongoose.connect(config.mongoUri);
    console.log('[SEED] MongoDB connected successfully.');

    const adminEmail = (config.adminSeed?.email || 'aqilk4992@gmail.com').toLowerCase();
    const adminPassword = config.adminSeed?.password || 'ChangeMe123!';

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`[SEED] Admin with email ${adminEmail} already exists. Updating password hash...`);
      const salt = await bcrypt.genSalt(12);
      existingAdmin.passwordHash = await bcrypt.hash(adminPassword, salt);
      existingAdmin.isActive = true;
      await existingAdmin.save();
      console.log('[SEED] Admin credentials refreshed successfully.');
    } else {
      console.log(`[SEED] Creating super_admin account for ${adminEmail}...`);
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(adminPassword, salt);

      await Admin.create({
        name: 'Muhammad Aqil Khan',
        email: adminEmail,
        passwordHash,
        role: 'super_admin',
        isActive: true,
      });
      console.log('[SEED] Super administrator seeded successfully.');
    }

    await mongoose.disconnect();
    console.log('[SEED] Disconnected from database.');
    process.exit(0);
  } catch (error) {
    console.error('[SEED] Failed to seed administrator:', error.message);
    process.exit(1);
  }
};

seedAdmin();
