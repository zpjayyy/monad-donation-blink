"use client";

import {
  Blink,
  useActionsRegistryInterval,
  useBlink,
} from "@dialectlabs/blinks";
import { useEvmWagmiAdapter } from "@dialectlabs/blinks/hooks/evm";
import { ConnectKitButton, useModal } from "connectkit";

export default function Home() {
  useActionsRegistryInterval();

  const { setOpen } = useModal();

  const { adapter } = useEvmWagmiAdapter({
    onConnectWalletRequest: async () => {
      setOpen(true);
    },
  });

  const { blink, isLoading } = useBlink({
    url: "evm-action:http://localhost:3000/api/actions/donate-mon",
  });

  return (
    <main className="flex flex-col items-center justify-center">
      <ConnectKitButton />
      <div className="w-1/2 lg:px-4 lg:p-8">
        {isLoading || !blink ? (
          <span>Loading...</span>
        ) : (
          <Blink blink={blink} adapter={adapter} securityLevel="all" />
        )}
      </div>
    </main>
  );
}
