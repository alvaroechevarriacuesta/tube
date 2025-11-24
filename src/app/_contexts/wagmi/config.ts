import {
    cookieStorage,
    createConfig,
    createStorage,
    http,
    injected,
  } from 'wagmi';
import { base } from 'wagmi/chains';

const wagmiConfig = {
    chains: [base],
    storage: createStorage({
        storage: cookieStorage,
    }),
    connectors: [
        injected(),
    ],
    ssr: true,
    transports: {[base.id]: http()},
} as const;

export const createWagmiConfig = () => createConfig(wagmiConfig);