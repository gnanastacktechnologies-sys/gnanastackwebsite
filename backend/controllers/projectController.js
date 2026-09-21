import { Project } from '../models/Project.js';

export const sampleProjects = [
  {
    _id: 'proj_1',
    title: 'GVehicle',
    slug: 'gvehicle',
    shortDescription: 'An intelligent vehicle management platform designed to simplify fleet operations, maintenance, driver allocations, and vehicle records.',
    description: 'GVehicle is a state-of-the-art fleet management system built from the ground up to solve complex logistics and vehicle maintenance challenges. It brings real-time telemetry oversight, predictive servicing alerts, driver logs, and fuel expense analytics into a single high-performance dashboard.',
    category: 'Fleet Management',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Chart.js'],
    coverImage: '/assets/projects/gvehicle.png',
    gallery: ['/assets/projects/gvehicle.png'],
    features: [
      'Real-time vehicle status & telemetry overview',
      'Automated preventive maintenance scheduling',
      'Driver assignment & shift management',
      'Fuel expenditure and mileage analytics',
      'Digital document repository (Insurance, RC, Permits)',
    ],
    problem: 'Commercial fleet managers suffer from fragmented maintenance records, unmonitored fuel usage, and manual driver scheduling resulting in high operational downtime and unexpected repairs.',
    solution: 'GVehicle provides an integrated digital control tower with automated maintenance triggers, instant driver logs, and interactive performance dashboards.',
    architecture: 'Modular React single-page frontend leveraging Tailwind UI, powered by Node.js/Express microservices with MongoDB geospatial indexing for location data.',
    results: 'Reduced fleet maintenance downtime by 35% and cut manual reporting overhead significantly.',
    status: 'Production Ready',
    featured: true,
    published: true,
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'proj_2',
    title: 'GDairy',
    slug: 'gdairy',
    shortDescription: 'A smart dairy procurement, milk collection, and farmer payout management platform for modern agricultural operations.',
    description: 'GDairy modernizes dairy operations by digitizing milk collection centers, automated fat/SNF quality testing calculations, daily milk ledgers, and instant transparent farmer payouts.',
    category: 'AgriTech & Supply Chain',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'IoT Gateway API'],
    coverImage: '/assets/projects/gdairy.png',
    gallery: ['/assets/projects/gdairy.png'],
    features: [
      'Milk collection center digital entry',
      'Automated Fat & SNF rate chart calculation',
      'Transparent farmer payment ledgers',
      'Route logistics & chilling center dispatch tracking',
      'Automated SMS receipt notifications to farmers',
    ],
    problem: 'Milk procurement in rural centers historically suffered from manual ledger errors, delayed payments to farmers, and lack of auditability in quality grading.',
    solution: 'GDairy replaces pen-and-paper center logs with an offline-resilient digital interface directly linked to quality testing hardware and automated billing.',
    architecture: 'High-availability Express REST server utilizing Mongoose data models with background job processing for automated daily payout reports.',
    results: 'Processed thousands of daily liters transparently with 100% accurate financial reconciliation.',
    status: 'Production Ready',
    featured: true,
    published: true,
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'proj_3',
    title: 'WebVault',
    slug: 'webvault',
    shortDescription: 'A zero-knowledge encrypted digital credential vault designed for secure team password management and access audit trailing.',
    description: 'WebVault provides enterprise-grade secret management for startups and tech teams. Store API keys, database credentials, and production logins securely with end-to-end client encryption.',
    category: 'Cybersecurity & Utilities',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'AES-256 WebCrypto'],
    coverImage: '/assets/projects/webvault.png',
    gallery: ['/assets/projects/webvault.png'],
    features: [
      'Client-side AES-256-GCM zero-knowledge encryption',
      'Granular team permission levels (Admin, Member, Auditor)',
      'Secure temporary secret sharing links with expiration',
      'Cryptographic password strength generator',
      'Immutable activity audit logs',
    ],
    problem: 'Teams frequently compromise production environments by sharing plain-text API credentials over Slack, email, or unencrypted text documents.',
    solution: 'WebVault ensures credentials are encrypted on the client side before network transit, preventing unauthorized access even at database level.',
    architecture: 'End-to-end client-side encryption layer interfacing with Node.js authentication microservices and Mongoose secure store.',
    results: 'Eliminated credential leak risks across participating development workflows.',
    status: 'Production Ready',
    featured: true,
    published: true,
    order: 3,
    createdAt: new Date().toISOString(),
  },
];

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ published: true }).sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, projects });
  } catch (error) {
    return res.json({ success: true, projects: sampleProjects });
  }
};

export const getAdminProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, projects });
  } catch (error) {
    return res.json({ success: true, projects: [] });
  }
};

export const getProjectBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const project = await Project.findOne({ slug });
    if (project) {
      return res.json({ success: true, project });
    }
    const sample = sampleProjects.find((p) => p.slug === slug);
    if (sample) {
      return res.json({ success: true, project: sample });
    }
    return res.status(404).json({ success: false, message: 'Project not found' });
  } catch (error) {
    const sample = sampleProjects.find((p) => p.slug === slug);
    if (sample) {
      return res.json({ success: true, project: sample });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (projectData.order === undefined || projectData.order === null || projectData.order === '') {
      const highestProject = await Project.findOne().sort({ order: -1 });
      projectData.order = highestProject && typeof highestProject.order === 'number' ? highestProject.order + 1 : 1;
    } else {
      projectData.order = Number(projectData.order);
    }
    const project = new Project(projectData);
    await project.save();
    return res.status(201).json({ success: true, project });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.order !== undefined) {
      updateData.order = Number(updateData.order);
    }
    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.json({ success: true, project });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderProjects = async (req, res) => {
  try {
    const { projectOrders } = req.body; // Array of { id, order }
    if (!Array.isArray(projectOrders)) {
      return res.status(400).json({ success: false, message: 'projectOrders array expected' });
    }
    const bulkOps = projectOrders.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: Number(item.order) },
      },
    }));
    if (bulkOps.length > 0) {
      await Project.bulkWrite(bulkOps);
    }
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, projects, message: 'Projects reordered successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
