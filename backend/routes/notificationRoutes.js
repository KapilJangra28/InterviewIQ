import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', protect, (req, res) => res.json({ success: true, data: [] }));
export default router;
