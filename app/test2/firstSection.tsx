

"use client";
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button } from "@nextui-org/react";
import { Tabs, Tab} from '@nextui-org/react';
import { useAllBatchesMetrics } from '@/hooks/useFetchAllBatches';

import { BatchCard } from '../../components/tokenbatch/BatchCard';
import { useTokenFactoryDurations } from '@/hooks/useContractConstants';

export default function FirstSection() {
    const { durations, isLoading: durationsLoading, isError: durationsError } = useTokenFactoryDurations();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useAllBatchesMetrics(durations);
    console.log("this is the one that is returned inside of the use all batches metrics too ", { data });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    // Get all batches from all pages
    const allBatches = data?.pages.flatMap(page => page.batches) || [];



    return (
        <div className="min-h-screen bg-background text-foreground p-1 md:p-6 z-[30] lg:p-8">
            <Tab className="w-full max-w-8xl mx-auto">
                <div className='flex justify-between'>
                    <Tabs className="mb-4">
                        <div>All</div>
                        <div>Following</div>
                    </Tabs>
                </div>

          

                <div className="h-[calc(100vh-200px)]">
                    {status === 'pending' || durationsLoading ? (
                        <div className="div">
                            Loading batches...
                        </div>
                    ) : status === 'error' ? (
              
                        <div className="div">
                     Error fetching batches. Please try again.
                    </div>
                    ) : allBatches.length === 0 ? (
                  
                        <div className="div">
                     No batches found.
                       </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {allBatches.map((batch) => (
                                <BatchCard
                                    key={batch.id}
                                    batch={batch}
                                />
                            ))}
                        </div>
                    )}
                    <div ref={ref} className="flex justify-center mt-4">
                        {isFetchingNextPage ? (
                 
                            <div className="div">
                        Loading more batches...
                           </div>
                        ) : hasNextPage ? (
                            <Button
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                            >
                                Load More
                            </Button>
                        ) : null}
                    </div>
                </div>
            </Tab>
        </div>
    );
}