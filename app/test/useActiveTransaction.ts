"use client";
import { useTransactionStore, useNormalTransactionStore, MessageStatus, NormalTxStatus } from "@/zustand-store";
import { useEffect, useState } from "react";

export const useActiveTransactions = () => {
    const { transactions } = useTransactionStore();
    const { normalTransactions } = useNormalTransactionStore();
    const [hasActiveTransactions, setHasActiveTransactions] = useState(false);

    useEffect(() => {
        const activeTransactions = transactions.some(tx =>
            tx.status === MessageStatus.PENDING ||
            tx.status === MessageStatus.CONFIRMING ||
            tx.status === MessageStatus.INFLIGHT
        );

        const activeNormalTransactions = normalTransactions.some(tx =>
            tx.status === NormalTxStatus.PENDING
        );

        setHasActiveTransactions(activeTransactions || activeNormalTransactions);
    }, [transactions, normalTransactions]);

    return hasActiveTransactions;
};