"use client"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Link from 'next/link'
import { useState } from 'react'

const blockchains = [
  { name: "Arbitrum", color: "bg-gradient-to-r from-indigo-600 to-blue-500 border border-blue-600", logo: "/images/arbi.png", recommended: true },
  { name: "Ethereum", color: "bg-gradient-to-r from-indigo-500 to-neutral-700 border border-green-600", logo: "/images/eth.png" },
  { name: "Optimism", color: "bg-gradient-to-r from-amber-500 to-pink-500 border border-red-800", logo: "/images/opti.png" },
]

export default function Component() {
  return (
    <div className="min-h-screen  text-[#F7F2DA] p-4 sm:p-8">
      <h1 className="text-2xl md:text-3xl sm:text-4xl text-center mb-8 sm:mb-12">Select a Blockchain</h1>
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch space-y-6 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8 max-w-7xl min-h-screen  md:h-[100vh] mx-auto">
        {blockchains.map((blockchain) => (
          <Link href='/deploy' key={blockchain.name} className="w-full sm:w-1/3 px-4 md:px-10 md:max-w-sm" >
            <TiltCard blockchain={blockchain} />
          </Link>
        ))}
      </div>
    </div>
  )
}

function TiltCard({ blockchain }: { blockchain: typeof blockchains[0] }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-300, 300], [30, -30])
  const rotateY = useTransform(x, [-300, 300], [-30, 30])

  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className={`${blockchain.color} rounded-3xl p-4 mt-4 sm:p-6 md:h-[60vh] h-[60vh] flex flex-col items-center justify-center relative overflow-hidden`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{ scale: 1.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      {blockchain.recommended && (
      <div className="absolute top-2 right-2 bg-red-500 text-[#F7F2DA] text-xs sm:text-sm rounded-full px-2 py-1 flex items-center">
      Recommended
      <span className="bg-green-500 rounded-full w-2 h-2 animate-pulse ml-2"></span>
    </div>
      )}
      <motion.div
        className="mb-4 md:mb-12 w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center"
        style={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <img src={blockchain.logo} alt={`${blockchain.name} logo`} className="max-w-full max-h-full rounded-full object-contain" />
      </motion.div>
      <h2 className="text-xl sm:text-2xl mt-4 md:mt-0 text-center">{blockchain.name}</h2>
    </motion.div>
  )
}