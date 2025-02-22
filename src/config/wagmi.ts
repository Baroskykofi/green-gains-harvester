
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import { REOWN_PROJECT_ID } from './constants';

export const wagmiConfig = getDefaultConfig({
  appName: 'GreenStake',
  projectId: REOWN_PROJECT_ID,
  chains: [mainnet, sepolia],
});
