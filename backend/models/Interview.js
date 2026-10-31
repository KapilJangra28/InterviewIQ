import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
    interviewType: {
      type: String,
      enum: [
        'Technical Interview',
        'HR Interview',
        'Behavioral Interview',
        'Company-Specific Interview',
        'Resume-Based Interview',
        'Custom Interview'
      ],
      default: 'Technical Interview',
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    duration: {
      type: Number, // in minutes
      default: 20,
    },
    status: {
      type: String,
      enum: ['InProgress', 'Completed', 'Abandoned'],
      default: 'InProgress',
    },
    overallScore: {
      type: Number, // 0 - 10
      default: 0,
    },
    studentConsentToShare: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Interview || mongoose.model('Interview', interviewSchema);
