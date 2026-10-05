import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema(
  {
    version: {
      type: String,
      required: true,
      default: 'v1.0',
      trim: true,
    },
    title: {
      type: String,
      default: 'Muhammad Aqil Khan - MERN Stack Developer Resume',
      trim: true,
    },
    fileName: {
      type: String,
      required: true,
      default: 'Muhammad_Aqil_Khan_CV.pdf',
    },
    fileUrl: {
      type: String,
      required: [true, 'File URL is required'],
      default: '/Muhammad_Aqil_Khan_CV.pdf',
    },
    fileSize: {
      type: String,
      default: '184 KB',
    },
    isActive: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cv = mongoose.model('Cv', cvSchema);
export default Cv;
