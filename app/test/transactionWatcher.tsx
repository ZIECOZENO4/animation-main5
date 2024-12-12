"use client";
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@layerzerolabs/scan-client';
import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';
import { useQueries, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { Badge } from "@nextui-org/react";
import { ExternalLink, CheckCircle, XCircle, Clock, ChevronUp, ChevronDown, ArrowRight } from "lucide-react";
import { SEPOLIA_ARBITRUM_CHAIN_ID } from '@/constants';
import { format, formatDistanceToNow } from 'date-fns';
import { usePublicClient } from 'wagmi';
import { newCalculateFontSize } from '@/lib/newCalculateFontSize';
import { PublicClient, TransactionReceipt, WaitForTransactionReceiptTimeoutError } from 'viem';
import Link from 'next/link';
import { MessageStatus, NormalTransaction, NormalTxStatus, Transaction, UnifiedSearchParams, useNormalTransactionStore, useSheetStore, useTransactionStore } from '@/zustand-store';
import { useEthereumPrice } from '@/hooks/useEthPrice';
import { getChainIconByChainId } from '@/lib/chainsAndIcons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tab';

const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000 // 2 hours in milliseconds

const lzClient = createClient('testnet');

const needsContinuousChecking = (status: MessageStatus): boolean => {
    return [MessageStatus.PENDING, MessageStatus.INFLIGHT, MessageStatus.CONFIRMING].includes(status);
};

// Wrapper function for waitForTransactionReceipt
const waitForTransactionReceiptWrapper = async (
    publicClient: PublicClient,
    hash: `0x${string}`
): Promise<{ status: 'success' | 'failed' | 'pending', receipt: TransactionReceipt | null }> => {
    try {
        const receipt = await publicClient.waitForTransactionReceipt({
            hash,
            timeout: TWO_HOURS_IN_MS,
            pollingInterval: 3000,
            confirmations: 3
        });
        return { status: receipt.status === 'success' ? 'success' : 'failed', receipt };
    } catch (error) {
        console.error(`Error in waitForTransactionReceipt for ${hash}:`, error);
        if (error instanceof WaitForTransactionReceiptTimeoutError) {
            return { status: 'pending', receipt: null };
        }
        return { status: 'failed', receipt: null };
    }
};

const fetchCrossChainTransaction = async (tx: Transaction, publicClient: PublicClient | undefined): Promise<MessageStatus> => {
    if (!publicClient) return MessageStatus.PENDING;

    const { status, receipt } = await waitForTransactionReceiptWrapper(publicClient, tx.srcTxHash as `0x${string}`);
    if (status === 'pending') {
        return MessageStatus.PENDING;
    } else if (status === 'failed') {
        return MessageStatus.FAILED;
    } else {
        // status is 'success'
        const { messages } = await lzClient.getMessagesBySrcTxHash(tx.srcTxHash);
        return messages[0]?.status || MessageStatus.INFLIGHT;
    }
};
const convertAdditionalDataToString = (data: UnifiedSearchParams) => {
    return Object.fromEntries(
        Object.entries(data).map(([key, value]) =>
            typeof value === 'object' && value instanceof Date
                ? [key, value.toISOString()]
                : [key, value]
        )
    );
}
const fetchNormalTransaction = async (tx: NormalTransaction, publicClient: PublicClient | undefined): Promise<NormalTxStatus> => {
    if (!publicClient) return NormalTxStatus.PENDING;

    const { status } = await waitForTransactionReceiptWrapper(publicClient, tx.hash as `0x${string}`);

    switch (status) {
        case 'success':
            return NormalTxStatus.CONFIRMED;
        case 'failed':
            return NormalTxStatus.FAILED;
        case 'pending':
            return NormalTxStatus.PENDING;
    }
};
export const TransactionManager: React.FC = () => {
    const { transactions, updateTransaction } = useTransactionStore();
    const { normalTransactions, updateNormalTransaction } = useNormalTransactionStore();
    const router = useRouter();
    const queryClient = useQueryClient();
    const publicClient = usePublicClient();
    const { data: ethPrice } = useEthereumPrice();
    const { isOpen, openSheet, closeSheet } = useSheetStore();

    const crossChainQueries = useQueries({
        queries: transactions.map((tx) => ({
            queryKey: ['cross-chain-transaction', tx.srcTxHash],
            queryFn: () => fetchCrossChainTransaction(tx, publicClient),
            refetchInterval: needsContinuousChecking(tx.status) ? 3000 : Infinity,
            enabled: needsContinuousChecking(tx.status),
        })),
    });

    const normalTxQueries = useQueries({
        queries: normalTransactions.map((tx) => ({
            queryKey: ['normal-transaction', tx.hash],
            queryFn: () => fetchNormalTransaction(tx, publicClient),
            refetchInterval: tx.status === NormalTxStatus.PENDING ? 3000 : Infinity,
            enabled: tx.status === NormalTxStatus.PENDING,
        })),
    });

    useEffect(() => {
        const activeTransactions = transactions.filter(tx => needsContinuousChecking(tx.status));
        const pendingNormalTransactions = normalTransactions.filter(tx => tx.status === NormalTxStatus.PENDING);

        const totalActiveTransactions = activeTransactions.length + pendingNormalTransactions.length;

        if (totalActiveTransactions > 0) {
            toast.loading(`${totalActiveTransactions} transaction(s) in progress`, {
                duration: Infinity,
                action: {
                    label: 'View',
                    onClick: openSheet,
                },
            });
        } else {
            toast.dismiss();
        }

        crossChainQueries.forEach((query, index) => {
            if (query.isSuccess && query.data) {
                const newStatus = query.data;
                const tx = transactions[index];

                if (newStatus !== tx.status) {
                    updateTransaction(tx.srcTxHash, {
                        status: newStatus,
                    });

                    switch (newStatus) {
                        case MessageStatus.PENDING:
                            toast.loading(`Transaction ${tx.srcTxHash.slice(0, 6)}... is pending`);
                            break;
                        case MessageStatus.CONFIRMED:
                            toast.success(`Transaction ${tx.srcTxHash.slice(0, 6)}... confirmed on source chain`);
                            break;
                        case MessageStatus.INFLIGHT:
                            toast.info(`Transaction ${tx.srcTxHash.slice(0, 6)}... is now cross-chain`);
                            break;
                        case MessageStatus.DELIVERED:
                            toast.success(`Transaction ${tx.srcTxHash.slice(0, 6)}... delivered`, {
                                description: 'Click to view details',
                                duration: 20000,
                                action: {
                                    label: 'View',
                                    onClick: () => {
                                        const serializedData = encodeURIComponent(JSON.stringify(tx.additionalData));
                                        router.push(`/success-page?data=${serializedData}`);
                                    },
                                },
                            });
                            queryClient.invalidateQueries();
                            break;
                        case MessageStatus.FAILED:
                            toast.error(`Transaction ${tx.srcTxHash.slice(0, 6)}... failed`);
                            break;
                        case MessageStatus.PAYLOAD_STORED:
                            toast.info(`Transaction ${tx.srcTxHash.slice(0, 6)}... payload stored`);
                            break;
                        case MessageStatus.BLOCKED:
                            toast.error(`Transaction ${tx.srcTxHash.slice(0, 6)}... blocked`);
                            break;
                        case MessageStatus.CONFIRMING:
                            toast.loading(`Transaction ${tx.srcTxHash.slice(0, 6)}... confirming`);
                            break;
                    }
                }
            }
        });

        normalTxQueries.forEach((query: UseQueryResult<NormalTxStatus, Error>, index) => {
            if (query.isSuccess && query.data) {
                const newStatus = query.data;
                const tx = normalTransactions[index];

                if (newStatus !== tx.status) {
                    updateNormalTransaction(tx.hash, {
                        status: newStatus,
                    });

                    switch (newStatus) {
                        case NormalTxStatus.CONFIRMED:
                            toast.success(`Transaction ${tx.hash.slice(0, 6)}... confirmed`, {
                                description: 'Click to view details',
                                duration: 20000,
                                action: {
                                    label: 'View',
                                    onClick: () => {
                                        const serializedData = encodeURIComponent(JSON.stringify(tx.additionalData));
                                        router.push(`/success-page?data=${serializedData}`);
                                    },
                                },
                            });
                            queryClient.invalidateQueries();
                            break;
                        case NormalTxStatus.FAILED:
                            toast.error(`Transaction ${tx.hash.slice(0, 6)}... failed`);
                            break;
                    }
                }
            }
        });
    }, [crossChainQueries, normalTxQueries, transactions, normalTransactions, updateTransaction, updateNormalTransaction, router, openSheet, queryClient]);

    const sortedTransactions = [
        ...transactions.map(tx => ({ ...tx, type: 'cross-chain' as const })),
        ...normalTransactions.map(tx => ({ ...tx, type: 'normal' as const }))
    ].sort((a, b) => b.updatedAt - a.updatedAt);

    return (
        <>
            <Sheet open={isOpen} onOpenChange={closeSheet}>
                <div className="bg-popover/80 backdrop-blur-md max-h-screen overflow-y-auto border-l border-border">
                    <SheetHeader>
                        <SheetTitle className="text-popover-foreground">Transaction Details</SheetTitle>
                    </SheetHeader>
                    <Tabs defaultValue="all" className="w-full mt-6">
                        <TabsList className="flex flex-row justify-between items-center w-full">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all" className="mt-4">
                            {sortedTransactions.map((tx) => (
                                <TransactionItem key={tx.type === 'cross-chain' ? tx.srcTxHash : tx.hash} tx={tx} ethPrice={ethPrice ? ethPrice.ethereum.usd : 0} />
                            ))}
                        </TabsContent>
                        <TabsContent value="pending" className="mt-4">
                            {sortedTransactions.filter(tx =>
                                (tx.type === 'cross-chain' && (tx.status === MessageStatus.INFLIGHT || tx.status === MessageStatus.CONFIRMING)) ||
                                (tx.type === 'normal' && tx.status === NormalTxStatus.PENDING)
                            ).map((tx) => (
                                <TransactionItem key={tx.type === 'cross-chain' ? tx.srcTxHash : tx.hash} tx={tx} ethPrice={ethPrice ? ethPrice.ethereum.usd : 0} />
                            ))}
                        </TabsContent>
                        <TabsContent value="completed" className="mt-4">
                            {sortedTransactions.filter(tx =>
                                (tx.type === 'cross-chain' && tx.status !== MessageStatus.INFLIGHT && tx.status !== MessageStatus.CONFIRMING) ||
                                (tx.type === 'normal' && tx.status !== NormalTxStatus.PENDING)
                            ).map((tx) => (
                                <TransactionItem key={tx.type === 'cross-chain' ? tx.srcTxHash : tx.hash} tx={tx} ethPrice={ethPrice ? ethPrice.ethereum.usd : 0} />
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </Sheet>
        </>
    );
};

const statusConfig = {
    [MessageStatus.PENDING]: { color: "bg-yellow-500", icon: Clock, text: "pending" },
    [MessageStatus.FAILED]: { color: "bg-red-500", icon: XCircle, text: "Failed" },
    [MessageStatus.CONFIRMED]: { color: "bg-green-500", icon: CheckCircle, text: "confirmed" },
    [MessageStatus.INFLIGHT]: { color: "bg-yellow-500", icon: Clock, text: "In Progress" },
    [MessageStatus.DELIVERED]: { color: "bg-green-500", icon: CheckCircle, text: "Delivered" },
    [MessageStatus.PAYLOAD_STORED]: { color: "bg-blue-500", icon: Clock, text: "Payload Stored" },
    [MessageStatus.BLOCKED]: { color: "bg-red-500", icon: XCircle, text: "Blocked" },
    [MessageStatus.CONFIRMING]: { color: "bg-yellow-500", icon: Clock, text: "Confirming" },
    [NormalTxStatus.PENDING]: { color: "bg-yellow-500", icon: Clock, text: "Pending" },
    [NormalTxStatus.CONFIRMED]: { color: "bg-green-500", icon: CheckCircle, text: "Confirmed" },
    [NormalTxStatus.FAILED]: { color: "bg-red-500", icon: XCircle, text: "FAILED" },
};


interface TransactionItemProps {
    tx: (Transaction | NormalTransaction) & { type: 'cross-chain' | 'normal' };
    ethPrice: number;
}


const TransactionItem: React.FC<TransactionItemProps> = ({ tx, ethPrice }) => {
    const router = useRouter();
    const { color, icon: StatusIcon, text } = statusConfig[tx.status];
    const formattedDate = format(new Date(tx.updatedAt), 'MMM d, yyyy HH:mm:ss');
    const fromNow = formatDistanceToNow(new Date(tx.updatedAt), { addSuffix: true });

    const additionalData = tx.additionalData || {};
    const { tokenAmount, ethAmount, usdAmount, type, tokenTicker } = additionalData;




    const renderAmount = () => {
        if (tokenAmount && ethAmount) {
            const usdValue = parseFloat(ethAmount) * ethPrice;
            return (
                <div className="flex flex-col">
                    <span className="text-lg font-bold" style={{ fontSize: newCalculateFontSize(tokenAmount, 'lg') }}>
                        {tokenAmount} {tokenTicker || 'Tokens'}
                    </span>
                    <span className="text-sm text-muted-foreground" style={{ fontSize: newCalculateFontSize(ethAmount, 'sm') }}>
                        {ethAmount} ETH ≈ ${usdValue.toFixed(2)}
                    </span>
                </div>
            );
        }
        return null;
    };

    const getTransactionTypeColor = () => {
        switch (type) {
            case 'tokenBuy':
                return 'bg-green-500/20 text-green-300';
            case 'tokenSell':
                return 'bg-red-500/20 text-red-300';
            default:
                return 'bg-blue-500/20 text-blue-300';
        }
    };
    const hash = tx.type === 'cross-chain' ? (tx as Transaction).srcTxHash : (tx as NormalTransaction).hash;
    const href = `/reciept?type=${tx.type}&hash=${hash}`;

    return (
        <Link href={href} passHref

            target="_blank"
            rel="noopener noreferrer">
            <div
                className={`mb-4 overflow-hidden transition-all duration-300  hover:shadow-xl cursor-pointer bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md border border-primary/20 hover:border-primary/40`}
                // onClick={() => handleClick(tx.type, tx.type === 'cross-chain' ? (tx as Transaction).srcTxHash : (tx as NormalTransaction).hash)}
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                }}
            >
                <div className="pb-2">
                    <div className="flex items-center justify-between">
                        <h1 className="text-sm font-semibold text-primary flex items-center">
                            <Badge  className={`mr-2 ${getTransactionTypeColor()}`}>
                                {type === 'tokenBuy' ? 'Buy' : type === 'tokenSell' ? 'Sell' : 'Tx'}
                            </Badge>
                            {tx.type === 'cross-chain' ? 'Cross-Chain' : 'Normal'}
                        </h1>
                        <Badge  className={`${color} text-white `}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            <span style={{ fontSize: newCalculateFontSize(text, "sm") }}>
                                {text}

                            </span>
                        </Badge>
                    </div>
                </div>
                <div>
                    <div className="space-y-3">
                        {renderAmount()}
                        {tx.type === 'cross-chain' && (
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    {getChainIconByChainId((tx as Transaction).srcChainId, 24)}
                                    <ArrowRight className="mx-2 h-4 w-4 text-muted-foreground" />
                                    {getChainIconByChainId(SEPOLIA_ARBITRUM_CHAIN_ID, 24)}
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{fromNow}</span>
                            <span className="font-mono">
                                {tx.type === 'cross-chain'
                                    ? `${(tx as Transaction).srcTxHash.slice(0, 6)}...${(tx as Transaction).srcTxHash.slice(-4)}`
                                    : `${(tx as NormalTransaction).hash.slice(0, 6)}...${(tx as NormalTransaction).hash.slice(-4)}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TransactionItem;