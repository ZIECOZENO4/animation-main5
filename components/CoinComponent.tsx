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
  ModalFooter,

} from "@nextui-org/react";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import {
  SiEthereum,
  SiBinance,
  SiPolygon,
} from "react-icons/si";
import CardDemo from "./CardDemo";
import CardGrid from "./Test";
import './WorkbenchFontTest.css'
import Link from 'next/link'
const chainData = [
  { key: "all", name: "All Chains" },
  {
    key: "ethereum",
    name: "Ethereum",
    icon: SiEthereum,
    networks: ["Mainnet", "Goerli", "Sepolia"]
  },
  {
    key: "binance",
    name: "Binance Smart Chain",
    icon: SiBinance,
    networks: ["BSC", "BSC Testnet"]
  },
  {
    key: "polygon",
    name: "Polygon",
    icon: SiPolygon,
    networks: ["Mainnet", "Mumbai"]
  },
  {
    key: "arbitrum",
    name: "Arbitrum",
    icon: SiEthereum,
    networks: ["One", "Nova", "Goerli"]
  },
  {
    key: "avalanche",
    name: "Avalanche",
    icon: SiEthereum,
    networks: ["C-Chain", "Fuji"]
  },
  {
    key: "optimism",
    name: "Optimism",
    icon: SiEthereum,
    networks: ["Mainnet", "Goerli"]
  },
  {
    key: "fantom",
    name: "Fantom",
    icon: SiEthereum,
    networks: ["Opera", "Testnet"]
  },
  {
    key: "cronos",
    name: "Cronos",
    icon: SiEthereum,
    networks: ["Mainnet", "Testnet"]
  },
  { key: "gnosis", name: "Gnosis", icon: SiEthereum, networks: ["Mainnet"] },
  {
    key: "base",
    name: "Base",
    icon: SiEthereum,
    networks: ["Mainnet", "Goerli"]
  }
];
const coins = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    value: 62981.57,
    market_cap: 1240000000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    value: 2542.83,
    market_cap: 310490000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
  },
  {
    id: 3,
    name: "Tether",
    symbol: "USDT",
    value: 1.0,
    market_cap: 119160000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
  },
  {
    id: 4,
    name: "BNB",
    symbol: "BNB",
    value: 568.79,
    market_cap: 84550000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
  },
  {
    id: 5,
    name: "Solana",
    symbol: "SOL",
    value: 145.86,
    market_cap: 68330000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png"
  },
  {
    id: 6,
    name: "XRP",
    symbol: "XRP",
    value: 0.583,
    market_cap: 32870000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png"
  },
  {
    id: 7,
    name: "Cardano",
    symbol: "ADA",
    value: 0.62,
    market_cap: 21800000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png"
  },
  {
    id: 8,
    name: "Dogecoin",
    symbol: "DOGE",
    value: 0.105,
    market_cap: 15290000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png"
  },
  {
    id: 9,
    name: "Polkadot",
    symbol: "DOT",
    value: 7.92,
    market_cap: 10340000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png"
  },
  {
    id: 10,
    name: "TRON",
    symbol: "TRX",
    value: 0.152,
    market_cap: 13590000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png"
  },
  {
    id: 11,
    name: "Chainlink",
    symbol: "LINK",
    value: 15.23,
    market_cap: 8620000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png"
  },
  {
    id: 12,
    name: "Polygon",
    symbol: "MATIC",
    value: 0.89,
    market_cap: 8580000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png"
  },
  {
    id: 13,
    name: "Litecoin",
    symbol: "LTC",
    value: 86.51,
    market_cap: 6390000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png"
  },
  {
    id: 14,
    name: "Dai",
    symbol: "DAI",
    value: 1.0,
    market_cap: 4900000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png"
  },
  {
    id: 15,
    name: "Shiba Inu",
    symbol: "SHIB",
    value: 0.00001,
    market_cap: 6100000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png"
  },
  {
    id: 16,
    name: "Avalanche",
    symbol: "AVAX",
    value: 16.92,
    market_cap: 5500000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png"
  },
  {
    id: 17,
    name: "Uniswap",
    symbol: "UNI",
    value: 5.97,
    market_cap: 3460000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png"
  },
  {
    id: 18,
    name: "Stellar",
    symbol: "XLM",
    value: 0.16,
    market_cap: 4420000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/512.png"
  },
  {
    id: 19,
    name: "Monero",
    symbol: "XMR",
    value: 163.21,
    market_cap: 2980000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/328.png"
  },
  {
    id: 20,
    name: "Bitcoin Cash",
    symbol: "BCH",
    value: 238.84,
    market_cap: 4670000000,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png"
  }
];

export default function ComponentCoin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredCoins, setFilteredCoins] = useState(coins);
  const [selectedChain, setSelectedChain] = useState("all");
  const [selectedMarketCap, setSelectedMarketCap] = useState("all");
  const [minMarketCap, setMinMarketCap] = useState("");
  const [maxMarketCap, setMaxMarketCap] = useState("");
  const [liked, setLiked] = React.useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    applyFilters();
  }, [selectedChain, selectedMarketCap, minMarketCap, maxMarketCap]);

  const applyFilters = () => {
    let filtered = coins;

    if (selectedMarketCap !== "all") {
      switch (selectedMarketCap) {
        case "low":
          filtered = filtered.filter((coin) => coin.market_cap < 1000000000);
          break;
        case "mid":
          filtered = filtered.filter(
            (coin) =>
              coin.market_cap >= 1000000000 && coin.market_cap < 10000000000
          );
          break;
        case "high":
          filtered = filtered.filter((coin) => coin.market_cap >= 10000000000);
          break;
      }
    }

    if (minMarketCap !== "") {
      filtered = filtered.filter(
        (coin) => coin.market_cap >= parseFloat(minMarketCap) * 1000000000
      );
    }

    if (maxMarketCap !== "") {
      filtered = filtered.filter(
        (coin) => coin.market_cap <= parseFloat(maxMarketCap) * 1000000000
      );
    }

    setFilteredCoins(filtered);
  };

  const resetFilters = () => {
    setSelectedChain("all");
    setSelectedMarketCap("all");
    setMinMarketCap("");
    setMaxMarketCap("");
  };

  return (
    <motion.div
      className="flex flex-col my-8 gap-4 px-4 md:px-8"
    >
      <motion.div
        className="flex flex-row justify-between align-middle gap-4"
      >
        <Tabs key="trending" variant="bordered" aria-label="Tabs variants">
          <Tab key="Trending" title="Trending" />
          <Tab key="Featured" title="Featured" />
        </Tabs>
        <Button color="default">USD</Button>
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
      <motion.div
        className="flex flex-row gap-8 items-center"
      
      >
        <div className="md:flex-row justify-between hidden md:flex align-middle ">
          <Switch defaultSelected color="default" className="md:text-xl">
            Launched
          </Switch>
          <Button
            startContent={<FaFilter />}
            onClick={openModal}
            className="md:hidden items-end text-end"
          >
            Filter
          </Button>
        </div>

        {/* Desktop view */}
        <div className="hidden md:flex gap-4">
          <Select
            label="All Chains"
            variant="bordered"
            className="max-w-xs"
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
          >
            {chainData.map((chain) => (
              <SelectItem
                key={chain.key}
                value={chain.key}
                className="bg-black max-w-2xl text-start"
              >  
              {chain.name}
              
              </SelectItem>
            ))} 
          </Select>
          <Select
  label="Market Cap"
  value={selectedMarketCap}
  variant="bordered"
  className="w-[40rem]"
  onChange={(e) => setSelectedMarketCap(e.target.value)}
>
  <SelectItem key="all" value="all" className="bg-black max-w-2xl">
    All Market Cap
  </SelectItem>
  <SelectItem key="low" value="low" className="bg-black max-w-2xl">
    Low Cap (&lt; $1B)
  </SelectItem>
  <SelectItem key="mid" value="mid" className="bg-black max-w-2xl">
    Mid Cap ($1B - $10B)
  </SelectItem>
  <SelectItem key="high" value="high" className="bg-black max-w-2xl">
    High Cap (&gt; $10B)
  </SelectItem>
</Select>
          <Select
            label="Price"
            variant="bordered"
            className="max-w-xs"
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
          >

              <SelectItem key="button" className="bg-black">
        
                  <div className=" flex flex-col gap-4 ">
                    <Input
                      type="number"
                      label="Min M-Cap"
                      placeholder="0.00"
                      value={minMarketCap}
                      onChange={(e) => setMinMarketCap(e.target.value)}
className=' mx-2'
                    />
                    <Input
                      type="number"
                      label="Max  M-Cap"
                      placeholder="0.00"
                      value={maxMarketCap}
                      onChange={(e) => setMaxMarketCap(e.target.value)}
                      className=' mx-2'
                    />
                    <div className=" gap-4 flex flex-col w-full justify-center mx-2">
                    <Button color="primary" onClick={applyFilters}>
                      Filter
                    </Button>
                    <Button color="secondary" onClick={resetFilters}>
                      Reset
                    </Button>
                  </div>
                  </div>
                  
              </SelectItem>
          </Select>
        </div>
      </motion.div>
      <div className='w-full'>
      <CardDemo />
      </div>
      <div className='md:hidden'>
      <CardGrid />
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>

<div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
<Link href='/omnicoin' >
      <Card />
    </Link>

    <Link href='/omnicoin' >
      <Card />
    </Link>

    <Link href='/omnicoin' >
      <Card />
    </Link>
    <Link href='/omnicoin' >
      <Card />
    </Link>
</div>

<div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>

<div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
<Link href='/omnicoin' >
      <Card />
    </Link>

    <Link href='/omnicoin' >
      <Card />
    </Link>

    <Link href='/omnicoin' >
      <Card />
    </Link>
    <Link href='/omnicoin' >
      <Card />
    </Link>
</div>

<div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
      </div>
      <div className='hidden md:flex md:justify-between align-middle flex-row my-4'>
      <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>

          <Link href='/omnicoin' >
            <Card />
          </Link>
          <Link href='/omnicoin' >
            <Card />
          </Link>
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
                    applyFilters();
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
    className='w-full  md:w-[350px] px-2 mb-4'
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div
      className='bg-[#0A0909] rounded-lg overflow-hidden'
      style={{
        height: '150px',
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
                  width: '70px',
                  height: '20px',
                  top: '14px',
                  left: '137px',
                  fontSize: '20px',
                  lineHeight: '20px',
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
                  width: '20px',
                  height: '10px',
                  top: '9px',
                  left: '302px',
                  fontSize: '10px',
                  fontWeight: 200,
                  lineHeight: '20px',
                  textAlign: 'left',
                  color: '#F7F2DA',
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
                  width: '60px',
                  height: '10px',
                  left: '137px',
                  fontSize: '10px',
                  fontWeight: 200,
                  lineHeight: '10px',
                  textAlign: 'left',
                  color: '#F7F2DA',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Pear Network
              </motion.p>
        
              <motion.div
                className='mt-[25px]'
                style={{
                  width: '180px',
                  height: '10px',
                  top: '85px',
                  left: '137px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p
                  className='workbench-test'
                  style={{
                    fontSize: '10px',
                    fontWeight: 400,
                    lineHeight: '10px',
                    textAlign: 'left',
                    color: '#F7F2DA',
                  }}
                >
                  Time to Launch:
                </p>
                <p
                  style={{
                    fontSize: '12px', 
                    fontWeight: 400,
                    lineHeight: '10px',
                    textAlign: 'left',
                    color: '#F7F2DA',
                  }}
                >
                  00D/4H/24m
                </p>
              </motion.div>
              <motion.div
                className='my-[8px] workbench-test'
                style={{
                  width: '180px',
                  height: '10px',
                  top: '85px',
                  left: '137px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 400,
                    lineHeight: '10px',
                    textAlign: 'left',
                    color: '#F7F2DA',
                  }}
                >
                  Chain:
                </p>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 400,
                    lineHeight: '10px',
                    textAlign: 'left',
                    color: '#F7F2DA',
                  }}
                >
                  Arbitrum
                </p>
              </motion.div>
              <motion.div
                className='mb-[8px]'
                style={{
                  width: '180px',
                  height: '10px',
                  top: '102px',
                  left: '137px',
                  fontSize: '10px',
                  fontWeight: 400,
                  lineHeight: '10px',
                  textAlign: 'left',
                  color: '#F7F2DA',
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
)