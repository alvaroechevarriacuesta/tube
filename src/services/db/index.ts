// Export prisma instance
export { prisma } from './prisma';

// Export all types and tables from the generated Prisma client
export type {
  User,
  Account,
  Session,
  VerificationToken,
  Video,
  OnrampSession,
} from '@/generated/prisma/browser';

export { SessionStatus } from '@/generated/prisma/browser';
