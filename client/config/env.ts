import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid PostgreSQL connection string"),
  UPSTASH_REDIS_REST_URL: z.string().url("UPSTASH_REDIS_REST_URL must be a valid URL"),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1, "UPSTASH_REDIS_REST_TOKEN is required"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error("❌ Invalid environment variables:", envVars.error.format());
  process.exit(1);
}

export const env = envVars.data;