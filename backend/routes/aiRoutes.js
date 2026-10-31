import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { questions, followUp, evaluate } from '../controllers/interviewController.js';
const router = Router();
router.post('/questions', questions);
router.post('/follow-up', protect, followUp);
router.post('/evaluate', protect, evaluate);
export default router;
