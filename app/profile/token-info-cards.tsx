'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TokenInfo {
  id: number
  name: string
  subtitle: string
  timestamp: string
  address: string
  creator: string
  totalSupply: number
  marketCap: number
  tokenPrice: number
}

const generateTokenInfo = (id: number): TokenInfo => ({
  id,
  name: `zeno web ${id}`,
  subtitle: `test${id}`,
  timestamp: `${Math.floor(Math.random() * 7) + 1} days ago`,
  address: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 6)}`,
  creator: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 6)}`,
  totalSupply: parseFloat((Math.random() * 10).toFixed(6)),
  marketCap: parseFloat((Math.random() * 1000).toFixed(6)),
  tokenPrice: parseFloat((Math.random() * 0.1).toFixed(10))
})

const TokenInfoCard: React.FC<{ tokenInfo: TokenInfo }> = ({ tokenInfo }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg p-4 w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)" }}
      layout
    >
       <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src="https://usyrtqjsyizmjgpizckc.supabase.co/storage/v1/object/public/assets/nft%202.jfif"
            alt="Profile avatar"
            className="w-16 h-16 rounded-full border-2 border-slate-500"
          />
        </motion.div>
      
      <motion.h2
        className="text-xl font-bold text-center text-green-400 mb-1"
        whileHover={{ scale: 1.1 }}
      >
        {tokenInfo.name}
      </motion.h2>
      
      <p className="text-gray-400 text-center text-sm mb-4">
        {tokenInfo.subtitle} <span className="text-gray-500">({tokenInfo.timestamp})</span>
      </p>
      
      <div className="space-y-2">
        <InfoRow label="Address" value={tokenInfo.address} />
        <InfoRow label="Creator" value={tokenInfo.creator} />
        <InfoRow label="Total Supply" value={tokenInfo.totalSupply.toFixed(6)} />
        <InfoRow label="Market Cap" value={tokenInfo.marketCap.toFixed(6)} />
        <InfoRow label="Token Price" value={tokenInfo.tokenPrice.toFixed(10)} />
      </div>
    </motion.div>
  )
}

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <motion.div
      className="flex justify-between items-center"
      whileHover={{ backgroundColor: 'rgba(0, 255, 0, 0.1)', borderRadius: '0.25rem' }}
    >
      <span className="text-[#F7F2DA]">{label}</span>
      <motion.span
        className="text-slate-500 "
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {value}
      </motion.span>
    </motion.div>
  )
}

export default function TokenInfoCards() {
  const [cards, setCards] = useState<TokenInfo[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      const cardCount = Math.floor(Math.random() * 5) + 1 // 1 to 5 cards
      const newCards = Array.from({ length: cardCount }, (_, i) => generateTokenInfo(i + 1))
      setCards(newCards)
    }, 5000) // Change cards every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen overflow-auto bg-black border border-slate-500 p-2">
      <div className="max-w-6xl mx-auto">

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
        >
          <AnimatePresence>
            {cards.map(tokenInfo => (
              <TokenInfoCard key={tokenInfo.id} tokenInfo={tokenInfo} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}