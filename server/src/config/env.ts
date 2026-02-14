import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  MONGODB_URI: z.string().url('MONGODB_URI must be a valid MongoDB connection string'),
  REDIS_URI: z.string().url('REDIS_URI must be a valid Redis connection string'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('4000').transform((val) => parseInt(val, 10)),
  CLIENT_URL: z.string().url('CLIENT_URL must be a valid URL').default('http://localhost:3000'),
  ACCESS_TOKEN_SECRET: z.string().min(32, 'ACCESS_TOKEN_SECRET must be at least 32 characters'),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error('❌ Invalid environment variables:', envVars.error.format());
  process.exit(1);
}

export const env = envVars.data;
