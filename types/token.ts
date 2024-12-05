// types/token.ts
interface TokenDetails {
    name: string;
    symbol: string;
    description: string;
    imageUrl: string;
    twitter: string;
    telegram: string;
    website: string;
  }
  
  export interface FormattedToken {
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