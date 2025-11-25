'use client';

import { useState } from 'react';
import { ChainContext } from './context';

import type { Chain } from '@/types/chain';

interface Props {
  children: React.ReactNode;
}

export const ChainProvider: React.FC<Props> = ({ children }) => {
  // Defaulting this to base for now.
  const [chain, setChainState] = useState<Chain | undefined>('base' as Chain);

  const setChain = (chain: Chain | undefined) => {
    setChainState(chain);
    if (chain) {
      window.history.pushState(
        null,
        '',
        `${window.location.pathname}?chain=${chain}`
      );
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <ChainContext.Provider value={{ chain, setChain }}>
      {children}
    </ChainContext.Provider>
  );
};
