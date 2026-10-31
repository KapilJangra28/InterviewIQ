import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is missing. Add your MongoDB Atlas connection string to Render Environment.');
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 12000 });
  console.log(`[MongoDB] Connected to ${mongoose.connection.name} at ${mongoose.connection.host}`);
  return mongoose.connection;
}
