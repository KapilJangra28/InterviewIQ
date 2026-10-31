import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        'Technical Interview',
        'HR Interview',
        'Behavioral Interview',
        'Company-Specific Interview',
        'Resume-Based Interview',
        'Custom Interview'
      ],
      required: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    expectedAnswer: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Question || mongoose.model('Question', questionSchema);
