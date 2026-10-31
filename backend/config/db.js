import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/interviewiq');
    console.log(`[MongoDB Connected] Host: ${conn.connection.host} | DB: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Notice] Database connection unavailable: ${error.message}`);
    console.warn('[MongoDB Notice] Server running in mock/demo fallback mode. Provide valid MONGO_URI in .env for persistent Atlas storage.');
    return null;
  }
};
