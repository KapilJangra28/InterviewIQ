import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  companyName: { type: String, default: '' }, title: { type: String, required: true },
  description: { type: String, required: true }, location: { type: String, default: 'Remote' },
  employmentType: { type: String, default: 'Full-time' }, experience: { type: String, default: 'Entry-level' },
  salary: { type: String, default: '' }, skills: { type: [String], default: [] },
  status: { type: String, enum: ['open', 'closed'], default: 'open' }
}, { timestamps: true });
export default mongoose.models.Job || mongoose.model('Job', schema);
