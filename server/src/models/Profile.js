import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      default: 'Muhammad Aqil Khan',
      trim: true,
    },
    primaryRole: {
      type: String,
      required: true,
      default: 'MERN Stack Developer / Full-Stack Web Developer',
      trim: true,
    },
    secondaryRole: {
      type: String,
      default: 'Full-Stack Web Developer',
      trim: true,
    },
    location: {
      type: String,
      default: 'Charsadda, Pakistan',
      trim: true,
    },
    email: {
      type: String,
      default: 'aqilk4992@gmail.com',
      trim: true,
      lowercase: true,
    },
    whatsapp: {
      type: String,
      default: '+92 342 5730066',
      trim: true,
    },
    github: {
      type: String,
      default: 'https://github.com/aqilk66-oss',
      trim: true,
    },
    linkedin: {
      type: String,
      default: 'https://www.linkedin.com/in/muhammad-aqil-khan-a20a87428/',
      trim: true,
    },
    bio: {
      type: String,
      default:
        'Full-Stack Developer focused on high-performance MERN architecture, responsive web apps, REST APIs, and modern frontend user experiences.',
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    availableForHire: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
