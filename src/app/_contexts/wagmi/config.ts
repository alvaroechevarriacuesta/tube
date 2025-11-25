import { createCDPEmbeddedWalletConnector } from '@coinbase/cdp-wagmi';
import {
    cookieStorage,
    createConfig,
    createStorage,
    http,
    injected,
  } from 'wagmi';
import { base } from 'wagmi/chains';
import { cdpConfig } from '../cdp/config';

const cdpEmbeddedWalletConnector = createCDPEmbeddedWalletConnector({
    cdpConfig,
    providerConfig: {
      chains: [base],
      transports: {
        [base.id]: http(),
      },
    },
  });

const wagmiConfig = {
    chains: [base],
    storage: createStorage({
        storage: cookieStorage,
    }),
    connectors: [
        injected(),
        cdpEmbeddedWalletConnector,
    ],
    transports: {[base.id]: http()},
} as const;

export const createWagmiConfig = () => createConfig(wagmiConfig);