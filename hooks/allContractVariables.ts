import { tokenFactoryConfig } from "@/generated";
import { getClient } from "@/lib/config";
import { formatEther } from "viem";

export class TokenFactoryService {
    private client;
    private contractAddress: `0x${string}`;

    constructor(chainId?: number) {
        this.client = getClient(chainId || 421614);
        this.contractAddress = tokenFactoryConfig.address[421614];
    }



    async getVotingDuration() {
        return this.client.readContract({
            address: this.contractAddress,
            abi: tokenFactoryConfig.abi,
            functionName: 'VOTING_DURATION',
        });
    }

   

    async getMerkleDuration() {
        return this.client.readContract({
            address: this.contractAddress,
            abi: tokenFactoryConfig.abi,
            functionName: 'MERKLE_DURATION',
        });
    }



    async getMaxTopTokensPerBatchForInitialVoting() {
        return this.client.readContract({
            address: this.contractAddress,
            abi: tokenFactoryConfig.abi,
            functionName: 'MAX_TOP_TOKENS_PER_BATCH_FOR_INITIAL_VOTING',
        });
    }

    async getMinStakeAmount() {
        const amount = await this.client.readContract({
            address: this.contractAddress,
            abi: tokenFactoryConfig.abi,
            functionName: 'MIN_STAKE_AMOUNT',
        });
        return formatEther(amount);
    }

    async getBaseTokenCreationFee() {
        const fee = await this.client.readContract({
            address: this.contractAddress,
            abi: tokenFactoryConfig.abi,
            functionName: 'BASE_TOKEN_CREATION_FEE',
        });
        return formatEther(fee);
    }
}