import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  coverLetter: { type: String, default: '' }, resumeUrl: { type: String, default: '' },
  status: { type: String, enum: ['submitted', 'reviewing', 'shortlisted', 'rejected', 'hired'], default: 'submitted' }
}, { timestamps: true });
schema.index({ jobId: 1, studentId: 1 }, { unique: true });
export default mongoose.models.Application || mongoose.model('Application', schema);
