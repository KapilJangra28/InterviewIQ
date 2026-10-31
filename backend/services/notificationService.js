let ioInstance;
export const setSocketIO = (io) => { ioInstance = io; };
export const emitToUser = (userId, event, payload) => {
  if (!ioInstance || !userId) return false;
  ioInstance.to(String(userId)).emit(event, payload);
  return true;
};
