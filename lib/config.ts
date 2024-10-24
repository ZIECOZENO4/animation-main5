'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import { arbitrumSepolia, baseSepolia, optimismSepolia, sepolia } from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';




// const localhost = /*#__PURE__*/ defineChain({
//    id: 31337,
//    name: 'Localhost',
//    nativeCurrency: {
//       decimals: 18,
//       name: 'Ether',
//       symbol: 'ETH',
//    },
//    rpcUrls: {
//       default: { http: ['http://127.0.0.1:8545'] },
//    },
// });



const projectId = process.env.NEXT_PUBLIC_WALLETCONNECTION_PROJECTID;
if (!projectId) {
   throw new Error('NEXT_PUBLIC_WALLETCONNECTION_PROJECTID is not set');
}
if (!process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || !process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL || !process.env.NEXT_PUBLIC_OPTIMISM_SEPOLIA_RPC_URL) {
   throw new Error('RPC URLs are not set')
}


// Determine the environment
const isDevelopment = process.env.NODE_ENV === 'development';

// Define RPC URLs for each chain
const rpcUrls: { [key: number]: string } = {
   [sepolia.id]: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL,
   [arbitrumSepolia.id]: process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL,
   [optimismSepolia.id]: process.env.NEXT_PUBLIC_OPTIMISM_SEPOLIA_RPC_URL,
};

// Define supported chains based on the environment
const supportedChains: Chain[] = isDevelopment ? [sepolia, arbitrumSepolia, optimismSepolia] : [sepolia, arbitrumSepolia, optimismSepolia];

export const config = getDefaultConfig({
   appName: "WalletConnection",
   projectId,
   chains: supportedChains as any,
   ssr: true,
   storage: createStorage({
      storage: cookieStorage,
   }),
   transports: supportedChains.reduce((obj, chain) => ({
      ...obj,
      [chain.id]: http(rpcUrls[chain.id] || '', {
         retryCount: 3,
         retryDelay: 1000,
      })
   }), {} as { [chainId: number]: ReturnType<typeof http> })
});