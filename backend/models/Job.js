import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide job description'],
    },
    skills: {
      type: [String],
      required: true,
      default: [],
    },
    qualifications: {
      type: String,
      default: '',
    },
    experience: {
      type: String,
      default: '0-2 years',
    },
    salary: {
      type: String,
      default: 'Competitive',
    },
    location: {
      type: String,
      default: 'Remote',
    },
    workMode: {
      type: String,
      enum: ['Remote', 'Hybrid', 'On-site'],
      default: 'Hybrid',
    },
    employmentType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
      default: 'Full-time',
    },
    vacancies: {
      type: Number,
      default: 1,
    },
    deadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Active', 'Closed', 'Draft', 'Flagged'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.index({ title: 'text', skills: 'text', location: 'text' });

export default mongoose.models.Job || mongoose.model('Job', jobSchema);
