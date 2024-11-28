"use client";
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tabs, Tab } from "@nextui-org/react"; // Updated import
import { Button } from "@nextui-org/react";
import { useTokensForBatch } from '@/hooks/useFetchTokens';
import { useCurrencyStore } from '@/zustand-store';
import { CustomCard } from './customTokens';

export default function FirstSection({ batchId }: { batchId: string }) {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useTokensForBatch(batchId);
    const { ref, inView } = useInView();
    const { isEth, toggleCurrency } = useCurrencyStore();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const batchState = data?.pages.flatMap(page => page.batchState)[0] || 0;

    // Flatten the tokens from all pages
    const allTokens = data?.pages.flatMap(page => page.tokens) || [];

    return (
        <div className="min-h-screen bg-background text-foreground p-1 md:p-6 lg:p-8">
            <Tabs  className="w-full max-w-8xl mx-auto">
                <div className='flex justify-between'>
                    <div className="mb-4">
                        <Tab value="following">Following</Tab>
                        <Tab value="terminal">Terminal</Tab>
                    </div>
                    <Button
                        onClick={toggleCurrency}
                        className={`transition-colors ${isEth ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                        {isEth ? 'ETH' : 'USD'}
                    </Button>
                </div>

                <div className="h-[calc(100vh-200px)]">
                    {status === 'pending' ? (
                        <div className="div">Loading tokens...</div>
                    ) : status === 'error' ? (
                        <div className="div">Error fetching tokens. Please try again.</div>
                    ) : allTokens.length === 0 ? (
                        <div className="div">No tokens found.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {allTokens.map((token) => (
                                <CustomCard
                                    key={token.id}
                                    batchId={batchId}
                                    batchState={batchState}
                                    token={token} // Pass the entire token object as a prop
                                />
                            ))}
                        </div>
                    )}
                    <div ref={ref} className="flex justify-center mt-4">
                        {isFetchingNextPage ? (
                            <div className="div">Loading more tokens....</div>
                        ) : hasNextPage ? (
                            <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                                Load More
                            </Button>
                        ) : null}
                    </div>
                </div>
            </Tabs>
        </div>
    );
}