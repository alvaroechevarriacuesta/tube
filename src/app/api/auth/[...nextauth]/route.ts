import NextAuth from 'next-auth';
import { providers } from '@/auth/providers';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // When user first signs in, user object is available
      if (user) {
        token.id = user.id;
        token.provider = user.provider;
        token.providerAccountId = user.providerAccountId;
      }
      // Account might also have provider info (for OAuth providers)
      if (account) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id || '';
        session.user.provider = token.provider;
        session.user.providerAccountId = token.providerAccountId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

