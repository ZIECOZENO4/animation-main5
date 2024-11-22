"use client";
import React, { useState, useEffect } from "react";
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
  ModalFooter
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import { SiEthereum, SiBinance, SiPolygon } from "react-icons/si";
import CardDemo from "./CardDemo";
import CardGrid from "./Test";
import "./WorkbenchFontTest.css";
import Link from "next/link";
import { Lock, Shuffle } from "lucide-react";
type TabType = 'Initial' | 'Anonymous';
interface ChainData {
  key: string
  name: string
}



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
  const [activeTab, setActiveTab] = useState('Initial');

  const handleTabClick = (tab: string) => {
      setActiveTab(tab);
  };


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
                className="relative rounded-none px-4 py-2 bg-[#0A0909] border-2 border-[#1a1a1a]"
                style={{
                    boxShadow: '4px 4px 0 0 rgba(26, 26, 26, 0.9), 8px 8px 0 0 rgba(26, 26, 26, 0.7)',
                }}
            >
                USD
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
          exit={{ opacity: 0, scale: 0 }}
          className="flex items-center"
        >
          <motion.div
            animate={{ rotate: 90 }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Shuffle className="h-5 w-5 text-[#F7F2DA80]" />
          </motion.div>
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
    
      <AnimatePresence mode="wait">
      {activeTab === 'Initial' ? (
        <motion.div
        key="initial"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        >
        <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>

      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>

      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>

      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>

      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>

        <Link href="/test">
          <Card />
        </Link>
        <Link href="/test">
          <Card />
        </Link>
      </div>
        </motion.div>
      ) : (
        <motion.div
        key="anonymous"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
      <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>

    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>

    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>

    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>

    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
    <div className="hidden md:flex md:justify-between align-middle flex-row my-4">
      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>

      <Link href="/test">
        <Card2 />
      </Link>
      <Link href="/test">
        <Card2 />
      </Link>
    </div>
      </motion.div>
      )}
    </AnimatePresence>
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
    className="w-full  md:w-[350px] px-2 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1}}
    whileHover={{ scale: 1.07 }} // Increased from 1.01 to 1.05
  >
    <div
      className="bg-[#0A0909] rounded-lg overflow-hidden"
      style={{
        height: "150px"
      }}
    >
      <div className="p-3 text-[#F7F2DA]">
        <div className="flex justify-between items-start">
          <div className="w-[100px] h-[100px] my-[10px] mx-[10px] bg-[#D9D9D966]" />

          <div className="text-right flex flex-col p-2">
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
                className="mt-[25px]"
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
  </motion.div>
);

const Card2 = () => (
  <motion.div
    className="w-full  md:w-[350px] px-2 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1}}
    whileHover={{ scale: 1.07 }} // Increased from 1.01 to 1.05
  >
    <div
      className="bg-[#0A0909] rounded-lg overflow-hidden"
      style={{
        height: "150px"
      }}
    >
      <div className="p-3 text-[#F7F2DA]">
        <div className="flex justify-between items-start">
        <div className="w-[100px] h-[100px] my-[10px] mx-[10px] bg-[#D9D9D966] relative">
  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#1A1A1A] rounded-md flex items-center justify-center">
    <Lock className="h-3 w-3 text-gray-400" />
  </div>
</div>

          <div className="text-right flex flex-col p-2">
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
                className="mt-[25px]"
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
  </motion.div>
);