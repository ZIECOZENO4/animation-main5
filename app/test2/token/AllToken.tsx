"use client";
import { useInfiniteQuery } from '@tanstack/react-query';
import { gql, request, ClientError } from 'graphql-request';
import { GRAPH_API_URL } from '@/constants';
import { formatUnits } from 'viem';

const TOKENS_PER_PAGE = 20;

// First, define the interfaces for the GraphQL response
interface BatchesQueryResponse {
    batches: Array<{
        id: string;
        state: number;
        initialVotingData: {
            totalVotes: string;
            totalStaked: string;
        };
        anonymousVotingData: {
            totalVotes: string;
            totalStaked: string;
        };
        tokens: Array<{
            id: string;
            address: string;
            state: number;
            totalVotes: string;
            totalStaked: string;
            details: {
                name: string;
                symbol: string;
                description: string;
                imageUrl: string;
                twitter: string;
                telegram: string;
                website: string;
                creator: string;
                creationFee: string;
            };
            votes?: Array<{ id: string }>;
            withdrawals?: Array<{ id: string }>;
        }>;
    }>;
}


// Interfaces from the hook
interface TokenDetails {
    name: string;
    symbol: string;
    description: string;
    imageUrl: string;
    twitter: string;
    telegram: string;
    website: string;
    creator: string;
    creationFee: string;
}

interface TokenResponse {
    id: string;
    address: string;
    state: number;
    totalVotes: string;
    totalStaked: string;
    details: TokenDetails;
    votes?: { id: string }[];
    withdrawals?: { id: string }[];
}



const GetAllBatchesTokensQuery = gql`
  query GetAllBatchesTokens($skip: Int!, $first: Int!) {
    batches {
      id
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

function calculatePercentage(amount: string, total: string): string {
    const amountBigInt = BigInt(amount);
    const totalBigInt = BigInt(total);
    if (totalBigInt === 0n) return "0%";
    return `${((amountBigInt * 10000n) / totalBigInt * BigInt(100) / 10000n).toString()}%`;
}

export default function AllTokensList() {
    const { 
        data, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage, 
        status 
    } = useInfiniteQuery({
        queryKey: ['allTokens'],
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
            try {
                const result = await request<BatchesQueryResponse>(
                    GRAPH_API_URL,
                    GetAllBatchesTokensQuery,
                    {
                        skip: pageParam * TOKENS_PER_PAGE,
                        first: TOKENS_PER_PAGE,
                    }
                );
    
                const formattedTokens = result.batches.flatMap(batch => 
                    batch.tokens.map(token => ({
                        id: token.id,
                        address: token.address,
                        state: token.state,
                        batchId: batch.id,
                        batchState: batch.state,
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
                                stakePercentage: calculatePercentage(token.totalStaked, batch.initialVotingData.totalStaked)
                            },
                            anonymousVoting: {
                                totalVotes: formatUnits(BigInt(batch.anonymousVotingData.totalVotes), 18),
                                totalStaked: formatUnits(BigInt(batch.anonymousVotingData.totalStaked), 18),
                                votesCount: token.votes?.length ?? 0,
                                withdrawalsCount: token.withdrawals?.length ?? 0,
                                stakePercentage: calculatePercentage(token.totalStaked, batch.anonymousVotingData.totalStaked)
                            }
                        },
                        creator: token.details.creator,
                        creationFee: formatUnits(BigInt(token.details.creationFee), 18),
                        social: {
                            twitter: token.details.twitter,
                            telegram: token.details.telegram,
                            website: token.details.website
                        }
                    }))
                );
    
                return {
                    tokens: formattedTokens,
                    nextPage: formattedTokens.length === TOKENS_PER_PAGE ? pageParam + 1 : undefined,
                };
            } catch (error) {
                if (error instanceof ClientError) {
                    console.error('GraphQL error:', error.response.errors);
                    throw new Error(`GraphQL error: ${error.response.errors?.[0]?.message || 'Unknown error'}`);
                }
                throw error;
            }
        },
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });

    const allTokens = data?.pages.flatMap(page => page.tokens) || [];

    return (
        <div className="p-4">
            {status === 'pending' ? (
                <div>Loading tokens...</div>
            ) : status === 'error' ? (
                <div>Error fetching tokens</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allTokens.map((token) => (
                        <div key={token.id} className="border rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <img 
                                    src={token.imageUrl} 
                                    alt={token.name} 
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {token.name} ({token.symbol})
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Batch #{token.batchId}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-2">
                                <p>{token.description}</p>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-semibold">Initial Voting</p>
                                        <p>Votes: {token.metrics.initialVoting.totalVotes}</p>
                                        <p>Staked: {token.metrics.initialVoting.totalStaked}</p>
                                        <p>Stake %: {token.metrics.initialVoting.stakePercentage}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Anonymous Voting</p>
                                        <p>Votes: {token.metrics.anonymousVoting.totalVotes}</p>
                                        <p>Staked: {token.metrics.anonymousVoting.totalStaked}</p>
                                        <p>Stake %: {token.metrics.anonymousVoting.stakePercentage}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    {token.social.twitter && (
                                        <a href={token.social.twitter} target="_blank" rel="noopener noreferrer">
                                            Twitter
                                        </a>
                                    )}
                                    {token.social.telegram && (
                                        <a href={token.social.telegram} target="_blank" rel="noopener noreferrer">
                                            Telegram
                                        </a>
                                    )}
                                    {token.social.website && (
                                        <a href={token.social.website} target="_blank" rel="noopener noreferrer">
                                            Website
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {hasNextPage && (
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="col-span-full mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}