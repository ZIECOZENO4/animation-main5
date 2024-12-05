


"use client";

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import 'react-circular-progressbar/dist/styles.css';
import React, { useEffect, useState } from 'react';
import { BatchState, FormattedBatchMetrics, useLatestBatchMetrics } from '@/hooks/useFetchLatestBatch';
import { newCalculateFontSize } from '@/lib/newCalculateFontSize';
import { useEthereumPrice } from '@/hooks/useEthPrice';
import { Card} from "@nextui-org/react";
import { useTokenFactoryDurations } from '@/hooks/useContractConstants';
import { useWalletStore } from '@/zustand-wallet-store';
import { HeroSection } from './Hero';
import { BackgroundGradient } from "./ui/background-gradient";
import Image from "next/image";
import { StartingButton } from "./CreateButton";
import { HeroSearchInput } from "./HeroSearch";
import { ViewMoreButton } from "./ViewMoreButton";
import { motion, AnimatePresence } from "framer-motion";
import { Badge} from "@nextui-org/react"
import {Chip} from "@nextui-org/react";
import DigitalClock from "./timer/digital-clock";

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
            <div className="text-2xl font-bold flex gap-2 text-slate-500">
                <p className='flex gap-4'> 00 {String(timeRemaining.hours).padStart(2, '0')}:</p>
                 <p className='flex gap-4'> 00 {String(timeRemaining.minutes).padStart(2, '0')}:</p> 
                 <p className='flex gap-4 text-[#F7F2DA]'> 00 {String(timeRemaining.seconds).padStart(2, '0')}</p> 
            </div>
  
        </div>
    );
};

const NoActiveBatch: React.FC = () => {
    const router = useRouter();

    return (
    <HeroSection />
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
       
        <div className="flex justify-center items-center h-auto mt-4">
        <BackgroundGradient className="flex flex-col rounded-[22px] w-full align-middle items-center p-4 sm:p-10 bg-black">
      <StartingButton  />
        <div className="flex align-middle my-6 flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.div 
                className="relative w-32 md:w-44 md:h-44 h-32 rounded-full overflow-hidden"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <img
                  alt="Profile picture"
                  className="object-cover"
                  src='https://cryptologos.cc/logos/ethereum-eth-logo.png'
                />
                <div className="absolute inset-0 rounded-full border-2 border-slate-800 opacity-50"></div>
              </motion.div>
              <motion.div 
                className="text-center sm:text-left"
                key={batchMetrics.batch.batchId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl text-light  text-[#F7F2DA]">Batch [#{batchMetrics.batch.batchId}]</h2>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2 text-[#F7F2DA]">
          
                    <Chip color='default' variant='shadow' className='font-bold'>
                        {batchMetrics.batch.state}
                    </Chip>
                    <Chip color='warning' variant='dot' className='font-bold'>
                    {batchMetrics.batch.isVotingActive && (
                                    <span >
                                        Voting Active
                                    </span>
                                )}
                    </Chip>
                </div>

                <p className="mt-2 justify-center sm:justify-start  text-gray-500 flex"> Total Votes:{" "}<span className='ml-2 text-[#F7F2DA]'> {batchMetrics.stats.totalVotes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </span> </p>
                
                <p className=" justify-center sm:justify-start text-gray-500 flex">Total Staked:{" "}<span className='ml-2 text-[#F7F2DA]'>     <span className="font-medium text-foreground"
                                    style={{ fontSize: newCalculateFontSize(batchMetrics.stats.totalStaked.initial.toFixed(9), 'md') }}>
                                    {batchMetrics.stats.totalStaked.initial.toFixed(9)}
                                    {ethPrice?.ethereum?.usd && (
                                        <span className="ml-1 text-sm text-muted-foreground">
                                            ({formatUSD(calculateEthValue(batchMetrics.stats.totalStaked.initial))})
                                        </span>
                                    )}
                                </span></span> </p>
                                <p className=" justify-center sm:justify-start  text-gray-500 flex">   Participating Tokens:{" "}<span className='ml-2 text-[#F7F2DA]'>      {batchMetrics.stats.participatingTokens}</span> </p>
                <p className="text-slate-500 mt-2">
                  The progress of this Bath is currently:   {progress.toFixed(2)}%
                </p>
                <Chip color="default" className='text-sm md:text-md my-1 font-bold'>OXvfdt.....hghuya</Chip>
              </motion.div>
            </div>
            <div className="gap-4 my-2 flex flex-col w-full md:flex-row ">
              <div className="md:w-[70%] w-full">
    <HeroSearchInput />
              </div>
    
    <div className="md:w-[30%] w-full">
    <Button 
                className={`relative rounded-none px-4 py-2 bg-[#0A0909] text-[#F7F2DA]  border-2 border-[#1a1a1a]`}
                style={{
                    boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)',
                }}
            >
             <CountdownRenderer timeRemaining={timeRemaining} progress={progress} />
            </Button>            
                </div>
    
            </div>
          </BackgroundGradient>
        </div>
    );
};

export function BatchHero()  {
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
      
        <div className="div">
     {isLoading ? (
                           <HeroSection />
                    ) : error ? (
                       
                        <div className="flex justify-center items-center h-auto mt-4">
                        <BackgroundGradient className="flex flex-col rounded-[22px] w-full align-middle items-center p-4 sm:p-10 bg-black">
                      <StartingButton  />
                      <div className="text-center text-destructive p-4">
                                <p className="font-medium">Error loading batch metrics</p>
                                <p className="text-sm">{error.message}</p>
                            </div>
                           
                          </BackgroundGradient>
                        </div>
                    ) :
                        !batchMetrics ? (
                            <NoActiveBatch />
                        ) :

                            batchMetrics ? (
                                <BatchContent batchMetrics={batchMetrics} />
                            ) : null}
        </div>
    );
}