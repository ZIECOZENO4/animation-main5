"use client";
import React, { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button, Tooltip } from "@nextui-org/react";
import { Tabs, Tab } from '@nextui-org/react';
import { useAllBatchesMetrics } from '@/hooks/useFetchAllBatches';
import { BatchCard } from '../../components/tokenbatch/BatchCard';
import { BatchCard2 } from './BatchCard2';
import { useTokenFactoryDurations } from '@/hooks/useContractConstants';
import "./WorkbenchFontTest.css";
  import { motion, AnimatePresence } from "framer-motion";
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default function FirstSection() {
    const { durations, isLoading: durationsLoading, isError: durationsError } = useTokenFactoryDurations();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError
    } = useAllBatchesMetrics(durations);

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false
    });

    const handleFetchNextPage = useCallback(() => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

    useEffect(() => {
        if (inView) {
            handleFetchNextPage();
        }
    }, [inView, handleFetchNextPage]);

    const allBatches = React.useMemo(() => 
        data?.pages?.flatMap(page => page.batches) || [], 
        [data?.pages]
    );

    const renderContent = () => {
        if (isLoading || durationsLoading) {
            return <div className="flex justify-center items-center h-full">Loading batches...</div>;
        }

        if (isError || durationsError) {
            return (
                <div className="flex justify-center items-center h-full text-red-500">
                    Error fetching batches. Please try again.
                </div>
            );
        }

        if (allBatches.length === 0) {
            return <div className="flex justify-center items-center h-full">No batches found.</div>;
        }

        return (
            <>
                <div  className="flex justify-between gap-4">
  
        {allBatches.map((batch) => (
                        <BatchCard2
                            key={batch.id}
                            batch={batch}
                        />
                    ))}
      

                </div>
                <div ref={ref} className="flex justify-center mt-4">
                    {isFetchingNextPage ? (
                        <div className="text-center">Loading more batches...</div>
                    ) : hasNextPage ? (
                        <Button
                            onClick={handleFetchNextPage}
                            disabled={isFetchingNextPage}
                            variant="flat"
                            size="lg"
                        >
                            Load More
                        </Button>
                    ) : null}
                </div>
            </>
        );
    };

    return (
        <div className="min-h-screen p-1 md:p-6 lg:p-8">
            <Tabs className="w-full max-w-8xl mx-auto">
                <Tab key="initial" title="Initial">
                    <div className="h-[calc(100vh-200px)]">
                        {renderContent()}
                    </div>
      
                </Tab>
                <Tab key="anonymous" title="Anonymous">
                    <div className="h-[calc(100vh-200px)]">
                    {renderContent()}
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}
