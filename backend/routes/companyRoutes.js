import express from 'express';
import { getCompanyProfile, updateCompanyProfile } from '../controllers/companyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('company'));

router.get('/profile', getCompanyProfile);
router.put('/profile', updateCompanyProfile);

export default router;
