// Conditionally load dotenv for local development
if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv/config');
  } catch (e) {
    // Ignore if dotenv is not available
  }
}

import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: `tsx prisma/seed.ts`,
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});