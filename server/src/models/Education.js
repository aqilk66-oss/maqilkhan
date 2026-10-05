import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, 'Degree name is required'],
      trim: true,
    },
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
      trim: true,
    },
    location: {
      type: String,
      default: 'Charsadda, Pakistan',
      trim: true,
    },
    startYear: {
      type: String,
      required: [true, 'Start year is required'],
    },
    endYear: {
      type: String,
      default: '2026',
    },
    gradeOrStatus: {
      type: String,
      default: 'In Progress',
    },
    highlights: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Education = mongoose.model('Education', educationSchema);
export default Education;
