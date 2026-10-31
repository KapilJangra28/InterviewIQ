import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema(
  {
    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interview',
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    questionText: {
      type: String,
      required: true,
    },
    answerText: {
      type: String,
      default: '',
    },
    audioReference: {
      type: String,
      default: '',
    },
    evaluation: {
      type: String,
      default: '',
    },
    score: {
      type: Number, // 0 - 10
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Response || mongoose.model('Response', responseSchema);
