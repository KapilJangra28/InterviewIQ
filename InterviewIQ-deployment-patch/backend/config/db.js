import mongoose from 'mongoose';

/** Connect to MongoDB. In production, fail fast if the URI is missing or invalid. */
export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('MONGO_URI is required in production. Add it to your Render environment variables.');
    }
    console.warn('[MongoDB] MONGO_URI not set; using local development database.');
    return mongoose.connect('mongodb://127.0.0.1:27017/interviewiq');
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000
  });

  console.log(`[MongoDB Connected] ${mongoose.connection.host}/${mongoose.connection.name}`);
  return mongoose.connection;
};
