import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';

import { createWagmiConfig } from './config';

import { WagmiProviderClient } from './client';

interface Props {
  children: React.ReactNode;
}

export const WagmiProvider: React.FC<Props> = async ({ children }) => {
  const initialState = cookieToInitialState(
    createWagmiConfig(),
    (await headers()).get('cookie')
  );
  return (
    <WagmiProviderClient initialState={initialState}>
      {children}
    </WagmiProviderClient>
  );
};
