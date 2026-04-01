import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

/**
 * Connects to MongoDB Atlas (or any MongoDB URI) using Mongoose.
 * Call once at startup before `app.listen`.
 */
export async function connectDB() {
  if (!MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, {
      maxPoolSize: 10,
    });

    const host = mongoose.connection.host;
    console.log(`MongoDB connected successfully${host ? ` (${host})` : ''}`);
  } catch (error) {
    console.error('MongoDB connection error:', error?.message ?? error);
    process.exit(1);
  }
}

export default connectDB;
