import dotenv from "dotenv";
import { z } from "zod";

// 1. Load .env file
dotenv.config();

// 2. Define the Schema (The Rules)
const envSchema = z.object({
  PORT: z.string().default("4000"), // Default to 4000 if missing
  MONGODB_URI: z.string().url(),      // Must be a valid URL
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  CLIENT_URL: z.string().default("*"), // For CORS
});

// 3. Parse and Validate
// If validation fails, this line throws a detailed error and stops the server.
const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error("❌ Invalid environment variables:", envVars.error.format());
  process.exit(1);
}

// 4. Export the clean, typed object
export const env = envVars.data;