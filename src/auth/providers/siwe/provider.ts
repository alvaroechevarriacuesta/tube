import CredentialsProvider from 'next-auth/providers/credentials';
import { SiweMessage } from 'siwe';
import { SIWE_PROVIDER_ID, SIWE_PROVIDER_NAME } from './constants';
import { prisma } from '@/services/db/prisma';

export default function SiweProvider() {
  return CredentialsProvider({
    id: SIWE_PROVIDER_ID,
    name: SIWE_PROVIDER_NAME,
    credentials: {
      message: {
        label: 'Message',
        type: 'text',
      },
      signedMessage: {
        label: 'Signed Message',
        type: 'text',
      },
      email: {
        label: 'Email',
        type: 'text',
        required: false,
      },
    },
    async authorize(credentials) {
      try {
        if (!credentials?.message || !credentials?.signedMessage) {
          return null;
        }

        const message = JSON.parse(credentials.message as string) as SiweMessage;
        const signedMessage = credentials.signedMessage as string;

        // Verify the SIWE message
        const siweMessage = new SiweMessage(message);
        const result = await siweMessage.verify({ signature: signedMessage });
        
        if (!result.success) {
          return null;
        }
        
        const fields = result.data;

        // Check if message has expired
        if (fields.expirationTime) {
          const expirationTime = new Date(fields.expirationTime);
          if (expirationTime < new Date()) {
            return null;
          }
        }

        // Use wallet address as the user identifier
        const address = fields.address.toLowerCase();
        const providerAccountId = address;
        
        // Find or create user and account in Prisma
        let user = await prisma.user.findFirst({
          where: {
            accounts: {
              some: {
                provider: SIWE_PROVIDER_ID,
                providerAccountId,
              },
            },
          },
          include: {
            accounts: true,
          },
        });

        if (!user) {
          // Create new user
          user = await prisma.user.create({
            data: {
              email: credentials.email as string | undefined || `${address}@siwe.local`,
              name: address.slice(0, 6) + '...' + address.slice(-4),
              accounts: {
                create: {
                  type: 'credentials',
                  provider: SIWE_PROVIDER_ID,
                  providerAccountId,
                },
              },
            },
            include: {
              accounts: true,
            },
          });
        } else {
          // Update account if it doesn't exist (shouldn't happen, but just in case)
          const account = user.accounts.find(
            (acc) => acc.provider === SIWE_PROVIDER_ID && acc.providerAccountId === providerAccountId
          );
          
          if (!account) {
            await prisma.account.create({
              data: {
                userId: user.id,
                type: 'credentials',
                provider: SIWE_PROVIDER_ID,
                providerAccountId,
              },
            });
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          provider: SIWE_PROVIDER_ID,
          providerAccountId,
        };
      } catch (error) {
        console.error('SIWE authorization error:', error);
        return null;
      }
    },
  });
}

