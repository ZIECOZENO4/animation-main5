import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

interface EthereumPriceResponse {
    ethereum: {
        usd: number;
    };
}

export const runtime = 'edge'; // Use edge runtime for better performance

const fetchEthereumPrice = unstable_cache(
    async () => {
        const res = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );

        if (!res.ok) {
            throw new Error('Failed to fetch Ethereum price');
        }

        const data: EthereumPriceResponse = await res.json();
        return data;
    },
    ['ethereum-price'],
    { revalidate: 10 } // Cache for 10 seconds
);

export async function GET(req: NextRequest) {
    try {
        const data = await fetchEthereumPrice();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching Ethereum price:", error);
        return NextResponse.json({ error: 'Failed to fetch Ethereum price' }, { status: 500 });
    }
}