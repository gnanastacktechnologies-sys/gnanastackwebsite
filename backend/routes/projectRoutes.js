import express from 'express';
import {
  getProjects,
  getAdminProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/admin/all', protect, getAdminProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
