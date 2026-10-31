import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET || 'interviewiq_fallback_secret_key_2026',
    {
      expiresIn: process.env.JWT_EXPIRE || '30d',
    }
  );
};
