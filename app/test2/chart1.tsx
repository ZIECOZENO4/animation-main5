"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Receipt, ArrowLeftRight, Wallet, ChevronDown } from 'lucide-react'
import { Button, Card, CardBody, Select, SelectItem } from "@nextui-org/react"

export default function Component() {
  const [amount, setAmount] = useState("0")
  const [dollarAmount, setDollarAmount] = useState("$0.00")
  const [isGasMode, setIsGasMode] = useState(true)
  
  const chains = [
    { id: "eth", name: "Ethereum" },
    { id: "bsc", name: "Binance Smart Chain" },
    { id: "pol", name: "Polygon" },
  ]

  return (
    <div className="min-h-screen bg-[#1a1424] flex items-center justify-center">
      {/* Left Toggle */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 bg-[#2a233f] rounded-full p-2 space-y-2">
        <Button
          variant="ghost"
          className={`rounded-full w-10 h-10 p-0 ${!isGasMode ? 'bg-[#1a1424] text-white' : 'text-gray-400'}`}
          onClick={() => setIsGasMode(false)}
        >
          <ArrowLeftRight className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          className={`rounded-full w-10 h-10 p-0 ${isGasMode ? 'bg-[#1a1424] text-white' : 'text-gray-400'}`}
          onClick={() => setIsGasMode(true)}
        >
          <Wallet className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-md bg-[#1f1830] border-none text-white shadow-xl">
        <CardBody className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
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

          {/* From Section */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-2 block">From</label>
            <div className="bg-[#2a233f] rounded-xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1a1424]" />
              <span className="text-gray-400">Select chain and token</span>
              <ChevronDown className="ml-auto h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* To Section */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-2 block">To</label>
            <div className="bg-[#2a233f] rounded-xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1a1424]" />
              <span className="text-gray-400">Select chain{!isGasMode && ' and token'}</span>
              <ChevronDown className="ml-auto h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Send Section */}
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-2 block">Send</label>
            <div className="bg-[#2a233f] rounded-xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1a1424]" />
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-gray-400">$0.00</div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex gap-3">
            <Button 
              className="flex-1 bg-[#6c2bd9] text-white py-6 rounded-xl"
              size="lg"
            >
              {isGasMode ? 'Get gas' : 'Exchange'}
            </Button>
            <Button
              isIconOnly
              className="bg-[#2a233f] text-white rounded-xl"
              size="lg"
            >
              <Wallet className="h-5 w-5" />
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}