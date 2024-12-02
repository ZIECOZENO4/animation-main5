import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { Abi } from 'viem'



export default defineConfig({
  out: 'generated.ts',
  // contracts: [
  //   {
  //     name: 'KannonV1',
  //     address: {
  //       11155111: '0x...', // Sepolia
  //       421614: '0x...',   // Arbitrum Sepolia
  //       84532: '0x...',    // Base Goerli (testnet)
  //     },
  //     abi: KannonV1ABI as Abi,
  //   },
  //   {
  //     name: 'StargateV2Router',
  //     address: {
  //       11155111: '0x...', // Sepolia
  //       421614: '0x...',   // Arbitrum Sepolia
  //       84532: '0x...',    // Base Goerli (testnet)
  //     },
  //     abi: StargateV2RouterABI as Abi,
  //   },
  // ],
  plugins: [
    etherscan({
      apiKey: "NJA9ZM8DZJCBZAC75A722SRXTW11H9H8XG",
      chainId: 421614,

      contracts: [
        {
          name: 'TokenFactory',
          address: {


            ///TokenFactory a-0.12.0
            // 421614: '0x771f76df1751efcb5e3befb8d744555da9157f36',
            ///token factory b-0.13.0
            421614: '0x9DB01807e7a9a41Ce9Eb22c2427a5B4be602c0A7',
          },
        },
        {
          name: 'Semaphore',
          address: {
            11155111: '0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f',
            421614: '0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f',
            11155420: '0x1e0d7FF1610e480fC93BdEC510811ea2Ba6d7c2f'
          },
        },

      ],
    }),
    react(),
  ],
})


