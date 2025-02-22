
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '@/config/wagmi';
import '@rainbow-me/rainbowkit/styles.css';

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
