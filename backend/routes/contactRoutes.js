import express from 'express';
import { submitEnquiry, getEnquiries, updateEnquiryStatus } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitEnquiry);
router.get('/', protect, getEnquiries);
router.patch('/:id/status', protect, updateEnquiryStatus);

export default router;
