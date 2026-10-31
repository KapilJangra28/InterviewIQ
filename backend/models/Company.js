import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  companyName: { type: String, required: true }, description: { type: String, default: '' },
  industry: { type: String, default: '' }, website: { type: String, default: '' }, location: { type: String, default: '' },
  contactPerson: { type: String, default: '' }, logo: { type: String, default: '' },
  verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' }
}, { timestamps: true });
export default mongoose.models.Company || mongoose.model('Company', schema);
