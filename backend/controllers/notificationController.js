import Notification from '../models/Notification.js';

export const getMyNotifications = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const notifications = await Notification.find({ recipientId: userId }).sort('-createdAt').limit(20);
    return res.json({ success: true, count: notifications.length, data: notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const markNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    await Notification.updateMany({ recipientId: userId, readStatus: false }, { readStatus: true });
    return res.json({ success: true, message: 'All notifications marked as read.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
