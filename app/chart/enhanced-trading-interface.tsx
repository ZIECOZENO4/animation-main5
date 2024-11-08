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
    <div className="h-auto w-full bg-black  border border-gray-800">
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
                  className="p-1 rounded hover:bg-gray-800 cursor-pointer"
                >
                  <Maximize2  className="w-5 h-5" />
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
                  className="p-4 h-[calc(100vh-120px)] w-full flex-grow flex items-center justify-center"
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
                  className="p-4  h-full w-full flex items-center justify-center"
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

      {/* Zoomed Out View */}
      <AnimatePresence>
        {isZoomedOut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black  border border-gray-800 flex flex-col items-center justify-center"
          >
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
              className="absolute top-10 cursor-pointer align-middle items-center justify-center p-2 border-2 border-gray-600 rounded-full hover:border-gray-400 transition-colors"
            >
              <X  onClick={() => setIsZoomedOut(false)} className="w-6 h-6 top-8 cursor-pointer" />
            </motion.button>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.3 }}
              className="w-full  mx-auto p-8 top-4"
            >
              {view === "trading" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                      <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mb-4"
        >
          <motion.div 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-[#999999] text-sm  flex items-center gap-2"
          >
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4" 
            >
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M9.5 8.5H9.51M19.5 7.5H19.51M14.5 12.5H14.51M8.5 15.5H8.51M18.5 15.5H18.51" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </motion.div>
            <motion.span
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              SALES
            </motion.span>
          </motion.div>
          <motion.div 
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="flex gap-2"
          >
            {['1D', '1W', '1M'].map((period) => (
              <motion.button
                key={period}
                whileHover={{ scale: 1.05, backgroundColor: '#64748b' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`px-2 py-1 rounded text-sm ${
                  period === '1D' ? 'bg-slate-500' : 'bg-[#333333]'
                } text-[#999999] hover:bg-slate-600`}
              >
                {period}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
                  <SalesChart />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full"
                >
                     <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-center gap-1 mb-2"
      >
        <motion.svg 
          initial={{ rotate: -90 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="w-6 h-3"
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 3v18h18" stroke="#999999" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 17l4-4 4 4 4-4" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
        <motion.span 
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="text-[#999999] text-xs"
        >
          DEPTH
        </motion.span>
      </motion.div>
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
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 text-sm"
            >
              Press ESC to exit fullscreen
            </motion.div>
          </motion.div>
        
        )}
      </AnimatePresence>
    </div>
  )
}