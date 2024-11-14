"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useMemo } from "react";
import EnhanceTradingView from "../chart/enhanced-trading-interface";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from "@nextui-org/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
interface Token {
  name: string;
  rate: string;
  chain: string;
  symbol: string;
  balance: string;
  icon: string;
}

interface TokenSelectModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onTokenSelect: (token: Token) => void;
  selectedTokens: string[];
}
interface ConfirmSwapModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void; 
  token1: Token | null;
  token2: Token | null;
  amount1: string;
  amount2: string;
}

const chains = [
  { name: "Ethereum", logo: "/images/eth.png" },
  { name: "Arbitrum", logo: "/images/arbi.png" },
  { name: "Optimism", logo: "/images/opti.png" },
  { name: "Sepolia", logo: "/images/sepo.png" }
];

interface BorderComponentProps {
  children: React.ReactNode;
}

const tokens: Token[] = [
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Arbitrum",
    symbol: "MONAD",
    balance: "100",
    icon: "/images/arbi.png"
  },
  {
    name: "BEAT",
    rate: "0.567",
    chain: "Ethereum",
    symbol: "BEAT",
    balance: "200",
    icon: "/images/eth.png"
  },
  {
    name: "USDC",
    rate: "1.000",
    chain: "Polygon",
    symbol: "USDC",
    balance: "500",
    icon: "/images/opti.png"
  },
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Polygon",
    symbol: "MONAD",
    balance: "100",
    icon: "/images/opti.png"
  },
  {
    name: "BEAT",
    rate: "0.567",
    chain: "Arbitrum",
    symbol: "BEAT",
    balance: "100",
    icon: "/images/arbi.png"
  },
  {
    name: "USDC",
    rate: "1.000",
    chain: "Ethereum",
    symbol: "USDC",
    balance: "500",
    icon: "/images/eth.png"
  },
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Polygon",
    symbol: "MONAD",
    balance: "100",
    icon: "/images/opti.png"
  },
  {
    name: "BEAT",
    rate: "0.567",
    chain: "Ethereum",
    symbol: "BEAT",
    balance: "200",
    icon: "/images/eth.png"
  },
  {
    name: "USDC",
    rate: "1.000",
    chain: "Arbitrum",
    symbol: "USDC",
    balance: "500",
    icon: "/images/arbi.png"
  },
  {
    name: "TOKEN2",
    rate: "0.800",
    chain: "Sepolia",
    symbol: "TOKEN2",
    balance: "150",
    icon: "/images/sepo.png"
  },
  {
    name: "TOKEN2",
    rate: "0.800",
    chain: "Sepolia",
    symbol: "TOKEN2",
    balance: "150",
    icon: "/images/sepo.png"
  },
  {
    name: "TOKEN2",
    rate: "0.800",
    chain: "Sepolia",
    symbol: "TOKEN2",
    balance: "150",
    icon: "/images/sepo.png"
  },
  {
    name: "TOKEN2",
    rate: "0.800",
    chain: "Sepolia",
    symbol: "TOKEN2",
    balance: "150",
    icon: "/images/sepo.png"
  },
  {
    name: "TOKEN2",
    rate: "0.800",
    chain: "Sepolia",
    symbol: "TOKEN2",
    balance: "150",
    icon: "/images/sepo.png"
  },
  {
    name: "TOKEN2",
    rate: "0.800",
    chain: "Sepolia",
    symbol: "TOKEN2",
    balance: "150",
    icon: "/images/sepo.png"
  },
  {
    name: "TOKEN2",
    rate: "0.800",
    chain: "Sepolia",
    symbol: "TOKEN2",
    balance: "150",
    icon: "/images/sepo.png"
  },
  {
    name: "TOKEN2",
    rate: "0.800",
    chain: "Sepolia",
    symbol: "TOKEN2",
    balance: "150",
    icon: "/images/sepo.png"
  },
  {
    name: "TOKEN2",
    rate: "0.800",
    chain: "Sepolia",
    symbol: "TOKEN2",
    balance: "150",
    icon: "/images/sepo.png"
  },
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Arbitrum",
    symbol: "MONAD",
    balance: "100",
    icon: "/images/arbi.png"
  },
  {
    name: "BEAT",
    rate: "0.567",
    chain: "Ethereum",
    symbol: "BEAT",
    balance: "200",
    icon: "/images/eth.png"
  },
  {
    name: "USDC",
    rate: "1.000",
    chain: "Polygon",
    symbol: "USDC",
    balance: "500",
    icon: "/images/opti.png"
  },
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Polygon",
    symbol: "MONAD",
    balance: "100",
    icon: "/images/opti.png"
  },
  {
    name: "BEAT",
    rate: "0.567",
    chain: "Arbitrum",
    symbol: "BEAT",
    balance: "100",
    icon: "/images/arbi.png"
  },
  {
    name: "USDC",
    rate: "1.000",
    chain: "Ethereum",
    symbol: "USDC",
    balance: "500",
    icon: "/images/eth.png"
  },
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Polygon",
    symbol: "MONAD",
    balance: "100",
    icon: "/images/opti.png"
  },
  {
    name: "BEAT",
    rate: "0.567",
    chain: "Ethereum",
    symbol: "BEAT",
    balance: "200",
    icon: "/images/eth.png"
  },
  {
    name: "USDC",
    rate: "1.000",
    chain: "Arbitrum",
    symbol: "USDC",
    balance: "500",
    icon: "/images/arbi.png"
  },
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Arbitrum",
    symbol: "MONAD",
    balance: "100",
    icon: "/images/arbi.png"
  },
  {
    name: "BEAT",
    rate: "0.567",
    chain: "Ethereum",
    symbol: "BEAT",
    balance: "200",
    icon: "/images/eth.png"
  },
  {
    name: "USDC",
    rate: "1.000",
    chain: "Polygon",
    symbol: "USDC",
    balance: "500",
    icon: "/images/opti.png"
  },
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Polygon",
    symbol: "MONAD",
    balance: "100",
    icon: "/images/opti.png"
  },
  {
    name: "BEAT",
    rate: "0.567",
    chain: "Arbitrum",
    symbol: "BEAT",
    balance: "100",
    icon: "/images/arbi.png"
  },
  {
    name: "USDC",
    rate: "1.000",
    chain: "Ethereum",
    symbol: "USDC",
    balance: "500",
    icon: "/images/eth.png"
  },
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Polygon",
    symbol: "MONAD",
    balance: "100",
    icon: "/images/opti.png"
  },
  {
    name: "BEAT",
    rate: "0.567",
    chain: "Ethereum",
    symbol: "BEAT",
    balance: "200",
    icon: "/images/eth.png"
  },
  {
    name: "USDC",
    rate: "1.000",
    chain: "Arbitrum",
    symbol: "USDC",
    balance: "500",
    icon: "/images/arbi.png"
  }
];

const BorderComponent = ({
  children,
  className = ""
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div className={`relative h-full ${className}`}>
    <div className="relative h-full">{children}</div>
    {/* Top border */}
    <div
      className="absolute -top-[2px] -right-[2px] -left-[2px]"
      style={{
        height: "2px",
        backgroundImage: `
          repeating-linear-gradient(
            to right,
            #555555 0,
            #555555 8px,
            transparent 8px,
            transparent 16px,
            #555555 16px,
            #555555 32px,
            transparent 32px,
            transparent 48px
          )
        `
      }}
    />
    {/* Bottom border */}
    <div
      className="absolute -bottom-[2px] -right-[2px] -left-[2px]"
      style={{
        height: "2px",
        backgroundImage: `
          repeating-linear-gradient(
            to right,
            #555555 0,
            #555555 8px,
            transparent 8px,
            transparent 16px,
            #555555 16px,
            #555555 32px,
            transparent 32px,
            transparent 48px
          )
        `
      }}
    />
    {/* Left border */}
    <div
      className="absolute -left-[2px] -top-[2px] -bottom-[2px]"
      style={{
        width: "2px",
        backgroundImage: `
          repeating-linear-gradient(
            to bottom,
            #555555 0,
            #555555 8px,
            transparent 8px,
            transparent 16px,
            #555555 16px,
            #555555 32px,
            transparent 32px,
            transparent 48px
          )
        `
      }}
    />
    {/* Right border */}
    <div
      className="absolute -right-[2px] -top-[2px] -bottom-[2px]"
      style={{
        width: "2px",
        backgroundImage: `
          repeating-linear-gradient(
            to bottom,
            #555555 0,
            #555555 8px,
            transparent 8px,
            transparent 16px,
            #555555 16px,
            #555555 32px,
            transparent 32px,
            transparent 48px
          )
        `
      }}
    />
  </div>
);

const TokenSelectModal: React.FC<TokenSelectModalProps> = ({
  isOpen,
  onOpenChange,
  onTokenSelect,
  selectedTokens
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeChain, setActiveChain] = useState<string>("Ethereum");

  // Modified filtering logic to strictly filter by active chain first
  const filteredTokens = useMemo(() => {
    return tokens.filter((token) => {
      // First check if token matches active chain
      if (token.chain !== activeChain) return false;

      // Then check if token is not already selected
      if (selectedTokens.includes(token.symbol)) return false;

      // Finally apply search filter if query exists
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        return (
          token.name.toLowerCase().includes(search) ||
          token.symbol.toLowerCase().includes(search)
        );
      }

      return true;
    });
  }, [activeChain, searchQuery, selectedTokens]);

  const handleChainSelect = (chainName: string) => {
    setActiveChain(chainName);
    setSearchQuery(""); // Reset search when changing chains
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-[#000000]/50 backdrop-blur-sm",
        base: " border-0",
        header: "border-b-0",
        body: ""
      }}
    >
      <BorderComponent>
        <div className="bg-[#000000]">
          <div className="bg-[#000000] w-full ">
            <ModalContent>
              {(onClose) => (
                <div className="bg-[#000000] w-full ">
                  <BorderComponent>
                    {/* Chain Logos and SS'//election */}

                    <ModalBody className="">
                      <div className="flex gap-4">
                        <div className="w-[100%] h-auto bg-black">
                          <BorderComponent>
                            <div className="flex flex-col justify-center items-center h-full">
                              <div className="flex justify-between items-center px-4">
                                <div className="text-[#F7F2DA80] px-0">
                                  Select Token
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={onClose}
                                  className="text-[#F7F2DA80] hover:text-[#F7F2DA] p-2"
                                >
                                  <IoClose size={24} />
                                </motion.button>
                              </div>
                              <div className="flex justify-around items-center mt-4 mb-2">
                                {chains.map((chain) => (
                                  <motion.div
                                    key={chain.name}
                                    whileHover={{ scale: 1.05 }}
                                    className={`flex flex-col items-center cursor-pointer 
                      ${activeChain === chain.name ? "bg-[#444444]" : ""} 
                      p-2 rounded`}
                                    onClick={() =>
                                      handleChainSelect(chain.name)
                                    }
                                  >
                                    <img
                                      src={chain.logo}
                                      alt={chain.name}
                                      className="w-8 h-8 mb-1"
                                    />
                                  </motion.div>
                                ))}
                              </div>
                              <div className="px-3">
                                <BorderComponent>
                                  <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                      setSearchQuery(e.target.value)
                                    }
                                    placeholder={`Search ${activeChain} tokens...`}
                                    className="w-full bg-[#5555554D] text-[#F7F2DA40] p-3 
                               focus:outline-none placeholder:text-[#F7F2DA40]"
                                  />
                                </BorderComponent>
                              </div>
                              <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto p-2">
                                {filteredTokens.length > 0 ? (
                                  filteredTokens.map((token) => (
                                    <BorderComponent key={token.symbol}>
                                      <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex justify-between items-center p-3 
                                   cursor-pointer bg-[#5555554D]"
                                        onClick={() => {
                                          onTokenSelect(token);
                                          setSearchQuery("");
                                          onClose();
                                        }}
                                      >
                                        <div className="flex flex-col">
                                          <span className="text-[#F7F2DA80] text-lg">
                                            {token.name}
                                          </span>
                                          <span className="text-[#F7F2DA40] text-xs">
                                            ${token.rate}
                                          </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                          <span className="text-[#F7F2DA40] text-sm">
                                            {token.chain}
                                          </span>
                                          <span className="text-[#F7F2DA40] text-xs">
                                            Balance: {token.balance}
                                          </span>
                                        </div>
                                      </motion.div>
                                    </BorderComponent>
                                  ))
                                ) : (
                                  <div className="text-center text-[#F7F2DA40] py-4">
                                    No tokens found for {activeChain}
                                  </div>
                                )}
                              </div>
                            </div>
                          </BorderComponent>
                        </div>
                      </div>
                    </ModalBody>
                  </BorderComponent>
                </div>
              )}
            </ModalContent>
          </div>
        </div>
      </BorderComponent>
    </Modal>
  );
};
// Modified ConfirmSwapModal with custom borders
const ConfirmSwapModal: React.FC<ConfirmSwapModalProps> = ({
  isOpen,
  onOpenChange,
  token1,
  token2,
  amount1,
  amount2
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSwapConfirm = () => {
    console.log("Swap confirmed");
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onOpenChange(false);
    }, 5000);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: "bg-[#000000]/50 backdrop-blur-sm",
          base: "bg-transparent border-0",
          header: "border-b-0",
          body: "p-4"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <BorderComponent className="bg-[#000000]">
              <div className="">
                <div className="flex justify-between items-center px-6 py-4 border-b border-[#555555]">
                  <span className="text-[#F7F2DA80] text-lg font-medium">
                    Confirm Swap
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="text-[#F7F2DA80] hover:text-[#F7F2DA] p-2"
                  >
                    <IoClose size={24} />
                  </motion.button>
                </div>
                <ModalBody className="px-4">
                  <div className="space-y-4">
                    <BorderComponent>
                      <div className="bg-[#5555554D] p-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-[#F7F2DA80]">From:</span>
                          <span className="text-[#F7F2DA80]">
                            {amount1} {token1?.symbol}
                          </span>
                        </div>
                        <div className="text-[#F7F2DA40] text-sm">
                          Chain: {token1?.chain}
                        </div>
                      </div>
                    </BorderComponent>

                    <BorderComponent>
                      <div className="bg-[#5555554D] p-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-[#F7F2DA80]">To:</span>
                          <span className="text-[#F7F2DA80]">
                            {amount2} {token2?.symbol}
                          </span>
                        </div>
                        <div className="text-[#F7F2DA40] text-sm">
                          Chain: {token2?.chain}
                        </div>
                      </div>
                    </BorderComponent>

                    <BorderComponent>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#5555554D] text-[#F7F2DA80] p-3"
                        onClick={handleSwapConfirm}
                      >
                        SWAP TOKENS
                      </motion.button>
                    </BorderComponent>
                  </div>
                </ModalBody>
              </div>
            </BorderComponent>
          )}
        </ModalContent>
      </Modal>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 right-8 w-auto transform z-50"
          >
            <BorderComponent>
              <div className="bg-[#000000] px-6 py-4 flex leading-8 items-center space-x-3">
                <div className="text-[#F7F2DA40]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-[#F7F2DA80]">
                  Swap Successfully Completed, Please Visit Your Dashboard For
                  More Details
                </span>
              </div>
            </BorderComponent>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function TestContent() {
  const tokenModal = useDisclosure();
  const confirmModal = useDisclosure();
  const [selectedToken1, setSelectedToken1] = useState<Token | null>(null);
  const [selectedToken2, setSelectedToken2] = useState<Token | null>(null);
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const [amount1, setAmount1] = useState<string>("");
  const [amount2, setAmount2] = useState<string>("");

  const handleTokenSelect = (token: Token) => {
    if (activeInput === 1) {
      setSelectedToken1(token);
    } else {
      setSelectedToken2(token);
    }
    tokenModal.onClose();
  };

  const selectedTokens = [
    selectedToken1?.symbol,
    selectedToken2?.symbol
  ].filter((symbol): symbol is string => symbol !== undefined);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const MiddleBorderComponent = ({
    children
  }: {
    children?: React.ReactNode;
  }) => (
    <div className="relative h-full">
      <div className="relative p-6 h-full">{children}</div>

      {/* Top border - Solid Black */}
      <div
        className="absolute -top-[2px] -right-[2px] -left-[2px]"
        style={{
          height: "2px",
          backgroundColor: "#000000"
        }}
      />

      {/* Bottom border - Custom Pattern */}
      <div
        className="absolute -bottom-[2px] -right-[2px] -left-[2px]"
        style={{
          height: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to right,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />

      {/* Left border - Solid Black */}
      <div
        className="absolute -left-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: "2px",
          backgroundColor: "#000000"
        }}
      />

      {/* Right border - Solid Black */}
      <div
        className="absolute -right-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: "2px",
          backgroundColor: "#000000"
        }}
      />
    </div>
  );

  const BorderComponent = ({
    children,
    className = ""
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => (
    <div className="relative h-full">
      <div className="relative  h-full">{children}</div>
      {/* Top border */}
      <div
        className="absolute -top-[2px] -right-[2px] -left-[2px]"
        style={{
          height: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to right,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />
      {/* Bottom border */}
      <div
        className="absolute -bottom-[2px] -right-[2px] -left-[2px]"
        style={{
          height: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to right,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />
      {/* Left border */}
      <div
        className="absolute -left-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: "2px",
          backgroundImage: `   
      repeating-linear-gradient(
        to bottom,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />
      {/* Right border */}
      <div
        className="absolute -right-[2px] -top-[2px] -bottom-[2px]"
        style={{
          width: "2px",
          backgroundImage: `
      repeating-linear-gradient(
        to bottom,
        #555555 0,
        #555555 8px,
        transparent 8px,
        transparent 16px,
        #555555 16px,
        #555555 32px,
        transparent 32px,
        transparent 48px
      )
    `
        }}
      />
    </div>
  );

  const BoxComponent = ({ title }: { title: string }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="mb-4"
    >
      <BorderComponent>
        <div className="flex justify-between items-center p-2">
          <span className="text-xs text-gray-500">{title}</span>
          <motion.div
            whileHover={{ scale: 1.1, borderColor: "#ffffff" }}
            whileTap={{ scale: 0.9 }}
            className="w-4 h-4 border border-gray-800 cursor-pointer"
          />
        </div>
      </BorderComponent>
    </motion.div>
  );

  return (
    <motion.div
      className="overflow-hidden"
      style={{ height: "calc(100vh - 5rem)" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative z-10 h-full p-2">
        <div className="flex flex-row w-full  gap-6 h-full">
          {/* Left Column */}
          <div className="flex w-[70%] flex-col gap-6 h-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative h-[65%] w-full bg-[#000000]"
            >
              <BorderComponent>
                <motion.span
                  className="text-sm  text-gray-500"
                  whileHover={{ color: "#ffffff" }}
                >
                  <div className="mx-0 pt-4 px-0  h-full w-full flex-grow ">
                    <EnhanceTradingView />
                  </div>
                </motion.span>
              </BorderComponent>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="relative h-[35%]  bg-[#000000]"
            >
              <BorderComponent>
                <motion.span
                  className="text-sm text-gray-500"
                  whileHover={{ color: "#ffffff" }}
                ></motion.span>
              </BorderComponent>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full  w-[30%]  bg-[#000000]"
          >
            <BorderComponent>
              <div className="flex flex-col h-full p-6 gap-4">
                {/* Top Section */}

                <div className="space-y-4 h-[65%]">
                  {/* First Token Input */}
                  <div className="flex gap-4">
                    <div className="w-[80%] h-[51px] bg-[#5555554D]">
                      <BorderComponent>
                        <div className="flex justify-between items-center h-full px-4">
                          <input
                            type="number"
                            value={amount1}
                            onChange={(e) => setAmount1(e.target.value)}
                            placeholder="Enter amount..."
                            className="bg-transparent text-[#F7F2DA80] text-[20px] w-1/2 focus:outline-none placeholder:text-[#F7F2DA40]"
                          />
                          {selectedToken1 && (
                            <div className="flex flex-col items-end">
                              <span className="text-[20px] text-[#F7F2DA80]">
                                {selectedToken1.symbol}
                              </span>
                            </div>
                          )}
                        </div>
                      </BorderComponent>
                    </div>
                    <motion.div
                      className="w-[20%] h-[51px] bg-[#5555554D]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <BorderComponent>
                        <div
                          className="flex items-center text-xs justify-center text-[#F7F2DA80] h-full cursor-pointer"
                          onClick={() => {
                            setActiveInput(1);
                            tokenModal.onOpen();
                          }}
                        >
                          <div className="">
                            {selectedToken1 ? (
                              <div className="flex items-center">
                                <img
                                  src={selectedToken1.icon}
                                  alt={selectedToken1.name}
                                  className="w-6 h-6 "
                                />
                              </div>
                            ) : (
                              <span className="">Select</span>
                            )}
                          </div>
                        </div>
                      </BorderComponent>
                    </motion.div>
                  </div>

                  {/* Second Token Input */}
                  <div className="flex gap-4">
                    <div className="w-[80%] h-[51px] bg-[#5555554D]">
                      <BorderComponent>
                        <div className="flex justify-between items-center h-full px-4">
                          <input
                            type="number"
                            value={amount2}
                            onChange={(e) => setAmount2(e.target.value)}
                            placeholder="Enter amount..."
                            className="bg-transparent text-[#F7F2DA80] text-[20px] w-1/2 focus:outline-none placeholder:text-[#F7F2DA40]"
                          />
                          {selectedToken2 && (
                            <div className="flex flex-col items-end">
                              <span className="text-[20px] text-[#F7F2DA80]">
                                {selectedToken2.symbol}
                              </span>
                            </div>
                          )}
                        </div>
                      </BorderComponent>
                    </div>
                    <motion.div
                      className="w-[20%] h-[51px] bg-[#5555554D]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <BorderComponent>
                        <div
                          className="flex items-center text-xs justify-center text-[#F7F2DA80] h-full cursor-pointer"
                          onClick={() => {
                            setActiveInput(2);
                            tokenModal.onOpen();
                          }}
                        >
                          <div className="">
                            {selectedToken2 ? (
                              <div className="flex items-center">
                                <img
                                  src={selectedToken2.icon}
                                  alt={selectedToken2.name}
                                  className="w-6 h-6 "
                                />
                              </div>
                            ) : (
                              <span className="">Select</span>
                            )}
                          </div>
                        </div>
                      </BorderComponent>
                    </motion.div>
                  </div>

                  {/* Confirm Button */}
                  <motion.div
                    className="w-full h-[51px] bg-[#5555554D]"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      if (
                        selectedToken1 &&
                        selectedToken2 &&
                        amount1 &&
                        amount2
                      ) {
                        confirmModal.onOpen();
                      }
                    }}
                  >
                    <BorderComponent>
                      <div className="flex justify-center items-center h-full cursor-pointer">
                        <span className="text-[20px] pr-2 text-[#F7F2DA80]">
                          CONFIRM SWAP
                        </span>
                      </div>
                    </BorderComponent>
                  </motion.div>

                  <TokenSelectModal
                    isOpen={tokenModal.isOpen}
                    onOpenChange={tokenModal.onOpenChange}
                    onTokenSelect={handleTokenSelect}
                    selectedTokens={selectedTokens}
                  />

                  <ConfirmSwapModal
                    isOpen={confirmModal.isOpen}
                    onOpenChange={confirmModal.onOpenChange}
                    token1={selectedToken1}
                    token2={selectedToken2}
                    amount1={amount1}
                    amount2={amount2}
                  />
                </div>

                {/* Middle Empty Section with Border */}
                <div className="flex-grow">
                  <MiddleBorderComponent />
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col justify-between h-[35%]">
                  {" "}
                  {/* Changed from space-y-4 to flex with justify-between */}
                  <div className="space-y-4">
                    {" "}
                    {/* Container for top two rows */}
                    {/* First Row */}
                    <div className="flex gap-4">
                      <div className="w-[80%] h-[51px] bg-[#5555554D]">
                        <BorderComponent>
                          <div className="flex justify-center items-center h-full">
                            <span className="text-[20px] text-[#F7F2DA80]">
                              MONAD
                            </span>
                          </div>
                        </BorderComponent>
                      </div>
                      <div className="w-[20%] h-[51px] bg-[#5555554D]">
                        <BorderComponent>
                          <div className="flex items-center justify-center h-full"></div>
                        </BorderComponent>
                      </div>
                    </div>
                    {/* Second Row */}
                    <div className="flex gap-4">
                      <div className="w-[80%] h-[51px] bg-[#5555554D]">
                        <BorderComponent>
                          <div className="flex justify-center items-center h-full">
                            <span className="text-[20px] text-[#F7F2DA80]">
                              MONAD
                            </span>
                          </div>
                        </BorderComponent>
                      </div>
                      <div className="w-[20%] h-[51px] bg-[#5555554D]">
                        <BorderComponent>
                          <div className="flex items-center justify-center h-full"></div>
                        </BorderComponent>
                      </div>
                    </div>
                  </div>
                  {/* Third Row - Full Width (at bottom) */}
                  <div className="w-full h-[51px] bg-[#5555554D]">
                    <BorderComponent>
                      <div className="flex justify-end items-center h-full">
                        <span className="text-[20px] pr-2 text-[#F7F2DA80]">
                          BEAT
                        </span>
                      </div>
                    </BorderComponent>
                  </div>
                </div>
              </div>
            </BorderComponent>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
