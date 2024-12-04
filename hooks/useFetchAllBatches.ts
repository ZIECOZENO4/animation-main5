
import { useInfiniteQuery } from '@tanstack/react-query'
import { gql, request, ClientError } from 'graphql-request'
import { GRAPH_API_URL } from '@/constants'
import { getStateLabel, isActiveVotingState } from './useFetchLatestBatch'
import { formatUnits } from 'viem'
import { getPhaseInfo } from '@/hooks/useContractConstants'
import { useMemo } from 'react'
import { BatchState } from '@/app/true-types'

const ITEMS_PER_PAGE = 10

const AllBatchesMetricsQuery = gql`
  query GetAllBatchMetrics($skip: Int!, $first: Int!) {
    batches(
      skip: $skip
      first: $first
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      batchId
      state
      createdAt
      stateUpdatedAt
      tokens {
        id
        address
  
      }
      initialVotingData {
        totalInitialVotes
        totalInitialStaked
        resultsSubmitted
        topTokens
        votes {
          id
          amount
       
        }
        withdrawals {
          id
          amount
        }
        batchCountingStates {
          id
          previousState
          newState
          processedCount
          totalToProcess
          timestamp
        }
        batchInitializations {
          id
          batchesProcessed
          totalBatchesNeeded
          currentTokenIndex
          totalTokens
          timestamp
        }
        heapUpdates {
          id
          processedTokens
          remainingTokens
          currentBatchIndex
          totalBatches
          timestamp
        }
        finalResults {
          id
          finalTopTokens
          finalStakedAmounts
          totalProcessedTokens
          totalStakesCounted
          processingDuration
          timestamp
        }
      }
      anonymousVotingData {
        totalAnonymousVotes
        totalAnonymousStaked
        resultsSubmitted
        topTokens
        votes {
          id
       
          stakeAmount
        }
        decryptedVotes {
          id
          stakedAmount
        }
        memberRegistrations {
          id
          identityCommitment
          timestamp
        }
        stakeClaims {
          id
          amountClaimed
          timestamp
        }
      }
    }
  }
`

interface BatchCountingState {
    id: string
    previousState: number
    newState: number
    processedCount: string
    totalToProcess: string
    timestamp: string
}

interface BatchInitialization {
    id: string
    batchesProcessed: string
    totalBatchesNeeded: string
    currentTokenIndex: string
    totalTokens: string
    timestamp: string
}

interface HeapUpdate {
    id: string
    processedTokens: string
    remainingTokens: string
    currentBatchIndex: string
    totalBatches: string
    timestamp: string
}

interface FinalResult {
    id: string
    finalTopTokens: string[]
    finalStakedAmounts: string[]
    totalProcessedTokens: string
    totalStakesCounted: string
    processingDuration: string
    timestamp: string
}

interface VotingPhaseData {
    totalInitialVotes?: string
    totalInitialStaked?: string
    totalAnonymousVotes?: string
    totalAnonymousStaked?: string
    resultsSubmitted: boolean
    topTokens: string[]
    votes: {
        id: string

        amount?: string
        stakeAmount?: string
    }[]
    withdrawals?: { id: string; amount: string }[]
    batchCountingStates: BatchCountingState[]
    batchInitializations: BatchInitialization[]
    heapUpdates: HeapUpdate[]
    finalResults: FinalResult[]
    memberRegistrations?: { id: string; identityCommitment: string; timestamp: string }[]
    stakeClaims?: { id: string; amountClaimed: string; timestamp: string }[]
    decryptedVotes?: { id: string; stakedAmount: string }[]
}

interface BatchMetrics {
    id: string
    batchId: string
    state: number
    createdAt: string
    stateUpdatedAt: string
    tokens: {
        id: string
        address: string

    }[]
    initialVotingData: VotingPhaseData
    anonymousVotingData: VotingPhaseData
}

interface BatchesQueryResponse {
    batches: BatchMetrics[]
}

interface ProcessingState {
    current: number
    total: number
    percentage: number
    timestamp: string
}

interface BatchProcessingStates {
    counting?: ProcessingState
    initialization?: ProcessingState
    heap?: ProcessingState
    final?: {
        topTokens: string[]
        stakedAmounts: string[]
        totalProcessed: number
        totalStaked: number
        duration: number
        timestamp: string
    }
}

interface FormattedVotingPhase {
    totalVotes: number
    totalStaked: number
    resultsSubmitted: boolean
    topTokensCount: number
    participationMetrics: {
        voteCount: number
        totalStaked: number
        averageStake: number
    }
    processingStates: BatchProcessingStates
}

export interface FormattedBatch {
    id: string
    batchId: number
    state: BatchState
    stateNumber: number
    isVotingActive: boolean
    createdAt: Date
    stateUpdatedAt: Date
    progress: number
    totalTokens: number
    initialVoting: FormattedVotingPhase
    anonymousVoting: FormattedVotingPhase
}

interface QueryPageData {
    pageParam?: number
}

function formatVotingPhase(data: VotingPhaseData | null | undefined, phase: 'initial' | 'anonymous'): FormattedVotingPhase {
    if (!data) {
        return {
            totalVotes: 0,
            totalStaked: 0,
            resultsSubmitted: false,
            topTokensCount: 0,
            participationMetrics: {
                voteCount: 0,
                totalStaked: 0,
                averageStake: 0
            },
            processingStates: {}
        }
    }

    const totalVotes = phase === 'initial'
        ? Number(data?.totalInitialVotes ?? '0')
        : Number(data?.totalAnonymousVotes ?? '0');

    const totalStaked = parseFloat(
        formatUnits(
            BigInt(
                phase === 'initial'
                    ? data?.totalInitialStaked ?? '0'
                    : data?.totalAnonymousStaked ?? '0'
            ),
            18
        )
    );

    const voteCount = data?.votes?.length ?? 0;
    const processingStates: BatchProcessingStates = {};

    // Format counting state
    if (data.batchCountingStates?.length > 0) {
        const latestCount = data.batchCountingStates[0];
        if (latestCount) {
            processingStates.counting = {
                current: Number(latestCount.processedCount ?? '0'),
                total: Number(latestCount.totalToProcess ?? '0'),
                percentage: Number(latestCount.totalToProcess) > 0
                    ? (Number(latestCount.processedCount ?? '0') / Number(latestCount.totalToProcess)) * 100
                    : 0,
                timestamp: latestCount.timestamp ?? '0'
            }
        }
    }

    // Format initialization state
    if (data.batchInitializations?.length > 0) {
        const latestInit = data.batchInitializations[0];
        if (latestInit) {
            processingStates.initialization = {
                current: Number(latestInit.batchesProcessed ?? '0'),
                total: Number(latestInit.totalBatchesNeeded ?? '0'),
                percentage: Number(latestInit.totalBatchesNeeded) > 0
                    ? (Number(latestInit.batchesProcessed ?? '0') / Number(latestInit.totalBatchesNeeded)) * 100
                    : 0,
                timestamp: latestInit.timestamp ?? '0'
            }
        }
    }

    // Format heap processing state
    if (data.heapUpdates?.length > 0) {
        const latestHeap = data.heapUpdates[0];
        if (latestHeap) {
            const processed = Number(latestHeap.processedTokens ?? '0');
            const remaining = Number(latestHeap.remainingTokens ?? '0');
            const total = processed + remaining;
            processingStates.heap = {
                current: processed,
                total,
                percentage: total > 0 ? (processed / total) * 100 : 0,
                timestamp: latestHeap.timestamp ?? '0'
            }
        }
    }

    // Format final results
    if (data.finalResults?.length > 0) {
        const final = data.finalResults[0];
        if (final) {
            processingStates.final = {
                topTokens: final.finalTopTokens ?? [],
                stakedAmounts: final.finalStakedAmounts ?? [],
                totalProcessed: Number(final.totalProcessedTokens ?? '0'),
                totalStaked: Number(final.totalStakesCounted ?? '0'),
                duration: Number(final.processingDuration ?? '0'),
                timestamp: final.timestamp ?? '0'
            }
        }
    }

    return {
        totalVotes,
        totalStaked,
        resultsSubmitted: data.resultsSubmitted ?? false,
        topTokensCount: data.topTokens?.length ?? 0,
        participationMetrics: {
            voteCount,
            totalStaked,
            averageStake: voteCount > 0 ? totalStaked / voteCount : 0
        },
        processingStates
    }
}
function calculateTimeMetrics(batch: BatchMetrics, duration: number) {
    const currentTime = Math.floor(Date.now() / 1000);
    const stateStartTime = parseInt(batch.stateUpdatedAt ?? '0');
    const elapsedTime = currentTime - stateStartTime;

    // Only calculate progress for voting states
    const isVotingState = batch.state === BatchState.INITIAL_VOTING ||
        batch.state === BatchState.ANONYMOUS_VOTING;

    const progress = isVotingState
        ? Math.min((elapsedTime / duration) * 100, 100)
        : 0; // Return 0 progress for non-voting states

    return { progress };
}

function formatBatchMetrics(batch: BatchMetrics, durations: bigint | undefined): FormattedBatch {
    const phaseInfo = getPhaseInfo(batch.state ?? 0, durations);
    const { progress } = calculateTimeMetrics(batch, phaseInfo.duration);
    const batchState = (batch.state ?? 0) as BatchState;
    const showProgress = batchState === BatchState.INITIAL_VOTING ||
        batchState === BatchState.ANONYMOUS_VOTING;

    return {
        id: batch.id ?? '',
        batchId: parseInt(batch.batchId ?? '0'),
        state: batchState,
        stateNumber: batchState,
        isVotingActive: isActiveVotingState(batchState),
        createdAt: new Date(parseInt(batch.createdAt ?? '0') * 1000),
        stateUpdatedAt: new Date(parseInt(batch.stateUpdatedAt ?? '0') * 1000),
        progress: showProgress ? progress : 0,
        totalTokens: batch.tokens?.length ?? 0,
        initialVoting: formatVotingPhase(batch.initialVotingData, 'initial'),
        anonymousVoting: formatVotingPhase(batch.anonymousVotingData, 'anonymous')
    };
}
export function useAllBatchesMetrics(durations: bigint | undefined) {
    const areDurationsAvailable = useMemo(() => {
        if (!durations) return false
        return Number(durations) > 0
    }, [durations])

    return useInfiniteQuery({
        queryKey: ['allBatchesMetrics'],
        queryFn: async ({ pageParam = 0 }: QueryPageData) => {
            try {
                const result = await request<BatchesQueryResponse>(
                    GRAPH_API_URL,
                    AllBatchesMetricsQuery,
                    {
                        skip: pageParam * ITEMS_PER_PAGE,
                        first: ITEMS_PER_PAGE,
                    }
                )

                if (process.env.NODE_ENV === 'development') {
                    console.log('GraphQL Response:', JSON.stringify(result, null, 2))
                }

                return {
                    batches: (result?.batches ?? []).map(batch => formatBatchMetrics(batch, durations!)),
                    nextPage: (result?.batches?.length ?? 0) === ITEMS_PER_PAGE ? pageParam + 1 : undefined,
                }
            } catch (error) {
                if (error instanceof ClientError) {
                    console.error('GraphQL error:', error.response.errors)
                    throw new Error(
                        `GraphQL error: ${error.response.errors?.[0]?.message || 'Unknown error'}`
                    )
                }
                console.error('Unexpected error:', error)
                throw new Error('An unexpected error occurred while fetching batch metrics')
            }
        },
        getNextPageParam: (lastPage) => lastPage.nextPage,
        enabled: !!areDurationsAvailable,
        initialPageParam: 0,
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    })
}