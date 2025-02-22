
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from './ui/button';

export function ConnectButton() {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} variant="outline">
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} variant="destructive">
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex gap-4">
                  <Button onClick={openChainModal} variant="outline">
                    {chain.name}
                  </Button>
                  <Button onClick={openAccountModal} variant="outline">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}
