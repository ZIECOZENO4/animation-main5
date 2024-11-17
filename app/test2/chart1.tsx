"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, Receipt, ArrowLeftRight, Wallet, ChevronDown, ArrowUpDown, X } from 'lucide-react'
import { Button, Card, Input } from "@nextui-org/react"

const tokens = [
  { id: "eth", name: "ETH", symbol: "ETH" },
  { id: "weth", name: "WETH", symbol: "WETH", icon: "/weth.png" },
  { id: "usdt", name: "USDT", symbol: "USDT" },
  { id: "usdc", name: "USDC", symbol: "USD Coin" },
]

export default function Component() {
  const [isGasMode, setIsGasMode] = useState(false)
  const [showSelect, setShowSelect] = useState(false)
  const [selectedField, setSelectedField] = useState<'from' | 'to' | null>(null)
  const [showWalletInput, setShowWalletInput] = useState(false)
  const [selectedFromToken, setSelectedFromToken] = useState<any>(null)
  const [selectedToToken, setSelectedToToken] = useState<any>(null)

  const handleTokenSelect = (token: any) => {
    if (selectedField === 'from') {
      setSelectedFromToken(token)
    } else {
      setSelectedToToken(token)
    }
    setShowSelect(false)
  }

  return (
    <div className="min-h-screen bg-[#1a1424] flex gap-4">
      {/* Toggle Buttons */}
      <div className="mx-auto flex">
        <input 
          type="checkbox" 
          id="modeToggle" 
          className="hidden peer" 
          checked={isGasMode}
          onChange={() => setIsGasMode(!isGasMode)}
        />
        <label 
          htmlFor="modeToggle" 
          className="w-[60px] h-[155px] bg-[#2a233f] rounded-[1.7rem] p-1 cursor-pointer flex flex-col items-center justify-between py-4 relative"
        >
          {/* Top Icon */}
          <div className="text-gray-400 z-10">
            <Wallet className="h-6 w-6" />
          </div>

          {/* Moving Button */}
          <div 
            className={`
              absolute w-[50px] h-[50px] bg-[#1a1424] rounded-full 
              left-[5px] transition-all duration-500 ease-in-out
              ${isGasMode ? 'top-[10px]' : 'top-[95px]'}
            `}
          />

          {/* Bottom Icon */}
          <div className="text-gray-400 z-10">
            <ArrowLeftRight className="h-6 w-6" />
          </div>
        </label>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {showWalletInput ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-md"
            >
              <Card className="bg-[#1f1830]/90 backdrop-blur-sm border-none text-white p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Send to wallet</h2>
                  <Button
                    isIconOnly
                    variant="ghost"
                    className="text-gray-400"
                    onClick={() => setShowWalletInput(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <Input
                  placeholder="Enter wallet address"
                  className="mb-6"
                  classNames={{
                    input: "bg-[#2a233f] text-white",
                    inputWrapper: "bg-[#2a233f]"
                  }}
                />
                <Button 
                  className="w-full bg-[#6c2bd9] text-white h-14 rounded-xl"
                >
                  Confirm
                </Button>
              </Card>
            </motion.div>
          ) : (
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
                  
                    <Button
                      className="w-full h-24 bg-[#2a233f] justify-between px-4"
                      onClick={() => {
                        setSelectedField('from')
                        setShowSelect(true)
                      }}
                    >
                <div className="gap-4">
     <label className="text-sm text-gray-400 m-2 text-left  block">From</label>
       <div className="flex items-center gap-3">
                  
                        {selectedFromToken ? (
                          <>
                            <div className="w-10 h-10 rounded-full bg-[#1a1424] flex items-center justify-center">
                              {selectedFromToken.icon && (
                                <img src={selectedFromToken.icon} alt="" className="w-6 h-6" />
                              )}
                            </div>
                            <span className="text-white">{selectedFromToken.symbol}</span>
                          </>
                        ) : (
                          <>
                            <div className="w-10 h-10 rounded-full bg-[#1a1424]" />
                            <span className="text-gray-400">Select chain and token</span>
                          </>
                        )}
                      </div>
                </div>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </Button>
                  </div>

                  {/* Swap Circle */}
                  <div className="absolute left-1/2 mb-4 -translate-x-1/2 z-10">
                    <motion.div
                      className="w-10 h-10 bg-[#625686] rounded-full flex items-center justify-center cursor-pointer"
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      onClick={() => {
                        const temp = selectedFromToken
                        setSelectedFromToken(selectedToToken)
                        setSelectedToToken(temp)
                      }}
                    >
                      <ArrowUpDown className="h-5 w-5 text-gray-400" />
                    </motion.div>
                  </div>

                  <div>
                 
                    <Button
                      className="w-full h-24 bg-[#2a233f] justify-between px-4"
                      onClick={() => {
                        setSelectedField('to')
                        setShowSelect(true)
                      }}
                    >
                        <div className="gap-4">
                                  <label className="text-sm text-gray-400 text-left mb-2 block">To</label>
                         <div className="flex items-center gap-3">
               
                        {selectedToToken ? (
                          <>
                            <div className="w-10 h-10 rounded-full bg-[#1a1424] flex items-center justify-center">
                              {selectedToToken.icon && (
                                <img src={selectedToToken.icon} alt="" className="w-6 h-6" />
                              )}
                            </div>
                            <span className="text-white">{selectedToToken.symbol}</span>
                          </>
                        ) : (
                          <>
                            <div className="w-10 h-10 rounded-full bg-[#1a1424]" />
                            <span className="text-gray-400">Select chain{!isGasMode && ' and token'}</span>
                          </>
                        )}
                      </div>
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
                    onClick={() => setShowWalletInput(true)}
                  >
                    <Wallet className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </AnimatePresence>

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
                    Select {selectedField === 'from' ? 'from' : 'to'} token
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
                  {tokens.slice(0, 10).map((token, i) => (
                    <Button
                      key={i}
                      className="aspect-square p-0 bg-[#2a233f]"
                      onClick={() => handleTokenSelect(token)}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#1a1424] flex items-center justify-center">
                        {token.icon && <img src={token.icon} alt="" className="w-5 h-5" />}
                      </div>
                    </Button>
                  ))}
                  <Button
                    className="aspect-square p-0 bg-[#2a233f] text-white"
                  >
                    +22
                  </Button>
                </div>

                <div className="space-y-2">
                  {tokens.map((token) => (
                    <Button
                      key={token.id}
                      className="w-full justify-between bg-transparent hover:bg-[#2a233f] text-white p-4"
                      onClick={() => handleTokenSelect(token)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#2a233f] flex items-center justify-center">
                          {token.icon && <img src={token.icon} alt="" className="w-6 h-6" />}
                        </div>
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