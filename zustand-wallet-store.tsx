
// zustand-wallet-store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { parseEther } from 'viem'
import { FormattedWalletVote } from './hooks/useWalletTools'

// Constants
export const RATE_LIMIT = {
    PARALLEL_TRANSACTIONS: 3,
    DELAY_BETWEEN_BATCHES: 5000, // 5 seconds
    BATCH_SIZE: 5,
}

export const TOKEN_CONSTANTS = {
    GAS_RESERVE: parseEther("0.001"),
    MIN_TOKEN_CREATION_COST: parseEther("0.000001"),
    get MIN_REQUIRED_BALANCE() {
        return this.GAS_RESERVE + this.MIN_TOKEN_CREATION_COST
    }
}

export const WALLET_STATUS = {
    PENDING: 'pending',
    FUNDED: 'funded',
    SUCCESS: 'success',
    FAILED: 'failed',
    REFUNDED: 'refunded',
} as const

export type WalletStatus = typeof WALLET_STATUS[keyof typeof WALLET_STATUS]

// Interfaces
export interface BatchVoteInfo {
    batchId: string;
    hasVoted: boolean;
    transactionHash?: string;
    status: WalletStatus;
    timestamp: number;
}
export interface WalletMetrics {
    totalVotes: number;
    totalStaked: string;
    totalClaimed: string;
    totalPending: string;
    lastActivity: number;
    successfulTransactions: number;
    failedTransactions: number;
}

export interface WalletInfo {
    id: number;
    name: string;
    address: string;
    privateKey: string;
    balance: string;
    selected: boolean;
    status: WalletStatus;
    error?: string;
    batchVotes: Record<string, BatchVoteInfo>;
    metrics: WalletMetrics;
    createdAt: number;
}

interface WalletStore {
    // State
    wallets: WalletInfo[];
    currentBatchId: string;
    sheetOpen: boolean;
    selectedTab: string;

    // Basic UI Actions
    setSheetOpen: (open: boolean) => void;
    setSelectedTab: (tab: string) => void;

    // Batch Management
    setCurrentBatchId: (batchId: string) => void;
    // generateNewBatchId: () => string;

    // Wallet Management
    addWallets: (wallets: WalletInfo[]) => void;
    updateWallet: (walletId: number, updates: Partial<WalletInfo>) => void;
    deleteWallet: (walletId: number) => void;
    clearWallets: () => void;

    // Selection Management
    toggleWalletSelection: (walletId: number) => void;
    toggleAllWallets: (selected: boolean) => void;
    getSelectedWallets: () => WalletInfo[];

    // Batch Vote Management
    updateWalletBatchVote: (walletId: number, batchId: string, voteInfo: Partial<BatchVoteInfo>) => void;
    getWalletBatchVoteStatus: (walletId: number, batchId: string) => BatchVoteInfo | undefined;
    getWalletsByBatchVoteStatus: (batchId: string, status?: WalletStatus) => WalletInfo[];
    getWalletAddresses: () => string[];
    claimableVotes: Record<string, FormattedWalletVote[]>;
    setClaimableVotes: (votes: Record<string, FormattedWalletVote[]>) => void;
    updateWalletMetrics: (walletId: number, metrics: Partial<WalletMetrics>) => void;


}
const initialMetrics: WalletMetrics = {
    totalVotes: 0,
    totalStaked: "0",
    totalClaimed: "0",
    totalPending: "0",
    lastActivity: 0,
    successfulTransactions: 0,
    failedTransactions: 0,
};
export const useWalletStore = create<WalletStore>()(
    persist(
        (set, get) => ({
            // Initial State
            wallets: [],
            currentBatchId: '',
            sheetOpen: false,
            selectedTab: 'wallets',

            // UI Actions
            setSheetOpen: (open) => set({ sheetOpen: open }),
            setSelectedTab: (tab) => set({ selectedTab: tab }),
            getWalletAddresses: () => get().wallets.map(w => w.address),
            claimableVotes: {},
            setClaimableVotes: (votes) => set({ claimableVotes: votes }),
            // Batch Management
            setCurrentBatchId: (batchId) => set({ currentBatchId: batchId }),

            // Wallet Management
            // addWallets: (wallets) => set((state) => ({
            //     wallets: [...state.wallets, ...wallets.map(wallet => ({
            //         ...wallet,
            //         batchVotes: {},
            //         createdAt: Date.now(),
            //     }))]
            // })),

            updateWallet: (walletId, updates) => set((state) => ({
                wallets: state.wallets.map(wallet =>
                    wallet.id === walletId ? { ...wallet, ...updates } : wallet
                )
            })),


            // Update the addWallets function
            addWallets: (wallets) => set((state) => ({
                wallets: [...state.wallets, ...wallets.map(wallet => ({
                    ...wallet,
                    batchVotes: {},
                    createdAt: Date.now(),
                    metrics: initialMetrics,
                }))]
            })),


            deleteWallet: (walletId) => set((state) => ({
                wallets: state.wallets.filter(wallet => wallet.id !== walletId)
            })),

            clearWallets: () => set({ wallets: [] }),

            // Selection Management
            toggleWalletSelection: (walletId) => set((state) => ({
                wallets: state.wallets.map(wallet =>
                    wallet.id === walletId ? { ...wallet, selected: !wallet.selected } : wallet
                )
            })),
            updateWalletMetrics: (walletId, metrics) => set((state) => ({
                wallets: state.wallets.map(wallet =>
                    wallet.id === walletId
                        ? {
                            ...wallet,
                            metrics: {
                                ...wallet.metrics,
                                ...metrics,
                                lastActivity: Date.now(),
                            },
                        }
                        : wallet
                )
            })),
            toggleAllWallets: (selected) => set((state) => ({
                wallets: state.wallets.map(wallet => ({
                    ...wallet,
                    selected
                }))
            })),

            getSelectedWallets: () => get().wallets.filter(w => w.selected),

            // Batch Vote Management
            updateWalletBatchVote: (walletId, batchId, voteInfo) => set((state) => ({
                wallets: state.wallets.map(wallet => {
                    if (wallet.id !== walletId) return wallet;

                    return {
                        ...wallet,
                        batchVotes: {
                            ...wallet.batchVotes,
                            [batchId]: {
                                ...wallet.batchVotes?.[batchId],
                                batchId,
                                timestamp: Date.now(),
                                ...voteInfo
                            }
                        }
                    };
                })
            })),

            getWalletBatchVoteStatus: (walletId, batchId) => {
                const wallet = get().wallets.find(w => w.id === walletId);
                return wallet?.batchVotes?.[batchId];
            },

            getWalletsByBatchVoteStatus: (batchId, status) => {
                return get().wallets.filter(wallet => {
                    const batchVote = wallet.batchVotes?.[batchId];
                    if (!status) return batchVote !== undefined;
                    return batchVote?.status === status;
                });
            },
        }),
        {
            name: 'wallet-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                wallets: state.wallets,
                currentBatchId: state.currentBatchId,
            }),
        }
    )
)