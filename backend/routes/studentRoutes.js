import express from 'express';
import { getStudentProfile, updateStudentProfile, uploadResume, getRoadmap } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('student'));

router.get('/profile', getStudentProfile);
router.put('/profile', updateStudentProfile);
router.post('/resume', upload.single('resume'), uploadResume);
router.get('/roadmap', getRoadmap);

export default router;
