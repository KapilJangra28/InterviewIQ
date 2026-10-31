import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['student', 'company', 'admin'], default: 'student' },
  phone: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  accountStatus: { type: String, enum: ['active', 'suspended'], default: 'active' }
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('passwordHash')) return;
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
});
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.models.User || mongoose.model('User', userSchema);
