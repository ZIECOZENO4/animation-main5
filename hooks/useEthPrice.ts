import { useQuery } from '@tanstack/react-query';

interface EthereumPriceData {
    ethereum: {
        usd: number;
    };
}

async function fetchEthereumPrice() {
    const response = await fetch('/api/ethPrice');
    if (!response.ok) {
        throw new Error('Failed to fetch Ethereum price');
    }
    const data = await response.json();
    return data as EthereumPriceData
}

export function useEthereumPrice() {
    return useQuery({
        queryKey: ['ethereumPrice'],
        queryFn: fetchEthereumPrice,
        refetchInterval: 10000 * 6 * 3, // Refetch every 10 seconds
    });
}