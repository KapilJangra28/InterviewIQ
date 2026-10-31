import Notification from '../models/Notification.js';

let ioInstance = null;

export const setSocketIO = (io) => {
  ioInstance = io;
};

export const createNotification = async ({ recipientId, title, message, type = 'system' }) => {
  try {
    const notif = await Notification.create({
      recipientId,
      title,
      message,
      type,
    });

    // Real-time broadcast if socket instance is connected
    if (ioInstance) {
      ioInstance.to(String(recipientId)).emit('notification:new', notif);
    }

    return notif;
  } catch (error) {
    console.warn('[Notification Service Notice] Non-blocking notification logging:', error.message);
    return null;
  }
};
