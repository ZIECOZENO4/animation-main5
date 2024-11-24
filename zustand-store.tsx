
import { create } from 'zustand';
import { FaFilter, FaSortAmountDown, FaChartLine, FaDollarSign, FaPercent } from 'react-icons/fa';
import React from 'react';
import { NetworkBase, NetworkArbitrumOne, NetworkEthereum, NetworkBinanceSmartChain, NetworkFraxtal, NetworkPolygonPos, NetworkOptimism, NetworkAvalanche } from '@web3icons/react'

import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';


type SortOption = {
    value: string;
    label: string;
    icon: React.ReactNode;
};
export type UnifiedSearchParams = {
    type: 'tokenCreation' | 'tokenBuy' | 'tokenSell' | 'presale' | 'tokenMigration' | 'initialVoting' | 'InitialVotingBatchCounting' | 'claimingStake';
    transactionHash: string;
    tokenAmount: string;
    ethAmount: string;
    tokenName?: string;
    tokenTicker?: string;
    usdAmount?: string;
    slippage?: string;
    tokenAddress?: string;
    priorityFee?: string;
    presaleDeadline?: Date;
};
type FilterStore = {
    isLaunched: boolean;
    minMarketCap: string;
    maxMarketCap: string;
    selectedChain: Chain;
    selectedSort: SortOption;
    setIsLaunched: (isLaunched: boolean) => void;
    setMinMarketCap: (minMarketCap: string) => void;
    setMaxMarketCap: (maxMarketCap: string) => void;
    setSelectedChain: (chain: Chain) => void;
    setSelectedSort: (sort: SortOption) => void;
    resetFilters: () => void;
};


export interface Chain {
    value: string;
    label: string;
    icon: JSX.Element;
    chainId: number;
}

export const chains: Chain[] = [
    { value: 'all', label: 'All Chains', icon: <FaFilter size={16} />, chainId: 0 },
    { value: 'ethereum', label: 'Ethereum (Sepolia)', icon: <NetworkEthereum variant="branded" size={16} />, chainId: 11155111 },
    { value: 'base', label: 'Base (Goerli)', icon: <NetworkBase variant="branded" size={16} />, chainId: 84531 },
    { value: 'arbitrum', label: 'Arbitrum (Sepolia)', icon: <NetworkArbitrumOne size={16} variant='branded' />, chainId: 421614 },
    { value: 'bnb', label: 'BNB Smart Chain (Testnet)', icon: <NetworkBinanceSmartChain variant="branded" size={16} />, chainId: 97 },
    { value: 'fraxtal', label: 'Fraxtal (Testnet)', icon: <NetworkFraxtal variant="branded" size={16} />, chainId: 2522 },
    { value: 'polygon', label: 'Polygon (Mumbai)', icon: <NetworkPolygonPos variant="branded" size={16} />, chainId: 80001 },
    { value: 'optimism', label: 'Optimism (Sepolia)', icon: <NetworkOptimism variant="branded" size={16} />, chainId: 11155420 },
    { value: 'avalanche', label: 'Avalanche (Fuji)', icon: <NetworkAvalanche variant="branded" size={16} />, chainId: 43113 },
];
export const sortOptions: SortOption[] = [
    { value: 'marketCap', label: 'Market Cap', icon: <FaSortAmountDown size={16} /> },
    { value: 'volume', label: 'Volume', icon: <FaChartLine size={16} /> },
    { value: 'price', label: 'Price', icon: <FaDollarSign size={16} /> },
    { value: 'change24h', label: '24h Change', icon: <FaPercent size={16} /> },
];

export const useFilterStore = create<FilterStore>((set) => ({
    isLaunched: false,
    minMarketCap: '',
    maxMarketCap: '',
    selectedChain: chains[0],
    selectedSort: sortOptions[0],
    setIsLaunched: (isLaunched) => set({ isLaunched }),
    setMinMarketCap: (minMarketCap) => set({ minMarketCap }),
    setMaxMarketCap: (maxMarketCap) => set({ maxMarketCap }),
    setSelectedChain: (chain) => set({ selectedChain: chain }),
    setSelectedSort: (sort) => set({ selectedSort: sort }),
    resetFilters: () => set({
        isLaunched: false,
        minMarketCap: '',
        maxMarketCap: '',
        selectedChain: chains[0],
        selectedSort: sortOptions[0],
    }),
}));



// store/useNavStore.ts

type NavStore = {
    activeTab: 'info' | 'chart' | 'trade' | "txns"
    setActiveTab: (tab: 'info' | 'chart' | 'trade' | "txns") => void
}

export const useNavStore = create<NavStore>((set) => ({
    activeTab: 'info', // 'info' | 'chart' | 'trade' | "txns"
    setActiveTab: (tab) => set({ activeTab: tab }),
}))




interface CurrencyState {
    isEth: boolean
    toggleCurrency: () => void
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
    isEth: false,
    toggleCurrency: () => set((state) => ({ isEth: !state.isEth })),
}))






export interface TransactionInfo {
    type: 'tokenCreation' | 'swapToken' | 'other' | 'tokenPresaleCreation' | 'InitialVotingBatchCounting';
    tokenAmount?: string;
    ethAmount?: string;
    tokenName?: string;
    tokenTicker?: string;
    swapAmount?: string;
    transactionHash: `0x${string}`;
}

interface TransactionState {
    pendingTransactions: TransactionInfo[];
    addPendingTransaction: (transaction: TransactionInfo) => void;
    removePendingTransaction: (transactionHash: string) => void;
    getPendingTransaction: (transactionHash: string) => TransactionInfo | undefined;
}




// Enums
export enum MessageStatus {
    PENDING = 'PENDING_',
    CONFIRMED = 'CONFIRMED_',
    FAILED = 'FAILED',
    INFLIGHT = 'INFLIGHT',
    DELIVERED = 'DELIVERED',
    PAYLOAD_STORED = 'PAYLOAD_STORED',
    BLOCKED = 'BLOCKED',
    CONFIRMING = 'CONFIRMING',
}

export enum NormalTxStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    FAILED = 'FAILED_'
}


export interface Transaction {
    srcTxHash: string;
    srcChainId: number;
    status: MessageStatus;
    additionalData: UnifiedSearchParams;
    updatedAt: number;
}

export interface NormalTransaction {
    hash: string;
    status: NormalTxStatus;
    additionalData: UnifiedSearchParams;
    updatedAt: number;
}

// Store interfaces
interface TransactionStore {
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'updatedAt'>) => void;
    updateTransaction: (srcTxHash: string, updates: Partial<Transaction>) => void;
    removeTransaction: (srcTxHash: string) => void;
}

interface NormalTransactionStore {
    normalTransactions: NormalTransaction[];
    addNormalTransaction: (transaction: Omit<NormalTransaction, 'updatedAt'>) => void;
    updateNormalTransaction: (hash: string, updates: Partial<NormalTransaction>) => void;
    removeNormalTransaction: (hash: string) => void;
}

interface SheetStore {
    isOpen: boolean;
    openSheet: () => void;
    closeSheet: () => void;
    toggleSheet: () => void;
}

export const useTransactionStore = create(
    persist<TransactionStore>(
        (set) => ({
            transactions: [],
            addTransaction: (transaction) =>
                set((state) => ({
                    transactions: [
                        ...state.transactions,
                        { ...transaction, updatedAt: Date.now() }
                    ]
                })),
            updateTransaction: (srcTxHash, updates) =>
                set((state) => ({
                    transactions: state.transactions.map((tx) =>
                        tx.srcTxHash === srcTxHash
                            ? { ...tx, ...updates, updatedAt: Date.now() }
                            : tx
                    ),
                })),
            removeTransaction: (srcTxHash) =>
                set((state) => ({
                    transactions: state.transactions.filter((tx) => tx.srcTxHash !== srcTxHash),
                })),
        }),
        {
            name: 'transaction-storage-2',
        }
    )
);

export const useNormalTransactionStore = create(
    persist<NormalTransactionStore>(
        (set) => ({
            normalTransactions: [],
            addNormalTransaction: (transaction) =>
                set((state) => ({
                    normalTransactions: [
                        ...state.normalTransactions,
                        { ...transaction, updatedAt: Date.now() }
                    ]
                })),
            updateNormalTransaction: (hash, updates) =>
                set((state) => ({
                    normalTransactions: state.normalTransactions.map((tx) =>
                        tx.hash === hash
                            ? { ...tx, ...updates, updatedAt: Date.now() }
                            : tx
                    ),
                })),
            removeNormalTransaction: (hash) =>
                set((state) => ({
                    normalTransactions: state.normalTransactions.filter((tx) => tx.hash !== hash),
                })),
        }),
        {
            name: 'normal-transaction-storage-2',
        }
    )
);

export const useSheetStore = create<SheetStore>((set) => ({
    isOpen: false,
    openSheet: () => set({ isOpen: true }),
    closeSheet: () => set({ isOpen: false }),
    toggleSheet: () => set((state) => ({ isOpen: !state.isOpen })),
}));


export interface ErrorItem {
    id: number;
    name: string;
    error: unknown;
}

export interface ErrorStore {
    errors: ErrorItem[];
    addError: (name: string, error: unknown) => void;
    removeError: (id: number) => void;
    clearErrors: () => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
    errors: [],
    addError: (name, error) => set((state) => ({
        errors: [...state.errors, { id: Date.now(), name, error }]
    })),
    removeError: (id) => set((state) => ({
        errors: state.errors.filter(error => error.id !== id)
    })),
    clearErrors: () => set({ errors: [] }),
}));

export default useErrorStore;



interface TokenCreationStore {
    isOpen: boolean;
    openCredenza: () => void;
    closeCredenza: () => void;
}

export const useTokenCreationStore = create<TokenCreationStore>((set) => ({
    isOpen: false,
    openCredenza: () => set({ isOpen: true }),
    closeCredenza: () => set({ isOpen: false }),
}));


interface UnclaimedTokensState {
    isSheetOpen: boolean;
    openSheet: () => void;
    closeSheet: () => void;
}

export const useUnclaimedTokensStore = create<UnclaimedTokensState>((set) => ({
    isSheetOpen: false,
    openSheet: () => set({ isSheetOpen: true }),
    closeSheet: () => set({ isSheetOpen: false }),
}));