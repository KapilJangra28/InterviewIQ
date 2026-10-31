import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    resume: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: [
        'Applied',
        'Under Review',
        'Shortlisted',
        'Interview Scheduled',
        'Interviewed',
        'Selected',
        'Rejected'
      ],
      default: 'Applied',
    },
    recruiterNotes: {
      type: String,
      default: '',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications by the same student for the same job
applicationSchema.index({ studentId: 1, jobId: 1 }, { unique: true });

export default mongoose.models.Application || mongoose.model('Application', applicationSchema);
