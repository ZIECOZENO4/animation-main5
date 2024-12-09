import { motion } from "framer-motion";
import { useSheetStore } from "@/zustand-store";
import { useActiveTransactions } from "./useActiveTransaction";
import { TransactionManager } from "./transactionWatcher";

export const NavigationBar = () => {
  const hasActiveTransactions = useActiveTransactions();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/95"
    >
      <TransactionManager />
      {hasActiveTransactions && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 " />
              )}
              <span className="sr-only">Notifications</span>
    </motion.header>
  );
}