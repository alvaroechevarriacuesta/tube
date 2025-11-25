export enum Chain {
  BASE = 'base',
  SOLANA = 'solana',
}

export const SUPPORTED_CHAINS = Object.values([Chain.BASE, Chain.SOLANA]);

export const CHAIN_LABELS: Record<Chain, string> = {
  [Chain.BASE]: 'Base',
  [Chain.SOLANA]: 'Solana',
};
