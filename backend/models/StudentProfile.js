import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  college: { type: String, default: '' }, degree: { type: String, default: 'B.Tech' },
  branch: { type: String, default: '' }, graduationYear: { type: Number, default: null },
  skills: { type: [String], default: [] }, projects: { type: [mongoose.Schema.Types.Mixed], default: [] },
  certifications: { type: [String], default: [] }, resume: { type: String, default: '' }
}, { timestamps: true });
export default mongoose.models.StudentProfile || mongoose.model('StudentProfile', schema);
