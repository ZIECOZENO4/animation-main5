"use client";
import { useInfiniteQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import { GRAPH_API_URL } from '@/constants';
import { formatUnits } from 'viem';

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

export default function AllTokensList() {
    const { 
        data, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage, 
        status 
    } = useInfiniteQuery({
        queryKey: ['allTokens'],
        queryFn: async ({ pageParam = 0 }) => {
            const result = await request(
                GRAPH_API_URL,
                GetAllBatchesTokensQuery,
                {
                    skip: pageParam * 20,
                    first: 20,
                }
            );

            const formattedTokens = result.batches.flatMap(batch => 
                batch.tokens.map(token => ({
                    ...token,
                    batchId: batch.id,
                    batchState: batch.state,
                    metrics: {
                        initialVoting: {
                            totalVotes: formatUnits(BigInt(token.totalVotes), 18),
                            totalStaked: formatUnits(BigInt(token.totalStaked), 18),
                            votesCount: token.votes?.length ?? 0,
                            withdrawalsCount: token.withdrawals?.length ?? 0,
                        },
                        anonymousVoting: {
                            totalVotes: formatUnits(BigInt(batch.anonymousVotingData.totalVotes), 18),
                            totalStaked: formatUnits(BigInt(batch.anonymousVotingData.totalStaked), 18),
                        }
                    }
                }))
            );

            return {
                tokens: formattedTokens,
                nextPage: formattedTokens.length === 20 ? pageParam + 1 : undefined,
            };
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
                                    src={token.details.imageUrl} 
                                    alt={token.details.name} 
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {token.details.name} ({token.details.symbol})
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Batch #{token.batchId}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-2">
                                <p>{token.details.description}</p>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-semibold">Initial Voting</p>
                                        <p>Votes: {token.metrics.initialVoting.totalVotes}</p>
                                        <p>Staked: {token.metrics.initialVoting.totalStaked}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Anonymous Voting</p>
                                        <p>Votes: {token.metrics.anonymousVoting.totalVotes}</p>
                                        <p>Staked: {token.metrics.anonymousVoting.totalStaked}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    {token.details.twitter && (
                                        <a href={token.details.twitter} target="_blank" rel="noopener noreferrer">
                                            Twitter
                                        </a>
                                    )}
                                    {token.details.telegram && (
                                        <a href={token.details.telegram} target="_blank" rel="noopener noreferrer">
                                            Telegram
                                        </a>
                                    )}
                                    {token.details.website && (
                                        <a href={token.details.website} target="_blank" rel="noopener noreferrer">
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