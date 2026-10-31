import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, default: 'Mock Interview' }, category: { type: String, default: 'Technical' },
  difficulty: { type: String, default: 'Intermediate' }, topic: { type: String, default: 'General' },
  questions: { type: [mongoose.Schema.Types.Mixed], default: [] },
  responses: { type: [mongoose.Schema.Types.Mixed], default: [] },
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
  score: { type: Number, default: null }, feedback: { type: mongoose.Schema.Types.Mixed, default: null }
}, { timestamps: true });
export default mongoose.models.Interview || mongoose.model('Interview', schema);
