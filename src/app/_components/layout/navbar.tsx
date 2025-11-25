'use client';

import Link from 'next/link';
// import { useSiwe } from '@/app/_hooks/use-siwe';
// import { useSession, signOut } from 'next-auth/react';
// import { useConnect } from 'wagmi';
// import { useState } from 'react';
import { NavbarAuthButton } from './auth-button';

export function Navbar() {
  // const { signIn, isConnected } = useSiwe();
  // const { data: session } = useSession();
  // const { connect, connectors, isPending: isConnecting } = useConnect();
  // const [isSigningIn, setIsSigningIn] = useState(false);

  // const handleConnect = async () => {
  //   if (session) {
  //     // If already signed in, sign out
  //     await signOut();
  //   } else if (!isConnected) {
  //     // If wallet not connected, connect it first
  //     const injectedConnector = connectors.find((c) => c.id === 'injected');
  //     if (injectedConnector) {
  //       connect({ connector: injectedConnector });
  //     }
  //   } else {
  //     // Wallet is connected but not signed in, trigger SIWE sign in
  //     try {
  //       setIsSigningIn(true);
  //       await signIn();
  //     } catch (error) {
  //       console.error('Sign in error:', error);
  //       alert('Failed to sign in. Please try again.');
  //     } finally {
  //       setIsSigningIn(false);
  //     }
  //   }
  // };

  // const formatAddress = (addr: string | undefined) => {
  //   if (!addr) return '';
  //   return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  // };

  // // Get the authenticated address from the SIWE message (the address that signed in)
  // const getDisplayAddress = () => {
  //   // Always use the address from the session (the one that signed the SIWE message)
  //   // This is stored in providerAccountId from the SIWE provider
  //   return session?.user?.name || null;
  // };

  // const getButtonText = () => {
  //   if (isSigningIn) return 'Signing...';
  //   if (isConnecting) return 'Connecting...';
  //   if (session) {
  //     const signedInAddress = getDisplayAddress();
  //     return signedInAddress
  //       ? `${formatAddress(signedInAddress)}`
  //       : 'Signed in';
  //   }
  //   if (isConnected) return 'Sign In';
  //   return 'Connect Wallet';
  // };

  return (
    <header className="w-full flex-shrink-0 bg-red-600 dark:bg-red-800 border-b border-border">
      <div className="flex items-center justify-between w-full px-4 md:px-6 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" prefetch={false} className="flex-shrink-0">
            <div className="w-10 h-10 p-1 bg-white/20 rounded-md flex items-center justify-center border border-white/30">
              <span className="text-lg font-bold text-white">x</span>
            </div>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
              x40tube
            </h1>
            <p className="text-xs md:text-sm text-white/80 leading-tight">
              Home / Videos
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button className="px-4 py-2 bg-white/20 border border-white/30 rounded-md text-sm text-white hover:bg-white/30 transition-colors">
            Search
          </button>
          <NavbarAuthButton />
        </div>
      </div>
    </header>
  );
}
