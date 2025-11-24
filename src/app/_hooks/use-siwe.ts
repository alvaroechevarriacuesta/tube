'use client';

import { useAccount, useChainId, useSignMessage } from 'wagmi';
import { signInWithEthereum } from '@/auth/providers/siwe/sign-in';
import { useCallback } from 'react';

export function useSiwe() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();

  const signIn = useCallback(
    async (options?: { email?: string; redirectTo?: string }) => {
      if (!address || !isConnected) {
        throw new Error('Wallet not connected');
      }

      const signMessage = async (message: string) => {
        const result = await signMessageAsync({
          message: message,
        });
        return result;
      };

      return signInWithEthereum({
        address,
        chainId,
        signMessage,
        ...options,
      });
    },
    [address, chainId, isConnected, signMessageAsync]
  );

  return {
    signIn,
    address,
    isConnected,
    chainId,
  };
}

