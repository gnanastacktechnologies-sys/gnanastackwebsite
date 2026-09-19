import express from 'express';
import { getTechnologies, createTechnology } from '../controllers/technologyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTechnologies);
router.post('/', protect, createTechnology);

export default router;
