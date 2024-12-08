
import { useQuery } from '@tanstack/react-query'
import { gql, request, ClientError } from 'graphql-request'
import { GRAPH_API_URL } from '@/constants'
import { formatUnits } from 'viem'
import { getPhaseInfo } from '@/hooks/useContractConstants'
import { useMemo } from 'react'
import { BatchState } from '@/app/true-types'

// Enums


// GraphQL Query Result Types
interface BatchQueryResult {
    batch: {
        id: string
        batchId: string
        state: number
        createdAt: string
        stateUpdatedAt: string
        tokens: {
            id: string
            address: string
            totalInitialVotes: string
            totalInitialStaked: string
            totalAnonymousStaked: string
            totalAnonymousVotes: string
            withdrawals: { id: string }[]
        }[]
        initialVotingData: {
            totalInitialVotes: string
            totalInitialStaked: string
            resultsSubmitted: boolean
            topTokens: string[]
            votes: {
                id: string
                amount: string

            }[]
            withdrawals: {
                id: string
                amount: string
            }[]
            batchCountingStates: {
                processedCount: string
                totalToProcess: string
                newState: string
            }[]
            batchInitializations: {
                batchesProcessed: string
                totalBatchesNeeded: string
                currentTokenIndex: string
                totalTokens: string
            }[]
            heapUpdates: {
                processedTokens: string
                remainingTokens: string
                currentBatchIndex: string
                totalBatches: string
            }[]
            finalResults: {
                finalTopTokens: string[]
                finalStakedAmounts: string[]
                totalProcessedTokens: string
                totalStakesCounted: string
            }[]
        }
        anonymousVotingData: {
            totalAnonymousVotes: string
            totalAnonymousStaked: string
            resultsSubmitted: boolean
            topTokens: string[]
            votes: {
                id: string

                stakeAmount: string
            }[]
            decryptedVotes: {
                id: string
                stakedAmount: string
            }[]
            memberRegistrations: {
                id: string
                identityCommitment: string
            }[]
        }
    }
}

// GraphQL Query
const BatchMetricsQuery = gql`
  query GetBatchMetrics($batchId: String!) {
    batch(id: $batchId) {
      id
      batchId
      state
      createdAt
      stateUpdatedAt
      tokens {
        id
        address
        totalInitialVotes
        totalInitialStaked
        totalAnonymousVotes
        totalAnonymousStaked
        withdrawals {
          id
        }
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
          processedCount
          totalToProcess
          newState
        }
        batchInitializations {
          batchesProcessed
          totalBatchesNeeded
          currentTokenIndex
          totalTokens
        }
        heapUpdates {
          processedTokens
          remainingTokens
          currentBatchIndex
          totalBatches
        }
        finalResults {
          finalTopTokens
          finalStakedAmounts
          totalProcessedTokens
          totalStakesCounted
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
        }
      }
    }
  }
`

// Utility Functions
export function getStateLabel(state: number): string {
    switch (state) {
        case BatchState.INACTIVE: return 'Inactive'
        case BatchState.INITIAL_VOTING: return 'Initial Voting'
        case BatchState.INITIAL_COUNTING: return 'Queue'
        case BatchState.ANONYMOUS_VOTING: return 'Anonymous Voting'
        case BatchState.ANONYMOUS_COUNTING: return 'Anonymous Counting'
        case BatchState.COMPLETED: return 'Completed'
        default: return 'Unknown'
    }
}

export function isActiveVotingState(state: number): boolean {
    return state === BatchState.INITIAL_VOTING || state === BatchState.ANONYMOUS_VOTING
}

function calculateTimeMetrics(batch: BatchQueryResult['batch'], duration: number) {
    // Only calculate time metrics for voting states
    if (batch.state !== BatchState.INITIAL_VOTING && batch.state !== BatchState.ANONYMOUS_VOTING) {
        return {
            elapsedTime: 0,
            duration: 0,
            progress: 0
        }
    }

    const currentTime = Math.floor(Date.now() / 1000)
    const stateStartTime = parseInt(batch.stateUpdatedAt)
    const elapsedTime = currentTime - stateStartTime
    const progress = Math.min((elapsedTime / duration) * 100, 100)

    return {
        elapsedTime,
        duration,
        progress
    }
}
// Interface Definitions
export interface VotingPhaseData {
    totalVotes: number
    totalStaked: number
    resultsSubmitted: boolean
    topTokens: string[]
    participationMetrics: {
        voteCount: number
        totalStaked: number
        averageStake: number
    }
}

export interface FormattedToken {
    id: string
    address: string
    votes: number
    staked: number
    withdrawalCount: number
}

export interface FormattedBatch {
    id: string
    batchId: number
    state: BatchState
    stateNumber: number
    isVotingActive: boolean
    createdAt: Date
    stateUpdatedAt: Date
    stateDuration: number
    progress: number
}

export interface BatchStatistics {
    totalTokens: number
    participatingTokens: number
    totalWithdrawals: number
    averageStakePerToken: number
    averageVotesPerToken: number
}

export interface FormattedBatchMetrics {
    batch: FormattedBatch
    tokens: FormattedToken[]
    stats: BatchStatistics
    initialVoting: VotingPhaseData
    anonymousVoting: VotingPhaseData
    currentPhaseProgress: {
        processed: number
        total: number
        percentage: number
    }
}
function getCountingProgress(batch: BatchQueryResult['batch']) {
    const countingStates = batch.initialVotingData.batchCountingStates
    if (!countingStates || countingStates.length === 0) {
        return { processed: 0, total: 0, percentage: 0 }
    }

    const latestState = countingStates[countingStates.length - 1]
    return {
        processed: Number(latestState.processedCount),
        total: Number(latestState.totalToProcess),
        percentage: (Number(latestState.processedCount) / Number(latestState.totalToProcess)) * 100
    }
}

function formatVotingPhaseData(data: BatchQueryResult['batch']['initialVotingData'] | BatchQueryResult['batch']['anonymousVotingData']): VotingPhaseData {
    const totalVotes = Number('totalInitialVotes' in data ? data.totalInitialVotes : data.totalAnonymousVotes);
    const totalStaked = parseFloat(formatUnits(BigInt('totalInitialStaked' in data ? data.totalInitialStaked : data.totalAnonymousStaked), 18));
    const voteCount = data.votes.length;

    return {
        totalVotes,
        totalStaked,
        resultsSubmitted: data.resultsSubmitted,
        topTokens: data.topTokens,
        participationMetrics: {
            voteCount,
            totalStaked,
            averageStake: voteCount > 0 ? totalStaked / voteCount : 0
        }
    }
}

// Formatting Function
function formatBatchMetrics(
    batch: BatchQueryResult['batch'],
    durations: bigint | undefined
): FormattedBatchMetrics {
    const phaseInfo = getPhaseInfo(batch.state, durations)
    const { progress, duration } = calculateTimeMetrics(batch, phaseInfo.duration)

    // Format tokens
    const formattedTokens = batch.tokens.map(token => ({
        id: token.id,
        address: token.address,
        votes: Number(token.totalInitialVotes),
        staked: parseFloat(formatUnits(BigInt(token.totalInitialStaked), 18)),
        withdrawalCount: token.withdrawals.length
    }))

    // Get counting progress from new structure
    const countingProgress = (() => {
        if (batch.state === BatchState.INITIAL_COUNTING) {
            const countingStates = batch.initialVotingData.batchCountingStates
            const initializations = batch.initialVotingData.batchInitializations
            const heapUpdates = batch.initialVotingData.heapUpdates

            if (countingStates && countingStates.length > 0) {
                const latest = countingStates[countingStates.length - 1]
                return {
                    processed: Number(latest.processedCount),
                    total: Number(latest.totalToProcess),
                    percentage: (Number(latest.processedCount) / Number(latest.totalToProcess)) * 100
                }
            } else if (initializations && initializations.length > 0) {
                const latest = initializations[initializations.length - 1]
                return {
                    processed: Number(latest.batchesProcessed),
                    total: Number(latest.totalBatchesNeeded),
                    percentage: (Number(latest.batchesProcessed) / Number(latest.totalBatchesNeeded)) * 100
                }
            } else if (heapUpdates && heapUpdates.length > 0) {
                const latest = heapUpdates[heapUpdates.length - 1]
                return {
                    processed: Number(latest.processedTokens),
                    total: Number(latest.processedTokens) + Number(latest.remainingTokens),
                    percentage: (Number(latest.processedTokens) / (Number(latest.processedTokens) + Number(latest.remainingTokens))) * 100
                }
            }
        }
        return { processed: 0, total: 0, percentage: 0 }
    })()

    return {
        batch: {
            id: batch.id,
            batchId: parseInt(batch.batchId),
            state: batch.state,
            stateNumber: batch.state,
            isVotingActive: isActiveVotingState(batch.state),
            createdAt: new Date(parseInt(batch.createdAt) * 1000),
            stateUpdatedAt: new Date(parseInt(batch.stateUpdatedAt) * 1000),
            stateDuration: duration,
            progress
        },
        tokens: formattedTokens,
        stats: {
            totalTokens: batch.tokens.length,
            participatingTokens: formattedTokens.filter(t => t.votes > 0 || t.staked > 0).length,
            totalWithdrawals: formattedTokens.reduce((sum, token) => sum + token.withdrawalCount, 0),
            averageStakePerToken: formattedTokens.length > 0
                ? formattedTokens.reduce((sum, t) => sum + t.staked, 0) / formattedTokens.length
                : 0,
            averageVotesPerToken: formattedTokens.length > 0
                ? formattedTokens.reduce((sum, t) => sum + t.votes, 0) / formattedTokens.length
                : 0
        },
        initialVoting: formatVotingPhaseData(batch.initialVotingData),
        anonymousVoting: formatVotingPhaseData(batch.anonymousVotingData),
        currentPhaseProgress: countingProgress
    }
}

// Main Hook
export function useBatchMetrics(batchId: string, durations: bigint | undefined) {
    const areDurationsAvailable = useMemo(() => {
        if (!durations) return false
        return Number(durations) > 0;
    }, [durations])

    return useQuery({
        queryKey: ['batchMetrics', batchId],
        enabled: !!areDurationsAvailable,
        // refetchInterval: 1000 * 5,
        queryFn: async () => {
            try {
                const result = await request<BatchQueryResult>(
                    GRAPH_API_URL,
                    BatchMetricsQuery,
                    { batchId }
                )

                if (!result.batch) {
                    throw new Error('Batch not found')
                }

                return formatBatchMetrics(result.batch, durations!)
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
    })
}