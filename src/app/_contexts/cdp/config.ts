import type { Config } from '@coinbase/cdp-hooks';

export const cdpConfig: Config = {
  projectId: process.env.NEXT_PUBLIC_CDP_PROJECT_ID as string,
  ethereum: {
    createOnLogin: 'eoa',
  },
  solana: {
    createOnLogin: true,
  },
};