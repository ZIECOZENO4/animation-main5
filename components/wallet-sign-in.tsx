"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Globe, Grid } from "lucide-react"

export default function Component() {
  const [isOpen, setIsOpen] = useState(true)

  const wallets = [
    { name: "MetaMask", icon: "/placeholder.svg?height=40&width=40", installed: true },
    { name: "Coinbase Wallet", icon: "/placeholder.svg?height=40&width=40" },
    { name: "Rainbow", icon: "/placeholder.svg?height=40&width=40" },
    { name: "Rabby", icon: "/placeholder.svg?height=40&width=40" },
    { name: "Zerion", icon: "/placeholder.svg?height=40&width=40" },
  ]

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      {isOpen && (
        <div className="bg-gray-800 text-[#F7F2DA] rounded-lg shadow-lg overflow-hidden w-full max-w-2xl">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Sign in</h2>
            <button   aria-label='number' onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-[#F7F2DA]">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex">
            <div className="w-1/2 p-4 border-r border-gray-700">
              <ul className="space-y-4">
                {wallets.map((wallet, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <img src={wallet.icon} alt={wallet.name} className="w-10 h-10 rounded" />
                    <span>{wallet.name}</span>
                    {wallet.installed && (
                      <span className="text-xs text-gray-400 ml-auto">Installed</span>
                    )}
                  </li>
                ))}
                <li className="flex items-center space-x-3 text-blue-400 cursor-pointer">
                  <Grid className="w-10 h-10" />
                  <span>All Wallets</span>
                  <span className="text-xs ml-auto">350+</span>
                </li>
              </ul>
            </div>
            <div className="w-1/2 p-8 flex flex-col items-center justify-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Globe className="w-24 h-24 text-blue-400" />
              </motion.div>
              <h3 className="mt-6 text-xl font-semibold text-center">
                Your gateway to the decentralized world
              </h3>
              <p className="mt-2 text-gray-400 text-center">
                Connect a wallet to get started
              </p>
              <a href="#" className="mt-4 text-blue-400 hover:underline">
                New to wallets?
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}