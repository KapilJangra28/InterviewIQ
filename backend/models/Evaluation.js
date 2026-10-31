import mongoose from 'mongoose';

const evaluationSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview',
      required: true,
      unique: true,
    },
    technicalAccuracy: {
      type: Number, // 0 - 10
      default: 0,
    },
    relevance: {
      type: Number, // 0 - 10
      default: 0,
    },
    communication: {
      type: Number, // 0 - 10
      default: 0,
    },
    completeness: {
      type: Number, // 0 - 10
      default: 0,
    },
    answerStructure: {
      type: Number, // 0 - 10
      default: 0,
    },
    overallScore: {
      type: Number, // 0 - 10
      default: 0,
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    improvementSuggestions: {
      type: [String],
      default: [],
    },
    feedback: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Evaluation || mongoose.model('Evaluation', evaluationSchema);
