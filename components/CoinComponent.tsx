"use client";
import React, { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import {
  Tabs,
  Tab,
  Button,
  Switch,
  Select,
  SelectItem,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Tooltip,
  ModalFooter
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import CardDemo from "./CardDemo";
import CardGrid from "./Test";
import "./WorkbenchFontTest.css";
import Link from "next/link";
import { Lock, Shuffle } from "lucide-react";
import { useInfiniteQuery } from '@tanstack/react-query';
import { gql, request, ClientError } from 'graphql-request';
import { GRAPH_API_URL } from '@/constants';
import { formatUnits } from 'viem';
import { useAllTokens } from '@/hooks/useFetchAllToken';

type TabType = 'Initial' | 'Anonymous';

// Update the TokenMetrics interface
interface TokenMetrics {
  totalInitialVotes: string;
  totalInitialStaked: string;
  totalAnonymousVotes: string;
  totalAnonymousStaked: string;
  votesCount: number;
  withdrawalsCount: number;
  stakePercentage: string;
}

// Update the TokenDetails interface
interface TokenDetails {
  name: string;
  symbol: string;
  description: string;
  imageUrl: string;
  twitter: string;
  telegram: string;
  website: string;
  creator: string;      // Add this field
  creationFee: string;  // Add this field
}

// Update the FormattedToken interface
interface FormattedToken {
  id: string;
  address: string;
  batchId: string;
  state: number;
  details: TokenDetails;
  metrics?: {
    totalInitialVotes: string;
    totalInitialStaked: string;
    totalAnonymousVotes: string;
    totalAnonymousStaked: string;
    votesCount: number;
    withdrawalsCount: number;
    stakePercentage: string;
  };
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

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

interface ChainData {
  key: string;
  name: string;
}
const TOKENS_PER_PAGE = 20;

// First, define the interfaces for the GraphQL response
interface BatchesQueryResponse {
    batches: Array<{
        id: string;
        state: number;
        initialVotingData: {
            totalVotes: string;
            totalStaked: string;
        };
        anonymousVotingData: {
            totalVotes: string;
            totalStaked: string;
        };
        tokens: Array<{
            id: string;
            address: string;
            state: number;
            totalVotes: string;
            totalStaked: string;
            details: {
                name: string;
                symbol: string;
                description: string;
                imageUrl: string;
                twitter: string;
                telegram: string;
                website: string;
                creator: string;
                creationFee: string;
            };
            votes?: Array<{ id: string }>;
            withdrawals?: Array<{ id: string }>;
        }>;
    }>;
}

interface VotingData {
  initialVotes: string;
  initialStaked: string;
}

interface AnonymousVotingData {
  anonymousVotes: string;
  anonymousStaked: string;
}

// Update the token interface to include voting properties
interface Token {
  id: string;
  address: string;
  state: number;
  totalVotes: string;
  totalStaked: string;
  initialVoting: VotingData;
  anonymousVoting: AnonymousVotingData;
  details: {
    name: string;
    symbol: string;
    description: string;
    imageUrl: string;
    twitter: string;
    telegram: string;
    website: string;
    creator: string;
    creationFee: string;
  };
  votes?: { id: string }[];
  withdrawals?: { id: string }[];
}

interface BatchToken {
  id: string;
  address: string;
  state: number;
  totalVotes: string;
  totalStaked: string;
  initialVoting: {
    initialVotes: string;
    initialStaked: string;
  };
  anonymousVoting: {
    anonymousVotes: string;
    anonymousStaked: string;
  };
  details: {
    name: string;
    symbol: string;
    description: string;
    imageUrl: string;
    twitter: string;
    telegram: string;
    website: string;
    creator: string;
    creationFee: string;
  };
  votes?: { id: string }[];
  withdrawals?: { id: string }[];
}

interface Batch {
  id: string;
  state: number;
  initialVotingData: {
    totalInitialStaked: string;
  };
  tokens: BatchToken[];
}



interface TokenResponse {
  id: string;
  address: string;
  state: number;
  totalInitialVotes: string;
  totalInitialStaked: string;
  totalAnonymousVotes: string;
  totalAnonymousStaked: string;
  details: {
    name: string;
    symbol: string;
    description: string;
    imageUrl: string;
    twitter: string;
    telegram: string;
    website: string;
    creator: string;
    creationFee: string;
  };
  votes?: { id: string }[];
  withdrawals?: { id: string }[];
}
const GetAllBatchesTokensQuery = gql`
  query GetAllBatchesTokens {
    tokens {
      id
      address
      batchId
      state
      totalInitialVotes
      totalInitialStaked
      totalAnonymousVotes
      totalAnonymousStaked
      details {
        name
        symbol
        description
        imageUrl
        twitter
        telegram
        website
      }
    }
  }
`;

const useTokensQuery = () => {
  return useInfiniteQuery({
    queryKey: ['allTokens'],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const result = await request<{ tokens: TokenResponse[] }>(
          GRAPH_API_URL,
          GetAllBatchesTokensQuery,
          {
            skip: pageParam * TOKENS_PER_PAGE,
            first: TOKENS_PER_PAGE,
            orderDirection: 'desc'
          }
        );
        
        const formattedTokens: FormattedToken[] = result.tokens.map(token => ({
          id: token.id,
          address: token.address,
          state: token.state,
          batchId: "0",
          details: {
            name: token.details.name,
            symbol: token.details.symbol,
            description: token.details.description,
            imageUrl: token.details.imageUrl,
            twitter: token.details.twitter,
            telegram: token.details.telegram,
            website: token.details.website,
            creator: token.details.creator,
            creationFee: token.details.creationFee
          },
          votes: {
            initial: Number(token.totalInitialVotes),
            anonymous: Number(token.totalAnonymousVotes),
            total: Number(token.totalInitialVotes) + Number(token.totalAnonymousVotes)
          },
          staked: {
            initial: parseFloat(formatUnits(BigInt(token.totalInitialStaked), 18)),
            anonymous: parseFloat(formatUnits(BigInt(token.totalAnonymousStaked), 18)),
            total: parseFloat(formatUnits(BigInt(token.totalInitialStaked), 18)) + 
                   parseFloat(formatUnits(BigInt(token.totalAnonymousStaked), 18))
          }
        }));

        return {
          tokens: formattedTokens,
          nextPage: formattedTokens.length === TOKENS_PER_PAGE ? pageParam + 1 : undefined
        };
      } catch (error) {
        if (error instanceof ClientError) {
          console.error('GraphQL error:', error.response.errors);
          throw new Error(`GraphQL error: ${error.response.errors?.[0]?.message || 'Unknown error'}`);
        }
        throw error;
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    maxPages: 5
  });
};

// Add this helper function
const formatWalletAddress = (address: string): string => {
  if (!address || address.length < 8) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

const truncateDescription = (description: string) => {
  const words = description.split(' ');
  if (words.length <= 4) return description;
  
  const truncatedWords = words.slice(0, -4);
  return `${truncatedWords.join(' ')}...`;
};


const TokenGrid = ({ tokens, activeTab }: { tokens: FormattedToken[], activeTab: 'Initial' | 'Anonymous' }) => (
  <div className="w-full overflow-x-auto  scrollbar-hide">
  <div className="min-w-max px-4">
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {tokens.map((token) => (
           <Link href='/test' key={token.id} >
                <motion.div
           
            className="w-full md:w-[350px] px-2 mb-4  relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.07 }}
          >
                        <Tooltip
               content={activeTab === 'Initial' ? "Still in Initial Stage" : "Anonymous Voting Stage"}
                placement="top"
                showArrow={false}
                offset={15} // Increased offset to create more space
                classNames={{
                  base: [
                    "py-2 px-4",
                    "border-none",
                    "shadow-none",
                    "backdrop-blur-none",
                    "relative",
                    "mb-2 tooltip-custom", // Increased bottom margin
                    "translate-y-[-8px]" // Move tooltip up slightly
                  ].join(" "),
                  content: [
                    "text-[#F7F2DA]",
                    "text-sm",
                    "font-normal",
                    "px-2 py-1",
                    "rounded-none",
                    "bg-[#000000]"
                  ].join(" ")
                }}
                motionProps={{
                  variants: {
                    exit: {
                      opacity: 0,
                      transition: { duration: 0.1, ease: "easeIn" }
                    },
                    enter: {
                      opacity: 1,
                      transition: { duration: 0.15, ease: "easeOut" }
                    }
                  }
                }}
              >
        <div
              className="bg-[#0A0909]  overflow-hidden"
              style={{ height: "150px" }}
            >
              <div className="p-3 text-[#F7F2DA]">
                <div className="flex justify-between items-start">
                {activeTab === 'Anonymous' ? (
                  <motion.div 
                    className="w-[100px] h-[100px] my-[10px] mx-[10px] bg-[#D9D9D966] relative"
                    whileHover={{ 
                      boxShadow: "0 0 8px rgba(247, 242, 218, 0.3)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div 
                      className="absolute -top-1 -right-1 w-6 h-6 bg-[#1A1A1A] rounded-md flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Lock className="h-3 w-3 text-gray-400" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="w-[100px] h-[100px] my-[10px] mx-[10px] bg-[#D9D9D966]"
                    whileHover={{ 
                      boxShadow: "0 0 8px rgba(247, 242, 218, 0.3)",
                      transition: { duration: 0.2 }
                    }}
                  />
                )}
        
                  <div className="text-right flex flex-col p-2">
                    {/* Rest of your existing code remains exactly the same */}
                    <div className="flex flex-row justify-between align-middle">
                      <motion.h2
                        className="text-left text-[#F7F2DA] font-normal"
                        style={{
                          width: "70px",
                          height: "20px",
                          top: "14px",
                          left: "137px",
                          fontSize: "20px",
                          lineHeight: "20px"
                        }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        [{token.details.symbol}]
                      </motion.h2>
                      <motion.h2
                        className="hover:underline text-[#F7F2DA] workbench-test"
                        style={{
                          width: "20px",
                          height: "10px",
                          top: "9px",
                          left: "302px",
                          fontSize: "10px",
                          fontWeight: 200,
                          lineHeight: "20px",
                          textAlign: "left",
                          color: "#F7F2DA"
                        }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        more
                      </motion.h2>
                    </div>
                    <div className="flex flex-col align-middle">
                      <motion.p
                        className="text-[#F7F2DA] workbench-test flex flex-row mt-[5px]"
                        style={{
                          width: "60px",
                          height: "10px",
                          left: "137px",
                          fontSize: "10px",
                          fontWeight: 200,
                          lineHeight: "10px",
                          textAlign: "left",
                          color: "#F7F2DA"
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                         Batch #{token.batchId}
                      </motion.p>
                      <motion.div
                        className=" mt-[22px] "
                        style={{
                          width: "180px",
                          height: "10px",
                          top: "85px",
                          left: "137px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <p
                          style={{
                            fontSize: "10px",
                            fontWeight: 400,
                            lineHeight: "10px",
                            textAlign: "left",
                            color: "#F7F2DA"
                          }}
                        >
                         Staked Amount: 
                        </p>
                        <p
  style={{
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "10px",
    textAlign: "left",
    color: "#F7F2DA"
  }}
>
{token.staked.total.toFixed(6)} ETH
</p>
                      </motion.div>
                      <motion.div
                        className=" my-[8px]"
                        style={{
                          width: "180px",
                          height: "10px",
                          top: "85px",
                          left: "137px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <p
                          className="workbench-test"
                          style={{
                            fontSize: "10px",
                            fontWeight: 400,
                            lineHeight: "10px",
                            textAlign: "left",
                            color: "#F7F2DA"
                          }}
                        >
                          Create By:
                        </p>
                        <p
                          className="workbench-test"
                          style={{
                            fontSize: "10px",
                            fontWeight: 400,
                            lineHeight: "10px",
                            textAlign: "left",
                            color: "#F7F2DA"
                          }}
                        >
                        {formatWalletAddress(token.details.creator)}
                        </p>
                      </motion.div>

                      <motion.div
    className="mb-[8px] whitespace-nowrap overflow-hidden text-ellipsis"
    style={{
        width: "180px",
        height: "10px",
        top: "102px",
        left: "137px",
        fontSize: "10px",
        fontWeight: 400,
        lineHeight: "10px",
        textAlign: "left",
        color: "#F7F2DA"
    }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5, duration: 0.5 }}
>
    {truncateDescription(token.details.description)}
</motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Tooltip>
        
          </motion.div>
           </Link>
        ))}
    </div>
    </div>
    </div>
);


export default function ComponentCoin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState("All Chains");
  const [minMarketCap, setMinMarketCap] = useState("");
  const [maxMarketCap, setMaxMarketCap] = useState("");
  const [liked, setLiked] = React.useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isChainOpen, setIsChainOpen] = useState(false)
  const [isMarketCapOpen, setIsMarketCapOpen] = useState(false)
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [isLaunched, setIsLaunched] = useState(true)

  // Selected values
  const [selectedMarketCap, setSelectedMarketCap] = useState('Number Of Views')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [activeTab, setActiveTab] = useState<'Initial' | 'Anonymous'>('Initial');
  const [currency, setCurrency] = useState('USD');
  
  const handleTabClick = (tab: 'Initial' | 'Anonymous') => {
      setActiveTab(tab);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useTokensQuery();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const allTokens: FormattedToken[] = data?.pages.flatMap(page => page.tokens) || [];
  const anonymousTokens = allTokens.filter(token => 
    token.metrics?.totalAnonymousStaked ? 
    parseFloat(token.metrics.totalAnonymousStaked) > 0 : false
  );
  
  const initialTokens = allTokens.filter(token => 
    token.metrics?.totalInitialStaked ? 
    parseFloat(token.metrics.totalInitialStaked) > 0 : false
  );


  const chainData: ChainData[] = [
    { key: 'all', name: 'All Chains' },
    { key: 'ethereum', name: 'Ethereum' },
    { key: 'arbitrum', name: 'Arbitrum' },
    { key: 'optimisim', name: 'Optimisim' },
  ]

  const resetFilters = () => {
    setSelectedChain("all");
    setSelectedMarketCap("all");
    setMinMarketCap("");
    setMaxMarketCap("");
  };

  const marketCapOptions = [
    { key: 'all', name: 'Number Of Views' },
    { key: 'low', name: 'Low Views (< 10K)' },
    { key: 'mid', name: 'Mid Views (10K - 100K)' },
    { key: 'high', name: 'High Views (> 100K)' },
  ]

 

    const handleToggle = () => {
        setCurrency(currency === 'USD' ? 'ETH' : 'USD');
    };

  
  return (
    <motion.div className="flex flex-col my-8 gap-4 px-4 md:px-8">
         <motion.div className="flex flex-row justify-between align-middle">
            <div className="flex justify-center space-x-4">
                <motion.div
                    className="flex-1 px-4 py-2 text-left border-2 border-[#1a1a1a] 
                    focus:outline-none relative transition-all duration-200"
                    style={{
                        boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)',
                    }}
                    whileHover={{
                        boxShadow: '2px 2px 0 0 rgba(26, 26, 26, 0.95), 4px 4px 0 0 rgba(26, 26, 26, 0.85)',
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{
                        boxShadow: '1px 1px 0 0 rgba(26, 26, 26, 1)',
                        transform: 'translate(2px, 2px)',
                    }}
                >
                    <div className="flex relative h-full">
                        {/* Full-height Background Slider */}
                        <motion.div
                            className="absolute top-0 bottom-0 w-1/2 bg-black rounded-md"
                            initial={false}
                            animate={{
                                x: activeTab === 'Initial' ? '0%' : '100%',
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                        />

                        {/* Button Container - ensures equal width distribution */}
                        <div className="flex w-full relative z-10">
                            <button 
                                className={`flex-1 px-4 py-1 transition-colors duration-200 ${
                                    activeTab === 'Initial' ? 'text-[#F7F2DA]' : 'text-slate-500'
                                }`}
                                onClick={() => handleTabClick('Initial')}
                            >
                                Initial
                            </button>
                            <button 
                                className={`flex-1 px-4 py-1 transition-colors duration-200 ${
                                    activeTab === 'Anonymous' ? 'text-[#F7F2DA]' : 'text-slate-500'
                                }`}
                                onClick={() => handleTabClick('Anonymous')}
                            >
                                Anonymous
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Button 
            className={`relative rounded-none px-4 py-2 bg-[#0A0909] ${
                currency === 'ETH' ? 'text-slate-500' : 'text-[#F7F2DA]'
            } border-2 border-[#1a1a1a]`}
            style={{
                boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)',
            }}
            onClick={handleToggle}
        >
            {currency}
        </Button>
        </motion.div>

      <div className="flex-row justify-between md:hidden flex align-middle ">
        <Switch defaultSelected color="default" className="md:text-xl">
          Launched
        </Switch>
        <Button
          startContent={<FaFilter />}
          onClick={openModal}
          className="md:hidden"
        >
          Filter
        </Button>
      </div>
      <motion.div className="flex flex-row gap-8 items-center">
      <div className="md:flex-row justify-between hidden md:flex align-middle items-center gap-3">
    <AnimatePresence mode="wait">
      {!isLaunched && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.07 }}
          className="flex items-center"
        >
      <div className="relative">
  <Shuffle className="h-5 w-5 text-[#F7F2DA80]" />
  <div className="absolute top-[100%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#F7F2DA80] rounded-full" />
</div>
          </motion.div>
      )}
    </AnimatePresence>

    <div className="flex items-center gap-2">
    
      <Switch
        defaultSelected
        color="default"
        className="md:text-xl"
        isSelected={isLaunched}
        onValueChange={setIsLaunched}
      />
        <span className="text-[#F7F2DA80] text-md">
        {isLaunched ? "Launched" : "Not Launched"}
      </span>
    </div>
  </div>

        

        {/* Desktop view */}
        <div className="hidden md:flex items-center gap-4">
      {/* Chain Dropdown */}
      <div className="relative w-[20rem]">
        <motion.button
          onClick={() => setIsChainOpen(!isChainOpen)}
          className="w-full px-4 py-2 text-left bg-[#0A0909] border-2 border-[#1a1a1a] 
          focus:outline-none relative transition-all duration-200"
          style={{
            boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)'
          }}
          whileHover={{
            boxShadow: '2px 2px 0 0 rgba(26, 26, 26, 0.95), 4px 4px 0 0 rgba(26, 26, 26, 0.85)',
            transition: { duration: 0.2 }
          }}
          whileTap={{
            boxShadow: '1px 1px 0 0 rgba(26, 26, 26, 1)',
            transform: 'translate(2px, 2px)',
          }}
        >
          <span className="text-[#F7F2DA] tracking-wide">{selectedChain}</span>
        </motion.button>

        <AnimatePresence>
          {isChainOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full mt-2 bg-[#0A0909] border-2 border-[#1a1a1a] 
              overflow-hidden z-50"
              style={{
                boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)'
              }}
            >
              {chainData.map((chain, index) => (
                <motion.button
                  key={chain.key}
                  onClick={() => {
                    setSelectedChain(chain.name)
                    setIsChainOpen(false)
                  }}
                  className="w-full px-4 py-2 text-left text-[#F7F2DA] transition-colors
                  duration-200 hover:bg-[#1a1a1a] focus:outline-none border-b border-[#1a1a1a]
                  last:border-b-0 tracking-wide"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="inline-block w-6">
                    {selectedChain === chain.name ? '>' : ''}
                  </span>
                  {chain.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Market Cap Dropdown */}
      <div className="relative w-[20rem]">
        <motion.button
          onClick={() => setIsMarketCapOpen(!isMarketCapOpen)}
          className="w-full px-4 py-2 text-left bg-[#0A0909] border-2 border-[#1a1a1a] 
          focus:outline-none relative transition-all duration-200"
          style={{
            boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)'
          }}
          whileHover={{
            boxShadow: '2px 2px 0 0 rgba(26, 26, 26, 0.95), 4px 4px 0 0 rgba(26, 26, 26, 0.85)',
            transition: { duration: 0.2 }
          }}
          whileTap={{
            boxShadow: '1px 1px 0 0 rgba(26, 26, 26, 1)',
            transform: 'translate(2px, 2px)',
          }}
        >
          <span className="text-[#F7F2DA] tracking-wide">{selectedMarketCap}</span>
        </motion.button>

        <AnimatePresence>
          {isMarketCapOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full mt-2 bg-[#0A0909] border-2 border-[#1a1a1a] 
              overflow-hidden z-50"
              style={{
                boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)'
              }}
            >
              {marketCapOptions.map((option, index) => (
                <motion.button
                  key={option.key}
                  onClick={() => {
                    setSelectedMarketCap(option.name)
                    setIsMarketCapOpen(false)
                  }}
                  className="w-full px-4 py-2 text-left text-[#F7F2DA] transition-colors
                  duration-200 hover:bg-[#1a1a1a] focus:outline-none border-b border-[#1a1a1a]
                  last:border-b-0 tracking-wide"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="inline-block w-6">
                    {selectedMarketCap === option.name ? '>' : ''}
                  </span>
                  {option.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Filter Dropdown */}
      <div className="relative w-[20rem]">
  <motion.button
    onClick={() => setIsPriceOpen(!isPriceOpen)}
    className="w-full px-4 py-2 text-left bg-[#0A0909] border-2 border-[#1a1a1a] 
    focus:outline-none relative transition-all duration-200"
    style={{
      boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)'
    }}
    whileHover={{
      boxShadow: '2px 2px 0 0 rgba(26, 26, 26, 0.95), 4px 4px 0 0 rgba(26, 26, 26, 0.85)',
      transition: { duration: 0.2 }
    }}
    whileTap={{
      boxShadow: '1px 1px 0 0 rgba(26, 26, 26, 1)',
      transform: 'translate(2px, 2px)',
    }}
  >
    <span className="text-[#F7F2DA] tracking-wide">Stake Amount</span>
  </motion.button>

  <AnimatePresence>
    {isPriceOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute w-full mt-2 bg-[#0A0909] border-2 border-[#1a1a1a] 
        overflow-hidden z-50 p-4"
        style={{
          boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)'
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-[#F7F2DA] border border-[#1a1a1a] focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-[#F7F2DA] border border-[#1a1a1a] focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setMinPrice('')
                setMaxPrice('')
              }}
              className="w-full px-4 py-2 bg-[#1a1a1a] text-[#F7F2DA] hover:bg-[#2a2a2a] transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setIsPriceOpen(false)}
              className="w-full px-4 py-2 bg-transparent border border-[#1a1a1a] text-[#F7F2DA] hover:bg-[#1a1a1a] transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
    </div>
      </motion.div>
      <div className="w-full">
        <CardDemo />
      </div>
      <div className="md:hidden">
        <CardGrid />
      </div>
    
                  {/* Animated content */}
                  <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                           <TokenGrid 
  tokens={activeTab === 'Initial' ? initialTokens : anonymousTokens}
  activeTab={activeTab}
/>
                        </motion.div>
                    </AnimatePresence>
    <div className="items-center flex justify-center align-middle text-center">
     {hasNextPage && (
                     
                              <Button 
                              onClick={() => fetchNextPage()}
                              disabled={isFetchingNextPage}
                              className={`relative rounded-none px-8 text-xl py-2 bg-[#0A0909] text-[#F7F2DA] hover:text-slate-500 border-2 border-[#1a1a1a]`}
                              style={{
                                  boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)',
                              }}
                           
                          >
                             {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                          </Button>
                    )}
            
    </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        placement="bottom"
        className="bg-gray-900 text-[#F7F2DA]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filters</ModalHeader>
              <ModalBody>
                <Select
                  label="All Chains"
                  value={selectedChain}
                  onChange={(e) => setSelectedChain(e.target.value)}
                >
                  {chainData.map((chain) => (
                    <SelectItem key={chain.key} value={chain.key}>
                      {chain.name}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Market Cap"
                  value={selectedMarketCap}
                  onChange={(e) => setSelectedMarketCap(e.target.value)}
                >
                  <SelectItem key="all" value="all">
                    All
                  </SelectItem>
                  <SelectItem key="low" value="low">
                    Low Cap (&lt; $1B)
                  </SelectItem>
                  <SelectItem key="mid" value="mid">
                    Mid Cap ($1B - $10B)
                  </SelectItem>
                  <SelectItem key="high" value="high">
                    High Cap (&gt; $10B)
                  </SelectItem>
                </Select>
                <Input
                  type="number"
                  label="Min Market Cap (Billion $)"
                  placeholder="0.00"
                  value={minMarketCap}
                  onChange={(e) => setMinMarketCap(e.target.value)}
                />
                <Input
                  type="number"
                  label="Max Market Cap (Billion $)"
                  placeholder="0.00"
                  value={maxMarketCap}
                  onChange={(e) => setMaxMarketCap(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="secondary" onPress={resetFilters}>
                  Reset
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
           
                    onClose();
                  }}
                >
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </motion.div>
  );
}

const Card = () => (
  <motion.div
    className="w-full md:w-[350px] px-2 mb-4 relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    whileHover={{ scale: 1.07 }}
  >
                <Tooltip
        content="Still in Initial Stage"
        placement="top"
        showArrow={false}
        offset={15} // Increased offset to create more space
        classNames={{
          base: [
            "py-2 px-4",
            "border-none",
            "shadow-none",
            "backdrop-blur-none",
            "relative",
            "mb-2 tooltip-custom", // Increased bottom margin
            "translate-y-[-8px]" // Move tooltip up slightly
          ].join(" "),
          content: [
            "text-[#F7F2DA]",
            "text-sm",
            "font-normal",
            "px-2 py-1",
            "rounded-none",
            "bg-[#000000]"
          ].join(" ")
        }}
        motionProps={{
          variants: {
            exit: {
              opacity: 0,
              transition: { duration: 0.1, ease: "easeIn" }
            },
            enter: {
              opacity: 1,
              transition: { duration: 0.15, ease: "easeOut" }
            }
          }
        }}
      >
<div
      className="bg-[#0A0909]  overflow-hidden"
      style={{ height: "150px" }}
    >
      <div className="p-3 text-[#F7F2DA]">
        <div className="flex justify-between items-start">
          <motion.div 
            className="w-[100px] h-[100px] my-[10px] mx-[10px] bg-[#D9D9D966]"
            whileHover={{ 
              boxShadow: "0 0 8px rgba(247, 242, 218, 0.3)",
              transition: { duration: 0.2 }
            }}
          />

          <div className="text-right flex flex-col p-2">
            {/* Rest of your existing code remains exactly the same */}
            <div className="flex flex-row justify-between align-middle">
              <motion.h2
                className="text-left text-[#F7F2DA] font-normal"
                style={{
                  width: "70px",
                  height: "20px",
                  top: "14px",
                  left: "137px",
                  fontSize: "20px",
                  lineHeight: "20px"
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                [SPEAR]
              </motion.h2>
              <motion.h2
                className="hover:underline text-[#F7F2DA] workbench-test"
                style={{
                  width: "20px",
                  height: "10px",
                  top: "9px",
                  left: "302px",
                  fontSize: "10px",
                  fontWeight: 200,
                  lineHeight: "20px",
                  textAlign: "left",
                  color: "#F7F2DA"
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                More
              </motion.h2>
            </div>
            <div className="flex flex-col align-middle">
              <motion.p
                className="text-[#F7F2DA] workbench-test flex flex-row mt-[5px]"
                style={{
                  width: "60px",
                  height: "10px",
                  left: "137px",
                  fontSize: "10px",
                  fontWeight: 200,
                  lineHeight: "10px",
                  textAlign: "left",
                  color: "#F7F2DA"
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Pear Network
              </motion.p>

              <motion.div
                className="mt-[22px]"
                style={{
                  width: "180px",
                  height: "10px",
                  top: "85px",
                  left: "137px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p
                  className="workbench-test"
                  style={{
                    fontSize: "10px",
                    fontWeight: 400,
                    lineHeight: "10px",
                    textAlign: "left",
                    color: "#F7F2DA"
                  }}
                >
                  Time to Launch:
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "10px",
                    textAlign: "left",
                    color: "#F7F2DA"
                  }}
                >
                  00D/4H/24m
                </p>
              </motion.div>
              <motion.div
                className="my-[8px] workbench-test"
                style={{
                  width: "180px",
                  height: "10px",
                  top: "85px",
                  left: "137px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 400,
                    lineHeight: "10px",
                    textAlign: "left",
                    color: "#F7F2DA"
                  }}
                >
                  Chain:
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 400,
                    lineHeight: "10px",
                    textAlign: "left",
                    color: "#F7F2DA"
                  }}
                >
                  Arbitrum
                </p>
              </motion.div>
              <motion.div
                className="mb-[8px]"
                style={{
                  width: "180px",
                  height: "10px",
                  top: "102px",
                  left: "137px",
                  fontSize: "10px",
                  fontWeight: 400,
                  lineHeight: "10px",
                  textAlign: "left",
                  color: "#F7F2DA"
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                aslan is a scammer, always have been
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
</Tooltip>

  </motion.div>
);

const Card2 = () => (
  <motion.div
    className="w-full md:w-[350px] px-2 mb-4 relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    whileHover={{ scale: 1.07 }}
  >
    {/* Anonymous Stage Overlay - Shows on component hover */}
    <Tooltip
        content="Still in Anonymous Stage"
        placement="top"
        showArrow={false}
        offset={15} // Increased offset to create more space
        classNames={{
          base: [
            "py-2 px-4",
            "border-none",
            "shadow-none",
            "backdrop-blur-none",
            "relative",
            "mb-2 tooltip-custom", // Increased bottom margin
            "translate-y-[-8px]" // Move tooltip up slightly
          ].join(" "),
          content: [
            "text-[#F7F2DA]",
            "text-sm",
            "font-normal",
            "px-2 py-1",
            "rounded-none",
            "bg-[#000000]"
          ].join(" ")
        }}
        motionProps={{
          variants: {
            exit: {
              opacity: 0,
              transition: { duration: 0.1, ease: "easeIn" }
            },
            enter: {
              opacity: 1,
              transition: { duration: 0.15, ease: "easeOut" }
            }
          }
        }}
      >
    <div className="bg-[#0A0909]  overflow-hidden" style={{ height: "150px" }}>
      <div className="p-3 text-[#F7F2DA]">
        <div className="flex justify-between items-start">
          {/* Image container with lock */}
     
            <motion.div 
              className="w-[100px] h-[100px] my-[10px] mx-[10px] bg-[#D9D9D966] relative"
              whileHover={{ 
                boxShadow: "0 0 8px rgba(247, 242, 218, 0.3)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="absolute -top-1 -right-1 w-6 h-6 bg-[#1A1A1A] rounded-md flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <Lock className="h-3 w-3 text-gray-400" />
              </motion.div>
            </motion.div>
   

          <div className="text-right flex flex-col p-2">
            <div className="flex flex-row justify-between align-middle">
              <motion.h2
                className="text-left text-[#F7F2DA] font-normal"
                style={{
                  width: "70px",
                  height: "20px",
                  fontSize: "20px",
                  lineHeight: "20px"
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  color: "#F7F2DA",
                  textShadow: "0 0 8px rgba(247, 242, 218, 0.5)"
                }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                [SPEAR]
              </motion.h2>
              <motion.h2
                className="hover:underline text-[#F7F2DA] workbench-test"
                style={{
                  width: "20px",
                  height: "10px",
                  fontSize: "10px",
                  fontWeight: 200,
                  lineHeight: "20px",
                  textAlign: "left",
                  color: "#F7F2DA"
                }}
                whileHover={{ 
                  scale: 1.1,
                  color: "#F7F2DA",
                }}
              >
                More
              </motion.h2>
            </div>

            <div className="flex flex-col align-middle">
              <motion.p
                className="text-[#F7F2DA] workbench-test flex flex-row mt-[5px]"
                style={{
                  width: "60px",
                  height: "10px",
                  fontSize: "10px",
                  fontWeight: 200,
                  lineHeight: "10px",
                  textAlign: "left",
                }}
                whileHover={{ 
                  scale: 1.05,
                  color: "#F7F2DA",
                }}
              >
                Pear Network
              </motion.p>

              {/* Time to Launch Section */}
              <motion.div
                className="mt-[22px]"
                style={{
                  width: "180px",
                  height: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                whileHover={{ 
                  backgroundColor: "rgba(247, 242, 218, 0.1)",
                  borderRadius: "4px",
                  padding: "4px"
                }}
              >
                <p className="text-[10px] text-[#F7F2DA]">Time to Launch:</p>
                <p className="text-[12px] text-[#F7F2DA]">00D/4H/24m</p>
              </motion.div>

              {/* Chain Section */}
              <motion.div
                className="my-[8px] workbench-test"
                style={{
                  width: "180px",
                  height: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                whileHover={{ 
                  backgroundColor: "rgba(247, 242, 218, 0.1)",
                  borderRadius: "4px",
                  padding: "4px"
                }}
              >
                <p className="text-[10px] text-[#F7F2DA]">Chain:</p>
                <p className="text-[10px] text-[#F7F2DA]">Arbitrum</p>
              </motion.div>

              {/* Description */}
              <motion.div
                className="mb-[8px]"
                style={{
                  width: "180px",
                  height: "10px",
                  fontSize: "10px",
                  fontWeight: 400,
                  lineHeight: "10px",
                  textAlign: "left",
                  color: "#F7F2DA"
                }}
                whileHover={{ 
                  scale: 1.02,
                  color: "#F7F2DA",
                  textShadow: "0 0 8px rgba(247, 242, 218, 0.3)"
                }}
              >
                aslan is a scammer, always have been
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Tooltip>
  </motion.div>
)







