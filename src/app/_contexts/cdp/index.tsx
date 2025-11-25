'use client';

import dynamic from 'next/dynamic';

const CDPHooksProviderBase = dynamic(
  () => import('@coinbase/cdp-hooks').then(mod => mod.CDPHooksProvider),
  {
    ssr: false,
  }
);

import { cdpConfig } from './config';


interface Props {
  children: React.ReactNode;
}

export const CDPHooksProvider = ({ children }: Props) => {
  return (
    <CDPHooksProviderBase config={cdpConfig}>{children}</CDPHooksProviderBase>
  );
};