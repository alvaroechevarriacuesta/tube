'use client';

import { WagmiProvider as WagmiProviderBase } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { createWagmiConfig } from './config';

import type { State } from 'wagmi';

interface Props {
  children: React.ReactNode;
  initialState: State | undefined;
}

const wagmiConfig = createWagmiConfig();

export const WagmiProviderClient: React.FC<Props> = ({
  children,
  initialState,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProviderBase config={wagmiConfig} initialState={initialState}>
        {children}
      </WagmiProviderBase>
    </QueryClientProvider>
  );
};
