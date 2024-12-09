
import { NetworkEthereum, NetworkBase, NetworkArbitrumOne, NetworkBinanceSmartChain, NetworkFraxtal, NetworkPolygonPos, NetworkOptimism, NetworkAvalanche } from '@web3icons/react';
import React, { ReactNode } from 'react';
import { FaFilter } from 'react-icons/fa';

export interface Chain {
    value: string;
    label: string;
    icon: (size: number) => ReactNode;
    chainId: number;
    layerZeroV2Eid: number;
}
export const blockchainData = [
    {
        name: "Optimism Sepolia",
        chainId: 11155420,
        layerZeroV2Eid: 40232,
        weth_address: "0x4200000000000000000000000000000000000006",
    },
    {
        name: "Arbitrum Sepolia",
        chainId: 421614,
        layerZeroV2Eid: 40231,
        weth_address: "0x4200000000000000000000000000000000000006",
    },
    {
        name: "Sepolia",
        chainId: 11155111,
        layerZeroV2Eid: 40161,
        weth_address: "0x4200000000000000000000000000000000000006",
    }
];

export function getChains(iconSize: number = 16): Record<string, Chain> {
    return {
        ethereum: { value: 'ethereum', label: 'Ethereum (Sepolia)', icon: (size: number) => <NetworkEthereum variant="branded" size={size} />, chainId: 11155111, layerZeroV2Eid: 40161 },
        base: { value: 'base', label: 'Base (Goerli)', icon: (size: number) => <NetworkBase variant="branded" size={size} />, chainId: 84531, layerZeroV2Eid: 4023255 },
        arbitrum: { value: 'arbitrum', label: 'Arbitrum (Sepolia)', icon: (size: number) => <NetworkArbitrumOne size={size} variant="branded" />, chainId: 421614, layerZeroV2Eid: 40231 },
        bnb: { value: 'bnb', label: 'BNB Smart Chain (Testnet)', icon: (size: number) => <NetworkBinanceSmartChain variant="branded" size={size} />, chainId: 97, layerZeroV2Eid: 4023211 },
        fraxtal: { value: 'fraxtal', label: 'Fraxtal (Testnet)', icon: (size: number) => <NetworkFraxtal variant="branded" size={size} />, chainId: 2522, layerZeroV2Eid: 4023211 },
        polygon: { value: 'polygon', label: 'Polygon (Mumbai)', icon: (size: number) => <NetworkPolygonPos variant="branded" size={size} />, chainId: 80001, layerZeroV2Eid: 4023211 },
        optimism: { value: 'optimism', label: 'Optimism (Sepolia)', icon: (size: number) => <NetworkOptimism variant="branded" size={size} />, chainId: 11155420, layerZeroV2Eid: 40232 },
        avalanche: { value: 'avalanche', label: 'Avalanche (Fuji)', icon: (size: number) => <NetworkAvalanche variant="branded" size={size} />, chainId: 43113, layerZeroV2Eid: 4023111 },
    };
}

// export function getChainInfo(chainKey: string, iconSize: number = 16): Chain | undefined {
//     const chains = getChains(iconSize);
//     return chains[chainKey];
// }

export function getChainIconByChainId(chainId: number, iconSize: number = 16): ReactNode | undefined {
    const chains = getChains(iconSize);
    const chain = Object.values(chains).find(chain => chain.chainId === chainId);
    return chain?.icon(iconSize);
}

export function getChainByChainId(chainId: number, iconSize: number = 16): Chain | undefined {
    const chains = getChains(iconSize);
    return Object.values(chains).find(chain => chain.chainId === chainId);
}

export function getChainByLayerZeroEid(eid: number, iconSize: number = 16): Chain | undefined {
    const chains = getChains(iconSize);
    return Object.values(chains).find(chain => chain.layerZeroV2Eid === eid);
}

export function getArbitrumSepoliaChain(iconSize: number = 16): Chain {
    const chains = getChains(iconSize);
    const arbitrumSepolia = chains['arbitrum'];
    if (!arbitrumSepolia) {
        throw new Error("Arbitrum Sepolia chain not found in getChains()");
    }
    return arbitrumSepolia;
}

export function getChainInfo(eid: number, tradeType: number, iconSize: number = 16) {
    if (eid === 0) {
        // No cross-chain activity, return only Arbitrum Sepolia
        const arbitrumSepolia = getArbitrumSepoliaChain(iconSize);
        return { singleChain: arbitrumSepolia };
    }

    const chain = getChainByLayerZeroEid(eid, iconSize);
    if (!chain) {
        // If EID doesn't exist, default to Arbitrum Sepolia
        const arbitrumSepolia = getArbitrumSepoliaChain(iconSize);
        return { singleChain: arbitrumSepolia };
    }

    const arbitrumSepolia = getArbitrumSepoliaChain(iconSize);
    const isBuy = tradeType === 0;
    const isSell = tradeType === 1;

    let fromChain, toChain;
    if (isBuy) {
        fromChain = chain;
        toChain = arbitrumSepolia;
    } else if (isSell) {
        fromChain = arbitrumSepolia;
        toChain = chain;
    }

    return { fromChain, toChain };
}