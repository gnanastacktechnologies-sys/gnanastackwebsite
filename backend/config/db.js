import mongoose from 'mongoose';
import dns from 'dns';

// Fix Node.js DNS SRV resolution on Windows network adapters
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gnanastack', {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Warning]: Connection failed (${error.message}). Server operating in fallback mode with mock/in-memory storage.`);
    return false;
  }
};
