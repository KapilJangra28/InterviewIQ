import express from 'express';
import { getQuestions, getFollowUp, screenCandidate } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/questions', getQuestions);
router.post('/follow-up', getFollowUp);
router.post('/screen-candidate', protect, screenCandidate);

export default router;
