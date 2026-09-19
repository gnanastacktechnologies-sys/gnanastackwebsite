import mongoose from 'mongoose';

const technologySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'Cloud / Deployment'],
    },
    icon: { type: String, default: 'Code' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Technology = mongoose.model('Technology', technologySchema);
