import express from 'express';
import { getMyNotifications, markNotificationsAsRead } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getMyNotifications);
router.patch('/read-all', markNotificationsAsRead);

export default router;
