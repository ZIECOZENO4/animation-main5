"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ChevronDown, Maximize2, X } from "lucide-react"
import SalesChart from "./sales-chart"
import DeptComponent from "./dept-graph"

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
    <div className="h-[calc(100vh-5rem)] bg-black  border border-gray-800">
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
                <span className="text-slate-500">$23.4 (2.17)%</span>
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
                <span className="text-gray-400 mr-2">Time Frame</span>
                <div className="flex gap-1">
                  {intervals.map((interval) => (
                    <motion.button
                      key={interval}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedInterval(interval)}
                      className={`px-3 py-1 rounded bg-black border border-gray-800 ${
                        selectedInterval === interval 
                          ? "bg-gray-700" 
                          : ""
                      }`}
                    >
                      {interval}
                    </motion.button>
                  ))}
               
                </div>
              </div>

      

              {/* Right Side - View Toggle */}
              <div className="flex items-center gap-4">
                <div className="flex rounded bg-black  border border-gray-800">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView("trading")}
                    className={`px-4 py-1 rounded ${
                      view === "trading" ? "bg-gray-800" : ""
                    }`}
                  >
                    Trading view
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setView("depth")}
                    className={`px-4 py-1 rounded ${
                      view === "depth" ? "bg-gray-800" : ""
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
                  className="p-4 h-[calc(100vh-120px)] w-full flex items-center justify-center"
                >
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="text-4xl font-bold"
                  >
                    <SalesChart />
                  </motion.h2>
                </motion.div>
              ) : (
                <motion.div
                  key="depth"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 h-[calc(100vh-120px)] w-full flex items-center justify-center"
                >
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="text-4xl font-bold"
                  >
                  <DeptComponent />
                  </motion.h2>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Modified Zoomed Out View */}
       <AnimatePresence>
        {isZoomedOut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black border border-gray-800 flex items-center justify-center"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2
              }}
              onClick={() => setIsZoomedOut(false)}
              className="absolute top-4 right-4 p-2 border-2 border-gray-600 rounded-full hover:border-gray-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Zoomed Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-7xl mx-auto p-8"
            >
              {view === "trading" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-[80vh]"
                >
                  <SalesChart />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-[80vh]"
                >
                  <DeptComponent />
                </motion.div>
              )}
            </motion.div>

            {/* Optional Keyboard Hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 text-sm"
            >
              Press ESC to exit fullscreen
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}