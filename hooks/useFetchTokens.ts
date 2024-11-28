  
import { useInfiniteQuery } from '@tanstack/react-query'
import { gql, request, ClientError } from 'graphql-request'
import { GRAPH_API_URL } from '@/constants'
import { formatUnits } from 'viem'

const TOKENS_PER_PAGE = 20

// Enums
const BatchState = {
  INACTIVE: 0,
  INITIAL_VOTING: 1,
  QUEUE: 2,
  ANONYMOUS_VOTING: 3,
  COUNTING: 4,
  DISPUTABLE: 5,
  COMPLETED: 6
} as const;

const TokenState = {
  INVALID: 0,
  INITIAL_VOTEABLE: 1,
  TOP_FOR_INITIAL_VOTING: 2,
  TOP_FOR_ANONYMOUS: 3,
  IN_THE_POOL: 4
} as const;

// GraphQL Queries
const GetBatchStateQuery = gql`
  query GetBatchState($batchId: String!) {
    batch(id: $batchId) {
      state
    }
  }
`;

const GetAllTokensQuery = gql`
  query GetAllTokens($batchId: String!, $skip: Int!, $first: Int!) {
    batch(id: $batchId) {
      state
      initialVotingData {
        totalVotes
        totalStaked
      }
      anonymousVotingData {
        totalVotes
        totalStaked
      }
      tokens(
        skip: $skip
        first: $first
        orderBy: totalStaked
        orderDirection: desc
      ) {
        id
        address
        state
        totalVotes
        totalStaked
        details {
          name
          symbol
          description
          imageUrl
          twitter
          telegram
          website
          creator
          creationFee
        }
        votes {
          id
        }
        withdrawals {
          id
        }
      }
    }
  }
`;

const GetTopTokensQuery = gql`
  query GetTopTokens($batchId: String!, $skip: Int!, $first: Int!) {
    batch(id: $batchId) {
      state
      initialVotingData {
        totalVotes
        totalStaked
        topTokens(
          skip: $skip
          first: $first
          orderBy: totalStaked
          orderDirection: desc
        ) {
          id
          address
          state
          totalVotes
          totalStaked
          details {
            name
            symbol
            description
            imageUrl
            twitter
            telegram
            website
            creator
            creationFee
          }
          votes {
            id
          }
          withdrawals {
            id
          }
        }
      }
      anonymousVotingData {
        totalVotes
        totalStaked
        topTokens(
          skip: $skip
          first: $first
          orderBy: totalStaked
          orderDirection: desc
        ) {
          id
          address
          state
          totalVotes
          totalStaked
          details {
            name
            symbol
            description
            imageUrl
            twitter
            telegram
            website
            creator
            creationFee
          }
          votes {
            id
          }
          withdrawals {
            id
          }
        }
      }
    }
  }
`;

// Interfaces
interface TokenDetails {
  name: string
  symbol: string
  description: string
  imageUrl: string
  twitter: string
  telegram: string
  website: string
  creator: string
  creationFee: string
}

interface TokenResponse {
  id: string
  address: string
  state: number
  totalVotes: string
  totalStaked: string
  details: TokenDetails
  votes?: { id: string }[]
  withdrawals?: { id: string }[]
}

interface VotingData {
  totalVotes: string
  totalStaked: string
  topTokens?: TokenResponse[]
}

interface BatchResponse {
  state: number
  initialVotingData: VotingData
  anonymousVotingData: VotingData
  tokens?: TokenResponse[]
}

interface QueryResponse {
  batch: BatchResponse
}

export interface FormattedToken {
  id: string
  address: string
  state: number
  name: string
  symbol: string
  description: string
  imageUrl: string
  metrics: {
    initialVoting: {
      totalVotes: string
      totalStaked: string
      votesCount: number
      withdrawalsCount: number
      stakePercentage: string
    }
    anonymousVoting: {
      totalVotes: string
      totalStaked: string
      votesCount: number
      withdrawalsCount: number
      stakePercentage: string
    }
    currentPhase: 'initial' | 'anonymous'
  }
  creator: string
  creationFee: string
  social: {
    twitter: string
    telegram: string
    website: string
  }
}

// Helper function to calculate percentage
function calculatePercentage(amount: string, total: string): string {
  const amountBigInt = BigInt(amount)
  const totalBigInt = BigInt(total)
  if (totalBigInt === 0n) return "0%"
  return `${((amountBigInt * 10000n) / totalBigInt * BigInt(100) / 10000n).toString()}%`
}

// Helper function to format token data
function formatToken(
  token: TokenResponse,
  votingData: {
    initial: { totalVotes: string; totalStaked: string },
    anonymous: { totalVotes: string; totalStaked: string }
  },
  currentPhase: 'initial' | 'anonymous'
): FormattedToken {
  return {
    id: token.id,
    address: token.address,
    state: token.state,
    name: token.details.name,
    symbol: token.details.symbol,
    description: token.details.description,
    imageUrl: token.details.imageUrl,
    metrics: {
      initialVoting: {
        totalVotes: formatUnits(BigInt(token.totalVotes), 18),
        totalStaked: formatUnits(BigInt(token.totalStaked), 18),
        votesCount: token.votes?.length ?? 0,
        withdrawalsCount: token.withdrawals?.length ?? 0,
        stakePercentage: calculatePercentage(token.totalStaked, votingData.initial.totalStaked)
      },
      anonymousVoting: {
        totalVotes: formatUnits(BigInt(votingData.anonymous.totalVotes), 18),
        totalStaked: formatUnits(BigInt(votingData.anonymous.totalStaked), 18),
        votesCount: token.votes?.length ?? 0,
        withdrawalsCount: token.withdrawals?.length ?? 0,
        stakePercentage: calculatePercentage(token.totalStaked, votingData.anonymous.totalStaked)
      },
      currentPhase
    },
    creator: token.details.creator,
    creationFee: formatUnits(BigInt(token.details.creationFee), 18),
    social: {
      twitter: token.details.twitter,
      telegram: token.details.telegram,
      website: token.details.website
    }
  }
}

// Main hook
export function useTokensForBatch(batchId: string) {
  return useInfiniteQuery({
    queryKey: ['batchTokens', batchId],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        // First, fetch the batch state
        const batchStateResult = await request<{ batch: { state: number } }>(
          GRAPH_API_URL,
          GetBatchStateQuery,
          { batchId }
        );

        const batchState = batchStateResult.batch.state;

        // Choose query based on batch state
        const queryToUse = batchState < BatchState.ANONYMOUS_VOTING
          ? GetAllTokensQuery
          : GetTopTokensQuery;

        // Fetch tokens using the appropriate query
        const result = await request<QueryResponse>(
          GRAPH_API_URL,
          queryToUse,
          {
            batchId,
            skip: pageParam * TOKENS_PER_PAGE,
            first: TOKENS_PER_PAGE,
          }
        );

        const votingData = {
          initial: {
            totalVotes: result.batch.initialVotingData.totalVotes,
            totalStaked: result.batch.initialVotingData.totalStaked
          },
          anonymous: {
            totalVotes: result.batch.anonymousVotingData.totalVotes,
            totalStaked: result.batch.anonymousVotingData.totalStaked
          }
        };

        let formattedTokens: FormattedToken[] = [];

        if (batchState < BatchState.ANONYMOUS_VOTING) {
          // For initial voting phase, use all tokens
          formattedTokens = result.batch.tokens?.map(token =>
            formatToken(token, votingData, 'initial')
          ) ?? [];
        } else {
          // For anonymous voting phase, use top tokens from both phases
          const initialTokens = result.batch.initialVotingData.topTokens?.map(token =>
            formatToken(token, votingData, 'initial')
          ) ?? [];

          const anonymousTokens = result.batch.anonymousVotingData.topTokens?.map(token =>
            formatToken(token, votingData, 'anonymous')
          ) ?? [];

          formattedTokens = [...initialTokens, ...anonymousTokens];
        }

        return {
          tokens: formattedTokens,
          batchState,
          votingData,
          nextPage: formattedTokens.length === TOKENS_PER_PAGE ?
            pageParam + 1 : undefined,
        }
      } catch (error) {
        if (error instanceof ClientError) {
          console.error('GraphQL error:', error.response.errors)
          throw new Error(
            `GraphQL error: ${error.response.errors?.[0]?.message || 'Unknown error'}`
          )
        }
        throw error
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    enabled: !!batchId,
  })
}