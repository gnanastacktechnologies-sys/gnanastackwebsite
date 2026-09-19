import mongoose from 'mongoose';

const companyInfoSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, default: 'gnanastacktechnologies@gmail.com' },
    phone: { type: String, required: true, default: '+91 6379250367' },
    location: { type: String, required: true, default: 'Salem, Tamil Nadu, India - 636117' },
    tagline: { type: String, default: 'From Village Vision to Digital Innovation' },
  },
  { timestamps: true }
);

export const CompanyInfo = mongoose.model('CompanyInfo', companyInfoSchema);
