import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("4000"),
  MONGODB_URI: z.string().url(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  CLIENT_URL: z.string().default("*"),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error("❌ Invalid environment variables:", envVars.error.format());
  process.exit(1);
}

export const env = envVars.data;