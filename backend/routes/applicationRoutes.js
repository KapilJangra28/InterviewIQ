import express from 'express';
import {
  applyForJob,
  getMyApplications,
  getCompanyApplicants,
  updateApplicationStatus
} from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);

// Student applies or views own
router.post('/apply', authorize('student'), applyForJob);
router.get('/my-applications', authorize('student'), getMyApplications);

// Company manages applicants
router.get('/company-applicants', authorize('company'), getCompanyApplicants);
router.patch('/:id/status', authorize('company'), updateApplicationStatus);

export default router;
