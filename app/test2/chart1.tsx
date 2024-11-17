"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Receipt, ArrowLeftRight, Wallet, ChevronDown, ArrowUpDown } from 'lucide-react'
import { Button, Card, Input } from "@nextui-org/react"

const tokens = [
  { id: "eth", name: "ETH", symbol: "ETH" },
  { id: "weth", name: "WETH", symbol: "WETH" },
  { id: "usdt", name: "USDT", symbol: "USDT" },
  { id: "usdc", name: "USDC", symbol: "USD Coin" },
]

export default function Component() {
  const [isGasMode, setIsGasMode] = useState(false)
  const [showSelect, setShowSelect] = useState(false)
  const [selectedField, setSelectedField] = useState<'from' | 'to' | null>(null)
  
  return (
    <div className="min-h-screen bg-[#1a1424] flex">
      {/* Toggle Buttons */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 bg-[#2a233f]/50 backdrop-blur-sm rounded-full p-2 space-y-2">
        <Button
          isIconOnly
          variant="ghost"
          className={`rounded-full w-12 h-12 ${!isGasMode ? 'bg-[#1a1424] text-white' : 'text-gray-400'}`}
          onClick={() => setIsGasMode(false)}
        >
          <ArrowLeftRight className="h-5 w-5" />
        </Button>
        <Button
          isIconOnly
          variant="ghost"
          className={`rounded-full w-12 h-12 ${isGasMode ? 'bg-[#1a1424] text-white' : 'text-gray-400'}`}
          onClick={() => setIsGasMode(true)}
        >
          <Wallet className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#1f1830]/90 backdrop-blur-sm border-none text-white relative">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{isGasMode ? 'Gas' : 'Exchange'}</h1>
              <div className="flex gap-2">
                <Button isIconOnly variant="ghost" className="text-gray-400">
                  <Receipt className="h-5 w-5" />
                </Button>
                <Button isIconOnly variant="ghost" className="text-gray-400">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Exchange Fields */}
            <div className="space-y-4 relative">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">From</label>
                <Button
                  className="w-full h-20 bg-[#2a233f] justify-between px-4"
                  onClick={() => {
                    setSelectedField('from')
                    setShowSelect(true)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1a1424]" />
                    <span className="text-gray-400">Select chain and token</span>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </Button>
              </div>

              {/* Swap Circle */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  className="w-10 h-10 bg-[#2a233f] rounded-full flex items-center justify-center"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowUpDown className="h-5 w-5 text-gray-400" />
                </motion.div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">To</label>
                <Button
                  className="w-full h-20 bg-[#2a233f] justify-between px-4"
                  onClick={() => {
                    setSelectedField('to')
                    setShowSelect(true)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1a1424]" />
                    <span className="text-gray-400">Select chain{!isGasMode && ' and token'}</span>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </Button>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Send</label>
                <div className="bg-[#2a233f] rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a1424]" />
                  <div>
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-sm text-gray-400">$0.00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-[#6c2bd9] text-white h-14 rounded-xl"
                size="lg"
              >
                {isGasMode ? 'Get gas' : 'Exchange'}
              </Button>
              <Button
                isIconOnly
                className="bg-[#2a233f] text-white rounded-xl h-14 w-14"
                size="lg"
              >
                <Wallet className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Token Select Overlay */}
        <AnimatePresence>
          {showSelect && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 bg-[#1a1424] z-50 p-4"
            >
              <div className="max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    isIconOnly
                    variant="ghost"
                    className="text-white"
                    onClick={() => setShowSelect(false)}
                  >
                    <ArrowLeftRight className="h-5 w-5 rotate-180" />
                  </Button>
                  <h2 className="text-xl text-white font-semibold">
                    Exchange {selectedField === 'from' ? 'from' : 'to'}
                  </h2>
                </div>

                <Input
                  placeholder="Search by token name or address"
                  className="mb-6"
                  classNames={{
                    input: "bg-[#2a233f] text-white",
                    inputWrapper: "bg-[#2a233f]"
                  }}
                />

                <div className="grid grid-cols-5 gap-2 mb-6">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl bg-[#2a233f] flex items-center justify-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#1a1424]" />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {tokens.map((token) => (
                    <Button
                      key={token.id}
                      className="w-full justify-between bg-transparent hover:bg-[#2a233f] text-white p-4"
                      onClick={() => setShowSelect(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#2a233f]" />
                        <div className="text-left">
                          <div>{token.symbol}</div>
                          <div className="text-sm text-gray-400">{token.name}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}