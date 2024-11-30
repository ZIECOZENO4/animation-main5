
"use client";

import { Search } from 'lucide-react';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { Skeleton } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, { useEffect } from 'react';
import { BatchState, FormattedBatchMetrics, useLatestBatchMetrics } from '@/hooks/useFetchLatestBatch';
import { newCalculateFontSize } from '@/lib/newCalculateFontSize';
import { useEthereumPrice } from '@/hooks/useEthPrice';
import { Card} from "@nextui-org/react";
import { useTokenFactoryDurations } from '@/hooks/useContractConstants';
import { useWalletStore } from '@/zustand-wallet-store';

interface CountdownRendererProps {
    timeRemaining: {
        total: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    progress: number;
}

interface LoadingStateProps {
    className?: string;
}

interface BatchDurations {
    // Add your duration properties here
    // Example:
    initialVoting: number;
    finalVoting: number;
  }
  
  // Define the return type for the hook
  interface TokenFactoryDurationsResult {
    durations: BatchDurations | null;
    isLoading: boolean;
    isError: boolean;
  }
  
const getProgressColor = (progress: number) => {
    if (progress >= 75) return '#22c55e';
    if (progress >= 50) return '#eab308';
    if (progress >= 25) return '#f97316';
    return '#ef4444';
};

function calculateTimeRemaining(stateUpdatedAt: Date, duration: number) {
    // Ensure stateUpdatedAt is a valid Date
    const updatedAt = new Date(stateUpdatedAt);
    if (isNaN(updatedAt.getTime())) {
        return { total: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const stateStartTime = Math.floor(updatedAt.getTime() / 1000);
    const endTime = stateStartTime + duration;
    const remaining = Math.max(0, endTime - currentTime);



    return {
        total: remaining,
        hours: Math.floor(remaining / 3600),
        minutes: Math.floor((remaining % 3600) / 60),
        seconds: remaining % 60
    };
}

const CountdownRenderer: React.FC<CountdownRendererProps> = ({ timeRemaining, progress }) => {
    return (
        <div className="text-center">
            <div className="text-2xl font-bold">
                {String(timeRemaining.hours).padStart(2, '0')}:
                {String(timeRemaining.minutes).padStart(2, '0')}:
                {String(timeRemaining.seconds).padStart(2, '0')}
            </div>
            <div className="text-sm text-muted-foreground">remaining</div>
        </div>
    );
};

const NoActiveBatch: React.FC = () => {
    const router = useRouter();

    return (
        <Card className="w-full">
            <div className="flex flex-col items-center justify-center space-y-6 py-10">
                <div className="text-center space-y-3">
                    <h1 className="text-2xl font-semibold">
                        There is no active batch at the moment
                    </h1>
                    <p className="text-muted-foreground">
                        Create token to be the first to create an active batch
                    </p>
                </div>
                <Button
                    onClick={() => router.push('/create')}
                    className="bg-primary hover:bg-primary/90"
                    size="lg"
                >
                    Create Token
                </Button>
            </div>
        </Card>
    );
};

interface BatchContentProps {
    batchMetrics: FormattedBatchMetrics;
    // Replace 'any' with your actual BatchMetrics type
}

const BatchContent: React.FC<BatchContentProps> = ({ batchMetrics }) => {
    const progress = batchMetrics.batch.progress;
    const progressColor = getProgressColor(progress);
    const { data: ethPrice } = useEthereumPrice();
    const [timeRemaining, setTimeRemaining] = React.useState(
        calculateTimeRemaining(
            batchMetrics.batch.stateUpdatedAt,
            batchMetrics.batch.stateDuration
        )
    );
    const shouldShowNoActiveBatch = () => {
        return timeRemaining.total === 0 || batchMetrics.batch.stateNumber !== BatchState.INITIAL_VOTING;
    };
    // Calculate ETH value
    const calculateEthValue = (stakedAmount: number) => {
        if (!ethPrice?.ethereum?.usd) return 0;
        return stakedAmount * ethPrice.ethereum.usd;
    };

    const formatUSD = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    };

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(
                calculateTimeRemaining(
                    batchMetrics.batch.stateUpdatedAt,
                    batchMetrics.batch.stateDuration
                )
            );
        }, 1000);
        return () => clearInterval(timer);
    }, [batchMetrics.batch.stateUpdatedAt, batchMetrics.batch.stateDuration]);

    // Check if the batch is completed or inactive
    if (shouldShowNoActiveBatch()) {
        return <NoActiveBatch />;
    }


    return (
        <Card className="w-full">
            <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                    <div className="w-[200px] h-[200px] relative">
                        <CircularProgressbar
                            value={progress}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'round',
                                pathColor: progressColor,
                                trailColor: 'var(--muted)',
                                backgroundColor: 'var(--background)',
                            })}
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <CountdownRenderer timeRemaining={timeRemaining} progress={progress} />
                        </div>
                    </div>

                    <div className="text-center sm:text-left space-y-3">
                        <div>
                            <h1 className="text-xl mb-2">
                                Batch #{batchMetrics.batch.batchId}
                            </h1>
                            <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                    {batchMetrics.batch.state}
                                </span>
                                {batchMetrics.batch.isVotingActive && (
                                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm animate-pulse">
                                        Voting Active
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>
                                Total Votes:{" "}
                                <span className="font-medium text-foreground">
                                    {batchMetrics.stats.totalVotes.toLocaleString()}
                                </span>
                            </p>
                            <p>
                                Total Staked:{" "}
                                <span className="font-medium text-foreground"
                                    style={{ fontSize: newCalculateFontSize(batchMetrics.stats.totalStaked.initial.toFixed(9), 'md') }}>
                                    {batchMetrics.stats.totalStaked.initial.toFixed(9)}
                                    {ethPrice?.ethereum?.usd && (
                                        <span className="ml-1 text-sm text-muted-foreground">
                                            ({formatUSD(calculateEthValue(batchMetrics.stats.totalStaked.initial))})
                                        </span>
                                    )}
                                </span>
                            </p>
                            <p>
                                Participating Tokens:{" "}
                                <span className="font-medium text-foreground">
                                    {batchMetrics.stats.participatingTokens}
                                </span>
                            </p>
                            <p>
                                Progress:{" "}
                                <span className="font-medium text-foreground">
                                    {progress.toFixed(2)}%
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export function MainContent()  {
    const router = useRouter();
    const { durations, isLoading: durationsLoading, isError: durationsError } = useTokenFactoryDurations();

    const { data: batchMetrics, isLoading, error } = useLatestBatchMetrics(durations);
    const [searchQuery, setSearchQuery] = React.useState('');
    const { setCurrentBatchId } = useWalletStore();
    useEffect(() => {
        if (batchMetrics) {
            // Convert the numeric batchId to string since your store expects a string
            const batchId = batchMetrics.batch.batchId.toString();
            setCurrentBatchId(batchId);
        }
    }, [batchMetrics?.batch.batchId, setCurrentBatchId, batchMetrics]);


    return (
        <div className="md:container bg-background max-w-4xl mx-auto py-4 px-4 md:px-6 lg:py-8">
            <Card className="shadow-lg transition-all hover:shadow-xl">
                <div className="p-4 md:p-6 lg:p-8">
                

                    {isLoading ? (
                          <p className="text-sm">Loading batch</p>
                    ) : error ? (
                        <Card className="bg-destructive/10">
                            <div className="text-center text-destructive p-4">
                                <p className="font-medium">Error loading batch metrics</p>
                                <p className="text-sm">{error.message}</p>
                            </div>
                        </Card>
                    ) :
                        !batchMetrics ? (
                            <NoActiveBatch />
                        ) :

                            batchMetrics ? (
                                <BatchContent batchMetrics={batchMetrics} />
                            ) : null}

                  
                </div>
            </Card>
        </div>
    );
}