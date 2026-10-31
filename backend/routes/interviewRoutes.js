import express from 'express';
import {
  startInterview,
  submitAnswerResponse,
  finishInterview,
  getInterviewHistory
} from '../controllers/interviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/start', authorize('student'), startInterview);
router.post('/:id/response', authorize('student'), submitAnswerResponse);
router.post('/:id/finish', authorize('student'), finishInterview);
router.get('/history', authorize('student'), getInterviewHistory);

export default router;
