
import { useQuery } from '@tanstack/react-query'
import { gql, request, ClientError } from 'graphql-request'
import { GRAPH_API_URL } from '@/constants'
import { formatEther, parseUnits } from 'viem'
import { useWalletStore, WalletMetrics } from '@/zustand-wallet-store'


interface BaseVoteResponse {
    id: string
    totalVotes: string
    timestamp: string
    totalStaked: string
}

interface InitialVoteResponse extends BaseVoteResponse {
    batchId: string
    voter: string
    amount: string
    token: {
        address: string
        totalVotes: string
        totalStaked: string
        details: {
            name: string
            symbol: string
        }
    }
    votingData: {
        resultsSubmitted: boolean
        batch: {
            state: number
            batchId: string
        }
    }
}


interface InitialWithdrawalResponse {
    id: string
    batchId: string
    user: string
    amount: string
    token: {
        address: string
    }
}


interface QueryResponse {
    initialVoteSubmitteds: InitialVoteResponse[]
    stakeWithdrawns: InitialWithdrawalResponse[]
}

export interface FormattedWalletVote {
    batchId: string
    tokenAddress: string
    tokenName: string
    tokenSymbol: string
    amountStaked: string
    hasWithdrawn: boolean
    canClaim: boolean
    timestamp: number
    isAnonymous: boolean
    identityCommitment?: string
}

interface WalletVoteSummary {
    address: string
    totalVotes: number
    totalStaked: string
    unclaimedVotes: FormattedWalletVote[]
    claimedVotes: FormattedWalletVote[]
}

const WalletVotesQuery = gql`
 query GetWalletVotes($addresses: [Bytes!]!) {
    initialVoteSubmitteds(
      where: { voter_in: $addresses }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      batchId
      voter
      amount
      totalVotes
      totalStaked
      timestamp
      token {
        address
        totalVotes
        totalStaked
        details {
          name
          symbol
        }
      }
      votingData {
        resultsSubmitted
        batch {
          state
          batchId
        }
      }
    }
   
    
    stakeWithdrawns(
      where: { user_in: $addresses }
    ) {
      id
      batchId
      user
      amount
      token {
        address
      }
    }
   
      
    
  }
`

function formatWalletVotes(
    initialVotes: InitialVoteResponse[],
    initialWithdrawals: InitialWithdrawalResponse[],
    addresses: string[]
): Record<string, WalletVoteSummary> {
    const walletSummaries: Record<string, WalletVoteSummary> = {}

    // Initialize summaries for all addresses
    addresses.forEach(address => {
        walletSummaries[address.toLowerCase()] = {
            address: address.toLowerCase(),
            totalVotes: 0,
            totalStaked: "0",
            unclaimedVotes: [],
            claimedVotes: []
        }
    })

    // Process initial votes
    initialVotes.forEach(vote => {
        const voterAddress = vote.voter.toLowerCase()
        const hasWithdrawn = initialWithdrawals.some(
            w => w.batchId === vote.batchId &&
                w.token.address === vote.token.address &&
                w.user.toLowerCase() === voterAddress
        )
        const canClaim = vote.votingData.batch.state >= 2

        const formattedVote: FormattedWalletVote = {
            batchId: vote.votingData.batch.batchId,
            tokenAddress: vote.token.address,
            tokenName: vote.token.details.name,
            tokenSymbol: vote.token.details.symbol,
            amountStaked: formatEther(parseUnits(vote.amount, 0)),
            hasWithdrawn,
            canClaim,
            timestamp: parseInt(vote.timestamp),
            isAnonymous: false
        }

        processVoteForWallet(voterAddress, formattedVote, walletSummaries, vote.amount)
    })



    return walletSummaries
}

function processVoteForWallet(
    address: string,
    vote: FormattedWalletVote,
    summaries: Record<string, WalletVoteSummary>,
    amount: string
) {
    if (vote.hasWithdrawn) {
        summaries[address].claimedVotes.push(vote)
    } else {
        summaries[address].unclaimedVotes.push(vote)
    }
    summaries[address].totalVotes++
    summaries[address].totalStaked = formatEther(
        parseUnits(summaries[address].totalStaked, 0) + parseUnits(amount, 0)
    )
}

export function useWalletVotes(addresses: string[]) {
    const { setClaimableVotes, updateWalletMetrics, wallets } = useWalletStore()

    return useQuery({
        queryKey: ['walletVotes', addresses],
        queryFn: async () => {
            try {
                console.log("this is the addresses before the result", { addresses });
                const result = await request<QueryResponse>(
                    GRAPH_API_URL,
                    WalletVotesQuery,
                    { addresses }
                )
                console.log("this is the result", { result });
                const walletSummaries = formatWalletVotes(
                    result.initialVoteSubmitteds,
                    result.stakeWithdrawns,
                    addresses
                )

                // Process claimable votes and metrics
                const claimableVotes: Record<string, FormattedWalletVote[]> = {}

                Object.entries(walletSummaries).forEach(([address, summary]) => {
                    claimableVotes[address] = summary.unclaimedVotes.filter(vote => vote.canClaim)

                    const wallet = wallets.find(
                        (w: { address: string }) => w.address.toLowerCase() === address.toLowerCase()
                    )

                    if (wallet) {
                        const metrics: WalletMetrics = {
                            totalVotes: summary.totalVotes,
                            totalStaked: summary.totalStaked,
                            totalClaimed: summary.claimedVotes.reduce(
                                (acc, vote) => (Number(acc) + Number(vote.amountStaked)).toString(),
                                "0"
                            ),
                            totalPending: summary.unclaimedVotes.reduce(
                                (acc, vote) => (Number(acc) + Number(vote.amountStaked)).toString(),
                                "0"
                            ),
                            lastActivity: Math.max(
                                ...summary.claimedVotes.concat(summary.unclaimedVotes)
                                    .map(vote => vote.timestamp)
                            ),
                            successfulTransactions: summary.claimedVotes.length,
                            failedTransactions: 0
                        }
                        updateWalletMetrics(wallet.id, metrics)
                    }
                })

                setClaimableVotes(claimableVotes)
                return walletSummaries
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
        enabled: addresses.length > 0,
    })
}