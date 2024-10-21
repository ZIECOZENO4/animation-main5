"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Grid, Image } from "lucide-react"
import { useState, useEffect } from "react"
import { Avatar } from "@nextui-org/react"
import Link from 'next/link';
const images = [
   'https://cryptologos.cc/logos/bitcoin-btc-logo.png' ,
   'https://cryptologos.cc/logos/ethereum-eth-logo.png' ,
   'https://cryptologos.cc/logos/tether-usdt-logo.png' ,
   'https://cryptologos.cc/logos/bnb-bnb-logo.png' ,
   'https://cryptologos.cc/logos/solana-sol-logo.png' ,
   'https://cryptologos.cc/logos/usd-coin-usdc-logo.png' ,
   'https://cryptologos.cc/logos/xrp-xrp-logo.png' ,
   'https://cryptologos.cc/logos/cardano-ada-logo.png' ,
   'https://cryptologos.cc/logos/dogecoin-doge-logo.png' ,
   'https://cryptologos.cc/logos/tron-trx-logo.png' ,
   'https://cryptologos.cc/logos/avalanche-avax-logo.png' ,
   'https://cryptologos.cc/logos/polkadot-new-dot-logo.png' ,
   'https://cryptologos.cc/logos/chainlink-link-logo.png' ,
   'https://cryptologos.cc/logos/polygon-matic-logo.png' ,
   'https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png' ,
   'https://cryptologos.cc/logos/dai-dai-logo.png' ,
   'https://cryptologos.cc/logos/litecoin-ltc-logo.png' ,
   'https://cryptologos.cc/logos/shiba-inu-shib-logo.png' ,
   'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png' ,
   'https://cryptologos.cc/logos/uniswap-uni-logo.png' ,
   'https://cryptologos.cc/logos/stellar-xlm-logo.png' ,
   'https://cryptologos.cc/logos/monero-xmr-logo.png' ,
   'https://cryptologos.cc/logos/ethereum-classic-etc-logo.png' ,
   'https://cryptologos.cc/logos/filecoin-fil-logo.png' ,
   'https://cryptologos.cc/logos/hedera-hbar-logo.png' ,
   'https://cryptologos.cc/logos/cronos-cro-logo.png' ,
   'https://cryptologos.cc/logos/lido-dao-ldo-logo.png' ,
   'https://cryptologos.cc/logos/aptos-apt-logo.png' ,
   'https://cryptologos.cc/logos/near-protocol-near-logo.png' ,
   'https://cryptologos.cc/logos/vechain-vet-logo.png' ,
   'https://cryptologos.cc/logos/algorand-algo-logo.png' ,
   'https://cryptologos.cc/logos/the-graph-grt-logo.png' ,
   'https://cryptologos.cc/logos/quant-qnt-logo.png' ,
   'https://cryptologos.cc/logos/internet-computer-icp-logo.png' ,
   'https://cryptologos.cc/logos/eos-eos-logo.png' ,
   'https://cryptologos.cc/logos/elrond-egld-logo.png' ,
   'https://cryptologos.cc/logos/aave-aave-logo.png' ,
   'https://cryptologos.cc/logos/tezos-xtz-logo.png' ,
   'https://cryptologos.cc/logos/theta-network-theta-logo.png' ,
   'https://cryptologos.cc/logos/the-sandbox-sand-logo.png' ,
   'https://cryptologos.cc/logos/axie-infinity-axs-logo.png' ,
   'https://cryptologos.cc/logos/fantom-ftm-logo.png' ,
   'https://cryptologos.cc/logos/decentraland-mana-logo.png' ,
   'https://cryptologos.cc/logos/kucoin-token-kcs-logo.png' ,
   'https://cryptologos.cc/logos/flow-flow-logo.png' ,
   'https://cryptologos.cc/logos/neo-neo-logo.png' ,
   'https://cryptologos.cc/logos/chiliz-chz-logo.png' ,
   'https://cryptologos.cc/logos/pax-dollar-usdp-logo.png' ,
   'https://cryptologos.cc/logos/iota-miota-logo.png' ,
   'https://cryptologos.cc/logos/zcash-zec-logo.png' 
];

export default function CreateComponent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen text-[#F7F2DA]">
      <motion.div
        className={`absolute inset-0`}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      />
      <div className="z-10 flex-1 p-6 bg-opacity-50">
      <Link href='/' passHref>
      <motion.a
        className="inline-block p-2 rounded-full bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        whileHover={{ x: -5 }}
        whileTap={{ x: -10 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <motion.svg
          fill="#ffffff"
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="icon flat-color"
        >
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            fill="#000000"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
          <motion.path
            d="M17,11H11V9.86a1,1,0,0,0-1.5-.69L6.38,11.31a.82.82,0,0,0,0,1.38L9.5,14.83a1,1,0,0,0,1.5-.69V13h6a1,1,0,0,0,0-2Z"
            fill="#2ca9bc"
            initial={{ x: 0 }}
            whileHover={{ x: -2 }}
            whileTap={{ x: -4 }}
          />
        </motion.svg>
      </motion.a>
    </Link>
        <div className="flex gap-4">
          <Avatar
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="md"
            src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
          />
          <h1 className="mb-8 text-4xl font-bold">Create</h1>
        </div>
        <div className="space-y-4">
        <Link href='/newcoin'>
         <div className="p-4 bg-gray-800 hover:bg-opacity-40 rounded-lg my-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Grid className="w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold hover:scale-110 hover:text-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out">Create Coin</h2>
              </div>
              <ArrowLeft className="w-6 h-6 transform rotate-180" />
            </div>
        
            <p className="text-md text-gray-400">
              A drop is the release of a new project. This usually happens on a specified date and time. Items will be revealed after they have been purchased.
            </p>
          </div>    
            </Link>
            <Link href='/lunch'>
           <div className="p-4 bg-gray-800 hover:bg-opacity-40 rounded-lg my-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Image className="w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold hover:scale-110 hover:text-2xl hover:-translate-y-1 transition-all duration-300 ease-in-out">Create Lunch</h2>
              </div>
              <ArrowLeft className="w-6 h-6 transform rotate-180" />
            </div>
            <p className="text-md text-gray-400">
              Create a new Coin collection or add an NFT to an existing one. Your items will display immediately. List for sale when you're ready.
            </p>
          </div>   
            </Link>
        
        </div>
        <p className="mt-10 text-sm md:text-md text-underlinec:\Users\Administrator\OneDrive\all programming files\digital-fortress-demo-master\components\Contact.jsx text-blue-600">Learn more about each option.</p>
      </div>
      <div className="z-10 flex-1 p-6 hidden sm:flex">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={`NFT Image ${currentImageIndex + 1}`}
            className="w-full h-[80vh] object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}