import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env';

export const connectDB = async (): Promise<void> => {
  try {
    // if (process.env.FORCE_DNS === 'true') {
    //   dns.setServers(['8.8.8.8', '1.1.1.1']);
    //   console.log('🔧 Forced DNS servers set to 8.8.8.8, 1.1.1.1');
    // }
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error:`);
    if (error instanceof Error) {
      console.error(`   Message: ${error.message}`);
    }
    process.exit(1);
  }
};
