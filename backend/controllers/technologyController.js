import { Technology } from '../models/Technology.js';

export const defaultTechnologies = [
  // Frontend
  { _id: 'tech_1', name: 'React', category: 'Frontend', icon: 'Atom', order: 1 },
  { _id: 'tech_2', name: 'JavaScript (ES6+)', category: 'Frontend', icon: 'Code2', order: 2 },
  { _id: 'tech_3', name: 'HTML5', category: 'Frontend', icon: 'FileCode', order: 3 },
  { _id: 'tech_4', name: 'CSS3 / Tailwind CSS', category: 'Frontend', icon: 'Palette', order: 4 },

  // Backend
  { _id: 'tech_5', name: 'Node.js', category: 'Backend', icon: 'Server', order: 5 },
  { _id: 'tech_6', name: 'Express.js', category: 'Backend', icon: 'Cpu', order: 6 },
  { _id: 'tech_7', name: 'REST & GraphQL APIs', category: 'Backend', icon: 'Network', order: 7 },

  // Database
  { _id: 'tech_8', name: 'MongoDB', category: 'Database', icon: 'Database', order: 8 },

  // Cloud / Deployment
  { _id: 'tech_9', name: 'Vercel', category: 'Cloud / Deployment', icon: 'Cloud', order: 9 },
  { _id: 'tech_10', name: 'Render', category: 'Cloud / Deployment', icon: 'Terminal', order: 10 },
  { _id: 'tech_11', name: 'GitHub Actions / CI-CD', category: 'Cloud / Deployment', icon: 'GitBranch', order: 11 },
];

export const getTechnologies = async (req, res) => {
  try {
    const technologies = await Technology.find({}).sort({ order: 1 });
    if (technologies.length > 0) {
      return res.json({ success: true, technologies });
    }
    return res.json({ success: true, technologies: defaultTechnologies });
  } catch (error) {
    return res.json({ success: true, technologies: defaultTechnologies });
  }
};

export const createTechnology = async (req, res) => {
  try {
    const tech = new Technology(req.body);
    await tech.save();
    return res.status(201).json({ success: true, technology: tech });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
