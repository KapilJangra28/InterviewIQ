import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    industry: {
      type: String,
      default: 'Technology & Software',
    },
    website: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    contactPerson: {
      type: String,
      default: '',
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected', 'suspended'],
      default: 'pending',
    },
    verificationDocuments: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Company || mongoose.model('Company', companySchema);
