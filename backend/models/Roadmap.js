import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    goals: {
      type: [String],
      default: [],
    },
    tasks: [
      {
        day: { type: String, default: '' },
        title: { type: String, required: true },
        topic: { type: String, default: '' },
        duration: { type: String, default: '20 mins' },
        completed: { type: Boolean, default: false },
        weaknessOrigin: { type: String, default: '' },
      },
    ],
    weakTopics: {
      type: [String],
      default: [],
    },
    progress: {
      type: Number, // 0 - 100%
      default: 0,
    },
    completionStatus: {
      type: String,
      enum: ['In Progress', 'Completed'],
      default: 'In Progress',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Roadmap || mongoose.model('Roadmap', roadmapSchema);
