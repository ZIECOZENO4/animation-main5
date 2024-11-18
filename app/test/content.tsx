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
import { IoAdd, IoClose } from "react-icons/io5";
import { Plus, ArrowDown } from 'lucide-react'



interface Token {
  id?: number;
  name: string;
  rate: string;
  chain?: string;
  symbol: string;
  balance: string;
  icon?: string;
}

interface CombinedTokenInputProps {
  componentId: number;
  amounts: Record<number, string>;
  selectedTokens: Record<number, Token | null>;
  handleAmountChange: (id: number, value: string) => void;
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
  { name: "Arbitrum", logo: "/images/arbi2.png" },
  { name: "Zksync", logo: "/images/zk.png" },
  { name: "Solana", logo: "/images/sola.png" },
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
    icon: "/images/arbi2.png"
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
    icon: "/images/arbi2.png"
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
    icon: "/images/arbi2.png"
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
    icon: "/images/arbi2.png"
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
    icon: "/images/arbi2.png"
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
    icon: "/images/arbi2.png"
  },
  {
    name: "MONAD",
    rate: "1.234",
    chain: "Arbitrum",
    symbol: "MONAD",
    balance: "100",
    icon: "/images/arbi2.png"
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
    icon: "/images/arbi2.png"
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
    icon: "/images/arbi2.png"
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

const baseTokens: Token[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Token ${i + 1}`,
  symbol: `TOKEN${i + 1}`,
  rate: (Math.random() * 100).toFixed(2),
  balance: (Math.random() * 1000).toFixed(2)
}));

const BaseTokenSelect: React.FC = () => {
  const [amount1, setAmount1] = useState<string>("");
  const [selectedToken1, setSelectedToken1] = useState<Token | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTokens = useMemo(() => {
    if (!searchQuery) return baseTokens;
    const search = searchQuery.toLowerCase();
    return baseTokens.filter(
      (token) =>
        token.name.toLowerCase().includes(search) ||
        token.symbol.toLowerCase().includes(search)
    );
  }, [searchQuery]);

  const handleTokenSelect = (token: Token) => {
    setSelectedToken1(token);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
      <p className="text-xs text-[#F7F2DA40]">To</p>
        <div className="w-[100%] h-[51px] bg-[#5555554D]">
          <BorderComponent>
            <div className="flex justify-between items-center h-full px-4">
              <input
                type="number"
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
                placeholder="Enter amount..."
                className="bg-transparent text-[#F7F2DA80] text-[20px] w-1/2 focus:outline-none placeholder:text-[#F7F2DA40]"
              />
              <div
                className="cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                {selectedToken1 ? (
                  <div className="flex flex-col items-end">
                    <span className="text-[20px] text-[#F7F2DA80]">
                      {selectedToken1.symbol}
                    </span>
                  </div>
                ) : (
                  <span className="text-[#F7F2DA40]"> Base Token</span>
                )}
              </div>
            </div>
          </BorderComponent>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        hideCloseButton={true}
        classNames={{
          backdrop: "bg-[#000000]/50 backdrop-blur-sm",
          base: "border-0 p-0",
          header: "border-b-0 p-0",
          body: "p-0",
          wrapper: "p-0"
        }}
      >
        <BorderComponent>
          <div className="bg-[#000000] max-w-sm">
            <ModalContent>
              {(onClose) => (
                <div className="bg-[#000000] w-full">
                  <BorderComponent>
                    <ModalBody>
                      <div className="w-full p-2 h-auto bg-black">
                        <BorderComponent>
                          <div className="w-full h-full">
                            <div className="flex justify-between items-center px-4">
                              <div className="text-[#F7F2DA80] px-0">
                                Select Base Token
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

                            <div className="px-3 mt-4">
                              <BorderComponent>
                                <input
                                  type="text"
                                  value={searchQuery}
                                  onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                  }
                                  placeholder="Search tokens..."
                                  className="w-full bg-[#5555554D] text-[#F7F2DA40] p-3 focus:outline-none placeholder:text-[#F7F2DA40]"
                                />
                              </BorderComponent>
                            </div>

                            <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto p-2">
                              {filteredTokens.map((token) => (
                                <BorderComponent key={token.id}>
                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex justify-between items-center p-3 cursor-pointer bg-[#5555554D]"
                                    onClick={() =>
                                      handleTokenSelect(token as Token)
                                    }
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
                                        {token.symbol}
                                      </span>
                                      <span className="text-[#F7F2DA40] text-xs">
                                        Balance: {token.balance}
                                      </span>
                                    </div>
                                  </motion.div>
                                </BorderComponent>
                              ))}
                            </div>
                          </div>
                        </BorderComponent>
                      </div>
                    </ModalBody>
                  </BorderComponent>
                </div>
              )}
            </ModalContent>
          </div>
        </BorderComponent>
      </Modal>
    </>
  );
};

const TokenSelectModal: React.FC<TokenSelectModalProps> = ({
  isOpen,
  onOpenChange,
  onTokenSelect,
  selectedTokens
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeChain, setActiveChain] = useState<string>("Ethereum");

  // Simplified filtering logic to only show tokens for active chain
  const filteredTokens = useMemo(() => {
    return tokens.filter((token) => {
      // Only show tokens from active chain
      if (token.chain !== activeChain) return false;

      // Apply search filter if query exists
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        return (
          token.name.toLowerCase().includes(search) ||
          token.symbol.toLowerCase().includes(search)
        );
      }
      return true;
    });
  }, [activeChain, searchQuery]);

  const handleChainSelect = (chainName: string) => {
    setActiveChain(chainName);
    setSearchQuery("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton={true}
      classNames={{
        backdrop: "bg-[#000000]/50 backdrop-blur-sm",
        base: "border-0 p-0",
        header: "border-b-0 p-0",
        body: "p-0",
        wrapper: "p-0"
      }}
    >
      <BorderComponent>
        <div className="bg-[#000000] max-w-sm">
          <ModalContent>
            {(onClose) => (
              <div className="bg-[#000000] w-full">
                <BorderComponent>
                  <ModalBody>
                    <div className="flex gap-4">
                      <div className="w-full p-2 h-auto bg-black">
                        <BorderComponent>
                          <div className="w-full h-full">
                            <div className="flex justify-between items-center px-4">
                              <div className="text-[#F7F2DA80] px-0">
                                {" "}
                                Select Token{" "}
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

                            {/* Chain Selection */}
                            <div className="flex justify-around items-center my-4 ">
                              {chains.map((chain) => (
                                <motion.div
                                  key={chain.name}
                                  whileHover={{ scale: 1.05 }}
                                  className={`flex flex-col items-center cursor-pointer 
                                                                    ${
                                                                      activeChain ===
                                                                      chain.name
                                                                        ? "bg-[#444444] border border-slate-800 bg-opacity-40"
                                                                        : " bg-black border border-slate-800 bg-opacity-40"
                                                                    } 
                                                                    p-1 rounded`}
                                  onClick={() => handleChainSelect(chain.name)}
                                >
                                  {/* Recommended text for non-active Ethereum tokens */}

                                  <img
                                    src={chain.logo}
                                    alt={chain.name}
                                    className={`w-10 h-10 mb-1 rounded-full ${
                                      activeChain === chain.name
                                        ? "opacity-70"
                                        : ""
                                    }`}
                                  />
                                </motion.div>
                              ))}
                            </div>

                            {/* Search Input */}
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

                            {/* Token List */}
                            <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto p-2">
                              {/* {activeChain !== 'Ethereum' && chain.name === 'Ethereum' && (
                                                                      <span className="text-red-500 text-xs absolute top-[-10px]">Recommended</span>
                                                                  )} */}
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
                                          {" "}
                                          {token.name}{" "}
                                        </span>
                                        <span className="text-[#F7F2DA40] text-xs">
                                          {" "}
                                          ${token.rate}{" "}
                                        </span>
                                      </div>
                                      <div className="flex flex-col items-end">
                                        <span className="text-[#F7F2DA40] text-sm">
                                          {" "}
                                          {token.chain}{" "}
                                        </span>
                                        <span className="text-[#F7F2DA40] text-xs">
                                          {" "}
                                          Balance: {token.balance}{" "}
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
      </BorderComponent>
    </Modal>
  );
};

const CombinedTokenInput: React.FC<CombinedTokenInputProps> = ({
  componentId,
  amounts,
  selectedTokens,
  handleAmountChange
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
    setIsModalOpen(false);
    selectedTokens[componentId] = token; // Update the selected token for this component
  };

  return (
    <div className="w-[100%] ">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-[#F7F2DA40]">From</p>
        <div className="flex gap-4">
          <div className="w-[80%] h-[51px] bg-[#5555554D]">
            <BorderComponent>
              <div className="flex justify-between items-center h-full px-4">
                <input
                  type="number"
                  value={amounts[componentId] || ""}
                  onChange={(e) =>
                    handleAmountChange(componentId, e.target.value)
                  }
                  placeholder="Enter amount..."
                  className="bg-transparent text-[#F7F2DA80] text-[20px] w-1/2 focus:outline-none placeholder:text-[#F7F2DA40]"
                />

                <div className="flex flex-col items-end">
                  <span className="text-[20px] text-[#F7F2DA80]">
                    {selectedTokens[componentId]?.symbol}
                  </span>
                </div>
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
                onClick={() => setIsModalOpen(true)}
              >
                <div>
                  {selectedTokens[componentId] ? (
                    <div className="flex items-center">
                      <img
                        src={selectedTokens[componentId]?.icon}
                        alt={selectedTokens[componentId]?.name}
                        className="w-10 h-10  rounded-full "
                      />
                    </div>
                  ) : (
                    <span>Select</span>
                  )}
                </div>
              </div>
            </BorderComponent>
          </motion.div>
          {/* Token Selection Modal */}
          {isModalOpen && (
            <TokenSelectModal
              isOpen={isModalOpen}
              onOpenChange={() => setIsModalOpen(false)}
              onTokenSelect={handleTokenSelect}
              selectedTokens={Object.values(selectedTokens)
                .filter((token): token is Token => token !== null)
                .map((token) => token.symbol)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const TokenInputList: React.FC = () => {
  const [baseAmount, setBaseAmount] = useState<string>("");
  const [baseToken, setBaseToken] = useState<Token | null>(null);
  const [components, setComponents] = useState<{ id: number }[]>([]);
  const [amounts, setAmounts] = useState<Record<number, string>>({});
  const [selectedTokens, setSelectedTokens] = useState<
    Record<number, Token | null>
  >({});
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  const handleAmountChange = (id: number | null, value: string) => {
    if (id === null) {
      setBaseAmount(value);
    } else {
      setAmounts((prev) => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const addNewComponent = () => {
    const newId =
      components.length > 0 ? Math.max(...components.map((c) => c.id)) + 1 : 1;
    setComponents((prev) => [...prev, { id: newId }]);
  };

  return (
    <div className="space-y-4">
      {/* Base Token Input (Cannot be removed) */}
      <div className="flex gap-4">
        <CombinedTokenInput
          componentId={100000000000000000000000000000000000000} // Example ID
          amounts={amounts}
          selectedTokens={selectedTokens}
          handleAmountChange={handleAmountChange}
        />
      </div>

      {/* Additional Token Inputs */}
      {components.map((component) => (
        <div key={component.id} className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="w-[80%] h-[51px] bg-[#5555554D]">
              <BorderComponent>
                <div className="flex justify-between items-center h-full px-4">
                  <input
                    type="number"
                    value={amounts[component.id] || ""}
                    onChange={(e) =>
                      handleAmountChange(component.id, e.target.value)
                    }
                    placeholder="Enter amount..."
                    className="bg-transparent text-[#F7F2DA80] text-[20px] w-1/2 focus:outline-none placeholder:text-[#F7F2DA40]"
                  />
                  {selectedTokens[component.id] && (
                    <div className="flex flex-col items-end">
                      <span className="text-[20px] text-[#F7F2DA80]">
                        {selectedTokens[component.id]?.symbol}
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
                    setActiveInput(component.id);
                    setIsTokenModalOpen(true);
                  }}
                >
                  <div className="">
                    {selectedTokens[component.id] ? (
                      <div className="flex items-center">
                        <img
                          src={selectedTokens[component.id]?.icon}
                          alt={selectedTokens[component.id]?.name}
                          className="w-10 h-10  rounded-full "
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
          <motion.button
            className="text-slate-700 text-xs self-end hover:underline"
            onClick={() => {
              setComponents((prev) =>
                prev.filter((c) => c.id !== component.id)
              );
              setSelectedTokens((prev) => {
                const newTokens = { ...prev };
                delete newTokens[component.id];
                return newTokens;
              });
              setAmounts((prev) => {
                const newAmounts = { ...prev };
                delete newAmounts[component.id];
                return newAmounts;
              });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Remove
          </motion.button>
        </div>
      ))}

      {/* Add Token Button */}
      <motion.div
        className="flex items-center justify-center gap-2 cursor-pointer mt-2  hover:underline"
        onClick={addNewComponent}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-[#F7F2DA80] text-xs">Add Token</span>
        <IoAdd size={20} className="text-[#F7F2DA80]" />
      </motion.div>

      {/* Additional Tokens Modal */}
      <TokenSelectModal
        isOpen={isTokenModalOpen}
        onOpenChange={() => setIsTokenModalOpen(false)}
        onTokenSelect={(token) => {
          if (activeInput !== null) {
            setSelectedTokens((prev) => ({
              ...prev,
              [activeInput]: token
            }));
          }
          setIsTokenModalOpen(false);
        }}
        selectedTokens={[
          ...(baseToken ? [baseToken.symbol] : []),
          ...Object.values(selectedTokens)
            .filter((token): token is Token => token !== null)
            .map((token) => token.symbol)
        ]}
      />
    </div>
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
  const [selectedTokens2, setSelectedTokens2] = useState<Token[]>([]);
  const [activeInput, setActiveInput] = useState<number | null>(null);
  const [components, setComponents] = useState<Array<{ id: number }>>([]);
  const [nextId, setNextId] = useState(1);
  const [amounts, setAmounts] = useState<{ [key: number]: string }>({});
  const [amount1, setAmount1] = useState<string>("");
  const [amount2, setAmount2] = useState<string>("");
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false)
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

  const [selectedTokens, setSelectedTokens] = useState<{
    [key: number]: Token | null;
  }>({});
  const addNewComponent = () => {
    setComponents([...components, { id: nextId }]);
    setNextId(nextId + 1);
  };

  const handleAmountChange = (id: number, value: string) => {
    setAmounts((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleTokenSelect = (token: Token) => {
    if (activeInput === 1) {
      setSelectedToken1(token);
    } else {
      // Avoid adding duplicates
      if (
        !selectedTokens2.some((selected) => selected.symbol === token.symbol)
      ) {
        setSelectedTokens2((prev) => [...prev, token]);
      }
    }
    tokenModal.onClose();
  };

  const removeToken = (symbol: string) => {
    setSelectedTokens2((prev) =>
      prev.filter((token) => token.symbol !== symbol)
    );
  };

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
              className="relative h-[35%]    bg-[#000000]"
            >
              <BorderComponent>
                <div className="px-4 gap-4 h-full overflow-y-auto 
              scrollbar-none 
              [-ms-overflow-style:'none'] 
              [scrollbar-width:'none'] 
              [&::-webkit-scrollbar]:hidden">

                <div className="flex flex-col my-2 gap-4 bg-[#1A1A1A]">
<div className="w-full h-[48px] px-2 py-1">
<div className="flex justify-between">
<div className="flex gap-1 items-center text-center align-middle">
  <div className="h-[14px] w-[14px] rounded-full bg-[#484848]" />
  <div className="h-[12px] w-[32px] text-center bg-[#484848]">
<p className="text-[10px] text-center text-[#BABABA]">3243e</p>
  </div>
  <p className="text-[12px] text-center text-[#555555]">10/10/24</p>
</div>
<div className="flex items-center justify-end gap-1">
  <p className="text-[12px] text-[#FFFFFF66]">five likes</p>
  <img 
    src='/images/heart.png' 
    alt='heart' 
    className='h-[10px] w-[12px] object-contain'
  />
</div>
</div>
<div className="flex gap-2 items-center text-center leading-5 align-middle ">
<p className="text-[14px]  text-[#555555]">#1667484</p>
<p className="text-[14px]  text-[#FFFFFFB2]">hey, this is so cool!</p>
</div>
</div>
        </div>
        <div className="flex flex-col gap-4 my-2 bg-[#1A1A1A]">
<div className="w-full h-[48px] px-2 py-1">
<div className="flex justify-between">
<div className="flex gap-1 items-center text-center align-middle">
  <div className="h-[14px] w-[14px] rounded-full bg-[#484848]" />
  <div className="h-[12px] w-[32px] text-center bg-[#484848]">
<p className="text-[10px] text-center text-[#BABABA]">3243e</p>
  </div>
  <p className="text-[12px] text-center text-[#555555]">10/10/24</p>
</div>
<div className="flex items-center justify-end gap-1">
  <p className="text-[12px] text-[#FFFFFF66]">five likes</p>
  <img 
    src='/images/heart.png' 
    alt='heart' 
    className='h-[10px] w-[12px] object-contain'
  />
</div>
</div>
<div className="flex gap-2 items-center text-center leading-5 align-middle ">
<p className="text-[14px]  text-[#555555]">#1667484</p>
<p className="text-[14px]  text-[#FFFFFFB2]">hey, this is so cool!</p>
</div>
</div>
        </div>
        <div className="flex flex-col gap-4 my-2 bg-[#1A1A1A]">
<div className="w-full h-[48px] px-2 py-1">
<div className="flex justify-between">
<div className="flex gap-1 items-center text-center align-middle">
  <div className="h-[14px] w-[14px] rounded-full bg-[#484848]" />
  <div className="h-[12px] w-[32px] text-center bg-[#484848]">
<p className="text-[10px] text-center text-[#BABABA]">3243e</p>
  </div>
  <p className="text-[12px] text-center text-[#555555]">10/10/24</p>
</div>
<div className="flex items-center justify-end gap-1">
  <p className="text-[12px] text-[#FFFFFF66]">five likes</p>
  <img 
    src='/images/heart.png' 
    alt='heart' 
    className='h-[10px] w-[12px] object-contain'
  />
</div>
</div>
<div className="flex gap-2 items-center text-center leading-5 align-middle ">
<p className="text-[14px]  text-[#555555]">#1667484</p>
<p className="text-[14px]  text-[#FFFFFFB2]">hey, this is so cool!</p>
</div>
</div>
        </div>


        <div className="flex flex-col gap-4 my-2 bg-[#1A1A1A]">
<div className="w-full h-[48px] px-2 py-1">
<div className="flex justify-between">
<div className="flex gap-1 items-center text-center align-middle">
  <div className="h-[14px] w-[14px] rounded-full bg-[#484848]" />
  <div className="h-[12px] w-[32px] text-center bg-[#484848]">
<p className="text-[10px] text-center text-[#BABABA]">3243e</p>
  </div>
  <p className="text-[12px] text-center text-[#555555]">10/10/24</p>
</div>
<div className="flex items-center justify-end gap-1">
  <p className="text-[12px] text-[#FFFFFF66]">five likes</p>
  <img 
    src='/images/heart.png' 
    alt='heart' 
    className='h-[10px] w-[12px] object-contain'
  />
</div>
</div>
<div className="flex gap-2 items-center text-center leading-5 align-middle ">
<p className="text-[14px]  text-[#555555]">#1667484</p>
<p className="text-[14px]  text-[#FFFFFFB2]">hey, this is so cool!</p>
</div>
</div>
        </div>
        <div className="flex flex-col gap-4 my-2 bg-[#1A1A1A]">
<div className="w-full h-[48px] px-2 py-1">
<div className="flex justify-between">
<div className="flex gap-1 items-center text-center align-middle">
  <div className="h-[14px] w-[14px] rounded-full bg-[#484848]" />
  <div className="h-[12px] w-[32px] text-center bg-[#484848]">
<p className="text-[10px] text-center text-[#BABABA]">3243e</p>
  </div>
  <p className="text-[12px] text-center text-[#555555]">10/10/24</p>
</div>
<div className="flex items-center justify-end gap-1">
  <p className="text-[12px] text-[#FFFFFF66]">five likes</p>
  <img 
    src='/images/heart.png' 
    alt='heart' 
    className='h-[10px] w-[12px] object-contain'
  />
</div>
</div>
<div className="flex gap-2 items-center text-center leading-5 align-middle ">
<p className="text-[14px]  text-[#555555]">#1667484</p>
<p className="text-[14px]  text-[#FFFFFFB2]">hey, this is so cool!</p>
</div>
</div>
        </div>
        <div className="flex flex-col gap-4 my-2 bg-[#1A1A1A]">
<div className="w-full h-[48px] px-2 py-1">
<div className="flex justify-between">
<div className="flex gap-1 items-center text-center align-middle">
  <div className="h-[14px] w-[14px] rounded-full bg-[#484848]" />
  <div className="h-[12px] w-[32px] text-center bg-[#484848]">
<p className="text-[10px] text-center text-[#BABABA]">3243e</p>
  </div>
  <p className="text-[12px] text-center text-[#555555]">10/10/24</p>
</div>
<div className="flex items-center justify-end gap-1">
  <p className="text-[12px] text-[#FFFFFF66]">five likes</p>
  <img 
    src='/images/heart.png' 
    alt='heart' 
    className='h-[10px] w-[12px] object-contain'
  />
</div>
</div>
<div className="flex gap-2 items-center text-center leading-5 align-middle ">
<p className="text-[14px]  text-[#555555]">#1667484</p>
<p className="text-[14px]  text-[#FFFFFFB2]">hey, this is so cool!</p>
</div>
</div>
        </div>
        <div className="absolute bottom-4 right-1 w-[25px] h-[25px] bg-[#1A1A1A] rounded-sm flex items-center justify-center cursor-pointer">
        <Plus className="h-4 w-4 z-50 text-gray-400" />
      </div>
                </div>
     
              </BorderComponent>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-[100%]   w-[30%]  bg-[#000000]"
          >
            <BorderComponent>
              <div className="flex flex-col h-full overflow-y-auto 
              scrollbar-none 
              [-ms-overflow-style:'none'] 
              [scrollbar-width:'none'] 
              [&::-webkit-scrollbar]:hidden  p-6 gap-4">
  <div className="flex gap-4 ">
            <div className="w-[80%] h-[51px] -mb-5 bg-[#5555554D]/30">
              <BorderComponent>
                <div className="flex justify-between items-center h-full px-4">
                  <input
                    type="number"
                   
                    placeholder="******"
                    className="bg-transparent text-[#F7F2DA80] text-[20px] w-1/2 focus:outline-none placeholder:text-[#F7F2DA40]"
                  />
                 
                    <div className="flex flex-col items-end">
                      <span className="text-[20px] text-[#F7F2DA80]/50">
                      USDT
                      </span>
                    </div>
           
                </div>
              </BorderComponent>
            </div>
   
            <motion.div
  className="w-[20%] h-[51px] relative bg-[#5555554D]/30 "
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  <BorderComponent>
    <div className="h-full relative">
      {/* Main content area */}
      <div className="flex items-center justify-center h-full cursor-pointer">
        {/* Your main content here */}
      </div>
      
      {/* Plus icon with background */}
      <div className="absolute -bottom-1 -right-1 w-[25px] h-[25px] bg-[#1A1A1A] rounded-sm flex items-center justify-center cursor-pointer">
        <Plus className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  </BorderComponent>
</motion.div>
          </div>
          <div className="flex items-center justify-center bg-black"> {/* Parent container */}
  <div className='h-[30px] w-[30px] flex items-center justify-center bg-[#1A1A1A] rounded-lg'>
    <ArrowDown className="h-5 w-5 text-gray-400" />
  </div>
</div>
          <div className="w-[100%] -mt-5 h-[51px] bg-[#5555554D]/30">
          <BorderComponent>
            <div className="flex justify-between items-center h-full px-4">
              <input
                type="number"
   
                placeholder="******"
                className="bg-transparent text-[#F7F2DA80] text-[20px] w-1/2 focus:outline-none placeholder:text-[#F7F2DA40]"
              />
              <div
                className="cursor-pointer"
              
              >
            
                  <div className="flex flex-col items-end">
                    <span className="text-[20px] text-[#F7F2DA80]">
                    USDT
                    </span>
                  </div>
      
             
              </div>
            </div>
          </BorderComponent>
        </div>
        <motion.div 
              className="w-full h-[36.22px] shake-button border-[0.63px] border-[#000000]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}

              whileHover={{ scale: 1.05 }}
            >
              <div className="flex">
                <div className="w-[2.84px] h-[36.22px] bg-[#787878] border-t-[0.63px] border-black" />
                <div className="flex items-center justify-center w-full text-center h-[33px] bg-[#787878]">
                  <motion.p 
                    className="text-[20px] text-[#F7F2DA]/60 text-center font-normal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
        
                  >
            VOTE FOR TOKEN
                  </motion.p>
                </div>
              </div>
              <div className="w-full  h-[2px] bg-[#787878] border-t-[0.63px] border-[#000000]" />
            </motion.div>
            <div className="w-[100%] h-[100px] mt-6 bg-[#5555554D]/30" >

          <BorderComponent>
         
          </BorderComponent>
        </div>
        <div className='flex w-full h-[100px] justify-between gap-4 p-2'>
   

      {/* Content Container */}
      <div className='flex w-full h-[100px] justify-between gap-2'>
        <div className="w-[100px] h-[100px] bg-[#5555554D]/30" >

<BorderComponent>

</BorderComponent>
</div>
<div className="w-[calc(100%-100px)] h-full flex flex-col gap-2" >
<p className="text-[#F7F2DA80] text-[20px]">Beat Ass Tonight</p>
<div className="w-full ">
      <p className={`text-[#F7F2DA59] text-[14px] ${!isExpanded ? 'line-clamp-2' : ''} relative`}>
        {text}
        {!isExpanded && (
          <span 
            className="absolute right-0 bottom-0 ml-2 cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <span className="text-[#F7F2DA59] underline">more</span>
          </span>
        )}
      </p>
    </div>
    <div className="w-full gap-2 flex justify-between">
    <div className="w-1/3 h-[19px] bg-[#D9D9D94D] text-[14px] text-[#FFFFFF9] text-center">
      Website
      </div>
      <div className="w-1/3 h-[19px] bg-[#D9D9D94D] text-[14px] text-[#FFFFFF9] text-center">
      
      Twitter
      </div>
      <div className="w-1/3 h-[19px] bg-[#D9D9D94D] text-[14px] text-[#FFFFFF9] text-center">
      Telegram
      </div>
    </div>
</div>

        </div>
    </div>
        <div className="mt-6 gap-4 w-full h-auto">
<div className="w-full h-[19px] text-center bg-[#D9D9D933]">
<p className='text-[14px] text-center text-[#FFFFFF99]'>VIEWS</p>
<div className="w-full gap-6 flex jusstify-between align-middle">
<div className="w-[73px] h-[75px] bg-[#1A1A1A] text-center" >

<BorderComponent>

</BorderComponent>
</div>
<div className="w-[73px] h-[75px] bg-[#1A1A1A] text-center" >

<BorderComponent>

</BorderComponent>
</div>
<div className="w-[73px] h-[75px] bg-[#1A1A1A] text-center" >

<BorderComponent>

</BorderComponent>
</div>
<div className="w-[73px] h-[75px] bg-[#1A1A1A] text-center" >

<BorderComponent>

</BorderComponent>
</div>
</div>
</div>
        </div>
        <div className="mt-6 gap-4  w-full h-auto">
<div className="w-full h-[19px] text-center bg-[#D9D9D933]">
<p className='text-[14px] text-center text-[#FFFFFF99]'>REACTIONS</p>
<div className="w-full gap-6 flex jusstify-between align-middle">
<div className="w-[50px] h-[50px] bg-[#1A1A1A] rounded-md" >

</div>
<div className="w-[50px] h-[50px] bg-[#1A1A1A] rounded-md" >

</div>
<div className="w-[50px] h-[50px] bg-[#1A1A1A] rounded-md" >

</div>
<div className="w-[50px] h-[50px] bg-[#1A1A1A] rounded-md" >

</div>
</div>
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
