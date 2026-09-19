import { Service } from '../models/Service.js';

export const defaultServices = [
  {
    _id: 'srv_1',
    title: 'Web Application Development',
    icon: 'Globe',
    shortDescription: 'High-performance, scalable web platforms and progressive web applications engineered with modern frontend and cloud backends.',
    details: ['Single-Page & Multi-Page Apps', 'React & Vite Architecture', 'Responsive UI & Micro-interactions', 'Restful & GraphQL APIs'],
    order: 1,
  },
  {
    _id: 'srv_2',
    title: 'Mobile Application Development',
    icon: 'Smartphone',
    shortDescription: 'Intuitive cross-platform mobile experiences for iOS & Android delivering smooth native performance and real-time synchronization.',
    details: ['Cross-Platform Apps', 'Offline-First Storage', 'Push Notifications', 'Device Hardware Integration'],
    order: 2,
  },
  {
    _id: 'srv_3',
    title: 'Custom Software Solutions',
    icon: 'Cpu',
    shortDescription: 'Tailored enterprise software platforms engineered to address unique operational workflows and domain-specific challenges.',
    details: ['Domain-Specific Architecture', 'Legacy Modernization', 'Modular Microservices', 'Secure Data Governance'],
    order: 3,
  },
];

export const getServices = async (req, res) => {
  try {
    const services = await Service.find({}).sort({ order: 1 });
    if (services.length > 0) {
      return res.json({ success: true, services });
    }
    return res.json({ success: true, services: defaultServices });
  } catch (error) {
    return res.json({ success: true, services: defaultServices });
  }
};

export const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    return res.status(201).json({ success: true, service });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
