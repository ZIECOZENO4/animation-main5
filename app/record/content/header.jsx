'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Phone, Camera, Globe, ChevronDown } from 'lucide-react'

export default function TokenHeader() {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <motion.header 
      className=" text-white border border-slate-500 font-mono text-sm flex justify-between items-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
  <motion.div
      className="flex items-center space-x-4  bg-opacity-80 p-2 rounded-lg w-auto"
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
          className="w-16 h-16 rounded-full border-2 border-green-500"
        />
      </motion.div>
      <div className="flex-grow">
        <motion.h2
          className="text-xl font-mono text-white mb-1"
          style={{ filter: "blur(1px)" }}
          animate={{ filter: isHovered ? "blur(0px)" : "blur(1px)" }}
        >
        ZENO WEB
        </motion.h2>
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Star className="w-4 h-4 text-yellow-400" />
          <Phone className="w-4 h-4 text-gray-400" />
          <Camera className="w-4 h-4 text-gray-400" />
          <Globe className="w-4 h-4 text-gray-400" />
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </div>
    </motion.div>
      
      <motion.div 
        className="flex space-x-4  p-2 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <StatItem label="FLOOR PRICE" value="0.2999" isUp={true} />
        <StatItem label="TOP BID" value="0.28" isUp={true} />
        <StatItem label="1D CHANGE" value="-5.96%" isUp={false} />
        <StatItem label="7D CHANGE" value="-9.01%" isUp={false} />
        <StatItem label="15M VOLUME" value="-" />
        <StatItem label="1D VOLUME" value="13.98" isUp={true} />
        <StatItem label="7D VOLUME" value="31.69" isUp={true} />
        <StatItem label="7D VOLUME" value="1774 (18%)" />
        <StatItem label="OWNERS" value="9997" />
        <StatItem label="SUPPLY" value="0.5%" />
   
      </motion.div>
    </motion.header>
  )
}

function StatItem({ label, value, isUp = null }) {
  return (
    <motion.div 
      className="flex flex-col items-end"
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-gray-400">{label}</span>
      <span className={isUp === null ? '' : (isUp ? 'text-green-400' : 'text-red-400')}>
        {value} {isUp !== null && (isUp ? '↑' : '↓')}
      </span>
    </motion.div>
  )
}