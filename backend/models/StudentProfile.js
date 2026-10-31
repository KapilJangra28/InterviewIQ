import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    college: {
      type: String,
      default: '',
    },
    degree: {
      type: String,
      default: '',
    },
    branch: {
      type: String,
      default: '',
    },
    graduationYear: {
      type: Number,
      default: 2025,
    },
    skills: {
      type: [String],
      default: [],
    },
    projects: [
      {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        techStack: { type: [String], default: [] },
        link: { type: String, default: '' },
      },
    ],
    certifications: {
      type: [String],
      default: [],
    },
    resume: {
      type: String, // Cloudinary URL or filename
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.StudentProfile || mongoose.model('StudentProfile', studentProfileSchema);
