"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ChevronDown, Maximize2, X } from "lucide-react"

export default function EnhanceTradingView() {
  const [view, setView] = useState<"trading" | "depth">("trading")
  const [selectedInterval, setSelectedInterval] = useState("1D")
  const [isZoomedOut, setIsZoomedOut] = useState(false)

  const intervals = ["15m", "1H", "4H", "1D", "1W"]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isZoomedOut) {
        setIsZoomedOut(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isZoomedOut])

  return (
    <div className="min-h-screen bg-black  border border-gray-800">
      <AnimatePresence>
        {!isZoomedOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Top Stats Bar */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between px-4 py-2 border-b border-gray-800"
            >
              <div className="flex items-center gap-6">
                <span>$1,611.30</span>
                <span>$1,611.30</span>
                <span className="text-green-400">$23.4 (2.17)%</span>
              </div>
              <div className="flex items-center gap-6">
                <span>$826,543,873</span>
                <span>0.66%</span>
              </div>
            </motion.div>

            {/* Navigation Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between px-4 py-3 border-b border-gray-800"
            >
              {/* Left Side - Time Intervals */}
              <div className="flex items-center gap-1">
                <span className="text-gray-400 mr-2">Time</span>
                <div className="flex gap-1">
                  {intervals.map((interval) => (
                    <motion.button
                      key={interval}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedInterval(interval)}
                      className={`px-3 py-1 rounded ${
                        selectedInterval === interval 
                          ? "bg-gray-700" 
                          : "hover:bg-gray-800"
                      }`}
                    >
                      {interval}
                    </motion.button>
                  ))}
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1 rounded"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Center - Tool Icons */}
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1 rounded hover:bg-gray-800"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M2 12h20M12 2v20" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1 rounded hover:bg-gray-800"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 3v18h18" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M7 17l4-4 4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>

              {/* Right Side - View Toggle */}
              <div className="flex items-center gap-4">
                <div className="flex rounded bg-gray-800">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView("trading")}
                    className={`px-4 py-1 rounded ${
                      view === "trading" ? "bg-gray-700" : ""
                    }`}
                  >
                    Trading view
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView("depth")}
                    className={`px-4 py-1 rounded ${
                      view === "depth" ? "bg-gray-700" : ""
                    }`}
                  >
                    Depth
                  </motion.button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsZoomedOut(true)}
                  className="p-1 rounded hover:bg-gray-800"
                >
                  <Maximize2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <AnimatePresence mode="wait">
              {view === "trading" ? (
                <motion.div
                  key="trading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 h-[calc(100vh-120px)] flex items-center justify-center"
                >
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="text-4xl font-bold"
                  >
                    Trading View
                  </motion.h2>
                </motion.div>
              ) : (
                <motion.div
                  key="depth"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 h-[calc(100vh-120px)] flex items-center justify-center"
                >
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="text-4xl font-bold"
                  >
                    Depth Content
                  </motion.h2>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoomed Out View */}
      <AnimatePresence>
        {isZoomedOut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black  border border-gray-800 flex flex-col items-center justify-center"
          >
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-bold mb-8"
            >
              Zoomed Out View
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8"
            >
              Press ESC to return
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsZoomedOut(false)}
              className="px-6 py-3 bg-blue-500 rounded-full text-lg font-semibold"
            >
              Return to Trading View
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}