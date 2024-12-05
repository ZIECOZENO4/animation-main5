import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import { GRAPH_API_URL } from '@/constants';
import { formatUnits } from 'viem';

interface TokenDetails {
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  twitter: string;
  telegram: string;
  website: string;
}

interface TokenData {
  id: string;
  address: string;
  batchId: string;
  state: number;
  totalInitialVotes: string;
  totalInitialStaked: string;
  totalAnonymousVotes: string;
  totalAnonymousStaked: string;
  details: TokenDetails;
}

interface FormattedToken {
  id: string;
  address: string;
  batchId: string;
  state: number;
  details: TokenDetails;
  votes: {
    initial: number;
    anonymous: number;
    total: number;
  };
  staked: {
    initial: number;
    anonymous: number;
    total: number;
  };
}

const ALL_TOKENS_QUERY = gql`
  query GetAllTokens {
    tokens {
      id
      address
      batchId
      state
      totalInitialVotes
      totalInitialStaked
      totalAnonymousVotes
      totalAnonymousStaked
      details {
        name
        symbol
        description
        imageUrl
        twitter
        telegram
        website
      }
    }
  }
`;

export function useAllTokens() {
  return useQuery<FormattedToken[]>({
    queryKey: ['allTokens'],
    queryFn: async () => {
      const data = await request<{ tokens: TokenData[] }>(
        GRAPH_API_URL,
        ALL_TOKENS_QUERY
      );

      return data.tokens.map((token): FormattedToken => {
        const initialStaked = parseFloat(formatUnits(BigInt(token.totalInitialStaked || '0'), 18));
        const anonymousStaked = parseFloat(formatUnits(BigInt(token.totalAnonymousStaked || '0'), 18));
        const initialVotes = Number(token.totalInitialVotes);
        const anonymousVotes = Number(token.totalAnonymousVotes);

        return {
          id: token.id,
          address: token.address,
          batchId: token.batchId,
          state: token.state,
          details: token.details,
          votes: {
            initial: initialVotes,
            anonymous: anonymousVotes,
            total: initialVotes + anonymousVotes
          },
          staked: {
            initial: initialStaked,
            anonymous: anonymousStaked,
            total: initialStaked + anonymousStaked
          }
        };
      });
    }
  });
}