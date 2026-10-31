import express from 'express';
import {
  getAdminMetrics,
  getCompaniesForVerification,
  verifyCompany,
  getAllStudents,
  getQuestionBank,
  createQuestion,
  deleteQuestion
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/metrics', getAdminMetrics);
router.get('/companies', getCompaniesForVerification);
router.patch('/companies/:id/verify', verifyCompany);
router.get('/students', getAllStudents);
router.get('/questions', getQuestionBank);
router.post('/questions', createQuestion);
router.delete('/questions/:id', deleteQuestion);

export default router;
