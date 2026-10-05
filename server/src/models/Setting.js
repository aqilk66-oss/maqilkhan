import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    siteTitle: {
      type: String,
      default: 'Muhammad Aqil Khan | MERN Stack Developer Portfolio',
    },
    metaDescription: {
      type: String,
      default:
        'Portfolio of Muhammad Aqil Khan — MERN Stack Developer specializing in React, Node.js, Express, and MongoDB web applications.',
    },
    contactEmail: {
      type: String,
      default: 'aqilk4992@gmail.com',
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    allowInquiries: {
      type: Boolean,
      default: true,
    },
    seoKeywords: {
      type: [String],
      default: ['MERN Stack', 'Full-Stack Developer', 'React Developer', 'Node.js', 'Muhammad Aqil Khan'],
    },
  },
  {
    timestamps: true,
  }
);

export const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
