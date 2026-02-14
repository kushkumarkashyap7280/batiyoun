import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'Database URL is required'),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  ACCESS_TOKEN_SECRET: z.string().min(32, 'JWT Secret must be at least 32 chars'),
  REFRESH_TOKEN_SECRET: z.string().min(32, 'JWT Secret must be at least 32 chars'),
  VERIFY_TOKEN_SECRET: z.string().min(32, 'JWT Secret must be at least 32 chars'),
  NEXTAUTH_URL: z.string().url().optional(),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_REDIRECT_URI: z.string().url(),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv() {
  // Only validate on server-side (Node.js environment)
  // In browser/edge runtime, these vars won't be available
  if (typeof window !== 'undefined') {
    // Client-side: return empty object, will be typed but not validated
    return {} as Env;
  }

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables. Check your .env file.');
  }

  return parsed.data;
}

export const env = validateEnv();
