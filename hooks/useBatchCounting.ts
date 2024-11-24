

// hooks/useBatchCountingStatus.ts - Part 1: Enums and Base Types

import { useQuery } from '@tanstack/react-query'
import { gql, request, GraphQLClient } from 'graphql-request'
import { GRAPH_API_URL } from '@/constants'
import { formatUnits } from 'viem'

// Enums
enum BatchState {
  INACTIVE,
  INITIAL_VOTING,
  QUEUE,
  ANONYMOUS_VOTING,
  COUNTING,
  DISPUTABLE,
  COMPLETED
}

enum BatchCountingState {
  NOT_STARTED,
  INITIALIZED,
  FULLY_INITIALIZED,
  PROCESSING_IN_PROGRESS,
  PROCESSING_COMPLETED,
  FINALIZED
}

// Base Entity Interface
interface BaseEntity {
  id: string
  timestamp: string
  blockNumber?: string
  blockTimestamp?: string
  transactionHash?: string
}

// Token Related Interfaces
interface TokenDetails extends BaseEntity {
  name: string
  symbol: string
  description: string
  imageUrl: string
  twitter: string
  telegram: string
  website: string
  creationFee: string
}

interface Token extends BaseEntity {
  batchId: string
  address: string
  state: number
  totalVotes: string
  totalStaked: string
  details: TokenDetails
}

// Vote and Withdrawal Interfaces
interface InitialVote extends BaseEntity {
  voter: string
  amount: string
  totalVotes: string
  totalStaked: string
}

interface Withdrawal extends BaseEntity {
  user: string
  amount: string
}

// hooks/useBatchCountingStatus.ts - Part 2: State Tracking Interfaces and GraphQL Query

// State Tracking Interfaces
interface BatchCountingStateUpdate extends BaseEntity {
  previousState: number
  newState: number
  processedCount: string
  totalToProcess: string
  votingData: string // Reference to InitialVotingData
}

interface BatchInitializationProgress extends BaseEntity {
  batchesProcessed: string
  totalBatchesNeeded: string
  currentTokenIndex: string
  totalTokens: string
  votingData: string // Reference to InitialVotingData
}

interface HeapProcessingUpdate extends BaseEntity {
  processedTokens: string
  remainingTokens: string
  currentBatchIndex: string
  totalBatches: string
  votingData: string // Reference to InitialVotingData
}

interface BatchCountingFinalized extends BaseEntity {
  finalTopTokens: string[]
  finalStakedAmounts: string[]
  totalProcessedTokens: string
  totalStakesCounted: string
  processingDuration: string
  votingData: string // Reference to InitialVotingData
}

// Updated GraphQL Query
const BATCH_COUNTING_STATUS_QUERY = gql`
  query GetBatchCountingStatus($batchId: String!) {
    batch(id: $batchId) {
      id
      batchId
      state
      createdAt
      stateUpdatedAt
      tokens {
        id
        batchId
        address
        state
        totalVotes
        totalStaked
        details {
          id
          name
          symbol
          description
          imageUrl
          twitter
          telegram
          website
          creationFee
          timestamp
        }
      }
      initialVotingData {
        id
        totalVotes
        totalStaked
        resultsSubmitted
        topTokens {
          id
          address
        }
        votes {
          id
          voter
          amount
          totalVotes
          totalStaked
          timestamp
          transactionHash
        }
        withdrawals {
          id
          user
          amount
          timestamp
        }
        batchCountingStates(
          first: 1
          orderBy: timestamp
          orderDirection: desc
        ) {
          id
          previousState
          newState
          processedCount
          totalToProcess
          timestamp
        }
        batchInitializations(
          first: 1
          orderBy: timestamp
          orderDirection: desc
        ) {
          id
          batchesProcessed
          totalBatchesNeeded
          currentTokenIndex
          totalTokens
          timestamp
        }
        heapUpdates(
          first: 1
          orderBy: timestamp
          orderDirection: desc
        ) {
          id
          processedTokens
          remainingTokens
          currentBatchIndex
          totalBatches
          timestamp
        }
        finalResults(
          first: 1
          orderBy: timestamp
          orderDirection: desc
        ) {
          id
          finalTopTokens
          finalStakedAmounts
          totalProcessedTokens
          totalStakesCounted
          processingDuration
          timestamp
        }
      }
      stateUpdates(
        first: 1
        orderBy: timestamp
        orderDirection: desc
      ) {
        id
        oldState
        newState
        timestamp
      }
    }
  }
`;


// Custom error types
class GraphQLError extends Error {
  constructor(public errors: any[], message: string = 'GraphQL Error') {
    super(message)
    this.name = 'GraphQLError'
  }
}

class NetworkError extends Error {
  constructor(message: string = 'Network Error') {
    super(message)
    this.name = 'NetworkError'
  }
}

// GraphQL client configuration
const graphQLClient = new GraphQLClient(GRAPH_API_URL, {})

// hooks/useBatchCountingStatus.ts - Part 3: Response Interfaces and Data Transformation

// Response Interfaces
interface BatchCountingResponse {
  batch: {
    id: string
    batchId: string
    state: number
    createdAt: string
    stateUpdatedAt: string
    tokens: Token[]
    initialVotingData: {
      id: string
      totalVotes: string
      totalStaked: string
      resultsSubmitted: boolean
      topTokens: Token[]
      votes: InitialVote[]
      withdrawals: Withdrawal[]
      batchCountingStates: BatchCountingStateUpdate[]
      batchInitializations: BatchInitializationProgress[]
      heapUpdates: HeapProcessingUpdate[]
      finalResults: BatchCountingFinalized[]
    }
    stateUpdates: {
      id: string
      oldState: number
      newState: number
      timestamp: string
    }[]
  } | null
}

// Formatted Response Types
interface FormattedBatchCounting {
  id: string
  batchId: string
  state: BatchState
  createdAt: Date
  stateUpdatedAt: Date
  countingProgress: {
    state: BatchCountingState
    processedCount: number
    totalToProcess: number
    percentage: number
    lastUpdate: Date
  } | null
  initializationProgress: {
    batchesProcessed: number
    totalBatches: number
    currentTokenIndex: number
    totalTokens: number
    percentage: number
    lastUpdate: Date
  } | null
  heapProgress: {
    processedTokens: number
    remainingTokens: number
    currentBatch: number
    totalBatches: number
    percentage: number
    lastUpdate: Date
  } | null
  finalResults: {
    topTokens: string[]
    stakedAmounts: string[]
    totalProcessed: number
    totalStaked: string
    duration: number
    completedAt: Date
  } | null
  tokens: {
    address: string
    totalVotes: string
    totalStaked: string
    details: TokenDetails
  }[]
}

// Data Transformation Functions
function transformBatchCountingData(data: BatchCountingResponse): FormattedBatchCounting {
  if (!data.batch) {
    throw new Error('No batch data found')
  }

  const batch = data.batch
  const countingStates = batch.initialVotingData.batchCountingStates
  const initializations = batch.initialVotingData.batchInitializations
  const heapUpdates = batch.initialVotingData.heapUpdates
  const finalResults = batch.initialVotingData.finalResults

  return {
    id: batch.id,
    batchId: batch.batchId,
    state: batch.state as BatchState,
    createdAt: new Date(parseInt(batch.createdAt) * 1000),
    stateUpdatedAt: new Date(parseInt(batch.stateUpdatedAt) * 1000),
    countingProgress: countingStates.length > 0 ? {
      state: countingStates[0].newState as BatchCountingState,
      processedCount: parseInt(countingStates[0].processedCount),
      totalToProcess: parseInt(countingStates[0].totalToProcess),
      percentage: calculatePercentage(
        countingStates[0].processedCount,
        countingStates[0].totalToProcess
      ),
      lastUpdate: new Date(parseInt(countingStates[0].timestamp) * 1000)
    } : null,
    initializationProgress: initializations.length > 0 ? {
      batchesProcessed: parseInt(initializations[0].batchesProcessed),
      totalBatches: parseInt(initializations[0].totalBatchesNeeded),
      currentTokenIndex: parseInt(initializations[0].currentTokenIndex),
      totalTokens: parseInt(initializations[0].totalTokens),
      percentage: calculatePercentage(
        initializations[0].batchesProcessed,
        initializations[0].totalBatchesNeeded
      ),
      lastUpdate: new Date(parseInt(initializations[0].timestamp) * 1000)
    } : null,
    heapProgress: heapUpdates.length > 0 ? {
      processedTokens: parseInt(heapUpdates[0].processedTokens),
      remainingTokens: parseInt(heapUpdates[0].remainingTokens),
      currentBatch: parseInt(heapUpdates[0].currentBatchIndex),
      totalBatches: parseInt(heapUpdates[0].totalBatches),
      percentage: calculatePercentage(
        heapUpdates[0].processedTokens,
        (parseInt(heapUpdates[0].processedTokens) + parseInt(heapUpdates[0].remainingTokens)).toString()
      ),
      lastUpdate: new Date(parseInt(heapUpdates[0].timestamp) * 1000)
    } : null,
    finalResults: finalResults.length > 0 ? {
      topTokens: finalResults[0].finalTopTokens,
      stakedAmounts: finalResults[0].finalStakedAmounts.map(amount =>
        formatUnits(BigInt(amount), 18)
      ),
      totalProcessed: parseInt(finalResults[0].totalProcessedTokens),
      totalStaked: formatUnits(BigInt(finalResults[0].totalStakesCounted), 18),
      duration: parseInt(finalResults[0].processingDuration),
      completedAt: new Date(parseInt(finalResults[0].timestamp) * 1000)
    } : null,
    tokens: batch.tokens.map(token => ({
      address: token.address,
      totalVotes: formatUnits(BigInt(token.totalVotes), 0),
      totalStaked: formatUnits(BigInt(token.totalStaked), 18),
      details: token.details
    }))
  }
}

function calculatePercentage(processed: string, total: string): number {
  const processedNum = parseInt(processed)
  const totalNum = parseInt(total)
  if (totalNum === 0) return 0
  return Math.min((processedNum / totalNum) * 100, 100)
}
// hooks/useBatchCountingStatus.ts - Part 4: Main Hook Implementation and Utility Functions
// Add this interface after other interfaces
interface BatchStatus {
  id: string
  batchId: string
  state: BatchState
  createdAt: Date
  stateUpdatedAt: Date
  countingProgress: {
    state: BatchCountingState
    processedCount: number
    totalToProcess: number
    percentage: number
    lastUpdate: Date
  } | null
  initializationProgress: {
    batchesProcessed: number
    totalBatches: number
    currentTokenIndex: number
    totalTokens: number
    percentage: number
    lastUpdate: Date
  } | null
  heapProgress: {
    processedTokens: number
    remainingTokens: number
    currentBatch: number
    totalBatches: number
    percentage: number
    lastUpdate: Date
  } | null
  finalResults: {
    topTokens: string[]
    stakedAmounts: string[]
    totalProcessed: number
    totalStaked: string
    duration: number
    completedAt: Date
  } | null
  tokens: {
    address: string
    totalVotes: string
    totalStaked: string
    details: TokenDetails
  }[]
}

// Modify the main hook to use transformBatchCountingData
export function useBatchCountingStatus(batchId: string) {
  return useQuery({
    queryKey: ['batchCountingStatus', batchId],
    queryFn: async () => {
      try {
        if (!batchId) {
          throw new Error('Batch ID is required')
        }

        const response = await graphQLClient.request<BatchCountingResponse>(
          BATCH_COUNTING_STATUS_QUERY,
          { batchId }
        )

        if (!response?.batch) {
          throw new Error(`No batch found with ID: ${batchId}`)
        }

        // Use the transformation function instead of direct assignment
        return transformBatchCountingData(response)
      } catch (error: any) {
        if (error.response?.errors) {
          throw new GraphQLError(error.response.errors)
        }
        if (error.message.includes('Failed to fetch')) {
          throw new NetworkError()
        }
        throw error
      }
    },
    refetchInterval: 30000, // 30 seconds
    enabled: !!batchId,
    retry: (failureCount, error) => {
      if (error instanceof GraphQLError) return failureCount < 3
      if (error instanceof NetworkError) return failureCount < 5
      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

// Update helper functions to work with the transformed data
export function getCurrentBatchState(status: BatchStatus): BatchState {
  return status.state
}

export function getCountingProgress(status: BatchStatus): number {
  return status.countingProgress?.percentage ?? 0
}

export function getInitializationProgress(status: BatchStatus): number {
  return status.initializationProgress?.percentage ?? 0
}

export function getHeapProgress(status: BatchStatus): number {
  return status.heapProgress?.percentage ?? 0
}

export function getFinalResults(status: BatchStatus) {
  return status.finalResults
}

export function isCountingComplete(status: BatchStatus): boolean {
  return !!status.finalResults
}

export function getLastUpdateTimestamp(status: BatchStatus): Date | null {
  const timestamps = [
    status.countingProgress?.lastUpdate,
    status.initializationProgress?.lastUpdate,
    status.heapProgress?.lastUpdate,
    status.finalResults?.completedAt
  ].filter(Boolean) as Date[]

  if (timestamps.length === 0) return null

  return new Date(Math.max(...timestamps.map(d => d.getTime())))
}

