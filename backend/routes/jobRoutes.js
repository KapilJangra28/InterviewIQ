import express from 'express';
import { getAllJobs, getJobById, createJob, getMyJobs, updateJobStatus } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Company protected routes
router.post('/', protect, authorize('company'), createJob);
router.get('/company/my-jobs', protect, authorize('company'), getMyJobs);
router.patch('/:id/status', protect, authorize('company', 'admin'), updateJobStatus);

export default router;
