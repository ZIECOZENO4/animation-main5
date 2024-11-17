"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Receipt, ArrowLeftRight, Wallet, ChevronRight } from 'lucide-react'
import { Button, Card, CardBody, Select, SelectItem } from "@nextui-org/react"

export default function Component() {
  const [amount, setAmount] = useState("0")
  const [dollarAmount, setDollarAmount] = useState("$0.00")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('exchange')
  
  const chains = [
    { id: "eth", name: "Ethereum" },
    { id: "bsc", name: "Binance Smart Chain" },
    { id: "pol", name: "Polygon" },
  ]

  const sidebarVariants = {
    open: { width: "80px", transition: { duration: 0.3 } },
    closed: { width: "0px", transition: { duration: 0.3 } }
  }

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <div className="min-h-screen bg-[#1a1424] flex">
      {/* Sidebar */}
      <motion.div 
        className="bg-[#2a233f] h-screen flex flex-col items-center py-4 relative"
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <motion.div 
          className="absolute -right-4 top-8 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            size="sm"
            variant="ghost"
            className="rounded-full bg-[#2a233f] text-white h-8 w-8 p-0"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
          </Button>
        </motion.div>
        
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <Button
                  variant="ghost"
                  className={`text-white ${activeTab === 'exchange' ? 'bg-[#1a1424]' : ''}`}
                  onClick={() => setActiveTab('exchange')}
                >
                  <ArrowLeftRight className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  className={`text-white ${activeTab === 'wallet' ? 'bg-[#1a1424]' : ''}`}
                  onClick={() => setActiveTab('wallet')}
                >
                  <Wallet className="h-5 w-5" />
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#1f1830] border-none text-white">
          <CardBody>
            <motion.div 
              className="p-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">Exchange</h1>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" className="text-white">
                    <Receipt className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" className="text-white">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>

              {/* From Section */}
              <motion.div variants={itemVariants} className="mb-4">
                <label className="text-sm text-gray-400 mb-2 block">From</label>
                <Select
                  placeholder="Select chain and token"
                  className="bg-[#2a233f]"
                >
                  {chains.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id}>
                      {chain.name}
                    </SelectItem>
                  ))}
                </Select>
              </motion.div>

              {/* To Section */}
              <motion.div variants={itemVariants} className="mb-4">
                <label className="text-sm text-gray-400 mb-2 block">To</label>
                <Select
                  placeholder="Select chain and token"
                  className="bg-[#2a233f]"
                >
                  {chains.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id}>
                      {chain.name}
                    </SelectItem>
                  ))}
                </Select>
              </motion.div>

              {/* Send Section */}
              <motion.div variants={itemVariants} className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Send</label>
                <div className="bg-[#2a233f] rounded-lg p-4">
                  <motion.div
                    className="text-3xl font-bold mb-1"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 0.2 }}
                  >
                    {amount}
                  </motion.div>
                  <motion.div 
                    className="text-sm text-gray-400"
                    animate={{ opacity: [0, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    {dollarAmount}
                  </motion.div>
                </div>
              </motion.div>

              {/* Exchange Button */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="w-full bg-[#6c2bd9] hover:bg-[#7c3ae9] text-white py-6"
                  onClick={() => {
                    setAmount("0.05")
                    setDollarAmount("$125.00")
                  }}
                >
                  Exchange
                </Button>
              </motion.div>
            </motion.div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}