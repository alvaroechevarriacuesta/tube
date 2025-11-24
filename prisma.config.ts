import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';

// Load .env file from project root
config();

export default defineConfig({
  datasource: {
    url: process.env.POSTGRES_PRISMA_URL || '',
  },
});

