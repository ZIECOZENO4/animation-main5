
interface TokenDetails {
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  twitter?: string; // Optional, can be undefined
  telegram?: string; // Optional, can be undefined
  website?: string; // Optional, can be undefined
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