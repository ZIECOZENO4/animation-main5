'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Phone, Camera, Globe, ChevronDown, Copy, Check } from 'lucide-react'

export default function TokenHeader() {
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("ZENO WEB")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.header 
      className="text-[#F7F2DA] border border-slate-500 text-sm flex justify-between items-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center space-x-4 bg-opacity-80 p-2  rounded-lg w-auto"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
        <div className="flex-grow">
          <div className="flex flex-row align-middle gap-3">
            <motion.h2
              className="text-xl text-[#F7F2DA] mb-1"
              style={{ filter: "blur(1px)" }}
              animate={{ filter: isHovered ? "blur(0px)" : "blur(1px)" }}
            >
              ZENO WEB
            </motion.h2>
      
            <Star className="w-6 h-6 pb-2 align-middle text-center text-green-500" />
          </div>

          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
                  <button onClick={handleCopy}>
              {copied ? (
                <Check className="w-6 h-6 text-green-400" />
              ) : (
                <Copy className="w-6 h-6 text-gray-400" />
              )}
            </button>
            <Phone className="w-6 h-6 text-gray-400" />
            <Camera className="w-6 h-6 text-gray-400" />
            <Globe className="w-6 h-6 text-gray-400" />
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex space-x-4 p-2 mr-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <StatItem label="FLOOR PRICE" value="0.2999" isUp={true} showCoin={true} />
        <StatItem label="TOP BID" value="0.28" isUp={true} showCoin={true} />
        <StatItem label="1D CHANGE" value="-5.96%" isUp={false} showCoin={false} />
        <StatItem label="7D CHANGE" value="-9.01%" isUp={false} showCoin={false} />
        <StatItem label="15M VOLUME" value="-19.01%" showCoin={false} />
        <StatItem label="1D VOLUME" value="13.98" isUp={true} showCoin={true} />
        <StatItem label="7D VOLUME" value="31.69" isUp={true} showCoin={true} />
        <StatItem label="7D VOLUME" value="1774 (18%)" showCoin={false} />
        <StatItem label="OWNERS" value="9997" showCoin={false} />
        <StatItem label="SUPPLY" value="0.5%" showCoin={false} />
      </motion.div>
    </motion.header>
  )
}

function StatItem({ label, value, isUp = null, showCoin = false }) {
  return (
    <motion.div 
      className="flex flex-col items-end"
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-gray-400">{label}</span>
      <div className="flex items-center">
        <span className={isUp === null ? '' : (isUp ? 'text-green-400' : 'text-red-400')}>
          {value} {isUp !== null && (isUp ? '↑' : '↓')}
        </span>
        {showCoin && (
          <img 
            src='https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' 
            alt='coin' 
            className='h-4 w-4 align-middle rounded-full items-center ml-1'
          />
        )}
      </div>
    </motion.div>
  )
}