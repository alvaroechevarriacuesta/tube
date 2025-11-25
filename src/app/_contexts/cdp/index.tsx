'use client';

import { http } from 'wagmi';
import { base } from 'wagmi/chains';

import dynamic from 'next/dynamic';

const CDPHooksProviderBase = dynamic(
  () => import('@coinbase/cdp-hooks').then(mod => mod.CDPHooksProvider),
  {
    ssr: false,
  }
);
import { createCDPEmbeddedWalletConnector } from '@coinbase/cdp-wagmi';

import type { Config } from '@coinbase/cdp-hooks';

const cdpConfig: Config = {
  projectId: process.env.NEXT_PUBLIC_CDP_PROJECT_ID!,
  ethereum: {
    createOnLogin: 'eoa' as const,
  },
  solana: {},
};

export const cdpEmbeddedWalletConnector = createCDPEmbeddedWalletConnector({
  cdpConfig,
  providerConfig: {
    chains: [base],
    transports: {
      [base.id]: http(),
    },
  },
});

interface Props {
  children: React.ReactNode;
}

export const CDPHooksProvider = ({ children }: Props) => {
  return (
    <CDPHooksProviderBase config={cdpConfig}>{children}</CDPHooksProviderBase>
  );
};