import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    technologies: [{ type: String }],
    coverImage: { type: String, default: '/assets/projects/placeholder.png' },
    gallery: [{ type: String }],
    features: [{ type: String }],
    problem: { type: String },
    solution: { type: String },
    architecture: { type: String },
    results: { type: String },
    status: { type: String, default: 'Production Ready' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
