import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    shortDescription: { type: String, required: true },
    details: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Service = mongoose.model('Service', serviceSchema);
