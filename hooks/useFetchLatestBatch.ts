
import { useQuery } from '@tanstack/react-query'
import { gql, request, ClientError } from 'graphql-request'
import { GRAPH_API_URL } from '@/constants'
import { formatUnits } from 'viem'
import { getPhaseInfo } from '@/hooks/useContractConstants'
import { useMemo } from 'react'

// GraphQL Query
const LatestBatchMetricsQuery = gql`
  query GetLatestBatchMetrics {
    batches(
      first: 1,
      orderBy: createdAt,
      orderDirection: desc
    ) {
      id
      batchId
      state
      createdAt
      stateUpdatedAt
      initialVotingData {
        totalInitialVotes
        totalInitialStaked
        resultsSubmitted
        topTokens {
          id
          address
          totalInitialVotes
          totalInitialStaked
        }
      }
      anonymousVotingData {
        totalAnonymousVotes
        totalAnonymousStaked
        resultsSubmitted
        topTokens {
          id
          address
          totalAnonymousVotes
          totalAnonymousStaked
        }
      }
      tokens {
        id
        address
        totalInitialVotes
        totalInitialStaked
      }
      stateUpdates(orderBy: timestamp, orderDirection: desc, first: 1) {
        timestamp
        newState
      }
    }
  }
`

// Interfaces
interface Token {
    id: string
    address: string
    totalInitialVotes: string
    totalInitialStaked: string
}

interface VotingData {
    totalInitialVotes?: string
    totalInitialStaked?: string
    totalAnonymousVotes?: string
    totalAnonymousStaked?: string
    resultsSubmitted: boolean
    topTokens: Token[]
}

interface BatchMetrics {
    id: string
    batchId: string
    state: number
    createdAt: string
    stateUpdatedAt: string
    initialVotingData: VotingData
    anonymousVotingData: VotingData
    tokens: Token[]
    stateUpdates: {
        timestamp: string
        newState: number
    }[]
}

interface LatestBatchMetricsQueryResult {
    batches: BatchMetrics[]
}

export interface FormattedToken {
    id: string
    address: string
    votes: number
    staked: number
}

export enum BatchState {
    INACTIVE,
    INITIAL_VOTING,
    INITIAL_COUNTING,
    ANONYMOUS_VOTING,
    ANONYMOUS_COUNTING,
    COMPLETED
}
export interface FormattedVotingData {
    totalVotes: number
    totalStaked: number
    resultsSubmitted: boolean
    tokens: FormattedToken[]
}

export interface FormattedBatch {
    id: string
    batchId: number
    state: string
    stateNumber: number
    isVotingActive: boolean
    createdAt: Date
    stateUpdatedAt: Date
    initialVoting: FormattedVotingData
    anonymousVoting: FormattedVotingData
    stateDuration: number
    progress: number
}

export interface BatchStatistics {
    totalTokens: number
    totalVotes: {
        initial: number
        anonymous: number
        combined: number
    }
    totalStaked: {
        initial: number
        anonymous: number
        combined: number
    }
    averageStakePerToken: number
    averageVotesPerToken: number
    participatingTokens: number
}

export interface FormattedBatchMetrics {
    batch: FormattedBatch
    tokens: FormattedToken[]
    stats: BatchStatistics
}

// Helper Functions
export function getStateLabel(state: number): string {
    switch (state) {
        case BatchState.INACTIVE:
            return 'Inactive'
        case BatchState.INITIAL_VOTING:
            return 'Initial Voting'
        case BatchState.INITIAL_COUNTING:
            return 'Initial Counting'
        case BatchState.ANONYMOUS_VOTING:
            return 'Anonymous Voting'
        case BatchState.ANONYMOUS_COUNTING:
            return 'Anonymous Counting'
        case BatchState.COMPLETED:
            return 'Completed'
        default:
            return 'Unknown'
    }
}

export function isActiveVotingState(state: number): boolean {
    return state === BatchState.INITIAL_VOTING || state === BatchState.ANONYMOUS_VOTING
}

function calculateTimeMetrics(batch: BatchMetrics, durations: bigint | undefined) {
    if (batch.state !== BatchState.INITIAL_VOTING && batch.state !== BatchState.ANONYMOUS_VOTING) {
        return { elapsedTime: 0, duration: 0, progress: 0 }
    }

    const currentTime = Math.floor(Date.now() / 1000)
    const stateStartTime = parseInt(batch.stateUpdatedAt)
    const phaseInfo = getPhaseInfo(batch.state, durations)
    const duration = phaseInfo.duration
    const elapsedTime = currentTime - stateStartTime
    const progress = Math.min((elapsedTime / duration) * 100, 100)

    return { elapsedTime, duration, progress }
}

function formatVotingData(votingData: VotingData, phase: 'initial' | 'anonymous'): FormattedVotingData {
    const totalVotes = Number(
        phase === 'initial'
            ? votingData.totalInitialVotes
            : votingData.totalAnonymousVotes
    )

    const totalStaked = parseFloat(
        formatUnits(
            BigInt(
                phase === 'initial'
                    ? votingData.totalInitialStaked ?? '0'
                    : votingData.totalAnonymousStaked ?? '0'
            ),
            18
        )
    )
    return {
        totalVotes,
        totalStaked,
        resultsSubmitted: votingData.resultsSubmitted,
        tokens: votingData.topTokens.map(token => ({
            id: token.id,
            address: token.address,
            votes: Number(token.totalInitialVotes),
            staked: parseFloat(formatUnits(BigInt(token.totalInitialStaked), 18))
        }))
    }
}

function formatBatchMetrics(
    batch: BatchMetrics,
    durations: bigint | undefined
): FormattedBatchMetrics {
    const totalTokens = batch.tokens.length
    const formattedInitialVoting = formatVotingData(batch.initialVotingData, 'initial')
    const formattedAnonymousVoting = formatVotingData(batch.anonymousVotingData, 'anonymous')
    const { progress, duration } = calculateTimeMetrics(batch, durations)

    const formattedTokens = batch.tokens.map(token => ({
        id: token.id,
        address: token.address,
        votes: Number(token.totalInitialVotes),
        staked: parseFloat(formatUnits(BigInt(token.totalInitialStaked), 18))
    }))

    const participatingTokens = batch.tokens.filter(
        token => BigInt(token.totalInitialVotes) > 0n || BigInt(token.totalInitialStaked) > 0n
    ).length

    const totalVotes = {
        initial: formattedInitialVoting.totalVotes,
        anonymous: formattedAnonymousVoting.totalVotes,
        combined: formattedInitialVoting.totalVotes + formattedAnonymousVoting.totalVotes
    }

    const totalStaked = {
        initial: formattedInitialVoting.totalStaked,
        anonymous: formattedAnonymousVoting.totalStaked,
        combined: formattedInitialVoting.totalStaked + formattedAnonymousVoting.totalStaked
    }

    return {
        batch: {
            id: batch.id,
            batchId: parseInt(batch.batchId),
            state: getStateLabel(batch.state),
            stateNumber: batch.state,
            isVotingActive: isActiveVotingState(batch.state),
            createdAt: new Date(parseInt(batch.createdAt) * 1000),
            stateUpdatedAt: new Date(parseInt(batch.stateUpdatedAt) * 1000),
            initialVoting: formattedInitialVoting,
            anonymousVoting: formattedAnonymousVoting,
            stateDuration: duration,
            progress
        },
        tokens: formattedTokens,
        stats: {
            totalTokens,
            totalVotes,
            totalStaked,
            averageStakePerToken: totalTokens > 0 ? totalStaked.combined / totalTokens : 0,
            averageVotesPerToken: totalTokens > 0 ? totalVotes.combined / totalTokens : 0,
            participatingTokens
        }
    }
}

// Hook
export function useLatestBatchMetrics(durations: bigint | undefined) {
    const areDurationsAvailable = useMemo(() => {
        if (!durations) return false
        return Number(durations) > 0
    }, [durations])

    return useQuery({
        queryKey: ['latestBatchMetrics'],
        queryFn: async () => {
            try {
                const result = await request<LatestBatchMetricsQueryResult>(
                    GRAPH_API_URL,
                    LatestBatchMetricsQuery
                )

                if (!areDurationsAvailable) {
                    throw new Error('No valid durations available')
                }

                if (!result.batches || result.batches.length === 0) {
                    return null
                }

                const returnedData = formatBatchMetrics(result.batches[0], durations!)
                return returnedData
            } catch (error) {
                if (error instanceof ClientError) {
                    console.error(`GraphQL error:`, error.response.errors)
                    throw new Error(
                        `GraphQL error: ${error.response.errors?.[0]?.message || 'Unknown error'}`
                    )
                } else {
                    console.error(`Unexpected error:`, error)
                    throw error
                }
            }
        },
        enabled: areDurationsAvailable,
    })
}