import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    projectType: { type: String, required: true },
    budget: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in-progress', 'completed', 'archived'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
