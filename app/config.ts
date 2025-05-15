import { monadTestnet } from "viem/chains";
import { createConfig, http } from "wagmi";

export const config = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http(),
  },
});
