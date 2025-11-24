import { PrismaClient } from '@/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const connectionString = `${process.env.POSTGRES_PRISMA_URL}`;

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
    adapter: PrismaNeon;
}

const adapter = globalForPrisma.adapter || new PrismaNeon({ connectionString });

if (process.env.NODE_ENV !== 'production') globalForPrisma.adapter = adapter;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: adapter,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


